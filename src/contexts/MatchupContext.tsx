import { createContext, type ReactNode, useContext, useState } from 'react';
import type { PokemonInstance } from '../engine/saveParser/parsers/common';

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
