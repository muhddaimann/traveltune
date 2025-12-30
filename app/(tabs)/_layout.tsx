import { Tabs, usePathname } from "expo-router";
import { BookOpen, Map, Library, Home } from "lucide-react-native";
import { TabProvider } from "../../contexts/tabContext";
import { CustomTabBar } from "../../components/shared/navBar";
import MiniPlayer from "../../components/shared/miniPlayer";

export default function TabsLayout() {
  const pathname = usePathname();

  const isHomeIndexScreen = pathname === "/a" || pathname === "/a/index";

  return (
    <TabProvider>
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => (
          <>
            {isHomeIndexScreen && <MiniPlayer />}
            <CustomTabBar {...props} />
          </>
        )}
      >
        <Tabs.Screen
          name="a"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="b"
          options={{
            title: "Maps",
            tabBarIcon: ({ color, size }) => <Map color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="c"
          options={{
            title: "Journal",
            tabBarIcon: ({ color, size }) => (
              <BookOpen color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="d"
          options={{
            title: "Library",
            tabBarIcon: ({ color, size }) => (
              <Library color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </TabProvider>
  );
}
