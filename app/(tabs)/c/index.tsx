import React from "react";
import { ScrollView, View } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { MapPin, Plus } from "lucide-react-native";
import { useAppTheme } from "../../../contexts/themeContext";
import { useDesign } from "../../../contexts/designContext";
import useJourney from "../../../hooks/useJourney";

export default function Journeys() {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  const {
    enabled,
    enableJourney,
    journeys,
    activeJourney,
    hasJourney,
    startJourney,
    loadDummyJourney,
  } = useJourney();

  if (!enabled) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          alignItems: "center",
          justifyContent: "center",
          padding: design.spacing.lg,
        }}
      >
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            backgroundColor: theme.colors.primaryContainer,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: design.spacing.lg,
          }}
        >
          <MapPin size={28} color={theme.colors.onPrimaryContainer} />
        </View>

        <Text
          variant="headlineSmall"
          style={{
            color: theme.colors.onBackground,
            textAlign: "center",
            marginBottom: design.spacing.sm,
          }}
        >
          Plan Your Next Journey
        </Text>

        <Text
          variant="bodyMedium"
          style={{
            color: theme.colors.onSurfaceVariant,
            textAlign: "center",
            marginBottom: design.spacing.lg,
          }}
        >
          Start a trip and let music shape every moment along the way.
        </Text>

        <Button
          mode="contained"
          icon={() => <Plus size={18} color={theme.colors.onPrimary} />}
          onPress={() => {
            enableJourney();
            loadDummyJourney();
          }}
        >
          Create Journey
        </Button>
      </View>
    );
  }

  if (!hasJourney) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          alignItems: "center",
          justifyContent: "center",
          padding: design.spacing.lg,
        }}
      >
        <Button
          mode="contained"
          icon={() => <Plus size={18} color={theme.colors.onPrimary} />}
          onPress={() =>
            startJourney({
              title: "New Journey",
              destination: "Unknown Destination",
            })
          }
        >
          Start Journey
        </Button>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        padding: design.spacing.md,
        paddingBottom: design.spacing["2xl"] * 3,
      }}
    >
      <Text
        variant="headlineSmall"
        style={{
          color: theme.colors.onBackground,
          marginBottom: design.spacing.md,
        }}
      >
        Your Journeys
      </Text>

      {journeys.map((journey) => (
        <Card
          key={journey.id}
          style={{
            borderRadius: design.radii.lg,
            backgroundColor: theme.colors.surface,
            marginBottom: design.spacing.md,
          }}
        >
          <Card.Title
            title={journey.title}
            subtitle={`${journey.destination} · ${journey.trackCount} tracks`}
            left={() => (
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: theme.colors.primaryContainer,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MapPin size={20} color={theme.colors.onPrimaryContainer} />
              </View>
            )}
          />
        </Card>
      ))}

      {activeJourney && (
        <Text
          variant="labelMedium"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          Active Journey: {activeJourney.title}
        </Text>
      )}
    </ScrollView>
  );
}
