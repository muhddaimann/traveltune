import React from "react";
import { View, TouchableOpacity } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme, Text } from "react-native-paper";
import { useTabsUi } from "../../contexts/tabContext";

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { opacity, scale, mode } = useTabsUi();

  if (mode === "hidden") return null;

  return (
    <View
      style={{
        position: "absolute",
        bottom: insets.bottom + 10,
        left: 16,
        right: 16,
        padding: 8,
        borderRadius: 32,
        backgroundColor: colors.surface,
        flexDirection: "row",
        alignItems: "center",
        opacity,
        transform: [{ scale }],
        elevation: 8,
        shadowColor: colors.shadow,
        shadowOpacity: 0.14,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      }}
      pointerEvents={opacity === 0 ? "none" : "auto"}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const Icon = options.tabBarIcon as React.ComponentType<{
          color: string;
          size: number;
        }>;

        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : typeof options.title === "string"
            ? options.title
            : route.name;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.85}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: isFocused ? 10 : 8,
              borderRadius: 24,
              backgroundColor: isFocused
                ? colors.primary
                : "transparent",
            }}
          >
            {Icon && (
              <Icon
                size={isFocused ? 24 : 22}
                color={
                  isFocused
                    ? colors.onPrimary
                    : colors.onSurface
                }
              />
            )}

            <Text
              variant={isFocused ? "labelMedium" : "labelSmall"}
              style={{
                marginTop: 4,
                color: isFocused
                  ? colors.onPrimary
                  : colors.onSurface,
                fontWeight: isFocused ? "600" : "400",
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
