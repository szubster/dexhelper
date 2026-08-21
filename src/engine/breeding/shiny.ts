import { determineInheritedDVs } from './inheritance';
import type { PokemonDVs, PokemonWithMetadata } from './pair_algorithm';

export interface ShinyOddsResult {
  maleOffspringOdds: '1/64' | '1/8192';
  femaleOffspringOdds: '1/64' | '1/8192';
  genderlessOffspringOdds: '1/64' | '1/8192';
}

function getOdds(dvs: Partial<PokemonDVs>): '1/64' | '1/8192' {
  if (dvs.defense === 10 && dvs.special === 10) {
    return '1/64';
  }
  return '1/8192';
}

/**
 * Calculates the exact shiny odds fraction of an offspring from a given pair of parent Pokémon.
 * Uses the DV inheritance logic to determine if the offspring will inherit the required DVs for a shiny.
 *
 * @param parentA - The first parent
 * @param parentB - The second parent
 * @returns An object indicating the shiny odds for each possible offspring gender.
 */
export function calculateShinyOdds(parentA: PokemonWithMetadata, parentB: PokemonWithMetadata): ShinyOddsResult {
  const inheritedDVs = determineInheritedDVs(parentA, parentB);

  return {
    maleOffspringOdds: getOdds(inheritedDVs.maleOffspring),
    femaleOffspringOdds: getOdds(inheritedDVs.femaleOffspring),
    genderlessOffspringOdds: getOdds(inheritedDVs.genderlessOffspring),
  };
}
