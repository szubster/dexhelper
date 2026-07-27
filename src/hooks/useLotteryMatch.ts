import { useMemo } from 'react';
import { getBestLotteryMatch } from '../engine/gen3/lottery/lottery';
import type { PokemonInstance } from '../engine/saveParser/parsers/common';
import { useStore } from '../store';

export interface UseLotteryMatchResult {
  winningNumber: number | null;
  bestMatch: PokemonInstance | null;
  otId: number | null;
  matchedDigits: number;
  prizeTier: 0 | 1 | 2 | 3 | 4;
}

export function useLotteryMatch(): UseLotteryMatchResult {
  const saveData = useStore((state) => state.saveData);

  return useMemo(() => {
    if (!saveData || saveData.gen3LotteryNumber === undefined) {
      return {
        winningNumber: null,
        bestMatch: null,
        otId: null,
        matchedDigits: 0,
        prizeTier: 0 as const,
      };
    }

    const winningNumber = saveData.gen3LotteryNumber;
    const pokemonList: PokemonInstance[] = [
      ...(saveData.partyDetails || []),
      ...(saveData.pcDetails || []),
      ...(saveData.daycare || []),
    ];

    const matchResult = getBestLotteryMatch(pokemonList, winningNumber);
    const tier = matchResult.tier;
    const bestMatch = matchResult.winningPokemon;
    const otId = bestMatch?.otId ?? null;

    let matchedDigits = 0;
    if (tier === 1) matchedDigits = 5;
    else if (tier === 2) matchedDigits = 4;
    else if (tier === 3) matchedDigits = 3;
    else if (tier === 4) matchedDigits = 2;

    return {
      winningNumber,
      bestMatch,
      otId,
      matchedDigits,
      prizeTier: tier,
    };
  }, [saveData]);
}
