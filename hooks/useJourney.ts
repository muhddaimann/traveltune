export type JourneyStatus = "ACTIVE" | "PAUSED" | "COMPLETED";

export type MemoryMoment = {
  id: string;
  image: any;
  idea: string;
  sound: any;
};

export type MemoryLane = {
  music: {
    title: string;
    artist: string;
  };
  moments: MemoryMoment[];
};

export type JourneyItem = {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  status: JourneyStatus;
  image: any;
  location?: string;
  mostPlayed?: string;
  memoryLane?: MemoryLane;
};

export default function useJourney() {
  const journeys: JourneyItem[] = [
    {
      id: "journey-kl-batu",
      title: "KL Urban Line",
      subtitle: "Urban rails to sacred heights",
      date: "12 Aug 2025",
      status: "ACTIVE",
      location: "KL Sentral → Batu Caves",
      mostPlayed: "Golden Steps",
      image: require("../assets/images/kl.jpg"),
      memoryLane: {
        music: {
          title: "KL Cityscape",
          artist: "Tiring but exciting. Jwanji pergi lagi",
        },
        moments: [
          {
            id: "kl-m1",
            image: require("../assets/images/kl.jpg"),
            idea: "Morning starts at KL Sentral",
            sound: require("../assets/sounds/ayam.mp3"),
          },
          {
            id: "kl-m2",
            image: require("../assets/images/cm.jpg"),
            idea: "Trains, crowds, and city rhythm",
            sound: require("../assets/sounds/cindai.mp3"),
          },
          {
            id: "kl-m3",
            image: require("../assets/images/titi.jpeg"),
            idea: "A quiet pause between stops",
            sound: require("../assets/sounds/ewa.mp3"),
          },
          {
            id: "kl-m4",
            image: require("../assets/images/batu.jpg"),
            idea: "Arrival at Batu Caves",
            sound: require("../assets/sounds/ting.mp3"),
          },
        ],
      },
    },
    {
      id: "journey-penang",
      title: "Penang Heritage Trail",
      subtitle: "Street art & old-town cafés",
      date: "08 Aug 2025",
      status: "COMPLETED",
      location: "George Town, Penang",
      mostPlayed: "Old Town Echoes",
      image: require("../assets/images/penang.jpeg"),
      memoryLane: {
        music: {
          title: "Jalan Jalan Penang",
          artist: "Jalan jauh, perut happy",
        },
        moments: [
          {
            id: "pg-m1",
            image: require("../assets/images/penang1.jpg"),
            idea: "Walking through the sunsets",
            sound: require("../assets/sounds/cindai.mp3"),
          },
          {
            id: "pg-m2",
            image: require("../assets/images/penang2.jpeg"),
            idea: "Murals and hidden alleys",
            sound: require("../assets/sounds/ting.mp3"),
          },
          {
            id: "pg-m3",
            image: require("../assets/images/penang3.jpg"),
            idea: "Spiritual feels in temple ",
            sound: require("../assets/sounds/ewa.mp3"),
          },
          {
            id: "pg-m4",
            image: require("../assets/images/penang4.jpg"),
            idea: "Evening calm by the shophouses",
            sound: require("../assets/sounds/ayam.mp3"),
          },
        ],
      },
    },
    {
      id: "journey-langkawi",
      title: "Langkawi Getaway",
      subtitle: "Sea breeze & slow sunsets",
      date: "02 Aug 2025",
      status: "PAUSED",
      location: "Langkawi, Kedah",
      mostPlayed: "Island Dusk",
      image: require("../assets/images/rembau.jpg"),
      memoryLane: {
        music: {
          title: "Langkawi Escape",
          artist: "Laut cantik, masalah hilang",
        },
        moments: [
          {
            id: "rm-m1",
            image: require("../assets/images/li.jpeg"),
            idea: "Sea, sun and sand",
            sound: require("../assets/sounds/ting.mp3"),
          },
          {
            id: "rm-m2",
            image: require("../assets/images/li2.jpg"),
            idea: "The thrill of the height",
            sound: require("../assets/sounds/ayam.mp3"),
          },
          {
            id: "rm-m3",
            image: require("../assets/images/li3.jpg"),
            idea: "A beautiful corals",
            sound: require("../assets/sounds/ewa.mp3"),
          },
          {
            id: "rm-m4",
            image: require("../assets/images/li4.jpeg"),
            idea: "Good time Good Nyumz",
            sound: require("../assets/sounds/cindai.mp3"),
          },
        ],
      },
    },
  ];

  const activeJourney = journeys.find((j) => j.status === "ACTIVE");

  return {
    journeys,
    activeJourney,
  };
}
