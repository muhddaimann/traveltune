import React, { useState, useMemo } from "react";
import { View } from "react-native";
import { Text, Switch, useTheme } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import JourneyHeader from "../../../components/c/header";
import PromptUI from "../../../components/shared/promptUI";
import useJourney from "../../../hooks/useJourney";
import JournalList from "../../../components/shared/journalList";
import SectionHeader from "../../../components/shared/sectionHeader";
import { MapPin } from "lucide-react-native";

export default function Journey() {
  const theme = useTheme();
  const { design } = useDesign();
  const { journeys } = useJourney();
  const [enabled, setEnabled] = useState(false);
  const journalData = useMemo(
    () =>
      journeys.map((j) => ({
        id: j.id,
        title: j.title,
        subtitle: j.subtitle,
        date: j.date,
        location: j.location,
        nowPlaying: j.nowPlaying,
        image: j.image,
      })),
    [journeys]
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
        title="Journeys"
        subtitle="Your travel history and soundtracks"
        icon={MapPin}
        rightSlot={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Switch
              value={enabled}
              onValueChange={setEnabled}
              color={theme.colors.primary}
            />
          </View>
        }
      />

      {!enabled ? (
        <PromptUI
          title="No journeys yet"
          description="Your trips, routes, and soundtracks will appear here once you start a journey."
          actionLabel="Start a journey"
          onAction={() => setEnabled(true)}
        />
      ) : (
        <JournalList data={journalData} />
      )}
    </View>
  );
}
