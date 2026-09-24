import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { InventoryBerry, RecommendationResult } from '../../engine/gen3/contests/engine';
import { recommendPokeblocks } from '../../engine/gen3/contests/engine';
import type { ContestCondition, Nature } from '../../engine/gen3/contests/types';

export interface PokeblockState {
  inventory: InventoryBerry[];
  currentCondition: number;
  currentSheen: number;
  targetCondition: number;
  targetCategory: ContestCondition;
  nature: Nature;
  numPlayers: number;
  recommendationResult: RecommendationResult | null;
}

export interface PokeblockActions {
  setInventory: (inventory: InventoryBerry[]) => void;
  setCurrentCondition: (condition: number) => void;
  setCurrentSheen: (sheen: number) => void;
  setTargetCondition: (condition: number) => void;
  setTargetCategory: (category: ContestCondition) => void;
  setNature: (nature: Nature) => void;
  setNumPlayers: (numPlayers: number) => void;
  calculateRecommendation: () => void;
  reset: () => void;
}

export type PokeblockContextType = PokeblockState & PokeblockActions;

const PokeblockContext = createContext<PokeblockContextType | undefined>(undefined);

const defaultState: PokeblockState = {
  inventory: [],
  currentCondition: 0,
  currentSheen: 0,
  targetCondition: 255,
  targetCategory: 'cool',
  nature: 'hardy',
  numPlayers: 4,
  recommendationResult: null,
};

export const PokeblockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PokeblockState>(defaultState);

  const setInventory = useCallback((inventory: InventoryBerry[]) => {
    setState((prev) => ({ ...prev, inventory }));
  }, []);

  const setCurrentCondition = useCallback((currentCondition: number) => {
    setState((prev) => ({ ...prev, currentCondition }));
  }, []);

  const setCurrentSheen = useCallback((currentSheen: number) => {
    setState((prev) => ({ ...prev, currentSheen }));
  }, []);

  const setTargetCondition = useCallback((targetCondition: number) => {
    setState((prev) => ({ ...prev, targetCondition }));
  }, []);

  const setTargetCategory = useCallback((targetCategory: ContestCondition) => {
    setState((prev) => ({ ...prev, targetCategory }));
  }, []);

  const setNature = useCallback((nature: Nature) => {
    setState((prev) => ({ ...prev, nature }));
  }, []);

  const setNumPlayers = useCallback((numPlayers: number) => {
    setState((prev) => ({ ...prev, numPlayers }));
  }, []);

  const calculateRecommendation = useCallback(() => {
    setState((prev) => {
      const result = recommendPokeblocks({
        inventory: prev.inventory,
        currentCondition: prev.currentCondition,
        currentSheen: prev.currentSheen,
        targetCondition: prev.targetCondition,
        targetCategory: prev.targetCategory,
        nature: prev.nature,
        numPlayers: prev.numPlayers,
      });

      return {
        ...prev,
        recommendationResult: result,
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState(defaultState);
  }, []);

  const value = useMemo<PokeblockContextType>(
    () => ({
      ...state,
      setInventory,
      setCurrentCondition,
      setCurrentSheen,
      setTargetCondition,
      setTargetCategory,
      setNature,
      setNumPlayers,
      calculateRecommendation,
      reset,
    }),
    [
      state,
      setInventory,
      setCurrentCondition,
      setCurrentSheen,
      setTargetCondition,
      setTargetCategory,
      setNature,
      setNumPlayers,
      calculateRecommendation,
      reset,
    ],
  );

  return <PokeblockContext.Provider value={value}>{children}</PokeblockContext.Provider>;
};

export const usePokeblock = (): PokeblockContextType => {
  const context = useContext(PokeblockContext);
  if (context === undefined) {
    throw new Error('usePokeblock must be used within a PokeblockProvider');
  }
  return context;
};
