import { HOENN_DEX_NATIONAL_IDS, NATIONAL_DEX_MAX } from './constants';

/**
 * Calculates the missing Pokémon in the Pokédex for both National and Hoenn dexes.
 *
 * @param seen - A set of National Dex IDs representing seen Pokémon.
 * @param owned - A set of National Dex IDs representing owned (caught) Pokémon.
 * @returns An object containing sets of missing National Dex IDs and missing Hoenn Dex IDs.
 */
export function extractPokedexGaps(
  _seen: Set<number>,
  owned: Set<number>,
): { missingNational: Set<number>; missingHoenn: Set<number> } {
  const missingNational = new Set<number>();
  const missingHoenn = new Set<number>();

  for (let dexId = 1; dexId <= NATIONAL_DEX_MAX; dexId++) {
    if (!owned.has(dexId)) {
      missingNational.add(dexId);
      if (HOENN_DEX_NATIONAL_IDS.has(dexId)) {
        missingHoenn.add(dexId);
      }
    }
  }

  return { missingNational, missingHoenn };
}
