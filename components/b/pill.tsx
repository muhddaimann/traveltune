import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Music2, CheckCircle, ChevronLeft, MapPin } from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";
import { useMapsContext } from "../../contexts/mapsContext";

export default function MapPill() {
  const theme = useTheme();
  const { design } = useDesign();
  const {
    activeStation,
    activeStationIndex,
    progress,
    nextStation,
    prevStation,
  } = useMapsContext();

  const isFirst = activeStationIndex === 0;
  const isLast = activeStationIndex === progress.total - 1;

  return (
    <View
      style={{
        marginHorizontal: design.spacing.md,
        padding: design.spacing.sm,
        borderRadius: design.radii["2xl"],
        backgroundColor: theme.colors.surface,
        flexDirection: "row",
        alignItems: "center",
        gap: design.spacing.sm,
        elevation: design.elevation.level3,
      }}
    >
      {/* Back */}
      <TouchableOpacity
        onPress={prevStation}
        disabled={isFirst}
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.surfaceVariant,
          opacity: isFirst ? 0.4 : 1,
        }}
      >
        <ChevronLeft size={18} color={theme.colors.onSurface} />
      </TouchableOpacity>

      {/* Cover */}
      <Image
        source={activeStation.stopCover}
        style={{
          width: 40,
          height: 40,
          borderRadius: design.radii.md,
        }}
      />

      {/* Info */}
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: design.typography.sizes.sm,
            fontWeight: design.typography.weights.semibold,
            color: theme.colors.onSurface,
          }}
        >
          {activeStation.name}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
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

        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <MapPin size={12} color={theme.colors.onSurfaceVariant} />
          <Text
            style={{
              fontSize: design.typography.sizes.xs,
              color: theme.colors.onSurfaceVariant,
            }}
          >
            Stop {progress.current} of {progress.total}
          </Text>
        </View>
      </View>

      {/* Next / Arrived */}
      <TouchableOpacity
        onPress={nextStation}
        disabled={isLast}
        style={{
          height: 36,
          paddingHorizontal: design.spacing.md,
          borderRadius: design.radii.full,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 6,
          backgroundColor: isLast
            ? theme.colors.surfaceVariant
            : theme.colors.primary,
          opacity: isLast ? 0.6 : 1,
        }}
      >
        <CheckCircle
          size={16}
          color={
            isLast ? theme.colors.onSurfaceVariant : theme.colors.onPrimary
          }
        />
        <Text
          style={{
            fontSize: design.typography.sizes.sm,
            fontWeight: design.typography.weights.semibold,
            color: isLast
              ? theme.colors.onSurfaceVariant
              : theme.colors.onPrimary,
          }}
        >
          {isLast ? "Arrived" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
