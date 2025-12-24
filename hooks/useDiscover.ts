import {
  Landmark,
  Music,
  MapPin,
  Mic,
  Waves,
  Image as ImageIcon,
} from "lucide-react-native";

export type DiscoverItem = {
  id: string;
  title: string;
  subtitle?: string;
  avatarIcon?: string;
  image: string;
};

export type DiscoverSection = {
  key: string;
  title: string;
  subtitle?: string;
  icon?: any;
  items?: DiscoverItem[];
  requiresLocation?: boolean;
};

export default function useDiscover() {
  const sections: DiscoverSection[] = [
    {
      key: "quick-memory",
      title: "Quick Memories",
      subtitle: "Recent moments you saved",
      icon: ImageIcon,
      items: [
        {
          id: "memory-kyoto",
          title: "Kyoto Morning Walk",
          subtitle: "12 Aug 2025",
          avatarIcon: "memory",
          image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
        },
        {
          id: "memory-paris",
          title: "Paris Café Stop",
          subtitle: "08 Aug 2025",
          avatarIcon: "memory",
          image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        },
        {
          id: "memory",
          title: "Paris Café Stop",
          subtitle: "08 Aug 2025",
          avatarIcon: "memory",
          image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        },
      ],
    },
    {
      key: "cities",
      title: "Browse Cities",
      subtitle: "Music inspired by destinations",
      icon: Landmark,
      items: [
        {
          id: "tokyo",
          title: "Tokyo",
          subtitle: "City pop, modern beats",
          avatarIcon: "map",
          image: "https://images.unsplash.com/photo-1549693578-d683be217e58",
        },
        {
          id: "paris",
          title: "Paris",
          subtitle: "Chill café & indie",
          avatarIcon: "map",
          image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        },
        {
          id: "seoul",
          title: "Seoul",
          subtitle: "K-pop, R&B, night vibes",
          avatarIcon: "map",
          image: "https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7",
        },
      ],
    },
    {
      key: "soundscapes",
      title: "Urban Soundscapes",
      subtitle: "City moods, reimagined",
      icon: Waves,
      items: [
        {
          id: "city-explorer",
          title: "City Explorer",
          subtitle: "Urban Journey",
          avatarIcon: "sound",
          image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
        },
        {
          id: "night-walk",
          title: "Night Walk",
          subtitle: "After-dark Atmospheres",
          avatarIcon: "sound",
          image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
        },
      ],
    },
    {
      key: "moods",
      title: "Travel Moods",
      subtitle: "Soundtracks for every moment",
      icon: Music,
      items: [
        {
          id: "airport",
          title: "Airport Chill",
          subtitle: "Smooth, calm travel vibes",
          avatarIcon: "music",
          image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
        },
        {
          id: "roadtrip",
          title: "Road Trip",
          subtitle: "Upbeat, long-drive energy",
          avatarIcon: "music",
          image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        },
        {
          id: "sunset",
          title: "Sunset Ride",
          subtitle: "Warm tones, golden hour",
          avatarIcon: "music",
          image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
        },
      ],
    },
    {
      key: "local-artists",
      title: "Featuring Local Artists",
      subtitle: "Spotlight:",
      icon: Mic,
      items: [
        {
          id: "aisyah-rosli",
          title: "Aisyah Rosli",
          subtitle: "Rainforest Dream · Traditional Melodies",
          avatarIcon: "artist",
          image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
        },
      ],
    },
    {
      key: "nearby",
      title: "Nearby Suggestions",
      subtitle: "Based on where you are now",
      icon: MapPin,
      requiresLocation: true,
    },
  ];

  return { sections };
}
