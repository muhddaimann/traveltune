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
import { Music, MapPin, Heart } from "lucide-react-native";
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
  tracks?: { id: string; title: string; artist: string; image?: any }[];
  artist?: string;
  stops?: {
    station: string;
    vibe: string;
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
    } catch (e) {
      Alert.alert("Action failed", "Unable to remove this item. Try again.");
    } finally {
      setLoading(false);
      setSelected(null);
    }
  };

  return (
    <>
      <View style={{ gap: design.spacing.md }}>
        {data.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => setSelected(item)}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
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
                  width: type === "LIKED" ? 56 : 72,
                  height: type === "LIKED" ? 56 : 72,
                  borderRadius:
                    type === "LIKED" ? design.radii.full : design.radii.lg,
                }}
              />
            )}

            <View style={{ flex: 1, gap: 2 }}>
              <Text variant="titleSmall" numberOfLines={1}>
                {item.title ?? item.name}
              </Text>

              {(item.artist || item.subtitle || item.genre) && (
                <Text
                  variant="bodySmall"
                  numberOfLines={1}
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {item.artist ?? item.subtitle ?? item.genre}
                </Text>
              )}

              {type !== "LIKED" && (
                <View style={{ flexDirection: "row", gap: 6, marginTop: 4 }}>
                  {item.place && (
                    <Chip compact icon={() => <MapPin size={12} />}>
                      {item.place}
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

              <View>
                <Text variant="titleMedium">
                  {selected.title ?? selected.name}
                </Text>
                {(selected.artist || selected.subtitle || selected.genre) && (
                  <Text
                    variant="bodySmall"
                    style={{ color: theme.colors.onSurfaceVariant }}
                  >
                    {selected.artist ?? selected.subtitle ?? selected.genre}
                  </Text>
                )}
              </View>

              <Divider />

              <View style={{ flexDirection: "row", gap: design.spacing.sm }}>
                <Button
                  mode="outlined"
                  style={{ flex: 1 }}
                  onPress={() => setSelected(null)}
                >
                  Cancel
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
