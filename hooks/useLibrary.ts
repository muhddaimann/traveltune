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

export type JourneyStop = {
  station: string;
  vibe: string;
  etaFromStartMin?: number;
  tracks: LibraryTrack[];
};

export type JourneyTransport = {
  mode: "LRT" | "MRT" | "KTM" | "BUS" | "WALK";
  lineName?: string;
  operator?: string;
  color?: string;
  totalDurationMin?: number;
  totalStops?: number;
};

export type JourneyLibraryItem = {
  id: string;
  journeyId: string;
  title: string;
  subtitle?: string;
  place: string;
  cover: ImageSourcePropType;
  trackCount: number;

  transport: JourneyTransport;

  stops: JourneyStop[];
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
      title: "KL Urban Line",
      subtitle: "Music synced with your commute",
      place: "KL Sentral → Batu Caves",
      trackCount: 8,
      cover: require("../assets/images/kl.jpg"),

      transport: {
        mode: "LRT",
        lineName: "Kelana Jaya Line",
        operator: "Rapid KL",
        color: "#E11D48",
        totalDurationMin: 35,
        totalStops: 4,
      },

      stops: [
        {
          station: "KL Sentral",
          vibe: "Urban · Busy",
          etaFromStartMin: 0,
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
          etaFromStartMin: 8,
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
        {
          station: "Titiwangsa",
          vibe: "Calm · Transition",
          etaFromStartMin: 18,
          tracks: [],
        },
        {
          station: "Batu Caves",
          vibe: "Cultural · Iconic",
          etaFromStartMin: 35,
          tracks: [],
        },
      ],
    },

    {
      id: "journey-lib-penang",
      journeyId: "journey-penang-day",
      title: "Penang Day Walk",
      subtitle: "Walkable heritage & street sounds",
      place: "George Town",
      trackCount: 5,
      cover: require("../assets/images/penang.jpeg"),

      transport: {
        mode: "WALK",
        totalDurationMin: 90,
        totalStops: 3,
      },

      stops: [
        {
          station: "Armenian Street",
          vibe: "Heritage · Calm",
          etaFromStartMin: 0,
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
        {
          station: "Khoo Kongsi",
          vibe: "Cultural · Historic",
          etaFromStartMin: 30,
          tracks: [],
        },
        {
          station: "Chew Jetty",
          vibe: "Seaside · Nostalgic",
          etaFromStartMin: 60,
          tracks: [],
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
      id: "erra-faz",
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
    {
      id: "anita",
      name: "Anita Sarawak",
      genre: "Traditional · Pop",
      image: require("../assets/images/anita.jpeg"),
      popularTracks: [
        {
          id: "ar-3",
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
      title: "Wau Bulan",
      artist: "Lagu Rakyat Kelantan",
      image: require("../assets/images/kel.jpg"),
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
