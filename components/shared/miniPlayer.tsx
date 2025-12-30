import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Play, Pause } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMusic } from "../../contexts/musicContext";
import { useDesign } from "../../contexts/designContext";

export default function MiniPlayer() {
  const theme = useTheme();
  const { design } = useDesign();
  const insets = useSafeAreaInsets();
  const { currentTrack, isPlaying, pause, resume } = useMusic();

  if (!currentTrack) return null;

  const TAB_BAR_HEIGHT = 72;

  return (
    <View
      style={{
        position: "absolute",
        left: design.spacing.lg,
        right: design.spacing.lg,
        bottom: insets.bottom + TAB_BAR_HEIGHT + design.spacing.lg,
        backgroundColor: theme.colors.background,
        borderRadius: design.radii["2xl"],
        padding: design.spacing.sm,
        elevation: design.elevation.level4,
        shadowColor: theme.colors.shadow,
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
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
            width: 44,
            height: 44,
            borderRadius: design.radii.md,
          }}
        />

        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: design.typography.sizes.sm,
              fontWeight: design.typography.weights.semibold,
              color: theme.colors.onBackground,
            }}
          >
            {currentTrack.song.title}
          </Text>

          <Text
            numberOfLines={1}
            style={{
              marginTop: 2,
              fontSize: design.typography.sizes.xs,
              color: theme.colors.onBackground,
              opacity: design.typography.opacities.muted,
            }}
          >
            {currentTrack.song.artist}
          </Text>
        </View>

        <TouchableOpacity
          onPress={isPlaying ? pause : resume}
          activeOpacity={0.85}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.primary,
          }}
        >
          {isPlaying ? (
            <Pause size={20} color={theme.colors.onPrimary} />
          ) : (
            <Play size={20} color={theme.colors.onPrimary} />
          )}
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: design.spacing.xs,
          height: 3,
          borderRadius: 2,
          backgroundColor: theme.colors.onBackground,
          opacity: 0.2,
        }}
      />
    </View>
  );
}
