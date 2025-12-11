import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useAppTheme } from "../contexts/themeContext";
import { useDesign } from "../contexts/designContext";

export default function Index() {
  const [text, setText] = useState("");
  const { mode, setMode, theme } = useAppTheme();
  const { design } = useDesign();

  return (
    <ScrollView
      bounces={false}
      overScrollMode="never"
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      contentContainerStyle={{
        padding: design.spacing.md,
        paddingBottom: design.spacing.xxs * 3,
      }}
    >
    
    </ScrollView>
  );
}
``