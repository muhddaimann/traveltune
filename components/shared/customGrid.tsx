import React, { useMemo } from "react";
import { View, Image, Pressable } from "react-native";
import { Card, Text } from "react-native-paper";
import { Plus } from "lucide-react-native";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";

type GridItem = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
};

type CustomGridProps = {
  data?: GridItem[];
  onAdd?: () => void;
};

export default function CustomGrid({ data = [], onAdd }: CustomGridProps) {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  const rows = useMemo(() => {
    const items = [...data];
    const result: (GridItem | "add")[] = [...items, "add"];
    const rows: (GridItem | "add")[][] = [];

    for (let i = 0; i < result.length; i += 2) {
      rows.push(result.slice(i, i + 2));
    }

    return rows;
  }, [data]);

  const renderAddCard = (key: string) => (
    <Pressable key={key} onPress={onAdd} style={{ flex: 1 }}>
      <View
        style={{
          aspectRatio: 1,
          borderRadius: design.radii.lg,
          borderWidth: 1,
          borderStyle: "dashed",
          borderColor: theme.colors.outlineVariant,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.surfaceVariant,
        }}
      >
        <Plus size={28} color={theme.colors.onSurfaceVariant} />
        <Text
          variant="labelMedium"
          style={{
            marginTop: design.spacing.xs,
            color: theme.colors.onSurfaceVariant,
          }}
        >
          Add new
        </Text>
      </View>
    </Pressable>
  );

  const renderItem = (item: GridItem) => (
    <Card
      key={item.id}
      style={{
        flex: 1,
        borderRadius: design.radii.lg,
        backgroundColor: theme.colors.surface,
      }}
      elevation={3}
    >
      <View
        style={{
          borderRadius: design.radii.lg,
          overflow: "hidden",
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{
            width: "100%",
            aspectRatio: 1,
          }}
        />

        <View style={{ padding: design.spacing.sm }}>
          <Text
            variant="titleSmall"
            numberOfLines={1}
            style={{ color: theme.colors.onSurface }}
          >
            {item.title}
          </Text>

          {item.subtitle && (
            <Text
              variant="bodySmall"
              numberOfLines={1}
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {item.subtitle}
            </Text>
          )}
        </View>
      </View>
    </Card>
  );

  return (
    <View style={{ gap: design.spacing.md }}>
      {rows.map((row, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            gap: design.spacing.md,
          }}
        >
          {row.map((item, idx) =>
            item === "add"
              ? renderAddCard(`add-${index}-${idx}`)
              : renderItem(item)
          )}

          {row.length === 1 && <View style={{ flex: 1 }} />}
        </View>
      ))}
    </View>
  );
}
