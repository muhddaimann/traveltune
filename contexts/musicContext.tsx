import React, { createContext, useContext, useState, ReactNode } from "react";
import { Station } from "../hooks/useMaps"; // Assuming Station type is exported from useMaps

type MusicContextType = {
  isPlaying: boolean;
  currentTrack: Station | null;
  playTrack: (track: Station) => void;
  pause: () => void;
  resume: () => void;
};

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};

type MusicProviderProps = {
  children: ReactNode;
};

export const MusicProvider = ({ children }: MusicProviderProps) => {
  const [currentTrack, setCurrentTrack] = useState<Station | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simulate playback for now
  const playTrack = (track: Station) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const resume = () => {
    if (currentTrack) {
      setIsPlaying(true);
    }
  };

  const value = {
    isPlaying,
    currentTrack,
    playTrack,
    pause,
    resume,
  };

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
};
