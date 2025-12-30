import React, { useState } from "react";
import { View, Image, ImageSourcePropType, Pressable } from "react-native";
import {
  Card,
  Text,
  Portal,
  Modal,
  Button,
  useTheme,
} from "react-native-paper";
import { Music, PlayCircle, MapPin, Headphones } from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";

export type JournalItem = {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  location?: string;
  mostPlayed?: string;
  image: ImageSourcePropType;
};

type JournalListProps = {
  data?: JournalItem[];
};

export default function JournalList({ data }: JournalListProps) {
  const theme = useTheme();
  const { design } = useDesign();
  const [selected, setSelected] = useState<JournalItem | null>(null);

  return (
    <>
      <View style={{ gap: design.spacing.md }}>
        {data?.map((item) => (
          <Pressable key={item.id} onPress={() => setSelected(item)}>
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

      <Portal>
        <Modal
          visible={!!selected}
          onDismiss={() => setSelected(null)}
          contentContainerStyle={{
            margin: design.spacing.lg,
            borderRadius: design.radii.xl,
            backgroundColor: theme.colors.surface,
            padding: design.spacing.lg,
          }}
        >
          {selected && (
            <View style={{ gap: design.spacing.md }}>
              <Image
                source={selected.image}
                style={{
                  width: "100%",
                  height: 180,
                  borderRadius: design.radii.lg,
                }}
              />

              <Text variant="titleLarge">{selected.title}</Text>

              {selected.subtitle && (
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {selected.subtitle}
                </Text>
              )}

              {selected.location && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <MapPin size={16} color={theme.colors.primary} />
                  <Text>{selected.location}</Text>
                </View>
              )}

              {selected.mostPlayed && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Music size={16} color={theme.colors.primary} />
                  <Text>{selected.mostPlayed}</Text>
                </View>
              )}

              <View
                style={{
                  flexDirection: "row",
                  gap: design.spacing.sm,
                  marginTop: design.spacing.md,
                }}
              >
                <Button
                  mode="outlined"
                  style={{ flex: 1 }}
                  onPress={() => setSelected(null)}
                >
                  Close
                </Button>
                <Button mode="contained" style={{ flex: 1 }} onPress={() => {}}>
                  Open Journey
                </Button>
              </View>
            </View>
          )}
        </Modal>
      </Portal>
    </>
  );
}
