import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Text, useTheme } from "react-native-paper";
import {
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
        gap: design.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.outlineVariant,
      }}
    >
      {/* Journey title */}
      <View>
        <Text
          style={{
            fontSize: design.typography.sizes.xs,
            color: theme.colors.onSurfaceVariant,
            letterSpacing: 0.6,
            textTransform: "uppercase",
          }}
        >
          Current journey
        </Text>
        <Text
          numberOfLines={1}
          style={{
            marginTop: 2,
            fontSize: design.typography.sizes.lg,
            fontWeight: design.typography.weights.bold,
            color: theme.colors.onSurface,
          }}
        >
          {activeRoute.name}
        </Text>
      </View>

      {/* Route summary */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: design.spacing.sm,
          padding: design.spacing.sm,
          borderRadius: design.radii.lg,
          backgroundColor: theme.colors.surfaceVariant,
        }}
      >
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

      {/* Active station card */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: design.spacing.md,
          padding: design.spacing.md,
          borderRadius: design.radii["2xl"],
          backgroundColor: theme.colors.surface,
          elevation: design.elevation.level2,
        }}
      >
        {/* Stop image */}
        <Image
          source={activeStation.stopCover}
          style={{
            width: 56,
            height: 56,
            borderRadius: design.radii.lg,
          }}
        />

        <View style={{ flex: 1, gap: 6 }}>
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
            <Image
              source={activeStation.albumCover}
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
              }}
            />
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

        {/* Progress + controls */}
        <View style={{ alignItems: "center", gap: 6 }}>
          <Text
            style={{
              fontSize: design.typography.sizes.xs,
              color: theme.colors.onSurfaceVariant,
            }}
          >
            {progress.current}/{progress.total}
          </Text>

          <View style={{ flexDirection: "row", gap: 4 }}>
            <TouchableOpacity
              onPress={prevStation}
              disabled={activeStationIndex === 0}
              activeOpacity={0.7}
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.colors.surfaceVariant,
                opacity: activeStationIndex === 0 ? 0.4 : 1,
              }}
            >
              <ChevronLeft size={16} color={theme.colors.onSurface} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={nextStation}
              disabled={activeStationIndex === activeRoute.stations.length - 1}
              activeOpacity={0.7}
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.colors.surfaceVariant,
                opacity:
                  activeStationIndex === activeRoute.stations.length - 1
                    ? 0.4
                    : 1,
              }}
            >
              <ChevronRight size={16} color={theme.colors.onSurface} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
