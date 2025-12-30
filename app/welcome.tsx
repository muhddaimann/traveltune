import React, { useEffect } from "react";
import { ScrollView, Image } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "../contexts/themeContext";
import { useDesign } from "../contexts/designContext";
import { router } from "expo-router";

export default function Welcome() {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tabs)/a");
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView
      bounces={false}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: design.spacing.lg,
        backgroundColor: theme.colors.background,
        gap: design.spacing.lg,
      }}
    >
      <Image
        source={require("../assets/icon.png")}
        style={{
          width: 96,
          height: 96,
          borderRadius: design.radii.lg,
        }}
        resizeMode="contain"
      />

      <Text
        variant="headlineMedium"
        style={{ color: theme.colors.onBackground }}
      >
        Welcome back!
      </Text>

      <Text
        variant="bodyLarge"
        style={{
          color: theme.colors.onSurfaceVariant,
        }}
      >
        Loading your journeys…
      </Text>
    </ScrollView>
  );
}
