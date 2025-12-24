export type JourneyStatus = "ACTIVE" | "PAUSED" | "COMPLETED";

export type JourneyItem = {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  status: JourneyStatus;
  image: string;
  location?: string;
  nowPlaying?: string;
};

export default function useJourney() {
  const journeys: JourneyItem[] = [
    {
      id: "journey-kyoto",
      title: "Kyoto Morning Walk",
      subtitle: "Traditional streets & temples",
      date: "12 Aug 2025",
      status: "ACTIVE",
      location: "Kyoto, Japan",
      nowPlaying: "Rainforest Dream",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
    },
    { 
      id: "journey-paris",
      title: "Paris Café Hop",
      subtitle: "Indie cafés & quiet streets",
      date: "08 Aug 2025",
      status: "COMPLETED",
      location: "Paris, France",
      nowPlaying: "Café Au Lait",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    },
    {
      id: "journey-seoul",
      title: "Seoul Night Ride",
      subtitle: "City lights & late trains",
      date: "02 Aug 2025",
      status: "PAUSED",
      location: "Seoul, South Korea",
      nowPlaying: "Midnight Neon",
      image: "https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7",
    },
  ];

  const activeJourney = journeys.find((j) => j.status === "ACTIVE");

  return {
    journeys,
    activeJourney,
  };
}
