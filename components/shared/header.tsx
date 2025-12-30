import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
};

export default function AppHeader({
  title,
  subtitle,
  leftSlot,
  rightSlot,
}: AppHeaderProps) {
  const { colors } = useTheme();
  const { design } = useDesign();
  const router = useRouter();

  const TOUCH_SIZE = design.sizes.touch.minHeight;
  const SIDE_WIDTH = TOUCH_SIZE + design.spacing.md;

  return (
    <View
      style={{
        paddingBottom: design.spacing.md,
        paddingTop: design.spacing.xs,
        backgroundColor: colors.background,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: SIDE_WIDTH,
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        {leftSlot ?? (
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            style={{
              width: TOUCH_SIZE,
              height: TOUCH_SIZE,
              borderRadius: design.radii.full,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.primary,
            }}
          >
            <ChevronLeft size={20} color={colors.onPrimary} />
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          flex: 1,
          paddingLeft: design.spacing.xxs,
          justifyContent: "center",
        }}
      >
        <Text
          variant="titleMedium"
          numberOfLines={1}
          style={{
            color: colors.onBackground,
            fontWeight: design.typography.weights.semibold,
          }}
        >
          {title}
        </Text>

        {subtitle && (
          <Text
            variant="bodySmall"
            numberOfLines={1}
            style={{
              color: colors.onSurfaceVariant,
              marginTop: 2,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>

      <View
        style={{
          width: SIDE_WIDTH,
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        {rightSlot}
      </View>
    </View>
  );
}
