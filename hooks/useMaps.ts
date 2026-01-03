import { useMemo, useState, useEffect } from "react";
import { ImageSourcePropType } from "react-native";
import { useMusic } from "../contexts/musicContext";

export type TransportMode = "LRT" | "MRT" | "KTM" | "BUS";

export type Station = {
  id: string;
  name: string;
  vibe: string;
  tag: string;

  albumCover: ImageSourcePropType;
  stopCover: ImageSourcePropType;

  latitude: number;
  longitude: number;

  etaFromStartMin: number;

  song: {
    title: string;
    artist: string;
  };
};

export type Route = {
  id: string;
  name: string;

  transport: {
    mode: TransportMode;
    lineName: string;
    operator: string;
    color: string;
    estimatedDurationMin: number;
    isPublicTransport: boolean;
  };

  stations: Station[];

  polyline: {
    latitude: number;
    longitude: number;
  }[];
};

export type MapsState = ReturnType<typeof useMaps>;

export default function useMaps() {
  const { playTrack } = useMusic();

  const routes: Route[] = useMemo(
    () => [
      {
        id: "kl-batu-caves",
        name: "KL Sentral → Batu Caves",

        transport: {
          mode: "LRT",
          lineName: "Kelana Jaya Line",
          operator: "Rapid KL",
          color: "#E11D48",
          estimatedDurationMin: 35,
          isPublicTransport: true,
        },

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
            albumCover: require("../assets/images/ct.jpeg"),
            stopCover: require("../assets/images/kl.jpg"),
            latitude: 3.1347,
            longitude: 101.6859,
            etaFromStartMin: 0,
            song: {
              title: "Cindai",
              artist: "Siti Nurhaliza",
            },
          },
          {
            id: "pasar-seni",
            name: "Pasar Seni",
            vibe: "Creative pulse",
            tag: "Trendy · Aesthetic",
            albumCover: require("../assets/images/anita.jpeg"),
            stopCover: require("../assets/images/cm.jpg"),
            latitude: 3.1422,
            longitude: 101.6958,
            etaFromStartMin: 8,
            song: {
              title: "Tinggi Tinggih",
              artist: "Anita Sarawak",
            },
          },
          {
            id: "titiwangsa",
            name: "Titiwangsa",
            vibe: "Calm transition",
            tag: "Relaxed · Scenic",
            albumCover: require("../assets/images/kel.jpg"),
            stopCover: require("../assets/images/titi.jpeg"),
            latitude: 3.1727,
            longitude: 101.6953,
            etaFromStartMin: 18,
            song: {
              title: "Ewa Bule",
              artist: "Lagu Rakyat Kelantan",
            },
          },
          {
            id: "batu-caves",
            name: "Batu Caves",
            vibe: "Spiritual ascent",
            tag: "Cultural · Iconic",
            albumCover: require("../assets/images/sab.jpeg"),
            stopCover: require("../assets/images/batu.jpg"),
            latitude: 3.2375,
            longitude: 101.6836,
            etaFromStartMin: 35,
            song: {
              title: "Tinggi Tinggi Gunung Kinabalu",
              artist: "Lagu Rakyat Sabah",
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

  useEffect(() => {
    if (activeStation) {
      playTrack(activeStation);
    }
  }, [activeStation, playTrack]);

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

    journeyMeta: {
      transport: activeRoute.transport,
      start: activeRoute.stations[0],
      end: activeRoute.stations[activeRoute.stations.length - 1],
      totalStops: activeRoute.stations.length,
    },

    selectStation,
    nextStation,
    prevStation,

    nowPlaying: activeStation.song,

    progress: {
      current: activeStationIndex + 1,
      total: activeRoute.stations.length,
      etaFromStartMin: activeStation.etaFromStartMin,
    },
  };
}
