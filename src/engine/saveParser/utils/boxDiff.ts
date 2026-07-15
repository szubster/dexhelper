import type { PokemonInstance } from '../parsers/common';

export interface BoxDiffResult {
  additions: PokemonInstance[];
  removals: PokemonInstance[];
  relocations: {
    pokemon: PokemonInstance;
    sourceBox: number;
    sourceSlot: number;
    targetBox: number;
    targetSlot: number;
  }[];
}

export function calculateBoxDiff(current: PokemonInstance[], target: PokemonInstance[]): BoxDiffResult {
  const currentMap = new Map<string, PokemonInstance>();
  const targetMap = new Map<string, PokemonInstance>();

  const getHash = (p: PokemonInstance) => {
    // If the pokemon has a 'hash' property natively, use it, else generate one
    if ('hash' in p && typeof p.hash === 'string') {
      return p.hash;
    }
    return `${p.speciesId}-${p.level}-${p.nickname}-${p.dvs?.hp}-${p.dvs?.atk}-${p.dvs?.def}-${p.dvs?.spd}-${p.dvs?.spc}`;
  };

  for (const p of current) {
    currentMap.set(getHash(p), p);
  }
  for (const p of target) {
    targetMap.set(getHash(p), p);
  }

  const additions: PokemonInstance[] = [];
  const removals: PokemonInstance[] = [];
  const relocations: BoxDiffResult['relocations'] = [];

  for (const targetPokemon of target) {
    const hash = getHash(targetPokemon);
    const currentPokemon = currentMap.get(hash);
    if (!currentPokemon) {
      additions.push(targetPokemon);
    } else {
      // Check for relocation
      if (
        currentPokemon.storageLocation !== targetPokemon.storageLocation ||
        currentPokemon.slot !== targetPokemon.slot
      ) {
        // Extract box numbers
        const sourceBoxMatch = currentPokemon.storageLocation.match(/Box (\d+)/);
        const targetBoxMatch = targetPokemon.storageLocation.match(/Box (\d+)/);

        const sourceBox = sourceBoxMatch?.[1] ? parseInt(sourceBoxMatch[1], 10) : -1;
        const targetBox = targetBoxMatch?.[1] ? parseInt(targetBoxMatch[1], 10) : -1;

        relocations.push({
          pokemon: targetPokemon,
          sourceBox,
          sourceSlot: currentPokemon.slot ?? -1,
          targetBox,
          targetSlot: targetPokemon.slot ?? -1,
        });
      }
    }
  }

  for (const currentPokemon of current) {
    const hash = getHash(currentPokemon);
    if (!targetMap.has(hash)) {
      removals.push(currentPokemon);
    }
  }

  return { additions, removals, relocations };
}
