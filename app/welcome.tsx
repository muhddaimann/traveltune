import React, { useEffect, useRef } from "react";
import { ScrollView, Image, Animated, Easing } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "../contexts/themeContext";
import { useDesign } from "../contexts/designContext";
import { router } from "expo-router";

export default function Welcome() {
  const { theme } = useAppTheme();
  const { design } = useDesign();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace("/(tabs)/a");
    }, 2000);

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
      }}
    >
      <Animated.View
        style={{
          alignItems: "center",
          gap: design.spacing.md,
          opacity,
          transform: [{ translateY }],
        }}
      >
        <Image
          source={require("../assets/icon.png")}
          style={{
            width: 104,
            height: 104,
            resizeMode: "contain",
            marginBottom: design.spacing.sm,
          }}
        />

        <Text
          variant="headlineMedium"
          style={{
            color: theme.colors.onBackground,
            textAlign: "center",
          }}
        >
          Welcome back
        </Text>

        <Text
          variant="bodyLarge"
          style={{
            color: theme.colors.onSurfaceVariant,
            textAlign: "center",
            maxWidth: 300,
          }}
        >
          Tuning your journeys and memories
        </Text>
      </Animated.View>
    </ScrollView>
  );
}
