export type JourneyStatus = "ACTIVE" | "PAUSED" | "COMPLETED";

export type JourneyItem = {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  status: JourneyStatus;
  image: any;
  location?: string;
  nowPlaying?: string;
};

export default function useJourney() {
  const journeys: JourneyItem[] = [
    {
      id: "journey-kl-batu",
      title: "KL Heritage Line",
      subtitle: "Urban rails to sacred heights",
      date: "12 Aug 2025",
      status: "ACTIVE",
      location: "KL Sentral → Batu Caves",
      nowPlaying: "Golden Steps",
      image: require("../assets/images/kl.jpg"),
    },
    {
      id: "journey-penang",
      title: "Penang Heritage Walk",
      subtitle: "Street art & old-town cafés",
      date: "08 Aug 2025",
      status: "COMPLETED",
      location: "George Town, Penang",
      nowPlaying: "Old Town Echoes",
      image: require("../assets/images/penang.jpeg"),
    },
    {
      id: "journey-langkawi",
      title: "Langkawi Island Drift",
      subtitle: "Sea breeze & slow sunsets",
      date: "02 Aug 2025",
      status: "PAUSED",
      location: "Langkawi, Kedah",
      nowPlaying: "Island Dusk",
      image: require("../assets/images/langkawi.jpg"),
    },
  ];

  const activeJourney = journeys.find((j) => j.status === "ACTIVE");

  return {
    journeys,
    activeJourney,
  };
}
