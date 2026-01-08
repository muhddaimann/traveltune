import React, { useState, useEffect, useRef } from "react";
import { View, Image, Animated } from "react-native";
import { Modal, Portal, Text, useTheme } from "react-native-paper";
import { Music2 } from "lucide-react-native";
import { useAudioPlayer } from "expo-audio";
import { MemoryLane } from "../../hooks/useJourney";
import { useDesign } from "../../contexts/designContext";

type MemoryLaneProps = {
  memoryLane: MemoryLane | null;
  visible: boolean;
  onDismiss: () => void;
};

const FADE_DURATION = 500;
const MOMENT_DURATION = 3000;

export default function MemoryLaneComponent({
  memoryLane,
  visible,
  onDismiss,
}: MemoryLaneProps) {
  const theme = useTheme();
  const { design } = useDesign();
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const player = useAudioPlayer(memoryLane?.moments[0]?.sound);

  useEffect(() => {
    if (visible && memoryLane) {
      setCurrentIndex(0);
      player.play();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: FADE_DURATION,
        useNativeDriver: true,
      }).start();
    } else {
      player.pause();
      player.seekTo(0);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: FADE_DURATION,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, memoryLane]);

  useEffect(() => {
    if (!visible || !memoryLane) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % memoryLane.moments.length;
        player.replace(memoryLane.moments[next].sound);
        player.play();
        return next;
      });
    }, MOMENT_DURATION);

    return () => clearInterval(interval);
  }, [visible, memoryLane]);

  if (!memoryLane) return null;

  const currentMoment = memoryLane.moments[currentIndex];

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          marginHorizontal: design.spacing.lg,
          marginVertical: design.spacing.xl,
          borderRadius: design.radii["2xl"],
          backgroundColor: theme.colors.surface,
          padding: design.spacing.lg,
          elevation: 8,
        }}
      >
        <View
          style={{
            alignItems: "center",
            gap: design.spacing.sm,
          }}
        >
          <View
            style={{
              alignItems: "center",
              gap: 4,
              marginBottom: design.spacing.sm,
            }}
          >
            <Music2 size={20} color={theme.colors.primary} />
            <Text variant="titleMedium">{memoryLane.music.title}</Text>
            <Text
              variant="bodySmall"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {memoryLane.music.artist}
            </Text>
          </View>

          <Animated.View
            style={{
              opacity: fadeAnim,
              shadowColor: "#000",
              shadowOpacity: 0.18,
              shadowRadius: 20,
              shadowOffset: { width: 0, height: 10 },
            }}
          >
            <Image
              source={currentMoment.image}
              style={{
                width: 280,
                height: 280,
                borderRadius: design.radii.xl,
              }}
            />
          </Animated.View>

          <View
            style={{
              marginTop: design.spacing.md,
              paddingHorizontal: design.spacing.md,
              paddingVertical: design.spacing.sm,
              borderRadius: design.radii.lg,
              backgroundColor: theme.colors.surfaceVariant,
            }}
          >
            <Text
              variant="bodyMedium"
              style={{ textAlign: "center", fontWeight: "500" }}
            >
              {currentMoment.idea}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 6,
              marginTop: design.spacing.md,
            }}
          >
            {memoryLane.moments.map((_, i) => (
              <View
                key={i}
                style={{
                  width: i === currentIndex ? 12 : 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor:
                    i === currentIndex
                      ? theme.colors.primary
                      : theme.colors.outlineVariant,
                }}
              />
            ))}
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
