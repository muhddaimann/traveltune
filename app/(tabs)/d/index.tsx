import React, { useState, useMemo } from "react";
import { View, Pressable, ScrollView } from "react-native";
import { Text, Switch, useTheme } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import PromptUI from "../../../components/shared/promptUI";
import SectionHeader from "../../../components/shared/sectionHeader";
import useLibrary from "../../../hooks/useLibrary";
import LibraryList from "../../../components/d/libraryList";
import { Music, Mic, Route, Heart } from "lucide-react-native";

type LibraryTab = "JOURNEYS" | "PLAYLISTS" | "ARTISTS" | "LIKED";

export default function Library() {
  const theme = useTheme();
  const { design } = useDesign();
  const { journeyLibraries, playlists, artists, likedSongs } = useLibrary();
  const [enabled, setEnabled] = useState(false);
  const [tab, setTab] = useState<LibraryTab>("JOURNEYS");

  const data = useMemo(() => {
    switch (tab) {
      case "JOURNEYS":
        return journeyLibraries;
      case "PLAYLISTS":
        return playlists;
      case "ARTISTS":
        return artists;
      case "LIKED":
        return likedSongs;
    }
  }, [tab, journeyLibraries, playlists, artists, likedSongs]);

  const icon =
    tab === "JOURNEYS"
      ? Route
      : tab === "PLAYLISTS"
      ? Music
      : tab === "ARTISTS"
      ? Mic
      : Heart;

  const subtitle =
    tab === "JOURNEYS"
      ? "Music captured along your journeys"
      : tab === "PLAYLISTS"
      ? "Your saved playlists"
      : tab === "ARTISTS"
      ? "Artists you follow"
      : "Songs you’ve liked";

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: design.spacing.sm,
        paddingHorizontal: design.spacing.md,
        paddingBottom: design.spacing["3xl"] * 2,
        gap: design.spacing.md,
      }}
    >
      <SectionHeader
        title="Library"
        subtitle={subtitle}
        icon={icon}
        rightSlot={
          <Switch
            value={enabled}
            onValueChange={setEnabled}
            color={theme.colors.primary}
          />
        }
      />

      {!enabled ? (
        <PromptUI
          title="Your library is empty"
          description="Journeys, playlists, artists, and liked songs will appear here."
          actionLabel="Explore music"
          onAction={() => setEnabled(true)}
        />
      ) : (
        <View style={{ gap: design.spacing.md }}>
          <View style={{ flexDirection: "row", gap: design.spacing.sm }}>
            {(
              ["LIKED", "JOURNEYS", "PLAYLISTS", "ARTISTS"] as LibraryTab[]
            ).map((key) => (
              <Pressable key={key} onPress={() => setTab(key)}>
                <Text
                  variant="labelLarge"
                  style={{
                    color:
                      tab === key
                        ? theme.colors.primary
                        : theme.colors.onSurfaceVariant,
                  }}
                >
                  {key === "LIKED"
                    ? "Liked"
                    : key === "JOURNEYS"
                    ? "Journeys"
                    : key === "PLAYLISTS"
                    ? "Playlists"
                    : "Artists"}
                </Text>
              </Pressable>
            ))}
          </View>

          <LibraryList data={data} type={tab} />
        </View>
      )}
    </ScrollView>
  );
}
