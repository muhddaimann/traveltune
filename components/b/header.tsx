import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { ChevronRight, TrainFront, Clock, MapPin } from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";
import { useMapsContext } from "../../contexts/mapsContext";

export default function MapsHeader() {
  const theme = useTheme();
  const { design } = useDesign();
  const { activeRoute, journeyMeta } = useMapsContext();

  return (
    <View
      style={{
        paddingHorizontal: design.spacing.md,
        paddingTop: design.spacing.md,
        paddingBottom: design.spacing.md,
        gap: design.spacing.sm,
        backgroundColor: theme.colors.background,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.outlineVariant,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: design.typography.sizes.xs,
            color: theme.colors.onSurfaceVariant,
            letterSpacing: 0.8,
            textTransform: "uppercase",
          }}
        >
          Journey
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

      <View
        style={{
          padding: design.spacing.sm,
          borderRadius: design.radii.xl,
          backgroundColor: theme.colors.surface,
          elevation: design.elevation.level1,
          gap: design.spacing.sm,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: design.spacing.xs,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              fontSize: design.typography.sizes.sm,
              fontWeight: design.typography.weights.semibold,
              color: theme.colors.onSurface,
            }}
          >
            {journeyMeta.start.name}
          </Text>

          <ChevronRight size={16} color={theme.colors.primary} />

          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              fontSize: design.typography.sizes.sm,
              fontWeight: design.typography.weights.semibold,
              color: theme.colors.onSurface,
              textAlign: "right",
            }}
          >
            {journeyMeta.end.name}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: design.spacing.xs,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: design.radii.full,
              backgroundColor: theme.colors.surfaceVariant,
            }}
          >
            <TrainFront size={12} color={theme.colors.primary} />
            <Text
              style={{
                fontSize: design.typography.sizes.xs,
                color: theme.colors.onSurfaceVariant,
              }}
            >
              {journeyMeta.transport.mode} · {journeyMeta.transport.lineName}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: design.radii.full,
              backgroundColor: theme.colors.surfaceVariant,
            }}
          >
            <Clock size={12} color={theme.colors.primary} />
            <Text
              style={{
                fontSize: design.typography.sizes.xs,
                color: theme.colors.onSurfaceVariant,
              }}
            >
              {journeyMeta.transport.estimatedDurationMin} min
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: design.radii.full,
              backgroundColor: theme.colors.surfaceVariant,
            }}
          >
            <MapPin size={12} color={theme.colors.primary} />
            <Text
              style={{
                fontSize: design.typography.sizes.xs,
                color: theme.colors.onSurfaceVariant,
              }}
            >
              {journeyMeta.totalStops} stops
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
