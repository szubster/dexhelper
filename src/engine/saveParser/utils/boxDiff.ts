import type { PokemonInstance } from '../parsers/common';

/**
 * Represents the computed differences between two states of PC Boxes.
 *
 * This delta is used by the UI (and sync engines) to determine which Pokémon
 * were newly caught, released, or simply moved between boxes without needing
 * to perform a full O(N^2) comparison on every render cycle.
 */
export interface BoxDiffResult {
  /** Pokémon present in the target state but missing from the current state. */
  additions: PokemonInstance[];
  /** Pokémon present in the current state but missing from the target state. */
  removals: PokemonInstance[];
  /** Pokémon that exist in both states but occupy different box/slot coordinates. */
  relocations: {
    /** The Pokémon instance being relocated (reference to the target state object). */
    pokemon: PokemonInstance;
    /** The zero-indexed source PC box number, or -1 if originating outside the PC (e.g., party). */
    sourceBox: number;
    /** The zero-indexed slot number within the source box, or -1 if N/A. */
    sourceSlot: number;
    /** The zero-indexed target PC box number, or -1 if moved outside the PC. */
    targetBox: number;
    /** The zero-indexed slot number within the target box, or -1 if N/A. */
    targetSlot: number;
  }[];
}

/**
 * Computes an O(N) delta (additions, removals, relocations) between two arrays of Pokémon.
 *
 * **Architecture Note: Deterministic Hashing**
 * Generations 1 and 2 lack unique internal identifiers (like Gen 3's Personality Values or modern UUIDs).
 * To determine if a Pokémon was moved to a new box (versus being released and replaced by an identical spawn),
 * this function compares synthetic hashes. These hashes are constructed during the save parsing phase
 * using relatively immutable traits (Species ID, DVs/IVs, Level, and Nickname).
 *
 * While hash collisions are theoretically possible (e.g., catching two identical Magikarp at the same level),
 * they are statistically rare enough that the deterministic approach successfully powers the conflict resolution
 * and UI diff engines without requiring deeply nested N^2 property comparisons.
 *
 * @param current - The current/previous state of the player's Pokémon instances.
 * @param target - The incoming/new state of the player's Pokémon instances.
 * @returns A structured `BoxDiffResult` containing arrays of additions, removals, and detailed relocation metadata.
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
