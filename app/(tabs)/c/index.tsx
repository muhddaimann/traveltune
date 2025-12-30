import React, { useState, useMemo } from "react";
import { View, ScrollView } from "react-native";
import { Switch, useTheme, FAB } from "react-native-paper";
import { useRouter } from "expo-router";
import { useDesign } from "../../../contexts/designContext";
import { useTabsUi } from "../../../contexts/tabContext";
import PromptUI from "../../../components/shared/promptUI";
import useJourney from "../../../hooks/useJourney";
import JournalList from "../../../components/shared/journalList";
import SectionHeader from "../../../components/shared/sectionHeader";
import { MapPin, Plus } from "lucide-react-native";

export default function Journey() {
  const theme = useTheme();
  const { design } = useDesign();
  const { updateByOffset } = useTabsUi();
  const router = useRouter();
  const { journeys } = useJourney();
  const [enabled, setEnabled] = useState(false);

  const HORIZONTAL_OFFSET = design.spacing.md;

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
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: HORIZONTAL_OFFSET,
          paddingBottom: design.spacing["3xl"] * 2,
          gap: design.spacing.md,
        }}
        onScroll={(e) => updateByOffset(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
      >
        <SectionHeader
          title="Journeys"
          subtitle="Capture memories tied to music and place"
          icon={MapPin}
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
            title="No journeys yet"
            description="Your trips, routes, and soundtracks will appear here once you start a journey."
            actionLabel="Start a journey"
            onAction={() => router.push("(tabs)/c/addJourney")}
          />
        ) : (
          <JournalList data={journalData} />
        )}
      </ScrollView>

      <FAB
        icon={({ size }) => <Plus size={size} color={theme.colors.onPrimary} />}
        onPress={() => router.push("(tabs)/c/addJourney")}
        style={{
          position: "absolute",
          right: design.spacing.lg,
          bottom: design.spacing["2xl"] * 3.5,
          backgroundColor: theme.colors.primary,
          borderRadius: design.radii.pill,
          elevation: design.elevation.level4,
        }}
      />
    </View>
  );
}
