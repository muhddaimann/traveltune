import { useState, useCallback, useMemo } from "react";

export type Track = {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  duration: number;
};

export type PlayState = {
  playlist: Track[];
  currentIndex: number;
  isPlaying: boolean;
  progress: number;
};

const DUMMY_PLAYLIST: Track[] = [
  {
    id: "t1",
    title: "Midnight Transit",
    artist: "TravelTune Collective",
    artwork: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    duration: 240,
  },
  {
    id: "t2",
    title: "Airport Lights",
    artist: "Global Echoes",
    artwork: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    duration: 215,
  },
  {
    id: "t3",
    title: "Crossing Borders",
    artist: "Interstate Sound",
    artwork: "https://images.unsplash.com/photo-1500534314209-a26db0f5c4a9",
    duration: 260,
  },
];

export default function usePlay() {
  const [useMock, setUseMock] = useState(true);

  const [state, setState] = useState<PlayState>({
    playlist: DUMMY_PLAYLIST,
    currentIndex: 0,
    isPlaying: false,
    progress: 0,
  });

  const playlist = useMemo(() => (useMock ? DUMMY_PLAYLIST : []), [useMock]);

  const current =
    playlist.length > 0 ? playlist[state.currentIndex] : undefined;

  const play = useCallback(() => {
    setState((s) => ({ ...s, isPlaying: true }));
  }, []);

  const pause = useCallback(() => {
    setState((s) => ({ ...s, isPlaying: false }));
  }, []);

  const toggle = useCallback(() => {
    setState((s) => ({ ...s, isPlaying: !s.isPlaying }));
  }, []);

  const next = useCallback(() => {
    setState((s) => {
      if (playlist.length === 0) return s;

      const nextIndex =
        s.currentIndex < playlist.length - 1 ? s.currentIndex + 1 : 0;

      return {
        ...s,
        currentIndex: nextIndex,
        isPlaying: true,
        progress: 0,
      };
    });
  }, [playlist.length]);

  const previous = useCallback(() => {
    setState((s) => {
      if (playlist.length === 0) return s;

      const prevIndex =
        s.currentIndex > 0 ? s.currentIndex - 1 : playlist.length - 1;

      return {
        ...s,
        currentIndex: prevIndex,
        isPlaying: true,
        progress: 0,
      };
    });
  }, [playlist.length]);

  const seek = useCallback(
    (value: number) => {
      if (!current) return;

      setState((s) => ({
        ...s,
        progress: Math.min(Math.max(value, 0), current.duration),
      }));
    },
    [current]
  );

  const setTrackById = useCallback(
    (id: string) => {
      const index = playlist.findIndex((t) => t.id === id);
      if (index === -1) return;

      setState((s) => ({
        ...s,
        currentIndex: index,
        isPlaying: true,
        progress: 0,
      }));
    },
    [playlist]
  );

  const toggleMock = useCallback(() => {
    setUseMock((v) => !v);
    setState((s) => ({
      ...s,
      currentIndex: 0,
      isPlaying: false,
      progress: 0,
    }));
  }, []);

  return {
    useMock,
    toggleMock,

    playlist,
    current,
    currentIndex: state.currentIndex,
    isPlaying: state.isPlaying,
    progress: state.progress,

    play,
    pause,
    toggle,
    next,
    previous,
    seek,
    setTrackById,
  };
}
