import React, { createContext, type ReactNode, useContext, useMemo } from 'react';
import type { LotteryResult } from '../engine/gen3/lottery/lottery';
import { checkSaveDataForLottery } from '../engine/gen3/lottery/lottery';
import type { Gen3SaveData, PokemonInstance } from '../engine/saveParser/parsers/common';
import { useStore } from '../store';

export interface LotteryContextState {
  dailyWinningNumber: number | null;
  tier: 0 | 1 | 2 | 3 | 4;
  winningPokemon: PokemonInstance | null;
}

const LotteryContext = createContext<LotteryContextState | undefined>(undefined);

export const LotteryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const saveData = useStore((state) => state.saveData);

  const lotteryState = useMemo<LotteryContextState>(() => {
    if (saveData?.generation !== 3) {
      return { dailyWinningNumber: null, tier: 0, winningPokemon: null };
    }

    const gen3SaveData = saveData as Gen3SaveData & { gen3LotteryNumber?: number };
    const winningNumber = gen3SaveData.gen3LotteryNumber;

    if (typeof winningNumber !== 'number') {
      return { dailyWinningNumber: null, tier: 0, winningPokemon: null };
    }

    const result: LotteryResult = checkSaveDataForLottery(saveData, winningNumber);

    return {
      dailyWinningNumber: winningNumber,
      tier: result.tier,
      winningPokemon: result.winningPokemon,
    };
  }, [saveData]);

  return <LotteryContext.Provider value={lotteryState}>{children}</LotteryContext.Provider>;
};

export const useLottery = (): LotteryContextState => {
  const context = useContext(LotteryContext);
  if (context === undefined) {
    throw new Error('useLottery must be used within a LotteryProvider');
  }
  return context;
};
