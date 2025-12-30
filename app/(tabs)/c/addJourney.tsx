import React, { useEffect, useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { Text, TextInput, Button, useTheme } from "react-native-paper";
import { MapPin, Music2, Camera, Plus } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDesign } from "../../../contexts/designContext";
import AppHeader from "../../../components/shared/header";
import { useTabsUi } from "../../../contexts/tabContext";
import { useUpload } from "../../../hooks/useUpload";
import { useUploadContext } from "../../../contexts/uploadContext";

type Stop = {
  id: string;
  location: string;
  song: string;
  note: string;
};

export default function AddJourney() {
  const theme = useTheme();
  const { design } = useDesign();
  const insets = useSafeAreaInsets();
  const { hide, reveal } = useTabsUi();
  const { file, openPicker } = useUpload();
  const { upload, isUploading } = useUploadContext();

  const [stops, setStops] = useState<Stop[]>([
    {
      id: "stop-1",
      location: "KL Sentral",
      song: "Di Bawah Bayu · Yuna",
      note: "",
    },
  ]);

  useEffect(() => {
    hide();
    return () => reveal();
  }, [hide, reveal]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: design.spacing.md,
          paddingBottom: design.spacing["3xl"] + insets.bottom,
          gap: design.spacing.lg,
        }}
      >
        <AppHeader title="New Journey" subtitle="Add stops along the way" />

        <View style={{ gap: design.spacing.lg }}>
          {stops.map((stop, index) => (
            <View
              key={stop.id}
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
                {index < stops.length - 1 && (
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
                  gap: design.spacing.md,
                  padding: design.spacing.md,
                  borderRadius: design.radii.xl,
                  backgroundColor: theme.colors.surface,
                }}
              >
                <Text
                  variant="labelLarge"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  Stop {index + 1}
                </Text>

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
                  <Text style={{ marginLeft: 6 }}>{stop.location}</Text>
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
                  <Text style={{ marginLeft: 6 }} numberOfLines={1}>
                    {stop.song}
                  </Text>
                </View>

                <Pressable
                  onPress={openPicker}
                  style={{
                    height: 140,
                    borderRadius: design.radii.lg,
                    borderWidth: 1.5,
                    borderStyle: "dashed",
                    borderColor: theme.colors.outlineVariant,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: theme.colors.surfaceVariant,
                    gap: 6,
                  }}
                >
                  <Camera size={22} color={theme.colors.onSurfaceVariant} />
                  <Text style={{ color: theme.colors.onSurfaceVariant }}>
                    {file ? file.name : "Add photo or document"}
                  </Text>
                </Pressable>

                <TextInput
                  mode="outlined"
                  placeholder="Add a short note"
                  value={stop.note}
                  onChangeText={(text) =>
                    setStops((prev) =>
                      prev.map((s) =>
                        s.id === stop.id ? { ...s, note: text } : s
                      )
                    )
                  }
                  multiline
                />
              </View>
            </View>
          ))}
        </View>

        <Button
          mode="outlined"
          icon={({ size }) => <Plus size={size} />}
          onPress={() =>
            setStops((prev) => [
              ...prev,
              {
                id: `stop-${prev.length + 1}`,
                location: "New stop",
                song: "—",
                note: "",
              },
            ])
          }
        >
          Add stop
        </Button>
      </ScrollView>

      <View
        style={{
          padding: design.spacing.md,
          borderTopWidth: 1,
          borderTopColor: theme.colors.outlineVariant,
          backgroundColor: theme.colors.background,
        }}
      >
        <Button
          mode="contained"
          loading={isUploading}
          disabled={!file}
          onPress={() => upload({ stops, file })}
        >
          Save journey
        </Button>
      </View>
    </View>
  );
}
