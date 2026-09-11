import React, { createContext, type ReactNode, useContext, useState } from 'react';
import type { GameVersion } from '../store';

export interface Playthrough {
  id: string;
  gameVersion: GameVersion;
  name: string;
  lastPlayed: number;
}

export interface ConcurrentGameState {
  playthroughs: Playthrough[];
  activePlaythroughId: string | null;
}

export interface ConcurrentGameContextType {
  state: ConcurrentGameState;
  addPlaythrough: (playthrough: Omit<Playthrough, 'id' | 'lastPlayed'>) => void;
  removePlaythrough: (id: string) => void;
  setActivePlaythrough: (id: string | null) => void;
}

const ConcurrentGameContext = createContext<ConcurrentGameContextType | undefined>(undefined);

export const ConcurrentGameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ConcurrentGameState>({
    playthroughs: [],
    activePlaythroughId: null,
  });

  const addPlaythrough = (playthrough: Omit<Playthrough, 'id' | 'lastPlayed'>) => {
    setState((prev) => {
      const newPlaythrough: Playthrough = {
        ...playthrough,
        id: crypto.randomUUID(),
        lastPlayed: Date.now(),
      };
      return {
        ...prev,
        playthroughs: [...prev.playthroughs, newPlaythrough],
        activePlaythroughId: newPlaythrough.id,
      };
    });
  };

  const removePlaythrough = (id: string) => {
    setState((prev) => {
      const newPlaythroughs = prev.playthroughs.filter((p) => p.id !== id);

      const newActivePlaythroughId =
        prev.activePlaythroughId === id
          ? newPlaythroughs.length > 0
            ? (newPlaythroughs[0]?.id ?? null)
            : null
          : prev.activePlaythroughId;

      return {
        ...prev,
        playthroughs: newPlaythroughs,
        activePlaythroughId: newActivePlaythroughId,
      };
    });
  };

  const setActivePlaythrough = (id: string | null) => {
    setState((prev) => {
      if (id !== null && !prev.playthroughs.some((p) => p.id === id)) {
        return prev;
      }

      const newPlaythroughs = prev.playthroughs.map((p) => (p.id === id ? { ...p, lastPlayed: Date.now() } : p));

      return {
        ...prev,
        playthroughs: newPlaythroughs,
        activePlaythroughId: id,
      };
    });
  };

  return (
    <ConcurrentGameContext.Provider value={{ state, addPlaythrough, removePlaythrough, setActivePlaythrough }}>
      {children}
    </ConcurrentGameContext.Provider>
  );
};

export const useConcurrentGame = () => {
  const context = useContext(ConcurrentGameContext);
  if (context === undefined) {
    throw new Error('useConcurrentGame must be used within a ConcurrentGameProvider');
  }
  return context;
};
