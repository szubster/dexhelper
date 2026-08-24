import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import type { PokemonInstance } from '../engine/saveParser/parsers/common';
import { useStore } from '../store';

interface MatchupContextType {
  partyDetails: PokemonInstance[];
  setPartyDetails: (details: PokemonInstance[]) => void;
  upcomingBoss: string | null;
  setUpcomingBoss: (boss: string | null) => void;
}

const MatchupContext = createContext<MatchupContextType | undefined>(undefined);

interface MatchupProviderProps {
  children: ReactNode;
}

export const MatchupProvider = ({ children }: MatchupProviderProps) => {
  const [partyDetails, setPartyDetails] = useState<PokemonInstance[]>([]);
  const [upcomingBoss, setUpcomingBoss] = useState<string | null>(null);

  const saveData = useStore((s) => s.saveData);

  useEffect(() => {
    if (saveData?.generation === 1) {
      // oxlint-disable-next-line react/set-state-in-effect
      setPartyDetails(saveData.partyDetails || []);
    }
  }, [saveData]);

  return (
    <MatchupContext.Provider value={{ partyDetails, setPartyDetails, upcomingBoss, setUpcomingBoss }}>
      {children}
    </MatchupContext.Provider>
  );
};

export const useMatchup = (): MatchupContextType => {
  const context = useContext(MatchupContext);
  if (!context) {
    throw new Error('useMatchup must be used within a MatchupProvider');
  }
  return context;
};
