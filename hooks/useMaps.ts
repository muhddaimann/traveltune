import { useMemo, useState } from "react";
import { ImageSourcePropType } from "react-native";

export type Station = {
  id: string;
  name: string;
  vibe: string;
  tag: string;
  albumCover: ImageSourcePropType;
  latitude: number;
  longitude: number;
  song: {
    title: string;
    artist: string;
  };
};

export type Route = {
  id: string;
  name: string;
  stations: Station[];
  polyline: {
    latitude: number;
    longitude: number;
  }[];
};

export type MapsState = ReturnType<typeof useMaps>;

export default function useMaps() {
  const routes: Route[] = useMemo(
    () => [
      {
        id: "kl-batu-caves",
        name: "KL Heritage Line",
        polyline: [
          { latitude: 3.1347, longitude: 101.6859 },
          { latitude: 3.1422, longitude: 101.6958 },
          { latitude: 3.1727, longitude: 101.6953 },
          { latitude: 3.2375, longitude: 101.6836 },
        ],
        stations: [
          {
            id: "kl-sentral",
            name: "KL Sentral",
            vibe: "Urban heartbeat",
            tag: "Modern · Busy",
            albumCover: require("../assets/images/kl.jpg"),
            latitude: 3.1347,
            longitude: 101.6859,
            song: {
              title: "Midnight City",
              artist: "Local Pop Collective",
            },
          },
          {
            id: "pasar-seni",
            name: "Pasar Seni",
            vibe: "Creative pulse",
            tag: "Trendy · Aesthetic",
            albumCover: require("../assets/images/cm.jpg"),
            latitude: 3.1422,
            longitude: 101.6958,
            song: {
              title: "Street Poetry",
              artist: "Indie KL",
            },
          },
          {
            id: "titiwangsa",
            name: "Titiwangsa",
            vibe: "Calm transition",
            tag: "Relaxed · Scenic",
            albumCover: require("../assets/images/titi.jpeg"),
            latitude: 3.1727,
            longitude: 101.6953,
            song: {
              title: "Lake Reflections",
              artist: "Ambient MY",
            },
          },
          {
            id: "batu-caves",
            name: "Batu Caves",
            vibe: "Spiritual ascent",
            tag: "Cultural · Iconic",
            albumCover: require("../assets/images/batu.jpg"),
            latitude: 3.2375,
            longitude: 101.6836,
            song: {
              title: "Golden Steps",
              artist: "Traditional Fusion",
            },
          },
        ],
      },
    ],
    []
  );

  const [activeRouteId] = useState(routes[0].id);
  const [activeStationIndex, setActiveStationIndex] = useState(0);

  const activeRoute = routes.find((r) => r.id === activeRouteId)!;
  const activeStation = activeRoute.stations[activeStationIndex];

  function selectStation(index: number) {
    setActiveStationIndex(index);
  }

  function nextStation() {
    setActiveStationIndex((prev) =>
      Math.min(prev + 1, activeRoute.stations.length - 1)
    );
  }

  function prevStation() {
    setActiveStationIndex((prev) => Math.max(prev - 1, 0));
  }

  return {
    routes,
    activeRoute,
    activeStation,
    activeStationIndex,
    selectStation,
    nextStation,
    prevStation,
    nowPlaying: activeStation.song,
    progress: {
      current: activeStationIndex + 1,
      total: activeRoute.stations.length,
    },
  };
}
