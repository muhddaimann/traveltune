import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Play, Pause, Heart } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAudioPlayer } from "expo-audio";
import { useMusic } from "../../contexts/musicContext";
import { useDesign } from "../../contexts/designContext";

export default function MiniPlayer() {
  const theme = useTheme();
  const { design } = useDesign();
  const insets = useSafeAreaInsets();
  const { currentTrack, isPlaying, pause, resume } = useMusic();
  const [isFav, setIsFav] = useState(false);

  // ✅ Hook is called ONCE, at top level
  const player = useAudioPlayer(currentTrack?.song.sound);

  // 🔁 Change track when station changes
  useEffect(() => {
    if (!currentTrack) return;
    player.replace(currentTrack.song.sound);
    player.play();
  }, [currentTrack]);

  // ⏯ Sync play / pause
  useEffect(() => {
    if (!currentTrack) return;
    isPlaying ? player.play() : player.pause();
  }, [isPlaying]);

  if (!currentTrack) return null;

  const TAB_BAR_HEIGHT = 72;

  return (
    <View
      style={{
        position: "absolute",
        left: design.spacing.md,
        right: design.spacing.md,
        bottom: insets.bottom + TAB_BAR_HEIGHT + design.spacing.lg,
        backgroundColor: theme.colors.surface,
        borderRadius: design.radii["2xl"],
        padding: design.spacing.sm,
        elevation: design.elevation.level4,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: design.spacing.md,
        }}
      >
        <Image
          source={currentTrack.albumCover}
          style={{ width: 40, height: 40, borderRadius: design.radii.md }}
        />

        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ fontWeight: "600" }}>
            {currentTrack.song.title}
          </Text>
          <Text numberOfLines={1} style={{ opacity: 0.6 }}>
            {currentTrack.song.artist}
          </Text>
        </View>

        <TouchableOpacity onPress={() => setIsFav((v) => !v)}>
          <Heart
            size={18}
            fill={isFav ? theme.colors.primary : "transparent"}
            color={theme.colors.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={isPlaying ? pause : resume}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: theme.colors.primary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isPlaying ? (
            <Pause size={18} color={theme.colors.onPrimary} />
          ) : (
            <Play size={18} color={theme.colors.onPrimary} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
