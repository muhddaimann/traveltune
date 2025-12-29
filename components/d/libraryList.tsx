import React, { useState } from "react";
import { View, Image, Pressable, ScrollView } from "react-native";
import {
  Text,
  Portal,
  Modal,
  Button,
  Chip,
  useTheme,
  Divider,
} from "react-native-paper";
import { Music, MapPin } from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";

type LibraryItem = {
  id: string;
  title?: string;
  name?: string;
  subtitle?: string;
  genre?: string;
  trackCount?: number;
  place?: string;
  image?: any;
  cover?: any;
  tracks?: { id: string; title: string; artist: string }[];
  stops?: {
    station: string;
    vibe: string;
    tracks: { id: string; title: string; artist: string }[];
  }[];
};

type LibraryListProps = {
  data: LibraryItem[];
  type: "JOURNEYS" | "PLAYLISTS" | "ARTISTS";
};

export default function LibraryList({ data, type }: LibraryListProps) {
  const theme = useTheme();
  const { design } = useDesign();
  const [selected, setSelected] = useState<LibraryItem | null>(null);

  return (
    <>
      <View style={{ gap: design.spacing.md }}>
        {data.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => setSelected(item)}
            style={({ pressed }) => ({
              flexDirection: "row",
              gap: design.spacing.md,
              padding: design.spacing.md,
              borderRadius: design.radii.xl,
              backgroundColor: theme.colors.surface,
              opacity: pressed ? 0.85 : 1,
            })}
          >
            {(item.image || item.cover) && (
              <Image
                source={item.image ?? item.cover}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: design.radii.lg,
                }}
              />
            )}

            <View style={{ flex: 1, gap: 4 }}>
              <Text
                variant="titleSmall"
                numberOfLines={1}
                style={{ color: theme.colors.onSurface }}
              >
                {item.title ?? item.name}
              </Text>

              {(item.subtitle || item.genre) && (
                <Text
                  variant="bodySmall"
                  numberOfLines={1}
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {item.subtitle ?? item.genre}
                </Text>
              )}

              <View style={{ flexDirection: "row", gap: 6, marginTop: 4 }}>
                {item.place && (
                  <Chip
                    compact
                    icon={() => (
                      <MapPin size={12} color={theme.colors.primary} />
                    )}
                  >
                    {item.place}
                  </Chip>
                )}
                {item.trackCount !== undefined && (
                  <Chip
                    compact
                    icon={() => (
                      <Music size={12} color={theme.colors.secondary} />
                    )}
                  >
                    {item.trackCount} tracks
                  </Chip>
                )}
              </View>
            </View>
          </Pressable>
        ))}
      </View>

      <Portal>
        <Modal
          visible={!!selected}
          onDismiss={() => setSelected(null)}
          contentContainerStyle={{
            margin: design.spacing.md,
            borderRadius: design.radii["2xl"],
            backgroundColor: theme.colors.surface,
          }}
        >
          {selected && (
            <View
              style={{
                borderRadius: design.radii["2xl"],
                overflow: "hidden",
              }}
            >
              <ScrollView
                contentContainerStyle={{
                  padding: design.spacing.lg,
                  gap: design.spacing.md,
                }}
              >
                {(selected.image || selected.cover) && (
                  <Image
                    source={selected.image ?? selected.cover}
                    style={{
                      width: "100%",
                      height: 180,
                      borderRadius: design.radii.xl,
                    }}
                  />
                )}

                <View style={{ gap: 4 }}>
                  <Text
                    variant="titleMedium"
                    style={{ color: theme.colors.onSurface }}
                  >
                    {selected.title ?? selected.name}
                  </Text>

                  {(selected.subtitle || selected.genre) && (
                    <Text
                      variant="bodySmall"
                      style={{ color: theme.colors.onSurfaceVariant }}
                    >
                      {selected.subtitle ?? selected.genre}
                    </Text>
                  )}
                </View>

                {type === "JOURNEYS" && selected.stops && (
                  <View style={{ gap: design.spacing.sm }}>
                    <Text variant="labelLarge">Journey stops</Text>
                    {selected.stops.map((stop) => (
                      <View
                        key={stop.station}
                        style={{
                          padding: design.spacing.sm,
                          borderRadius: design.radii.md,
                          backgroundColor: theme.colors.surfaceVariant,
                          gap: 4,
                        }}
                      >
                        <Text style={{ fontWeight: "600" }}>
                          {stop.station}
                        </Text>
                        <Text
                          variant="bodySmall"
                          style={{ color: theme.colors.onSurfaceVariant }}
                        >
                          {stop.vibe}
                        </Text>
                        {stop.tracks.map((t) => (
                          <Text
                            key={t.id}
                            variant="bodySmall"
                            style={{ marginLeft: 6 }}
                          >
                            • {t.title} · {t.artist}
                          </Text>
                        ))}
                      </View>
                    ))}
                  </View>
                )}

                {type === "PLAYLISTS" && selected.tracks && (
                  <View style={{ gap: design.spacing.sm }}>
                    <Text variant="labelLarge">Tracks</Text>
                    {selected.tracks.map((t) => (
                      <Text key={t.id} variant="bodySmall">
                        • {t.title} · {t.artist}
                      </Text>
                    ))}
                  </View>
                )}

                <Divider />

                <View
                  style={{
                    flexDirection: "row",
                    gap: design.spacing.sm,
                  }}
                >
                  <Button
                    mode="outlined"
                    style={{ flex: 1 }}
                    onPress={() => setSelected(null)}
                  >
                    Edit
                  </Button>
                  <Button
                    mode="contained"
                    style={{ flex: 1 }}
                    onPress={() => setSelected(null)}
                  >
                    Delete
                  </Button>
                </View>
              </ScrollView>
            </View>
          )}
        </Modal>
      </Portal>
    </>
  );
}
