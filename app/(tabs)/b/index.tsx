import React from "react";
import { ScrollView, View, Image, Pressable, Switch } from "react-native";
import { Text } from "react-native-paper";
import {
  Play as PlayIcon,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react-native";
import { useAppTheme } from "../../../contexts/themeContext";
import { useDesign } from "../../../contexts/designContext";
import usePlay from "../../../hooks/usePlay";
import CustomGrid from "../../../components/shared/customGrid";

export default function Play() {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  const {
    useMock,
    toggleMock,
    current,
    isPlaying,
    toggle,
    next,
    previous,
    playlist,
  } = usePlay();

  const hasPlayback = useMock && !!current;

  const playlistGridData = hasPlayback
    ? playlist.map((t) => ({
        id: t.id,
        title: t.title,
        subtitle: t.artist,
        image: t.artwork,
      }))
    : [];

  return (
    <ScrollView
      bounces={false}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: design.spacing.lg,
        paddingBottom: design.spacing["2xl"] * 6,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: design.spacing.lg,
          gap: design.spacing.sm,
        }}
      >
        <Text
          variant="labelMedium"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          Mock
        </Text>
        <Switch
          value={useMock}
          onValueChange={toggleMock}
          trackColor={{
            false: theme.colors.surfaceVariant,
            true: theme.colors.primary,
          }}
          thumbColor={theme.colors.onPrimary}
        />
      </View>

      <View
        style={{
          alignItems: "center",
          marginBottom: design.spacing["2xl"],
        }}
      >
        <View
          style={{
            width: 260,
            height: 260,
            borderRadius: design.radii.xl,
            marginBottom: design.spacing.xl,
            backgroundColor: theme.colors.surfaceVariant,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: theme.colors.shadow,
            shadowOpacity: 0.15,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 12 },
            elevation: 8,
            overflow: "hidden",
          }}
        >
          {hasPlayback ? (
            <Image
              source={{ uri: current.artwork }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <PlayIcon size={48} color={theme.colors.onSurfaceVariant} />
          )}
        </View>

        <Text
          variant="headlineSmall"
          style={{
            color: theme.colors.onBackground,
            textAlign: "center",
          }}
        >
          {hasPlayback ? current.title : "No Playback"}
        </Text>

        <Text
          variant="bodyMedium"
          style={{
            marginTop: design.spacing.xs,
            marginBottom: design.spacing.xl,
            color: theme.colors.onSurfaceVariant,
            textAlign: "center",
          }}
        >
          {hasPlayback
            ? current.artist
            : "Turn on mock mode to preview the player"}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: design.spacing.xl,
            opacity: hasPlayback ? 1 : 0.4,
          }}
        >
          <Pressable disabled={!hasPlayback} onPress={previous}>
            <SkipBack size={28} color={theme.colors.onSurface} />
          </Pressable>

          <Pressable
            disabled={!hasPlayback}
            onPress={toggle}
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.colors.primary,
              shadowColor: theme.colors.primary,
              shadowOpacity: 0.4,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 8 },
              elevation: 10,
            }}
          >
            {isPlaying && hasPlayback ? (
              <Pause size={32} color={theme.colors.onPrimary} />
            ) : (
              <PlayIcon size={32} color={theme.colors.onPrimary} />
            )}
          </Pressable>

          <Pressable disabled={!hasPlayback} onPress={next}>
            <SkipForward size={28} color={theme.colors.onSurface} />
          </Pressable>
        </View>
      </View>

      <View>
        <Text
          variant="labelMedium"
          style={{
            color: theme.colors.onSurfaceVariant,
            marginBottom: design.spacing.md,
          }}
        >
          Playlist
        </Text>

        <CustomGrid data={playlistGridData} onAdd={() => {}} />
      </View>
    </ScrollView>
  );
}
