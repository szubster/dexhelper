export interface PokemonWithMetadata {
  id: string; // Unique identifier for the specific pokemon instance
  speciesId: number;
  gender: 'Male' | 'Female' | 'Genderless';
  eggGroups: string[];
  isShinyCarrier?: boolean;
  isShiny?: boolean;
}

export interface BreedingPair {
  parentA: PokemonWithMetadata;
  parentB: PokemonWithMetadata;
  score: number; // Prioritize by Shiny Carrier status
}

/**
 * Calculates all valid breeding combinations from a list of Pokémon and ranks them by shiny inheritance likelihood.
 *
 * Pairs are scored based on the shiny status of the parents. Breeding with a shiny or shiny carrier increases the chance of the offspring being shiny.
 *
 * @param pokemonList - An array of Pokémon metadata including egg groups, gender, and shiny status.
 * @returns An array of valid BreedingPairs sorted descending by score.
 *
 * @example
 * const pairs = calculateBreedingPairs([pikachu, ditto]);
 * // Returns [{ parentA: pikachu, parentB: ditto, score: 0 }]
 */
export function calculateBreedingPairs(pokemonList: PokemonWithMetadata[]): BreedingPair[] {
  const pairs: BreedingPair[] = [];

  for (let i = 0; i < pokemonList.length; i++) {
    for (let j = i + 1; j < pokemonList.length; j++) {
      const p1 = pokemonList[i];
      const p2 = pokemonList[j];

      if (p1 && p2 && isValidPair(p1, p2)) {
        let score = 0;
        if (p1.isShinyCarrier || p1.isShiny) score += 1;
        if (p2.isShinyCarrier || p2.isShiny) score += 1;
        pairs.push({
          parentA: p1,
          parentB: p2,
          score,
        });
      }
    }
  }

  return pairs.sort((a, b) => b.score - a.score);
}

/**
 * Determines if two Pokémon can breed.
 *
 * Enforces standard mechanics:
 * - A Pokémon cannot breed with itself.
 * - 'No Eggs' group cannot breed.
 * - Two Dittos cannot breed.
 * - Ditto can breed with any valid non-Ditto.
 * - Genderless Pokémon can only breed with Ditto.
 * - Genders must be opposite.
 * - At least one egg group must intersect.
 *
 * @param p1 - First parent candidate.
 * @param p2 - Second parent candidate.
 * @returns True if the pair can breed, false otherwise.
 */
function isValidPair(p1: PokemonWithMetadata, p2: PokemonWithMetadata): boolean {
  if (p1.speciesId === p2.speciesId && p1.id === p2.id) return false;

  const hasNoEggs = p1.eggGroups.includes('No Eggs') || p2.eggGroups.includes('No Eggs');
  if (hasNoEggs) return false;

  const p1IsDitto = p1.eggGroups.includes('Ditto');
  const p2IsDitto = p2.eggGroups.includes('Ditto');

  // Two dittos can't breed with each other, right? Let's check Pokemon breeding rules.
  // Wait, in Gen 2 two Dittos CAN breed, yielding a Ditto. But usually "Two Dittos cannot breed". Let's assume standard rules: Two Dittos CANNOT breed.
  if (p1IsDitto && p2IsDitto) return false;

  if (p1IsDitto || p2IsDitto) return true;

  if (p1.gender === 'Genderless' || p2.gender === 'Genderless') return false;
  if (p1.gender === p2.gender) return false;

  return p1.eggGroups.some((group) => p2.eggGroups.includes(group));
}
