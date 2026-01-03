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
      key: "moods",
      title: "Travel Moods",
      subtitle: "Soundtracks for every Malaysian moment",
      icon: Music,
      items: [
        {
          id: "airport-klia",
          title: "Airport Feels",
          subtitle: "Calm departures, late-night lounges",
          avatarIcon: "music",
          image: require("../assets/images/klia.jpg"),
        },
        {
          id: "north-south-highway",
          title: "Morning Commute",
          subtitle: "Long stretches, steady rhythms",
          avatarIcon: "music",
          image: require("../assets/images/highway.jpg"),
        },
        {
          id: "beach-sunset",
          title: "Golden Hour Vibes",
          subtitle: "Golden hour, sea breeze",
          avatarIcon: "music",
          image: require("../assets/images/sunset.jpg"),
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
          id: "rembau",
          title: "Rembau",
          subtitle: "Chill, tropical soundscapes",
          avatarIcon: "map",
          image: require("../assets/images/rembau.jpg"),
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
  ];

  return { sections };
}
