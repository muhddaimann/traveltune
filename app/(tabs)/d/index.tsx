import React, { useState, useMemo } from "react";
import { View, Image } from "react-native";
import { Text, Switch, useTheme } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import JourneyHeader from "../../../components/c/header";
import PromptUI from "../../../components/shared/promptUI";
import SectionHeader from "../../../components/shared/sectionHeader";
import useLibrary from "../../../hooks/useLibrary";
import { Music, Mic } from "lucide-react-native";

export default function Library() {
  const theme = useTheme();
  const { design } = useDesign();
  const { playlists, artists } = useLibrary();
  const [enabled, setEnabled] = useState(false);
  const [tab, setTab] = useState<"PLAYLISTS" | "ARTISTS">("PLAYLISTS");

  const data = useMemo(
    () => (tab === "PLAYLISTS" ? playlists : artists),
    [tab, playlists, artists]
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: design.spacing.md,
        gap: design.spacing.md,
      }}
    >
      <JourneyHeader />

      <SectionHeader
        title="Library"
        subtitle={
          tab === "PLAYLISTS" ? "Your saved playlists" : "Artists you follow"
        }
        icon={tab === "PLAYLISTS" ? Music : Mic}
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
          description="Saved playlists and artists will appear here."
          actionLabel="Explore music"
          onAction={() => setEnabled(true)}
        />
      ) : (
        <View style={{ gap: design.spacing.md }}>
          <View
            style={{
              flexDirection: "row",
              gap: design.spacing.sm,
            }}
          >
            <Text
              onPress={() => setTab("PLAYLISTS")}
              variant="labelLarge"
              style={{
                color:
                  tab === "PLAYLISTS"
                    ? theme.colors.primary
                    : theme.colors.onSurfaceVariant,
              }}
            >
              Playlists
            </Text>
            <Text
              onPress={() => setTab("ARTISTS")}
              variant="labelLarge"
              style={{
                color:
                  tab === "ARTISTS"
                    ? theme.colors.primary
                    : theme.colors.onSurfaceVariant,
              }}
            >
              Artists
            </Text>
          </View>

          {data.map((item: any) => (
            <View
              key={item.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: design.spacing.md,
                backgroundColor: theme.colors.surface,
                borderRadius: design.radii.lg,
                padding: design.spacing.sm,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: design.radii.md,
                }}
              />

              <View style={{ flex: 1 }}>
                <Text
                  variant="titleSmall"
                  numberOfLines={1}
                  style={{ color: theme.colors.onSurface }}
                >
                  {item.title ?? item.name}
                </Text>

                <Text
                  variant="bodySmall"
                  numberOfLines={1}
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {item.subtitle ??
                    (item.trackCount
                      ? `${item.trackCount} tracks`
                      : item.genre)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
