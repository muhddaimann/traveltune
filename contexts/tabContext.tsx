import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Keyboard, Platform } from "react-native";

type Mode = "shown" | "dim" | "hidden";

type TabContextType = {
  mode: Mode;
  opacity: number;
  scale: number;
  reveal: () => void;
  dim: () => void;
  hide: () => void;
  updateByOffset: (y: number) => void;
};

const TabContext = createContext<TabContextType>({
  mode: "shown",
  opacity: 1,
  scale: 1,
  reveal: () => {},
  dim: () => {},
  hide: () => {},
  updateByOffset: () => {},
});

export function TabProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("shown");
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);

  const keyboardOpen = useRef(false);

  const reveal = useCallback(() => {
    if (keyboardOpen.current) return;
    setMode("shown");
    setOpacity(1);
    setScale(1);
  }, []);

  const dim = useCallback(() => {
    if (keyboardOpen.current) return;
    setMode("dim");
    setOpacity(0.78);
    setScale(0.97);
  }, []);

  const hide = useCallback(() => {
    setMode("hidden");
    setOpacity(0);
    setScale(0.92);
  }, []);

  const updateByOffset = useCallback(
    (y: number) => {
      if (keyboardOpen.current) return;
      if (y < 20) reveal();
      else if (y < 100) dim();
    },
    [reveal, dim]
  );

  React.useEffect(() => {
    const show = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => {
        keyboardOpen.current = true;
        hide();
      }
    );
    const hideKbd = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        keyboardOpen.current = false;
        reveal();
      }
    );

    return () => {
      show.remove();
      hideKbd.remove();
    };
  }, [hide, reveal]);

  const value = useMemo(
    () => ({ mode, opacity, scale, reveal, dim, hide, updateByOffset }),
    [mode, opacity, scale, reveal, dim, hide, updateByOffset]
  );

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
}

export const useTabsUi = () => useContext(TabContext);
