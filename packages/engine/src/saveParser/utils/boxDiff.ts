import type { PokemonInstance } from '../parsers/common';

/**
 * Represents the computed differences between two states of PC Boxes.
 *
 * This delta is used by the UI (and sync engines) to determine which Pokémon
 * were newly caught, released, or simply moved between boxes without needing
 * to perform a full O(N^2) comparison on every render cycle.
 */
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

/**
 * Computes a delta (additions, removals, relocations) between two arrays of Pokémon.
 *
 * This function relies on a deterministic hashing strategy to track Pokémon across
 * sync cycles. Because early generations lack unique identifiers (UUIDs or PIDs),
 * the engine constructs a synthetic hash using relatively immutable traits (Species ID, DVs, Level, Nickname)
 * to reliably identify if a Pokémon was moved to a new box or slot, rather than being
 * released and replaced by a coincidentally identical spawn.
 *
 * @param current - The current/previous state of the player's Pokémon instances.
 * @param target - The incoming/new state of the player's Pokémon instances.
 * @returns An object containing arrays of additions, removals, and detailed relocation tracking.
 *
 * @example
 * const diff = calculateBoxDiff(oldPcBoxes, newPcBoxes);
 * if (diff.additions.length > 0) notifyUser("New Pokémon deposited!");
 */
export function calculateBoxDiff(current: PokemonInstance[], target: PokemonInstance[]): BoxDiffResult {
  const currentMap = new Map<string, PokemonInstance>();
  const targetMap = new Map<string, PokemonInstance>();

  const getHash = (p: PokemonInstance) => {
    return p.hash;
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
