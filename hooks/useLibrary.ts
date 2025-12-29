import { Music, Mic } from "lucide-react-native";

export type LibraryTab = "PLAYLISTS" | "ARTISTS";

export type PlaylistItem = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  trackCount: number;
};

export type ArtistItem = {
  id: string;
  name: string;
  genre?: string;
  image: string;
};

export type LibrarySection<T> = {
  key: LibraryTab;
  title: string;
  icon: any;
  items: T[];
};

export default function useLibrary() {
  const playlists: PlaylistItem[] = [
    {
      id: "playlist-city-walk",
      title: "City Walk",
      subtitle: "Urban & ambient vibes",
      trackCount: 24,
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
    },
    {
      id: "playlist-night-ride",
      title: "Night Ride",
      subtitle: "Late trains & neon lights",
      trackCount: 18,
      image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
    },
    {
      id: "playlist-cafe-chill",
      title: "Café Chill",
      subtitle: "Warm & acoustic",
      trackCount: 32,
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    },
  ];

  const artists: ArtistItem[] = [
    {
      id: "aisyah-rosli",
      name: "Aisyah Rosli",
      genre: "Traditional · Ambient",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    },
    {
      id: "midnight-collective",
      name: "Midnight Collective",
      genre: "Electronic · Chill",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    },
  ];

  const sections: LibrarySection<any>[] = [
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
    playlists,
    artists,
    sections,
  };
}
