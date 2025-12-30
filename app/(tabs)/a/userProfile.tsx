import React, { useEffect } from "react";
import { View, ScrollView, Image } from "react-native";
import { Text, Switch, Button, Divider, useTheme } from "react-native-paper";
import { MapPin, Music, User } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDesign } from "../../../contexts/designContext";
import { useTabsUi } from "../../../contexts/tabContext";
import AppHeader from "../../../components/shared/header";
import useProfile from "../../../hooks/useProfile";
import useAuth from "../../../hooks/useAuth";

export default function UserProfile() {
  const theme = useTheme();
  const { design } = useDesign();
  const insets = useSafeAreaInsets();
  const { hide, reveal } = useTabsUi();
  const { logout } = useAuth();
  const { profile, preferences, togglePreference, useMock, toggleMock } =
    useProfile();

  useEffect(() => {
    hide();
    return () => reveal();
  }, [hide, reveal]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{
          padding: design.spacing.md,
          paddingBottom: design.spacing.xl + insets.bottom,
          gap: design.spacing.md,
        }}
      >
        <AppHeader
          title="Profile"
          rightSlot={<Switch value={useMock} onValueChange={toggleMock} />}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: design.spacing.md,
            padding: design.spacing.md,
            borderRadius: design.radii.xl,
            backgroundColor: theme.colors.surface,
          }}
        >
          {profile.avatar ? (
            <Image
              source={profile.avatar}
              style={{ width: 56, height: 56, borderRadius: 28 }}
            />
          ) : (
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: theme.colors.surfaceVariant,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <User size={20} color={theme.colors.onSurfaceVariant} />
            </View>
          )}

          <View style={{ flex: 1, gap: 2 }}>
            <Text variant="titleSmall">{profile.name}</Text>
            <Text
              variant="bodySmall"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {profile.username}
            </Text>

            {profile.location && (
              <View style={{ flexDirection: "row", gap: 4 }}>
                <MapPin size={12} color={theme.colors.primary} />
                <Text variant="bodySmall">{profile.location}</Text>
              </View>
            )}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: design.radii.lg,
            paddingVertical: design.spacing.sm,
          }}
        >
          {[
            ["Journeys", profile.stats.journeys],
            ["Playlists", profile.stats.playlists],
            ["Artists", profile.stats.artists],
          ].map(([label, value]) => (
            <View key={label} style={{ flex: 1, alignItems: "center" }}>
              <Text variant="titleSmall">{value}</Text>
              <Text variant="bodySmall">{label}</Text>
            </View>
          ))}
        </View>

        <View
          style={{
            gap: design.spacing.sm,
            padding: design.spacing.md,
            borderRadius: design.radii.lg,
            backgroundColor: theme.colors.surface,
          }}
        >
          <Text variant="labelLarge">Preferences</Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Music size={14} />
            <Text style={{ flex: 1, marginLeft: 8 }} variant="bodySmall">
              Auto play music
            </Text>
            <Switch
              value={preferences.autoPlay}
              onValueChange={() => togglePreference("autoPlay")}
            />
          </View>

          <Divider />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <User size={14} />
            <Text style={{ flex: 1, marginLeft: 8 }} variant="bodySmall">
              Download on Wi-Fi only
            </Text>
            <Switch
              value={preferences.downloadOnWifi}
              onValueChange={() => togglePreference("downloadOnWifi")}
            />
          </View>

          <Divider />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }} variant="bodySmall">
              Filter explicit content
            </Text>
            <Switch
              value={preferences.explicitFilter}
              onValueChange={() => togglePreference("explicitFilter")}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: design.spacing.sm }}>
          <Button mode="outlined" disabled={!useMock} style={{ flex: 1 }}>
            Edit
          </Button>
          <Button
            mode="contained"
            buttonColor={theme.colors.error}
            onPress={logout}
            style={{ flex: 1 }}
          >
            Logout
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
