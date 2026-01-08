import React, { useEffect, useRef } from "react";
import { ScrollView, Image, Animated, Easing, View } from "react-native";
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
        paddingTop: design.spacing["2xl"]*7,
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

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            variant="headlineLarge"
            style={{
              color: theme.colors.primary,
              fontWeight: "700",
              letterSpacing: 0.4,
            }}
          >
            Travel
          </Text>
          <Text
            variant="headlineLarge"
            style={{
              color: theme.colors.secondary,
              fontWeight: "700",
              letterSpacing: 0.4,
            }}
          >
            Tune
          </Text>
        </View>

        <Text
          variant="bodyLarge"
          style={{
            color: theme.colors.onSurfaceVariant,
            textAlign: "center",
            maxWidth: 300,
          }}
        >
          Tune your journeys and memories
        </Text>
      </Animated.View>
    </ScrollView>
  );
}
