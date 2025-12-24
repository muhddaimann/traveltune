import React from "react";
import { View, Image, Dimensions } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";

type TwoCardItem = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
};

type TwoCardProps = {
  data?: TwoCardItem[];
};

export default function TwoCard({ data }: TwoCardProps) {
  const theme = useTheme();
  const { design } = useDesign();
  const screenWidth = Dimensions.get("window").width;
  const cardWidth =
    (screenWidth - design.spacing.md * 2 - design.spacing.lg) / 2;

  return (
    <View
      style={{
        flexDirection: "row",
        gap: design.spacing.md,
        paddingBottom: design.spacing.md,
      }}
    >
      {data?.slice(0, 2).map((item) => (
        <Card
          key={item.id}
          elevation={4}
          style={{
            width: cardWidth,
            borderRadius: design.radii.xl,
            backgroundColor: theme.colors.surface,
          }}
        >
          <View
            style={{
              borderRadius: design.radii.xl,
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: "100%",
                height: 180,
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
                padding: design.spacing.md,
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
                  variant="bodySmall"
                  numberOfLines={2}
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
    </View>
  );
}
