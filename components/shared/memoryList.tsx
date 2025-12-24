import React, { useEffect, useRef } from "react";
import { View, Image, ScrollView } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";

type MemoryItem = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
};

type MemoryListProps = {
  data?: MemoryItem[];
};

export default function MemoryList({ data }: MemoryListProps) {
  const theme = useTheme();
  const { design } = useDesign();
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!data || data.length <= 1) return;

    let offset = 0;
    const CARD_WIDTH = 180;
    const interval = setInterval(() => {
      offset += CARD_WIDTH;
      scrollRef.current?.scrollTo({ x: offset, animated: true });

      if (offset >= CARD_WIDTH * (data.length - 1)) {
        offset = 0;
        scrollRef.current?.scrollTo({ x: 0, animated: false });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: design.spacing.md,
        paddingRight: design.spacing.md,
      }}
      style={{ marginBottom: design.spacing.xl }}
    >
      {data?.map((item) => (
        <Card
          key={item.id}
          elevation={4}
          style={{
            width: 180,
            borderRadius: design.radii.lg,
            backgroundColor: theme.colors.surface,
          }}
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
                height: 130,
              }}
            />

            <View
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.35)",
              }}
            />

            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                padding: design.spacing.sm,
                gap: 2,
              }}
            >
              <Text
                variant="labelLarge"
                numberOfLines={1}
                style={{ color: theme.colors.inverseOnSurface }}
              >
                {item.title}
              </Text>

              {item.subtitle && (
                <Text
                  variant="labelSmall"
                  numberOfLines={1}
                  style={{
                    color: theme.colors.inverseOnSurface,
                    opacity: 0.85,
                  }}
                >
                  {item.subtitle}
                </Text>
              )}
            </View>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}
