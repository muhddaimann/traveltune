import React from "react";
import { View, Image } from "react-native";
import { Card, Text, IconButton, useTheme } from "react-native-paper";
import {
  MoreVertical,
  Music,
  PlayCircle,
  MapPin,
  Headphones,
} from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";

export type JournalItem = {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  location?: string;
  nowPlaying?: string;
  image: string;
};

type JournalListProps = {
  data?: JournalItem[];
};

export default function JournalList({ data }: JournalListProps) {
  const theme = useTheme();
  const { design } = useDesign();

  return (
    <View style={{ gap: design.spacing.md }}>
      {data?.map((item) => (
        <Card
          key={item.id}
          elevation={3}
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: design.radii.xl,
          }}
        >
          {/* Title row */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: design.spacing.md,
              paddingTop: design.spacing.md,
            }}
          >
            <Text
              variant="titleMedium"
              numberOfLines={1}
              style={{
                flex: 1,
                paddingRight: 8,
                color: theme.colors.onSurface,
              }}
            >
              {item.title}
            </Text>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              {item.date && (
                <Text
                  variant="labelSmall"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {item.date}
                </Text>
              )}

              <IconButton
                icon={() => (
                  <MoreVertical
                    size={18}
                    color={theme.colors.onSurfaceVariant}
                  />
                )}
                size={18}
                style={{ margin: 0 }}
                onPress={() => {}}
              />
            </View>
          </View>

          {/* Body */}
          <View
            style={{
              flexDirection: "row",
              padding: design.spacing.md,
              paddingTop: design.spacing.sm,
              gap: design.spacing.md,
            }}
          >
            {/* Thumbnail */}
            <Image
              source={{ uri: item.image }}
              style={{
                width: 96,
                height: 96,
                borderBottomLeftRadius: design.radii.xl,
                borderTopRightRadius: design.radii.md,
              }}
            />

            {/* Meta */}
            <View style={{ flex: 1, gap: 8 }}>
              {(item.location || item.nowPlaying) && (
                <View style={{ gap: 4 }}>
                  {item.location && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <MapPin size={14} color={theme.colors.onSurfaceVariant} />
                      <Text
                        variant="labelSmall"
                        numberOfLines={1}
                        style={{ color: theme.colors.onSurfaceVariant }}
                      >
                        {item.location}
                      </Text>
                    </View>
                  )}

                  {item.nowPlaying && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Music size={14} color={theme.colors.onSurfaceVariant} />
                      <Text
                        variant="labelSmall"
                        numberOfLines={1}
                        style={{ color: theme.colors.onSurfaceVariant }}
                      >
                        {item.nowPlaying}
                      </Text>
                    </View>
                  )}
                </View>
              )}

              {item.nowPlaying && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: design.spacing.sm,
                    marginTop: 4,
                  }}
                >
                  <View
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: theme.colors.primaryContainer,
                    }}
                  >
                    <PlayCircle
                      size={16}
                      color={theme.colors.onPrimaryContainer}
                    />
                  </View>

                  <Text
                    variant="labelMedium"
                    numberOfLines={1}
                    style={{ flex: 1, color: theme.colors.onSurface }}
                  >
                    Now Playing
                  </Text>

                  <Headphones size={14} color={theme.colors.onSurfaceVariant} />
                </View>
              )}

              {item.subtitle && (
                <View
                  style={{
                    alignSelf: "flex-start",
                    backgroundColor: theme.colors.surfaceVariant,
                    paddingHorizontal: design.spacing.sm,
                    paddingVertical: design.spacing.xs,
                    borderRadius: design.radii.lg,
                    maxWidth: "100%",
                  }}
                >
                  <Text
                    variant="bodySmall"
                    numberOfLines={3}
                    style={{ color: theme.colors.onSurfaceVariant }}
                  >
                    {item.subtitle}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Card>
      ))}
    </View>
  );
}
