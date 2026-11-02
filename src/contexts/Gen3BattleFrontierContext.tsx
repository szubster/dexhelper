import type React from 'react';
import { createContext, useContext, useMemo } from 'react';
import type { Gen3BattleFrontierSymbols, Gen3BattleFrontierWinStreaks } from '../engine/saveParser/parsers/common';
import { useStore } from '../store';

export interface Gen3BattleFrontierData {
  gen3BattleFrontierWinStreaks: Gen3BattleFrontierWinStreaks | null;
  gen3BattleFrontierSymbols: Gen3BattleFrontierSymbols | null;
}

const Gen3BattleFrontierContext = createContext<Gen3BattleFrontierData | null>(null);

export function Gen3BattleFrontierProvider({ children }: { children: React.ReactNode }) {
  const saveData = useStore((s) => s.saveData);

  const value = useMemo(() => {
    if (saveData?.generation !== 3) {
      return {
        gen3BattleFrontierWinStreaks: null,
        gen3BattleFrontierSymbols: null,
      };
    }

    return {
      gen3BattleFrontierWinStreaks: saveData.gen3BattleFrontierWinStreaks || null,
      gen3BattleFrontierSymbols: saveData.gen3BattleFrontierSymbols || null,
    };
  }, [saveData]);

  return <Gen3BattleFrontierContext.Provider value={value}>{children}</Gen3BattleFrontierContext.Provider>;
}

export function useGen3BattleFrontier() {
  const context = useContext(Gen3BattleFrontierContext);
  if (!context) {
    throw new Error('useGen3BattleFrontier must be used within a Gen3BattleFrontierProvider');
  }
  return context;
}
