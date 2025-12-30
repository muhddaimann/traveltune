import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="travelMood" />
      <Stack.Screen name="browseCity" />
      <Stack.Screen name="nearbySuggest" />
      <Stack.Screen name="userProfile" />
    </Stack>
  );
}
