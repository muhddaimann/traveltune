import React, { useEffect, useRef } from "react";
import { ScrollView, View, Animated, Easing, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import { router } from "expo-router";
import { useAppTheme } from "../contexts/themeContext";
import { useDesign } from "../contexts/designContext";

export default function Land() {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(24)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScrollView
      bounces={false}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        padding: design.spacing.lg,
        paddingBottom: design.spacing["2xl"],
        flexGrow: 1,
        justifyContent: "center",
      }}
    >
      <Animated.View
        style={{
          alignItems: "center",
          gap: design.spacing.md,
          opacity,
          transform: [{ translateY }, { scale }],
        }}
      >
        <Image
          source={require("../assets/icon.png")}
          style={{
            width: 120,
            height: 120,
            resizeMode: "contain",
            marginBottom: design.spacing.sm,
          }}
        />

        <Text
          variant="headlineLarge"
          style={{ color: theme.colors.onBackground, textAlign: "center" }}
        >
          Welcome to TravelTune
        </Text>

        <Text
          variant="bodyLarge"
          style={{
            color: theme.colors.onSurfaceVariant,
            textAlign: "center",
            maxWidth: 320,
            marginBottom: design.spacing.xl,
          }}
        >
          Your soundtrack for every journey.
        </Text>

        <View style={{ width: "100%", gap: design.spacing.md }}>
          <Button mode="contained" onPress={() => router.push("/signUp")}>
            Create Account
          </Button>

          <Button mode="outlined" onPress={() => router.push("/signIn")}>
            Sign In
          </Button>
        </View>
      </Animated.View>
    </ScrollView>
  );
}
