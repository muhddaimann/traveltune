import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, TextInput, Button, useTheme } from "react-native-paper";
import { MapPin, Music2, Plus } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDesign } from "../../../contexts/designContext";
import AppHeader from "../../../components/shared/header";
import { useTabsUi } from "../../../contexts/tabContext";

type JournalEntry = {
  id: string;
  location: string;
  datetime: string;
  song: string;
  note: string;
};

export default function AddJourney() {
  const theme = useTheme();
  const { design } = useDesign();
  const insets = useSafeAreaInsets();
  const { hide, reveal } = useTabsUi();

  useEffect(() => {
    hide();
    return () => reveal();
  }, [hide, reveal]);

  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "entry-1",
      location: "KL Sentral",
      datetime: "12 Aug 2025 · 08:30",
      song: "Midnight City · Local Pop Collective",
      note: "Morning rush but calm vibes.",
    },
    {
      id: "entry-2",
      location: "Pasar Seni",
      datetime: "12 Aug 2025 · 09:10",
      song: "Street Poetry · Indie KL",
      note: "Street art, buskers, coffee smells.",
    },
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{
          padding: design.spacing.md,
          paddingBottom: design.spacing["3xl"] * 2 + insets.bottom,
          gap: design.spacing.lg,
        }}
      >
        <AppHeader title="New Journey" subtitle="Moments along the way" />

        <View style={{ gap: design.spacing.lg }}>
          {entries.map((entry, index) => (
            <View
              key={entry.id}
              style={{ flexDirection: "row", gap: design.spacing.md }}
            >
              <View style={{ alignItems: "center", width: 20 }}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: theme.colors.primary,
                    marginTop: 6,
                  }}
                />
                {index < entries.length - 1 && (
                  <View
                    style={{
                      flex: 1,
                      width: 2,
                      backgroundColor: theme.colors.outlineVariant,
                      marginTop: 6,
                    }}
                  />
                )}
              </View>

              <View
                style={{
                  flex: 1,
                  gap: design.spacing.sm,
                  padding: design.spacing.md,
                  borderRadius: design.radii.xl,
                  backgroundColor: theme.colors.surface,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: theme.colors.surfaceVariant,
                    padding: design.spacing.sm,
                    borderRadius: design.radii.md,
                  }}
                >
                  <MapPin size={14} color={theme.colors.primary} />
                  <Text
                    style={{
                      marginLeft: 6,
                      fontWeight: design.typography.weights.semibold,
                    }}
                  >
                    {entry.location}
                  </Text>
                  <Text
                    style={{
                      marginLeft: "auto",
                      fontSize: design.typography.sizes.xs,
                      color: theme.colors.onSurfaceVariant,
                    }}
                  >
                    {entry.datetime}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: theme.colors.surfaceVariant,
                    padding: design.spacing.sm,
                    borderRadius: design.radii.md,
                  }}
                >
                  <Music2 size={14} color={theme.colors.secondary} />
                  <Text
                    numberOfLines={1}
                    style={{
                      marginLeft: 6,
                      fontSize: design.typography.sizes.sm,
                      color: theme.colors.onSurfaceVariant,
                    }}
                  >
                    {entry.song}
                  </Text>
                </View>

                <TextInput
                  mode="outlined"
                  placeholder="Add a short note"
                  value={entry.note}
                  onChangeText={(text) =>
                    setEntries((prev) =>
                      prev.map((e) =>
                        e.id === entry.id ? { ...e, note: text } : e
                      )
                    )
                  }
                  multiline
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          gap: design.spacing.md,
          paddingHorizontal: design.spacing.md,
          paddingTop: design.spacing.md,
          paddingBottom: design.spacing.md + insets.bottom,
          borderTopWidth: 1,
          borderTopColor: theme.colors.outlineVariant,
          backgroundColor: theme.colors.background,
        }}
      >
        <Button
          mode="outlined"
          style={{ flex: 1 }}
          icon={({ size }) => <Plus size={size} color={theme.colors.primary} />}
          onPress={() =>
            setEntries((prev) => [
              ...prev,
              {
                id: `entry-${prev.length + 1}`,
                location: "New stop",
                datetime: "—",
                song: "—",
                note: "",
              },
            ])
          }
        >
          Add moment
        </Button>

        <Button mode="contained" style={{ flex: 1 }} onPress={() => {}}>
          Save journey
        </Button>
      </View>
    </View>
  );
}
