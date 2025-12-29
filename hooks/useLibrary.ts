import { Music, Mic } from "lucide-react-native";
import { ImageSourcePropType } from "react-native";

export type LibraryTab = "JOURNEYS" | "PLAYLISTS" | "ARTISTS";

export type LibraryTrack = {
  id: string;
  title: string;
  artist: string;
  duration?: string;
  station?: string;
};

export type JourneyLibraryItem = {
  id: string;
  journeyId: string;
  title: string;
  subtitle?: string;
  place: string;
  cover: ImageSourcePropType;
  trackCount: number;
  stops: {
    station: string;
    vibe: string;
    tracks: LibraryTrack[];
  }[];
};

export type PlaylistItem = {
  id: string;
  title: string;
  subtitle?: string;
  trackCount: number;
  image: ImageSourcePropType;
  tracks: LibraryTrack[];
};

export type ArtistItem = {
  id: string;
  name: string;
  genre?: string;
  image: ImageSourcePropType;
  popularTracks: LibraryTrack[];
};

export type LibrarySection<T> = {
  key: LibraryTab;
  title: string;
  icon: any;
  items: T[];
};

export default function useLibrary() {
  const journeyLibraries: JourneyLibraryItem[] = [
    {
      id: "journey-lib-kl-heritage",
      journeyId: "journey-kl-heritage",
      title: "KL Heritage Line",
      subtitle: "Captured along the commute",
      place: "KL Sentral → Batu Caves",
      trackCount: 8,
      cover: require("../assets/images/kl.jpg"),
      stops: [
        {
          station: "KL Sentral",
          vibe: "Urban · Busy",
          tracks: [
            {
              id: "trk-1",
              title: "Midnight City",
              artist: "Local Pop Collective",
              station: "KL Sentral",
            },
          ],
        },
        {
          station: "Pasar Seni",
          vibe: "Trendy · Aesthetic",
          tracks: [
            {
              id: "trk-2",
              title: "Street Poetry",
              artist: "Indie KL",
              station: "Pasar Seni",
            },
          ],
        },
      ],
    },
    {
      id: "journey-lib-penang-day",
      journeyId: "journey-penang-day",
      title: "Penang Day Walk",
      subtitle: "Street food & old towns",
      place: "George Town",
      trackCount: 6,
      cover: require("../assets/images/penang.jpeg"),
      stops: [
        {
          station: "Armenian Street",
          vibe: "Heritage · Calm",
          tracks: [
            {
              id: "trk-3",
              title: "Morning Stroll",
              artist: "Acoustic MY",
              station: "Armenian Street",
            },
          ],
        },
      ],
    },
  ];

  const playlists: PlaylistItem[] = [
    {
      id: "playlist-city-walk",
      title: "City Walk",
      subtitle: "Urban & ambient vibes",
      trackCount: 24,
      image: require("../assets/images/city.jpg"),
      tracks: [
        {
          id: "pl-1",
          title: "Concrete Skies",
          artist: "Midnight Collective",
        },
      ],
    },
    {
      id: "playlist-night-ride",
      title: "Night Ride",
      subtitle: "Late trains & neon lights",
      trackCount: 18,
      image: require("../assets/images/night.jpg"),
      tracks: [
        {
          id: "pl-2",
          title: "Neon Drift",
          artist: "Afterhours",
        },
      ],
    },
  ];

  const artists: ArtistItem[] = [
    {
      id: "aisyah-rosli",
      name: "Siti Nurhaliza",
      genre: "Traditional · Ambient",
      image: require("../assets/images/ct.jpeg"),
      popularTracks: [
        {
          id: "ar-1",
          title: "Rainforest Dream",
          artist: "Aisyah Rosli",
        },
      ],
    },
    {
      id: "Erra Fazira",
      name: "Midnight Collective",
      genre: "Electronic · Chill",
      image: require("../assets/images/erra.jpeg"),
      popularTracks: [
        {
          id: "ar-2",
          title: "After Dark",
          artist: "Midnight Collective",
        },
      ],
    },
  ];

  const sections: LibrarySection<any>[] = [
    {
      key: "JOURNEYS",
      title: "Journey Libraries",
      icon: Music,
      items: journeyLibraries,
    },
    {
      key: "PLAYLISTS",
      title: "Playlists",
      icon: Music,
      items: playlists,
    },
    {
      key: "ARTISTS",
      title: "Artists",
      icon: Mic,
      items: artists,
    },
  ];

  return {
    journeyLibraries,
    playlists,
    artists,
    sections,
  };
}
