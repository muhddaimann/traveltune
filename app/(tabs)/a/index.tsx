import React from "react";
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "react-native-paper";
import { useDesign } from "../../../contexts/designContext";
import { useTabsUi } from "../../../contexts/tabContext";
import Header from "../../../components/a/header";
import SectionHeader from "../../../components/shared/sectionHeader";
import PromptUI from "../../../components/shared/promptUI";
import HorizontalList from "../../../components/shared/horizontalList";
import FullList from "../../../components/shared/fullList";
import useDiscover from "../../../hooks/useDiscover";
import TwoCard from "../../../components/shared/twoCard";

export default function Discover() {
  const theme = useTheme();
  const { design } = useDesign();
  const { updateByOffset } = useTabsUi();
  const { sections } = useDiscover();
  const router = useRouter();
  const cities = sections.find((s) => s.key === "cities");
  const moods = sections.find((s) => s.key === "moods");
  const localArtists = sections.find((s) => s.key === "local-artists");
  const nearby = sections.find((s) => s.key === "nearby");
  const soundscapes = sections.find((s) => s.key === "soundscapes");

  const HORIZONTAL_OFFSET = design.spacing.md;

  return (
    <ScrollView
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        paddingHorizontal: design.spacing.md,
        paddingBottom: design.spacing["2xl"] * 3,
      }}
      onScroll={(e) => updateByOffset(e.nativeEvent.contentOffset.y)}
      scrollEventThrottle={16}
    >
      <Header />

      {soundscapes?.items?.length && (
        <>
          <TwoCard data={soundscapes.items} />
        </>
      )}

      {localArtists?.items?.length && (
        <>
          <SectionHeader
            title={localArtists.title}
            subtitle={`Spotlight: ${localArtists.items[0].title}`}
          />
          <FullList data={localArtists.items} />
        </>
      )}

      {cities && (
        <>
          <SectionHeader
            title={cities.title}
            subtitle={cities.subtitle}
            icon={cities.icon}
            onPress={() => router.push("/(tabs)/a/browseCity")}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: HORIZONTAL_OFFSET,
            }}
            style={{
              marginHorizontal: -HORIZONTAL_OFFSET,
            }}
          >
            <HorizontalList data={cities.items} />
          </ScrollView>
        </>
      )}

      {moods && (
        <>
          <SectionHeader
            title={moods.title}
            subtitle={moods.subtitle}
            icon={moods.icon}
            onPress={() => router.push("/(tabs)/a/travelMood")}
          />
          <HorizontalList data={moods.items} />
        </>
      )}

      {nearby && (
        <>
          <SectionHeader
            title={nearby.title}
            subtitle={nearby.subtitle}
            icon={nearby.icon}
            onPress={() => router.push("/(tabs)/a/nearbySuggest")}
          />
          <PromptUI
            title="Enable location access"
            description="Get music suggestions based on where you are"
            actionLabel="Allow"
            onAction={() => {}}
          />
        </>
      )}
    </ScrollView>
  );
}
