import React, { createContext, useContext, useState, ReactNode } from "react";
import { Station } from "../hooks/useMaps";

type MusicContextType = {
  isPlaying: boolean;
  currentTrack: Station | null;
  playTrack: (track: Station) => void;
  pause: () => void;
  resume: () => void;
};

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusic = () => {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
};

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Station | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack: (track) => {
          setCurrentTrack(track);
          setIsPlaying(true);
        },
        pause: () => setIsPlaying(false),
        resume: () => setIsPlaying(true),
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
