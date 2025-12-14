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
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 32,
        backgroundColor: colors.surface,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        opacity,
        transform: [{ scale }],
        elevation: 6,
        shadowColor: colors.shadow,
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
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
            activeOpacity={0.8}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {Icon && (
              <Icon
                size={22}
                color={isFocused ? colors.primary : colors.onSurfaceVariant}
              />
            )}

            <Text
              variant="labelSmall"
              style={{
                marginTop: 4,
                color: isFocused ? colors.primary : colors.onSurfaceVariant,
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
