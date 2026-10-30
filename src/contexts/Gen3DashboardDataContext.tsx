import type React from 'react';
import { createContext, useContext, useMemo } from 'react';
import type { Gen3TrainerCardState as Gen3TrainerCard } from '../features/trainer-card/types';
import { useStore } from '../store';

export interface Gen3DashboardData {
  missingNational: Set<number>;
  missingHoenn: Set<number>;
  missedMasterBall: boolean;
  missedLegendaries: string[];
  trainerCard: Gen3TrainerCard | null;
}

const Gen3DashboardDataContext = createContext<Gen3DashboardData | null>(null);

export function Gen3DashboardDataProvider({ children }: { children: React.ReactNode }) {
  const saveData = useStore((s) => s.saveData);

  const value = useMemo(() => {
    if (saveData?.generation !== 3) {
      return {
        missingNational: new Set<number>(),
        missingHoenn: new Set<number>(),
        missedMasterBall: false,
        missedLegendaries: [] as string[],
        trainerCard: null,
      };
    }

    return {
      missingNational: saveData.missingNationalDex || new Set<number>(),
      missingHoenn: saveData.missingHoennDex || new Set<number>(),
      missedMasterBall: saveData.gen3MissedItemsAndMilestones?.missedMasterBall ?? false,
      missedLegendaries: saveData.gen3MissedItemsAndMilestones?.missedLegendaries ?? [],
      trainerCard: saveData.gen3TrainerCard ?? null,
    };
  }, [saveData]);

  return <Gen3DashboardDataContext.Provider value={value}>{children}</Gen3DashboardDataContext.Provider>;
}

export function useGen3DashboardData() {
  const context = useContext(Gen3DashboardDataContext);
  if (!context) {
    throw new Error('useGen3DashboardData must be used within a Gen3DashboardDataProvider');
  }
  return context;
}
