import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Play, Pause, Heart } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMusic } from "../../contexts/musicContext";
import { useDesign } from "../../contexts/designContext";

export default function MiniPlayer() {
  const theme = useTheme();
  const { design } = useDesign();
  const insets = useSafeAreaInsets();
  const { currentTrack, isPlaying, pause, resume } = useMusic();

  const [isFav, setIsFav] = useState(false);

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
          style={{
            width: 40,
            height: 40,
            borderRadius: design.radii.md,
          }}
        />

        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: design.typography.sizes.sm,
              fontWeight: design.typography.weights.semibold,
            }}
          >
            {currentTrack.song.title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: design.typography.sizes.xs,
              opacity: 0.6,
            }}
          >
            {currentTrack.song.artist}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 6,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Add to favourite */}
          <TouchableOpacity
            onPress={() => setIsFav((v) => !v)}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.colors.surfaceVariant,
            }}
          >
            <Heart
              size={16}
              fill={isFav ? theme.colors.primary : "transparent"}
              color={isFav ? theme.colors.primary : theme.colors.onSurface}
            />
          </TouchableOpacity>

          {/* Play / Pause */}
          <TouchableOpacity
            onPress={isPlaying ? pause : resume}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.colors.primary,
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
    </View>
  );
}
