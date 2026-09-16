import { useMemo, useState } from 'react';
import type { PokemonInstance } from '../engine/saveParser/parsers/common';

export function usePokerusSpreadPlanner(initialParty: (PokemonInstance | null)[] = []) {
  const [party, setParty] = useState<(PokemonInstance | null)[]>(() => {
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
      if (current && !current.pokerus) {
        const leftNeighbor = i > 0 ? party[i - 1] : null;
        const rightNeighbor = i < 5 ? party[i + 1] : null;

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
