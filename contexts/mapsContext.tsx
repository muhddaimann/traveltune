import React, { createContext, useContext } from "react";
import useMaps, { MapsState } from "../hooks/useMaps";

const MapsContext = createContext<MapsState | null>(null);

export function MapsProvider({ children }: { children: React.ReactNode }) {
  const maps = useMaps();
  return (
    <MapsContext.Provider value={maps}>
      {children}
    </MapsContext.Provider>
  );
}

export function useMapsContext() {
  const ctx = useContext(MapsContext);
  if (!ctx) {
    throw new Error("useMapsContext must be used within MapsProvider");
  }
  return ctx;
}
