import React, { useState } from "react";
import { View, Image, Pressable, ScrollView, Alert } from "react-native";
import {
  Text,
  Portal,
  Modal,
  Button,
  Chip,
  useTheme,
  Divider,
} from "react-native-paper";
import { Music, MapPin, Heart, TrainFront, Clock } from "lucide-react-native";
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

  transport?: {
    mode: string;
    lineName?: string;
    operator?: string;
    totalDurationMin?: number;
    totalStops?: number;
  };

  stops?: {
    station: string;
    vibe: string;
    etaFromStartMin?: number;
    tracks: { id: string; title: string; artist: string }[];
  }[];
};

type LibraryListProps = {
  data: LibraryItem[];
  type: "JOURNEYS" | "PLAYLISTS" | "ARTISTS" | "LIKED";
};

export default function LibraryList({ data, type }: LibraryListProps) {
  const theme = useTheme();
  const { design } = useDesign();
  const [selected, setSelected] = useState<LibraryItem | null>(null);
  const [loading, setLoading] = useState(false);

  const onRemove = async () => {
    try {
      setLoading(true);
      throw new Error("Remove failed");
    } catch {
      Alert.alert("Action failed", "Unable to remove this item. Try again.");
    } finally {
      setLoading(false);
      setSelected(null);
    }
  };

  return (
    <>
      <View style={{ gap: design.spacing.md }}>
        {data.map((item) => {
          const isJourney = type === "JOURNEYS";

          return (
            <Pressable
              key={item.id}
              onPress={() => setSelected(item)}
              style={({ pressed }) => ({
                padding: design.spacing.md,
                borderRadius: design.radii["2xl"],
                backgroundColor: theme.colors.surface,
                gap: design.spacing.sm,
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <View style={{ flexDirection: "row", gap: design.spacing.md }}>
                {(item.cover || item.image) && (
                  <Image
                    source={item.cover ?? item.image}
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: design.radii.lg,
                    }}
                  />
                )}

                <View style={{ flex: 1, gap: 4 }}>
                  <Text variant="titleSmall" numberOfLines={1}>
                    {item.title ?? item.name}
                  </Text>

                  {item.subtitle && (
                    <Text
                      variant="bodySmall"
                      numberOfLines={1}
                      style={{ color: theme.colors.onSurfaceVariant }}
                    >
                      {item.subtitle}
                    </Text>
                  )}

                  {isJourney && (
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 6,
                        marginTop: 4,
                      }}
                    >
                      {item.place && (
                        <Chip compact icon={() => <MapPin size={12} />}>
                          {item.place}
                        </Chip>
                      )}

                      {item.transport?.mode && (
                        <Chip compact icon={() => <TrainFront size={12} />}>
                          {item.transport.mode}
                          {item.transport.lineName
                            ? ` · ${item.transport.lineName}`
                            : ""}
                        </Chip>
                      )}

                      {item.transport?.totalDurationMin && (
                        <Chip compact icon={() => <Clock size={12} />}>
                          {item.transport.totalDurationMin} min
                        </Chip>
                      )}

                      {item.trackCount !== undefined && (
                        <Chip compact icon={() => <Music size={12} />}>
                          {item.trackCount} tracks
                        </Chip>
                      )}
                    </View>
                  )}
                </View>

                {type === "LIKED" && (
                  <Heart size={18} color={theme.colors.primary} />
                )}
              </View>

              {isJourney && item.stops && (
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 6,
                    marginTop: design.spacing.xs,
                  }}
                >
                  {item.stops.slice(0, 3).map((stop) => (
                    <Chip key={stop.station} compact>
                      {stop.station}
                    </Chip>
                  ))}
                  {item.stops.length > 3 && (
                    <Chip compact>+{item.stops.length - 3} more</Chip>
                  )}
                </View>
              )}
            </Pressable>
          );
        })}
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
            <ScrollView
              contentContainerStyle={{
                padding: design.spacing.lg,
                gap: design.spacing.md,
              }}
            >
              {(selected.cover || selected.image) && (
                <Image
                  source={selected.cover ?? selected.image}
                  style={{
                    width: "100%",
                    height: 180,
                    borderRadius: design.radii.xl,
                  }}
                />
              )}

              <View>
                <Text variant="titleMedium">
                  {selected.title ?? selected.name}
                </Text>
                {selected.subtitle && (
                  <Text
                    variant="bodySmall"
                    style={{ color: theme.colors.onSurfaceVariant }}
                  >
                    {selected.subtitle}
                  </Text>
                )}
              </View>

              {type === "JOURNEYS" && selected.transport && (
                <View
                  style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}
                >
                  <Chip icon={() => <TrainFront size={12} />}>
                    {selected.transport.mode}
                    {selected.transport.lineName
                      ? ` · ${selected.transport.lineName}`
                      : ""}
                  </Chip>
                  {selected.transport.totalDurationMin && (
                    <Chip icon={() => <Clock size={12} />}>
                      {selected.transport.totalDurationMin} min
                    </Chip>
                  )}
                  {selected.transport.totalStops && (
                    <Chip icon={() => <MapPin size={12} />}>
                      {selected.transport.totalStops} stops
                    </Chip>
                  )}
                </View>
              )}

              {type === "JOURNEYS" && selected.stops && (
                <>
                  <Divider />
                  <View style={{ gap: design.spacing.md }}>
                    {selected.stops.map((stop) => (
                      <View key={stop.station} style={{ gap: 4 }}>
                        <Text variant="titleSmall">
                          {stop.station}
                          {stop.etaFromStartMin !== undefined
                            ? ` · ${stop.etaFromStartMin} min`
                            : ""}
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
                            numberOfLines={1}
                          >
                            {t.title} · {t.artist}
                          </Text>
                        ))}
                      </View>
                    ))}
                  </View>
                </>
              )}

              <Divider />

              <View style={{ flexDirection: "row", gap: design.spacing.sm }}>
                <Button
                  mode="outlined"
                  style={{ flex: 1 }}
                  onPress={() => setSelected(null)}
                >
                  Close
                </Button>
                <Button
                  mode="contained"
                  loading={loading}
                  buttonColor={theme.colors.error}
                  style={{ flex: 1 }}
                  onPress={onRemove}
                >
                  Remove
                </Button>
              </View>
            </ScrollView>
          )}
        </Modal>
      </Portal>
    </>
  );
}
