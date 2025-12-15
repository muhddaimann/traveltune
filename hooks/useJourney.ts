import { useState, useCallback } from "react";

export type Journey = {
  id: string;
  title: string;
  destination: string;
  startDate?: string;
  endDate?: string;
  mood?: string;
  trackCount: number;
};

const DUMMY_JOURNEYS: Journey[] = [
  {
    id: "j1",
    title: "Tokyo Spring Trip",
    destination: "Tokyo, Japan",
    startDate: "2025-03-18",
    endDate: "2025-03-25",
    mood: "Urban Chill",
    trackCount: 12,
  },
];

export default function useJourney() {
  const [enabled, setEnabled] = useState(false);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [activeJourneyId, setActiveJourneyId] = useState<string | null>(null);

  const hasJourney = journeys.length > 0;
  const activeJourney = journeys.find((j) => j.id === activeJourneyId);

  const enableJourney = useCallback(() => {
    setEnabled(true);
  }, []);

  const disableJourney = useCallback(() => {
    setEnabled(false);
    setJourneys([]);
    setActiveJourneyId(null);
  }, []);

  const startJourney = useCallback(
    (journey?: Partial<Journey>) => {
      if (!enabled) return;

      const newJourney: Journey = {
        id: `j-${Date.now()}`,
        title: journey?.title ?? "New Journey",
        destination: journey?.destination ?? "Unknown Destination",
        startDate: journey?.startDate,
        endDate: journey?.endDate,
        mood: journey?.mood,
        trackCount: 0,
      };

      setJourneys((prev) => [...prev, newJourney]);
      setActiveJourneyId(newJourney.id);
    },
    [enabled]
  );

  const loadDummyJourney = useCallback(() => {
    if (!enabled) return;

    setJourneys(DUMMY_JOURNEYS);
    setActiveJourneyId(DUMMY_JOURNEYS[0].id);
  }, [enabled]);

  const endJourney = useCallback(
    (id: string) => {
      if (!enabled) return;

      setJourneys((prev) => prev.filter((j) => j.id !== id));
      setActiveJourneyId(null);
    },
    [enabled]
  );

  return {
    enabled,
    journeys,
    activeJourney,
    hasJourney,

    enableJourney,
    disableJourney,

    startJourney,
    endJourney,
    loadDummyJourney,
    setActiveJourneyId,
  };
}
