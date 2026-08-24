import type { SaveData } from '../../engine/saveParser';

export interface PokedexProgress {
  ownedBy: string[];
  seenBy: string[];
  missingFrom: string[];
}

/**
 * Analyzes the Pokédex progress across multiple save files.
 * @param saves An array of SaveData objects to analyze.
 * @returns A structured representation of the gaps and overlaps in Pokédex completion.
 */
export function analyzePokedexProgress(saves: SaveData[]): Record<number, PokedexProgress> {
  const result: Record<number, PokedexProgress> = {};

  // First pass: Record who owns and has seen what
  saves.forEach((save) => {
    const version = save.gameVersion;
    if (save.owned) {
      save.owned.forEach((pokemonId) => {
        let res = result[pokemonId];
        if (!res) {
          res = { ownedBy: [], missingFrom: [], seenBy: [] };
          result[pokemonId] = res;
        }
        if (!res.ownedBy.includes(version)) {
          res.ownedBy.push(version);
        }
      });
    }

    if (save.seen) {
      save.seen.forEach((pokemonId) => {
        let res = result[pokemonId];
        if (!res) {
          res = { ownedBy: [], missingFrom: [], seenBy: [] };
          result[pokemonId] = res;
        }
        if (!res.seenBy.includes(version)) {
          res.seenBy.push(version);
        }
      });
    }
  });

  // Second pass: Record who is missing what (but only for Pokemon owned or seen by someone)
  saves.forEach((save) => {
    const version = save.gameVersion;
    Object.keys(result).forEach((idStr) => {
      const pokemonId = parseInt(idStr, 10);
      const res = result[pokemonId];
      if (res && !save.owned?.has(pokemonId)) {
        if (!res.missingFrom.includes(version)) {
          res.missingFrom.push(version);
        }
      }
    });
  });

  return result;
}
