import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Music2,
} from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";
import { useMapsContext } from "../../contexts/mapsContext";

export default function MapHeader() {
  const theme = useTheme();
  const { design } = useDesign();
  const {
    activeRoute,
    activeStation,
    nextStation,
    prevStation,
    activeStationIndex,
    progress,
  } = useMapsContext();

  const start = activeRoute.stations[0];
  const end = activeRoute.stations[activeRoute.stations.length - 1];

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        paddingHorizontal: design.spacing.md,
        paddingTop: design.spacing.sm,
        paddingBottom: design.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.outlineVariant,
        gap: design.spacing.md,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: design.typography.sizes.xs,
            color: theme.colors.onSurfaceVariant,
            letterSpacing: 0.4,
            textTransform: "uppercase",
          }}
        >
          Current journey
        </Text>

        <Text
          style={{
            fontSize: design.typography.sizes.lg,
            fontWeight: design.typography.weights.bold,
            color: theme.colors.onSurface,
          }}
        >
          {activeRoute.name}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: design.spacing.sm,
          padding: design.spacing.sm,
          borderRadius: design.radii.xl,
          backgroundColor: theme.colors.surfaceVariant,
        }}
      >
        <MapPin size={18} color={theme.colors.primary} />

        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            fontSize: design.typography.sizes.sm,
            color: theme.colors.onSurfaceVariant,
          }}
        >
          {start.name}
        </Text>

        <ArrowRight size={14} color={theme.colors.onSurfaceVariant} />

        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            fontSize: design.typography.sizes.sm,
            color: theme.colors.onSurfaceVariant,
            textAlign: "right",
          }}
        >
          {end.name}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: design.spacing.sm,
          padding: design.spacing.md,
          borderRadius: design.radii["2xl"],
          backgroundColor: theme.colors.surface,
          elevation: 2,
        }}
      >
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.primaryContainer,
          }}
        >
          <MapPin size={20} color={theme.colors.primary} />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: design.typography.sizes.md,
              fontWeight: design.typography.weights.semibold,
              color: theme.colors.onSurface,
            }}
          >
            {activeStation.name}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Music2 size={12} color={theme.colors.onSurfaceVariant} />
            <Text
              numberOfLines={1}
              style={{
                fontSize: design.typography.sizes.xs,
                color: theme.colors.onSurfaceVariant,
              }}
            >
              {activeStation.song.title} · {activeStation.song.artist}
            </Text>
          </View>
        </View>

        <View style={{ alignItems: "center", gap: 4 }}>
          <Text
            style={{
              fontSize: design.typography.sizes.xs,
              color: theme.colors.onSurfaceVariant,
            }}
          >
            {progress.current}/{progress.total}
          </Text>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={prevStation}
              disabled={activeStationIndex === 0}
              style={{
                padding: design.spacing.xs,
                opacity: activeStationIndex === 0 ? 0.4 : 1,
              }}
            >
              <ChevronLeft size={18} color={theme.colors.onSurface} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={nextStation}
              disabled={activeStationIndex === activeRoute.stations.length - 1}
              style={{
                padding: design.spacing.xs,
                opacity:
                  activeStationIndex === activeRoute.stations.length - 1
                    ? 0.4
                    : 1,
              }}
            >
              <ChevronRight size={18} color={theme.colors.onSurface} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
