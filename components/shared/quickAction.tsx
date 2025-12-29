import React from "react";
import { View, Text, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { PlayCircle, Plus } from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";

type QuickActionsProps = {
  from?: string;
  to?: string;
};

export default function QuickActions({
  from = "KL Sentral",
  to = "Batu Caves",
}: QuickActionsProps) {
  const theme = useTheme();
  const { design } = useDesign();

  return (
    <View
      style={{
        flexDirection: "row",
        gap: design.spacing.md,
      }}
    >
      <Pressable
        style={{
          flex: 1.5,
          backgroundColor: theme.colors.primaryContainer,
          borderRadius: design.radii["2xl"],
          padding: design.spacing.md,
          borderWidth: 1,
          borderColor: theme.colors.outlineVariant,
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: design.spacing.sm,
            right: design.spacing.sm,
            width: design.sizes.icon.xl + design.spacing.xs,
            height: design.sizes.icon.xl + design.spacing.xs,
            borderRadius: design.radii.full,
            backgroundColor: theme.colors.primary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PlayCircle
            size={design.sizes.icon.md}
            color={theme.colors.onPrimary}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: design.typography.sizes.xs,
              color: theme.colors.onPrimaryContainer,
              opacity: design.typography.opacities.muted,
            }}
          >
            Resume journey
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: design.typography.sizes.sm,
              fontWeight: design.typography.weights.semibold,
              color: theme.colors.onPrimaryContainer,
            }}
          >
            {from} → {to}
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={{
          flex: 1,
          minHeight: design.sizes.touch.minHeight * 2.5,
          backgroundColor: theme.colors.secondaryContainer,
          borderRadius: design.radii["2xl"],
          padding: design.spacing.md,
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: design.spacing.sm,
            right: design.spacing.sm,
            width: design.sizes.icon.xl + design.spacing.xs,
            height: design.sizes.icon.xl + design.spacing.xs,
            borderRadius: design.radii.full,
            backgroundColor: theme.colors.secondary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Plus size={design.sizes.icon.md} color={theme.colors.onSecondary} />
        </View>

        <View>
          <Text
            style={{
              fontSize: design.typography.sizes.xs,
              color: theme.colors.onSecondaryContainer,
              opacity: design.typography.opacities.muted,
            }}
          >
            Start fresh
          </Text>
          <Text
            style={{
              fontSize: design.typography.sizes.sm,
              fontWeight: design.typography.weights.semibold,
              color: theme.colors.onSecondaryContainer,
            }}
          >
            New journey
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
