import React from "react";
import { View, Image } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";

type FullItem = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
};

type FullListProps = {
  data?: FullItem[];
};

export default function FullList({ data }: FullListProps) {
  const theme = useTheme();
  const { design } = useDesign();

  return (
    <View
      style={{
        gap: design.spacing["2xl"],
        paddingBottom: design.spacing.lg,
      }}
    >
      {data?.map((item) => (
        <Card
          key={item.id}
          elevation={5}
          style={{
            borderRadius: design.radii["2xl"],
            backgroundColor: theme.colors.surface,
          }}
        >
          <View
            style={{
              borderRadius: design.radii["2xl"],
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: "100%",
                height: 200,
              }}
            />

            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.25)",
              }}
            />

            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                paddingHorizontal: design.spacing.xl,
                paddingBottom: design.spacing.xl,
              }}
            >
              {item.subtitle && (
                <Text
                  variant="labelLarge"
                  numberOfLines={2}
                  style={{
                    color: theme.colors.inverseOnSurface,
                    lineHeight: 28,
                    letterSpacing: 0.2,
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
