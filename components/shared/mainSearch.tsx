import React from "react";
import { View, TextInput, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { MapPin, Search, Route } from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";

type MainSearchProps = {
  placeholder?: string;
};

export default function MainSearch({
  placeholder = "Search destinations, moods, memories",
}: MainSearchProps) {
  const theme = useTheme();
  const { design } = useDesign();

  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: design.spacing.md,
        paddingHorizontal: design.spacing.lg,
        paddingVertical: design.spacing.md,
        borderRadius: design.radii.xl,
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.outlineVariant,
      }}
    >
      <MapPin size={18} color={theme.colors.primary} />

      <View
        style={{
          flex: 1,
          borderLeftWidth: 1,
          borderLeftColor: theme.colors.outlineVariant,
          paddingLeft: design.spacing.md,
        }}
      >
        <TextInput
          editable={false}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.onSurfaceVariant}
          style={{
            fontSize: 16,
            color: theme.colors.onSurface,
            paddingVertical: 2,
          }}
        />
      </View>

      <Route size={18} color={theme.colors.secondary} />

      <Search size={18} color={theme.colors.onSurfaceVariant} />
    </Pressable>
  );
}
