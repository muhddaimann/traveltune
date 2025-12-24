import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MapPin } from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";
import MainSearch from "../shared/mainSearch";

export default function JourneyHeader() {
  const theme = useTheme();
  const { design } = useDesign();

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        paddingHorizontal: design.spacing.md,
        gap: design.spacing.md,
      }}
    >
      <View style={{ alignItems: "center" }}>
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
    </View>
  );
}
