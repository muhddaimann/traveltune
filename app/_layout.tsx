import React from "react";
import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Slot />
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
