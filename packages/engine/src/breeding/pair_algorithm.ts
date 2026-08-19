import { EGG_GROUP } from '@/db/schema';

/**
 * Represents the Determinant Values (DVs) of a Pokémon, which are used to calculate stats in Generation 2.
 * DVs range from 0 to 15. In Gen 2 breeding, DVs are passed down to offspring and are used to determine shiny status.
 */
export interface PokemonDVs {
  attack: number;
  defense: number;
  speed: number;
  special: number;
}

/**
 * Core metadata required for the breeding algorithm to evaluate compatibility and shiny inheritance.
 */
export interface PokemonWithMetadata {
  id: string; // Unique identifier for the specific pokemon instance
  speciesId: number;
  gender: 'Male' | 'Female' | 'Genderless';
  eggGroups: number[];
  isShinyCarrier?: boolean;
  isShiny?: boolean;
  dvs?: PokemonDVs;
}

/**
 * Represents a valid pairing of two Pokémon capable of producing an egg, scored by the likelihood of generating a shiny offspring.
 */
export interface BreedingPair<T extends PokemonWithMetadata = PokemonWithMetadata> {
  parentA: T;
  parentB: T;
  score: number; // Prioritize by Shiny Carrier status
}

/**
 * Calculates all valid breeding combinations from a list of Pokémon and ranks them by shiny inheritance likelihood.
 *
 * **Architecture Note:**
 * This function performs an O(N^2) evaluation across all provided Pokémon candidates.
 * It scores pairs based on shiny genetics (a shiny or shiny carrier parent increases the score).
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
export function calculateBreedingPairs<T extends PokemonWithMetadata>(pokemonList: T[]): BreedingPair<T>[] {
  const pairs: BreedingPair<T>[] = [];

  const males: T[] = [];
  const females: T[] = [];
  const dittos: T[] = [];
  const genderless: T[] = [];

  for (let i = 0; i < pokemonList.length; i++) {
    const p = pokemonList[i];
    if (!p) continue;
    if (p.eggGroups.includes(EGG_GROUP.NO_EGGS)) continue;

    if (p.eggGroups.includes(EGG_GROUP.DITTO)) {
      dittos.push(p);
    } else if (p.gender === 'Male') {
      males.push(p);
    } else if (p.gender === 'Female') {
      females.push(p);
    } else {
      genderless.push(p);
    }
  }

  const checkAndPushPair = (p1: T, p2: T) => {
    if (isValidPair(p1, p2)) {
      let score = 0;
      if (p1.isShinyCarrier || p1.isShiny) score += 1;
      if (p2.isShinyCarrier || p2.isShiny) score += 1;
      pairs.push({
        parentA: p1,
        parentB: p2,
        score,
      });
    }
  };

  // Male x Female
  for (let i = 0; i < males.length; i++) {
    const m = males[i];
    if (!m) continue;
    for (let j = 0; j < females.length; j++) {
      const f = females[j];
      if (f) checkAndPushPair(m, f);
    }
  }

  // Ditto x (Male | Female | Genderless)
  for (let i = 0; i < dittos.length; i++) {
    const d = dittos[i];
    if (!d) continue;

    for (let j = 0; j < males.length; j++) {
      const p = males[j];
      if (p) checkAndPushPair(d, p);
    }
    for (let j = 0; j < females.length; j++) {
      const p = females[j];
      if (p) checkAndPushPair(d, p);
    }
    for (let j = 0; j < genderless.length; j++) {
      const p = genderless[j];
      if (p) checkAndPushPair(d, p);
    }
    // Ditto x Ditto is not possible, so we omit it
  }

  return pairs.sort((a, b) => b.score - a.score);
}

/**
 * Determines if two Pokémon can breed.
 *
 * Enforces standard rules:
 * - A Pokémon cannot breed with itself.
 * - 'No Eggs' group (e.g., Legendaries, babies) cannot breed.
 * - Two Dittos cannot breed with each other.
 * - Ditto can breed with any valid non-Ditto.
 * - Genderless Pokémon can only breed with Ditto.
 * - Genders must be opposite.
 * - At least one egg group must intersect.
 * - Defers to `checkDvsIncompatible` for Gen 2 incest prevention.
 *
 * @param p1 - First parent candidate.
 * @param p2 - Second parent candidate.
 * @returns True if the pair can breed, false otherwise.
 */
function isValidPair(p1: PokemonWithMetadata, p2: PokemonWithMetadata): boolean {
  if (p1.speciesId === p2.speciesId && p1.id === p2.id) return false;

  const hasNoEggs = p1.eggGroups.includes(EGG_GROUP.NO_EGGS) || p2.eggGroups.includes(EGG_GROUP.NO_EGGS);
  if (hasNoEggs) return false;

  const p1IsDitto = p1.eggGroups.includes(EGG_GROUP.DITTO);
  const p2IsDitto = p2.eggGroups.includes(EGG_GROUP.DITTO);

  if (p1IsDitto && p2IsDitto) return false;
  if (p1IsDitto || p2IsDitto) {
    if (checkDvsIncompatible(p1, p2)) return false;
    return true;
  }

  if (p1.gender === 'Genderless' || p2.gender === 'Genderless') return false;
  if (p1.gender === p2.gender) return false;

  if (checkDvsIncompatible(p1, p2)) return false;

  return p1.eggGroups.some((group) => p2.eggGroups.includes(group));
}

/**
 * Evaluates Gen 2's specific incest prevention mechanics based on Determinant Values (DVs).
 *
 * **Why this exists:**
 * In Generation 2, DVs determine a Pokémon's stats and are inherited during breeding.
 * To prevent "incest" (breeding a Pokémon with its parent, child, or sibling), the game checks
 * the DVs of the two parents. If their Defense DVs match, and their Special DVs match
 * or differ by exactly 8, the game flags them as related and refuses to breed them.
 * This also applies to shiny status, since Gen 2 shininess is tied to DVs.
 *
 * @param p1 - First parent candidate.
 * @param p2 - Second parent candidate.
 * @returns True if the pair is considered related and incompatible, false otherwise.
 */
function checkDvsIncompatible(p1: PokemonWithMetadata, p2: PokemonWithMetadata): boolean {
  if (p1.dvs && p2.dvs) {
    if (p1.dvs.defense === p2.dvs.defense) {
      const specialDiff = Math.abs(p1.dvs.special - p2.dvs.special);
      if (specialDiff === 0 || specialDiff === 8) {
        return true; // Related and incompatible
      }
    }
  }
  return false;
}
