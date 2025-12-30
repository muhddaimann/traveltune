import React, { useState } from "react";
import { View, Image, ImageSourcePropType, Pressable } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { Headphones, MapPin, PlayCircle } from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";
import useJourney, { JourneyItem } from "../../hooks/useJourney";
import MemoryLaneComponent from "./memoryLane";

type JournalListProps = {
  data?: JourneyItem[];
};

export default function JournalList({ data }: JournalListProps) {
  const theme = useTheme();
  const { design } = useDesign();
  const [selected, setSelected] = useState<JourneyItem | null>(null);

  const handlePress = (item: JourneyItem) => {
    if (item.memoryLane) {
      setSelected(item);
    }
  };

  return (
    <>
      <View style={{ gap: design.spacing.md }}>
        {data?.map((item) => (
          <Pressable key={item.id} onPress={() => handlePress(item)}>
            <Card
              elevation={3}
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: design.radii.xl,
              }}
            >
              <View
                style={{ borderRadius: design.radii.xl, overflow: "hidden" }}
              >
                <View style={{ position: "relative" }}>
                  <Image
                    source={item.image}
                    style={{
                      width: "100%",
                      height: 140,
                    }}
                  />

                  {item.mostPlayed && (
                    <View
                      style={{
                        position: "absolute",
                        right: design.spacing.sm,
                        top: design.spacing.sm,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                        paddingHorizontal: design.spacing.sm,
                        paddingVertical: design.spacing.xs,
                        borderRadius: design.radii.lg,
                        backgroundColor: theme.colors.secondaryContainer,
                      }}
                    >
                      <PlayCircle
                        size={14}
                        color={theme.colors.onSecondaryContainer}
                      />
                      <Text
                        variant="labelSmall"
                        style={{
                          color: theme.colors.onSecondaryContainer,
                          fontWeight: "600",
                        }}
                      >
                        {item.mostPlayed}
                      </Text>
                      <Headphones
                        size={12}
                        color={theme.colors.onSecondaryContainer}
                      />
                    </View>
                  )}
                </View>

                <View
                  style={{
                    padding: design.spacing.md,
                    gap: 6,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      variant="titleMedium"
                      numberOfLines={1}
                      style={{ color: theme.colors.onSurface }}
                    >
                      {item.title}
                    </Text>

                    {item.date && (
                      <Text
                        variant="labelSmall"
                        style={{ color: theme.colors.onSurfaceVariant }}
                      >
                        {item.date}
                      </Text>
                    )}
                  </View>

                  {item.location && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <MapPin size={14} color={theme.colors.onSurfaceVariant} />
                      <Text
                        variant="labelSmall"
                        numberOfLines={1}
                        style={{ color: theme.colors.onSurfaceVariant }}
                      >
                        {item.location}
                      </Text>
                    </View>
                  )}

                  {item.subtitle && (
                    <Text
                      variant="bodySmall"
                      numberOfLines={2}
                      style={{ color: theme.colors.onSurfaceVariant }}
                    >
                      {item.subtitle}
                    </Text>
                  )}
                </View>
              </View>
            </Card>
          </Pressable>
        ))}
      </View>

      <MemoryLaneComponent
        visible={!!selected}
        onDismiss={() => setSelected(null)}
        memoryLane={selected?.memoryLane ?? null}
      />
    </>
  );
}
