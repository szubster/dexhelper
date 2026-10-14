/**
 * @module inheritance
 *
 * Core Gen 2 breeding Determinant Value (DV) inheritance engine.
 *
 * **Gen 2 Breeding Architecture:**
 * In Generation 2 (Gold/Silver/Crystal), Pokémon stats are determined by DVs ranging from 0 to 15.
 * During breeding, offspring do NOT generate completely random DVs. Instead, Defense and Special DVs
 * are directly inherited from a parent:
 * 1. **Ditto Parent:** If Ditto is one of the parents, the offspring inherits DVs from the non-Ditto parent.
 * 2. **Male x Female Pairing:** The offspring inherits DVs from the parent of the *opposite* gender.
 *    - Male offspring inherit Defense and Special DVs from the Female parent.
 *    - Female offspring inherit Defense and Special DVs from the Male parent.
 *
 * Because Gen 2 shininess is tied directly to specific DV combinations (Defense DV = 10, Special DV = 10),
 * this inheritance rule enables breeding for high-probability shiny offspring (1/64 odds).
 */

import { EGG_GROUP } from '../../db/schema';
import type { PokemonDVs, PokemonWithMetadata } from './pair_algorithm';

/**
 * Result structure detailing the inherited parent DVs for each potential offspring gender.
 */
export interface InheritedDVsResult {
  /** Partial DVs (Defense and Special) inherited if the offspring is Male. */
  maleOffspring: Partial<PokemonDVs>;
  /** Partial DVs (Defense and Special) inherited if the offspring is Female. */
  femaleOffspring: Partial<PokemonDVs>;
  /** Partial DVs (Defense and Special) inherited if the offspring is Genderless. */
  genderlessOffspring: Partial<PokemonDVs>;
}

/**
 * Determines which parent's DVs are inherited by the offspring in Gen 2 breeding.
 *
 * In Generation 2:
 * - Defense and Special DVs are passed down to the offspring.
 * - If Ditto is one of the parents, the offspring inherits DVs from the non-Ditto parent.
 * - Otherwise (Male x Female), the offspring inherits DVs from the parent of the opposite gender.
 *   - A Male offspring inherits from the Female parent.
 *   - A Female offspring inherits from the Male parent.
 *
 * @param parentA - The first parent candidate.
 * @param parentB - The second parent candidate.
 * @returns An object detailing the inherited Defense and Special DVs for each offspring gender.
 *
 * @example
 * const femaleShinyCarrier = { id: 'f1', speciesId: 25, gender: 'Female', eggGroups: [1], dvs: { attack: 10, defense: 10, speed: 10, special: 10 } };
 * const maleNormal = { id: 'm1', speciesId: 25, gender: 'Male', eggGroups: [1], dvs: { attack: 2, defense: 2, speed: 2, special: 2 } };
 * const inherited = determineInheritedDVs(femaleShinyCarrier, maleNormal);
 * // Male offspring inherits defense: 10, special: 10 from Female parent
 */
export function determineInheritedDVs(parentA: PokemonWithMetadata, parentB: PokemonWithMetadata): InheritedDVsResult {
  const p1IsDitto = parentA.eggGroups.includes(EGG_GROUP.DITTO);
  const p2IsDitto = parentB.eggGroups.includes(EGG_GROUP.DITTO);

  // Helper to extract inherited DVs (only Defense and Special are passed down in Gen 2)
  const extractDVs = (parent: PokemonWithMetadata): Partial<PokemonDVs> => {
    if (!parent.dvs) return {};
    return {
      defense: parent.dvs.defense,
      special: parent.dvs.special,
    };
  };

  // If one parent is Ditto, the non-Ditto parent passes down its DVs to all offspring.
  if (p1IsDitto || p2IsDitto) {
    // Ditto x Ditto cannot breed in Gen 2
    if (p1IsDitto && p2IsDitto) {
      return {
        maleOffspring: {},
        femaleOffspring: {},
        genderlessOffspring: {},
      };
    }
    const nonDittoParent = p1IsDitto ? parentB : parentA;
    const inherited = extractDVs(nonDittoParent);
    return {
      maleOffspring: inherited,
      femaleOffspring: inherited,
      genderlessOffspring: inherited,
    };
  }

  // Standard Male x Female pairing: opposite-gender parent DV inheritance
  const maleParent = parentA.gender === 'Male' ? parentA : parentB.gender === 'Male' ? parentB : null;
  const femaleParent = parentA.gender === 'Female' ? parentA : parentB.gender === 'Female' ? parentB : null;

  // Invalid pair without both male and female representation
  if (!maleParent || !femaleParent) {
    return {
      maleOffspring: {},
      femaleOffspring: {},
      genderlessOffspring: {},
    };
  }

  // Offspring inherits Defense and Special DVs from opposite-gender parent
  return {
    maleOffspring: extractDVs(femaleParent),
    femaleOffspring: extractDVs(maleParent),
    genderlessOffspring: {},
  };
}
