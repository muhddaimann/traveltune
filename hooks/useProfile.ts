import { useMemo, useState } from "react";
import { ImageSourcePropType } from "react-native";

export type UserStats = {
  journeys: number;
  playlists: number;
  artists: number;
};

export type UserPreference = {
  autoPlay: boolean;
  downloadOnWifi: boolean;
  explicitFilter: boolean;
};

export type UserProfileData = {
  id: string;
  name: string;
  username: string;
  avatar: ImageSourcePropType | null;
  bio?: string;
  location?: string;
  stats: UserStats;
  preferences: UserPreference;
};

const PLACEHOLDER_PROFILE: UserProfileData = {
  id: "placeholder",
  name: "Guest",
  username: "@guest",
  avatar: null,
  bio: "Sign in to start capturing journeys",
  location: undefined,
  stats: {
    journeys: 0,
    playlists: 0,
    artists: 0,
  },
  preferences: {
    autoPlay: false,
    downloadOnWifi: true,
    explicitFilter: true,
  },
};

export default function useProfile() {
  const mockProfile: UserProfileData = useMemo(
    () => ({
      id: "user-001",
      name: "Syafiz",
      username: "@syafiz",
      avatar: require("../assets/images/capez.jpeg"),
      bio: "Capturing journeys through music & places",
      location: "Kuala Lumpur, MY",
      stats: {
        journeys: 4,
        playlists: 12,
        artists: 9,
      },
      preferences: {
        autoPlay: true,
        downloadOnWifi: true,
        explicitFilter: false,
      },
    }),
    []
  );

  const [useMock, setUseMock] = useState(true);
  const profile = useMock ? mockProfile : PLACEHOLDER_PROFILE;

  const [preferences, setPreferences] = useState<UserPreference>(
    profile.preferences
  );

  function togglePreference(key: keyof UserPreference) {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function toggleMock() {
    setUseMock((prev) => !prev);
    setPreferences((!useMock ? mockProfile : PLACEHOLDER_PROFILE).preferences);
  }

  return {
    profile,
    preferences,
    togglePreference,
    useMock,
    toggleMock,
  };
}
