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
import {
  Music,
  MapPin,
  Heart,
  TrainFront,
  Clock,
  ChevronRight,
} from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";

type LibraryItem = {
  id: string;
  title?: string;
  artist?: string;
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
      throw new Error();
    } catch {
      Alert.alert("Action failed", "Unable to remove this item.");
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
          const isLiked = type === "LIKED";

          return (
            <Pressable
              key={item.id}
              onPress={() => setSelected(item)}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                gap: design.spacing.md,
                padding: design.spacing.md,
                borderRadius: design.radii["2xl"],
                backgroundColor: theme.colors.surface,
                opacity: pressed ? 0.9 : 1,
              })}
            >
              {(item.cover || item.image) && (
                <Image
                  source={item.cover ?? item.image}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: design.radii.lg,
                  }}
                />
              )}

              <View style={{ flex: 1, gap: 4 }}>
                <Text variant="titleSmall" numberOfLines={1}>
                  {item.title ?? item.name}
                </Text>

                {isLiked && item.artist && (
                  <Text
                    variant="bodySmall"
                    numberOfLines={1}
                    style={{ color: theme.colors.onSurfaceVariant }}
                  >
                    {item.artist}
                  </Text>
                )}

                {!isLiked && item.subtitle && (
                  <Text
                    variant="bodySmall"
                    numberOfLines={1}
                    style={{ color: theme.colors.onSurfaceVariant }}
                  >
                    {item.subtitle}
                  </Text>
                )}

                {isJourney && (
                  <View style={{ flexDirection: "row", gap: 6, marginTop: 4 }}>
                    {item.transport?.mode && (
                      <Chip compact icon={() => <TrainFront size={12} />}>
                        {item.transport.mode}
                      </Chip>
                    )}
                    {item.transport?.totalDurationMin && (
                      <Chip compact icon={() => <Clock size={12} />}>
                        {item.transport.totalDurationMin}m
                      </Chip>
                    )}
                    {item.trackCount !== undefined && (
                      <Chip compact icon={() => <Music size={12} />}>
                        {item.trackCount}
                      </Chip>
                    )}
                  </View>
                )}
              </View>

              {isLiked ? (
                <Heart size={18} color={theme.colors.primary} />
              ) : (
                <ChevronRight size={18} color={theme.colors.onSurfaceVariant} />
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
                gap: design.spacing.lg,
              }}
            >
              {(selected.cover || selected.image) && (
                <Image
                  source={selected.cover ?? selected.image}
                  style={{
                    width: "100%",
                    height: 200,
                    borderRadius: design.radii.xl,
                  }}
                />
              )}

              <View style={{ gap: 4 }}>
                <Text variant="titleLarge">
                  {selected.title ?? selected.name}
                </Text>

                {type === "LIKED" && selected.artist && (
                  <Text
                    variant="bodyMedium"
                    style={{ color: theme.colors.onSurfaceVariant }}
                  >
                    {selected.artist}
                  </Text>
                )}

                {type !== "LIKED" && selected.subtitle && (
                  <Text
                    variant="bodyMedium"
                    style={{ color: theme.colors.onSurfaceVariant }}
                  >
                    {selected.subtitle}
                  </Text>
                )}
              </View>

              {type === "JOURNEYS" && selected.transport && (
                <View
                  style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}
                >
                  <Chip icon={() => <TrainFront size={14} />}>
                    {selected.transport.mode}
                    {selected.transport.lineName
                      ? ` · ${selected.transport.lineName}`
                      : ""}
                  </Chip>
                  {selected.transport.totalDurationMin && (
                    <Chip icon={() => <Clock size={14} />}>
                      {selected.transport.totalDurationMin} min
                    </Chip>
                  )}
                  {selected.transport.totalStops && (
                    <Chip icon={() => <MapPin size={14} />}>
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
                      <View
                        key={stop.station}
                        style={{
                          padding: design.spacing.md,
                          borderRadius: design.radii.lg,
                          backgroundColor: theme.colors.surfaceVariant,
                          gap: 4,
                        }}
                      >
                        <Text variant="titleSmall">
                          {stop.station}
                          {stop.etaFromStartMin !== undefined
                            ? ` · ${stop.etaFromStartMin}m`
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
