import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MapPin } from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";
import MainSearch from "../shared/mainSearch";

export default function MapHeader() {
  const theme = useTheme();
  const { design } = useDesign();

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        paddingBottom: design.spacing.md,
        paddingHorizontal: design.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.outlineVariant,
        gap: design.spacing.md,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            variant="headlineSmall"
            style={{
              color: theme.colors.primary,
              fontWeight: "600",
              letterSpacing: 0.3,
            }}
          >
            Travel
          </Text>
          <Text
            variant="headlineSmall"
            style={{
              color: theme.colors.secondary,
              fontWeight: "600",
              letterSpacing: 0.3,
            }}
          >
            Tune
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: design.spacing.sm,
        }}
      >
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.surfaceVariant,
          }}
        >
          <MapPin size={18} color={theme.colors.onSurfaceVariant} />
        </View>

        <View>
          <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
            No active journey
          </Text>

          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Your route and soundtrack will appear here
          </Text>
        </View>
      </View>

      {/* Search */}
      <MainSearch />
    </View>
  );
}
