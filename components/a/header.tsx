import React from "react";
import { View } from "react-native";
import {
  Text,
  Avatar,
  TextInput,
  IconButton,
  useTheme,
} from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import MainSearch from "../shared/mainSearch";

type HeaderProps = {
  name?: string;
};

export default function Header({ name = "Traveler" }: HeaderProps) {
  const theme = useTheme();
  const { design } = useDesign();

  return (
    <View
      style={{
        paddingBottom: design.spacing.lg,
        backgroundColor: theme.colors.background,
        gap: design.spacing.md,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            variant="headlineSmall"
            style={{
              color: theme.colors.primary,
              fontWeight: "600",
              letterSpacing: 0.3,
            }}
          >
            Travel
          </Text>
          <Text
            variant="headlineSmall"
            style={{
              color: theme.colors.secondary,
              fontWeight: "600",
              letterSpacing: 0.3,
            }}
          >
            Tune
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            variant="headlineMedium"
            style={{ color: theme.colors.onBackground }}
          >
            Hello {name}
          </Text>

          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Where are you headed today?
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.colors.surfaceVariant,
            }}
          >
            <IconButton
              icon="bell-outline"
              size={22}
              iconColor={theme.colors.onSurfaceVariant}
              style={{ margin: 0 }}
            />
          </View>

          <Avatar.Icon
            size={40}
            icon="account"
            style={{ backgroundColor: theme.colors.surfaceVariant }}
            color={theme.colors.onSurfaceVariant}
          />
        </View>
      </View>

      <MainSearch />
    </View>
  );
}
