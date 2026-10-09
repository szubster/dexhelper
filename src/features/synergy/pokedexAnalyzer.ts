import type { SaveData } from '../../engine/saveParser';

export interface PokedexProgress {
  ownedBy: string[];
  seenBy: string[];
  missingFrom: string[];
}

interface IntermediatePokedexProgress {
  ownedBy: Set<string>;
  seenBy: Set<string>;
  missingFrom: Set<string>;
}

// ⚡ Bolt: Optimized analyzePokedexProgress to use Set lookups and Map iteration during aggregation instead of intermediate array .includes() scans and Object.keys() string/number conversions (O(N * S * M) -> O(N * S) time complexity).
/**
 * Analyzes the Pokédex progress across multiple save files.
 * @param saves An array of SaveData objects to analyze.
 * @returns A structured representation of the gaps and overlaps in Pokédex completion.
 */
export function analyzePokedexProgress(saves: SaveData[]): Record<number, PokedexProgress> {
  const progressMap = new Map<number, IntermediatePokedexProgress>();

  // First pass: Record who owns and has seen what
  saves.forEach((save) => {
    const version = save.gameVersion;
    if (save.owned) {
      save.owned.forEach((pokemonId) => {
        let res = progressMap.get(pokemonId);
        if (!res) {
          res = { ownedBy: new Set(), missingFrom: new Set(), seenBy: new Set() };
          progressMap.set(pokemonId, res);
        }
        res.ownedBy.add(version);
      });
    }

    if (save.seen) {
      save.seen.forEach((pokemonId) => {
        let res = progressMap.get(pokemonId);
        if (!res) {
          res = { ownedBy: new Set(), missingFrom: new Set(), seenBy: new Set() };
          progressMap.set(pokemonId, res);
        }
        res.seenBy.add(version);
      });
    }
  });

  // Second pass: Record who is missing what (but only for Pokemon owned or seen by someone)
  saves.forEach((save) => {
    const version = save.gameVersion;
    progressMap.forEach((res, pokemonId) => {
      if (!save.owned?.has(pokemonId)) {
        res.missingFrom.add(version);
      }
    });
  });

  // Convert intermediate Sets to output arrays
  const result: Record<number, PokedexProgress> = {};
  progressMap.forEach((res, pokemonId) => {
    result[pokemonId] = {
      ownedBy: Array.from(res.ownedBy),
      seenBy: Array.from(res.seenBy),
      missingFrom: Array.from(res.missingFrom),
    };
  });

  return result;
}
