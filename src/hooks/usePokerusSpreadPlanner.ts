/**
 * @module usePokerusSpreadPlanner
 *
 * Custom React hook for planning and simulating Pokérus transmission across a 6-Pokémon party.
 *
 * **In-Game Mechanism:**
 * In Generation 2 onwards, Pokérus spreads after battles to adjacent party members (immediately
 * above or below in party order). A Pokémon with active Pokérus (`daysRemaining > 0`) can infect
 * adjacent uninfected Pokémon.
 *
 * **Why this hook exists:**
 * Players use this tool to position infected Pokémon adjacent to healthy target Pokémon
 * to maximize spread efficiency before Pokérus cures itself (reaches 0 days remaining).
 */

import { useMemo, useState } from 'react';
import type { PokemonInstance } from '../engine/saveParser/parsers/common';

/**
 * React hook that manages party slot state and computes which Pokémon slots are at risk of catching Pokérus.
 *
 * @param initialParty - Array of up to 6 Pokémon instances (or null for empty slots).
 * @returns Object containing current party slots, slot swap action, computed at-risk slot indices, and raw party setter.
 *
 * @example
 * const { party, swapSlots, atRiskIndices } = usePokerusSpreadPlanner(saveData.party);
 * // Swap slot 0 (contagious) and slot 1 to spread Pokérus to slot 2
 * swapSlots(0, 1);
 */
export function usePokerusSpreadPlanner(initialParty: (PokemonInstance | null)[] = []) {
  const [party, setParty] = useState<(PokemonInstance | null)[]>(() => {
    // Standardize party array length to exactly 6 slots to simplify index bounds checking
    const padded = [...initialParty];
    while (padded.length < 6) {
      padded.push(null);
    }
    return padded.slice(0, 6);
  });

  const swapSlots = (indexA: number, indexB: number) => {
    if (indexA < 0 || indexA >= 6 || indexB < 0 || indexB >= 6 || indexA === indexB) {
      return;
    }
    setParty((prevParty) => {
      const newParty = [...prevParty];
      const temp = newParty[indexA];
      // TypeScript requires explicit handling because newParty elements are typed as (PokemonInstance | null)
      newParty[indexA] = newParty[indexB] as PokemonInstance | null;
      newParty[indexB] = temp as PokemonInstance | null;
      return newParty;
    });
  };

  const atRiskIndices = useMemo(() => {
    const indices: number[] = [];
    for (let i = 0; i < 6; i++) {
      const current = party[i];
      // Only evaluate slots containing a Pokémon that is not already infected
      if (current && !current.pokerus) {
        const leftNeighbor = i > 0 ? party[i - 1] : null;
        const rightNeighbor = i < 5 ? party[i + 1] : null;

        // Pokérus only spreads if the adjacent neighbor has active Pokérus (daysRemaining > 0)
        const isLeftContagious = leftNeighbor?.pokerus && leftNeighbor.pokerus.daysRemaining > 0;
        const isRightContagious = rightNeighbor?.pokerus && rightNeighbor.pokerus.daysRemaining > 0;

        if (isLeftContagious || isRightContagious) {
          indices.push(i);
        }
      }
    }
    return indices;
  }, [party]);

  return { party, swapSlots, atRiskIndices, setParty };
}
