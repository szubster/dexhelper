import React, { createContext, type ReactNode, useContext, useMemo } from 'react';
import type { Gen3MissedItemsAndMilestones } from '../engine/saveParser/gen3/missedItems/parser';
import { isGen3Save } from '../engine/saveParser/parsers/common';
import { useStore } from '../store';

export interface Gen3MissedItemsContextState {
  missedItemsData: Gen3MissedItemsAndMilestones | null;
}

const Gen3MissedItemsContext = createContext<Gen3MissedItemsContextState | undefined>(undefined);

export const Gen3MissedItemsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const saveData = useStore((state) => state.saveData);

  const missedItemsState = useMemo<Gen3MissedItemsContextState>(() => {
    if (!saveData || !isGen3Save(saveData)) {
      return { missedItemsData: null };
    }

    return {
      missedItemsData: saveData.gen3MissedItemsAndMilestones || null,
    };
  }, [saveData]);

  return <Gen3MissedItemsContext.Provider value={missedItemsState}>{children}</Gen3MissedItemsContext.Provider>;
};

export const useGen3MissedItems = (): Gen3MissedItemsContextState => {
  const context = useContext(Gen3MissedItemsContext);
  if (context === undefined) {
    throw new Error('useGen3MissedItems must be used within a Gen3MissedItemsProvider');
  }
  return context;
};
