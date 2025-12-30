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
          paddingBottom: design.spacing["3xl"] + insets.bottom,
          gap: design.spacing.lg,
        }}
      >
        <AppHeader
          title="Profile"
          subtitle="Your music & journey identity"
          rightSlot={<Switch value={useMock} onValueChange={toggleMock} />}
        />

        <View
          style={{
            alignItems: "center",
            gap: design.spacing.sm,
            padding: design.spacing.lg,
            borderRadius: design.radii["2xl"],
            backgroundColor: theme.colors.surface,
          }}
        >
          {profile.avatar ? (
            <Image
              source={profile.avatar}
              style={{ width: 96, height: 96, borderRadius: 48 }}
            />
          ) : (
            <View
              style={{
                width: 96,
                height: 96,
                borderRadius: 48,
                backgroundColor: theme.colors.surfaceVariant,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <User size={32} color={theme.colors.onSurfaceVariant} />
            </View>
          )}

          <Text variant="titleMedium">{profile.name}</Text>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            {profile.username}
          </Text>

          {profile.location && (
            <View style={{ flexDirection: "row", gap: 6 }}>
              <MapPin size={14} color={theme.colors.primary} />
              <Text variant="bodySmall">{profile.location}</Text>
            </View>
          )}

          {profile.bio && (
            <Text
              variant="bodySmall"
              style={{
                textAlign: "center",
                color: theme.colors.onSurfaceVariant,
              }}
            >
              {profile.bio}
            </Text>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: theme.colors.surfaceVariant,
            padding: design.spacing.md,
            borderRadius: design.radii.xl,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text variant="titleSmall">{profile.stats.journeys}</Text>
            <Text variant="bodySmall">Journeys</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text variant="titleSmall">{profile.stats.playlists}</Text>
            <Text variant="bodySmall">Playlists</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text variant="titleSmall">{profile.stats.artists}</Text>
            <Text variant="bodySmall">Artists</Text>
          </View>
        </View>

        <View
          style={{
            gap: design.spacing.md,
            padding: design.spacing.md,
            borderRadius: design.radii.xl,
            backgroundColor: theme.colors.surface,
          }}
        >
          <Text variant="labelLarge">Preferences</Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Music size={16} />
            <Text style={{ flex: 1, marginLeft: 8 }}>Auto play music</Text>
            <Switch
              value={preferences.autoPlay}
              onValueChange={() => togglePreference("autoPlay")}
            />
          </View>

          <Divider />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <User size={16} />
            <Text style={{ flex: 1, marginLeft: 8 }}>
              Download on Wi-Fi only
            </Text>
            <Switch
              value={preferences.downloadOnWifi}
              onValueChange={() => togglePreference("downloadOnWifi")}
            />
          </View>

          <Divider />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }}>Filter explicit content</Text>
            <Switch
              value={preferences.explicitFilter}
              onValueChange={() => togglePreference("explicitFilter")}
            />
          </View>
        </View>

        <Button mode="outlined" disabled={!useMock}>
          Edit profile
        </Button>

        <Button
          mode="contained"
          buttonColor={theme.colors.error}
          onPress={logout}
        >
          Log out
        </Button>
      </ScrollView>
    </View>
  );
}
