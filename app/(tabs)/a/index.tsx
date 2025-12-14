import React from "react";
import { ScrollView } from "react-native";
import { Text, Card, Avatar } from "react-native-paper";
import { useAppTheme } from "../../../contexts/themeContext";
import { useDesign } from "../../../contexts/designContext";
import { useTabsUi } from "../../../contexts/tabContext";

export default function Discover() {
  const { theme } = useAppTheme();
  const { design } = useDesign();
  const { updateByOffset } = useTabsUi();

  return (
    <ScrollView
      overScrollMode="never"
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        padding: design.spacing.md,
        paddingBottom: design.spacing["2xl"] * 8,
      }}
      onScroll={(e) => {
        updateByOffset(e.nativeEvent.contentOffset.y);
      }}
      scrollEventThrottle={16}
    >
      <Text
        variant="headlineSmall"
        style={{
          color: theme.colors.onBackground,
          marginBottom: design.spacing.md,
        }}
      >
        Discover Music
      </Text>

      <Card style={{ marginBottom: design.spacing.md }}>
        <Card.Title
          title="Explore Destinations"
          subtitle="Curated culture playlists"
          left={(props) => <Avatar.Icon {...props} icon="map" />}
        />
      </Card>

      <Card>
        <Card.Title
          title="Travel Moods"
          subtitle="Airport chill, road trip vibes, sunset tones"
          left={(props) => <Avatar.Icon {...props} icon="music" />}
        />
      </Card>
    </ScrollView>
  );
}
