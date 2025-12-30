import {
  Landmark,
  Music,
  MapPin,
  Mic,
  Waves,
  Image as ImageIcon,
} from "lucide-react-native";
import { ImageSourcePropType } from "react-native";

export type DiscoverItem = {
  id: string;
  title: string;
  subtitle?: string;
  avatarIcon?: string;
  image: ImageSourcePropType;
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
      subtitle: "Music inspired by local destinations",
      icon: Landmark,
      items: [
        {
          id: "kuala-lumpur",
          title: "Kuala Lumpur",
          subtitle: "Urban pop, city rhythms",
          avatarIcon: "map",
          image: require("../assets/images/kl.jpg"),
         },
        {
          id: "penang",
          title: "Penang",
          subtitle: "Indie, heritage café vibes",
          avatarIcon: "map",
          image: require("../assets/images/penang.jpeg"),
        },
        {
          id: "langkawi",
          title: "Langkawi",
          subtitle: "Chill, tropical soundscapes",
          avatarIcon: "map",
          image: require("../assets/images/langkawi.jpg"),
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
      subtitle: "Soundtracks for every Malaysian moment",
      icon: Music,
      items: [
        {
          id: "airport-klia",
          title: "KLIA Chill",
          subtitle: "Calm departures, late-night lounges",
          avatarIcon: "music",
          image: require("../assets/images/klia.jpg"),
        },
        {
          id: "north-south-highway",
          title: "Highway Drive",
          subtitle: "Long stretches, steady rhythms",
          avatarIcon: "music",
          image: require("../assets/images/highway.jpg"),
        },
        {
          id: "beach-sunset",
          title: "Island Sunset",
          subtitle: "Golden hour, sea breeze",
          avatarIcon: "music",
          image: require("../assets/images/sunset.jpg"),
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
          id: "shila-amzah",
          title: "Shila Amzah",
          subtitle: "Rainforest Dream · Traditional Melodies",
          avatarIcon: "artist",
          image: require("../assets/images/shila.jpg"),
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
