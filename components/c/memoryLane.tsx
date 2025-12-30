import React, { useState, useEffect, useRef } from "react";
import { View, Image, Animated } from "react-native";
import { Modal, Portal, Text, useTheme } from "react-native-paper";
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
    let interval: NodeJS.Timeout;
    if (visible && memoryLane) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % memoryLane.moments.length;
          player.replace(memoryLane.moments[nextIndex].sound);
          player.play();
          return nextIndex;
        });
      }, MOMENT_DURATION);
    }
    return () => {
      clearInterval(interval);
    };
  }, [visible, memoryLane]);

  if (!memoryLane) {
    return null;
  }

  const currentMoment = memoryLane.moments[currentIndex];

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          margin: design.spacing.lg,
          borderRadius: design.radii.xl,
          backgroundColor: theme.colors.surface,
          padding: design.spacing.lg,
        }}
      >
        <View style={{ gap: design.spacing.md, alignItems: "center" }}>
          <Text variant="titleLarge">{memoryLane.music.title}</Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            {memoryLane.music.artist}
          </Text>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Image
              source={currentMoment.image}
              style={{
                width: 300,
                height: 300,
                borderRadius: design.radii.lg,
              }}
            />
          </Animated.View>
          <Text variant="titleMedium" style={{ marginTop: design.spacing.md }}>
            {currentMoment.idea}
          </Text>
        </View>
      </Modal>
    </Portal>
  );
}
