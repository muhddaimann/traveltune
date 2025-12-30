import { Music, Mic, Heart } from "lucide-react-native";
import { ImageSourcePropType } from "react-native";

export type LibraryTab = "JOURNEYS" | "PLAYLISTS" | "ARTISTS" | "LIKED";

export type LibraryTrack = {
  id: string;
  title: string;
  artist: string;
  duration?: string;
  station?: string;
  image?: ImageSourcePropType;
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
              image: require("../assets/images/city.jpg"),
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
              image: require("../assets/images/night.jpg"),
            },
          ],
        },
      ],
    },
    {
      id: "journey-lib-penang",
      journeyId: "journey-penang-day",
      title: "Penang Day Walk",
      subtitle: "Street food & murals",
      place: "George Town",
      trackCount: 5,
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
              image: require("../assets/images/penang.jpeg"),
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
          image: require("../assets/images/city.jpg"),
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
          image: require("../assets/images/night.jpg"),
        },
      ],
    },
  ];

  const artists: ArtistItem[] = [
    {
      id: "siti-nurhaliza",
      name: "Siti Nurhaliza",
      genre: "Traditional · Pop",
      image: require("../assets/images/ct.jpeg"),
      popularTracks: [
        {
          id: "ar-1",
          title: "Cindai",
          artist: "Siti Nurhaliza",
          image: require("../assets/images/ct.jpeg"),
        },
      ],
    },
    {
      id: "midnight-collective",
      name: "Erra Fazira",
      genre: "Traditional · Pop",
      image: require("../assets/images/erra.jpeg"),
      popularTracks: [
        {
          id: "ar-2",
          title: "After Dark",
          artist: "Midnight Collective",
          image: require("../assets/images/night.jpg"),
        },
      ],
    },
  ];

  const likedSongs: LibraryTrack[] = [
    {
      id: "liked-1",
      title: "Cindai",
      artist: "Siti Nurhaliza",
      image: require("../assets/images/ct.jpeg"),
    },
    {
      id: "liked-2",
      title: "Pulang",
      artist: "Insomniacks",
      image: require("../assets/images/erra.jpeg"),
    },
    {
      id: "liked-3",
      title: "Sampai Syurga",
      artist: "Faizal Tahir",
      image: require("../assets/images/erra.jpeg"),
    },
    {
      id: "liked-4",
      title: "Angan",
      artist: "Masdo",
      image: require("../assets/images/erra.jpeg"),
    },
    {
      id: "liked-5",
      title: "Hanya Rindu",
      artist: "Andmesh Kamaleng",
      image: require("../assets/images/erra.jpeg"),
    },
  ];

  const sections: LibrarySection<any>[] = [
    {
      key: "LIKED",
      title: "Liked Songs",
      icon: Heart,
      items: likedSongs,
    },
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
    likedSongs,
    sections,
  };
}
