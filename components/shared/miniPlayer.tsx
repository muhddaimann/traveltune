import React, { useEffect, useRef } from "react";
import { View, Image, TouchableOpacity, Animated } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMusic } from "../../contexts/musicContext";
import { useDesign } from "../../contexts/designContext";

export default function MiniPlayer() {
  const theme = useTheme();
  const { design } = useDesign();
  const insets = useSafeAreaInsets();
  const { currentTrack, isPlaying, pause, resume } = useMusic();

  const progress = useRef(new Animated.Value(0)).current;
  const animRef = useRef<Animated.CompositeAnimation | null>(null);

  if (!currentTrack) return null;

  const TAB_BAR_HEIGHT = 72;

  useEffect(() => {
    if (isPlaying) {
      progress.setValue(0);
      animRef.current = Animated.loop(
        Animated.timing(progress, {
          toValue: 1,
          duration: 3500,
          useNativeDriver: true,
        })
      );
      animRef.current.start();
    } else {
      animRef.current?.stop();
    }

    return () => animRef.current?.stop();
  }, [isPlaying, progress]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-120, 120],
  });

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
          <TouchableOpacity
            onPress={pause}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.colors.surfaceVariant,
            }}
          >
            <SkipBack size={16} color={theme.colors.onSurface} />
          </TouchableOpacity>

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

          <TouchableOpacity
            onPress={resume}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.colors.surfaceVariant,
            }}
          >
            <SkipForward size={16} color={theme.colors.onSurface} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          marginTop: design.spacing.xs,
          height: 3,
          borderRadius: 2,
          backgroundColor: theme.colors.onSurface,
          opacity: 0.15,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            width: "40%",
            height: "100%",
            backgroundColor: theme.colors.primary,
            transform: [{ translateX }],
            opacity: isPlaying ? 1 : 0.4,
          }}
        />
      </View>
    </View>
  );
}
