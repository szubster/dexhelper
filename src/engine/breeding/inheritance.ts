import { EGG_GROUP } from '../../db/schema';
import type { PokemonDVs, PokemonWithMetadata } from './pair_algorithm';

export interface InheritedDVsResult {
  maleOffspring: Partial<PokemonDVs>;
  femaleOffspring: Partial<PokemonDVs>;
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
 * @param parentA - The first parent
 * @param parentB - The second parent
 * @returns An object indicating which parent's DVs are inherited for each possible offspring gender.
 */
export function determineInheritedDVs(parentA: PokemonWithMetadata, parentB: PokemonWithMetadata): InheritedDVsResult {
  const p1IsDitto = parentA.eggGroups.includes(EGG_GROUP.DITTO);
  const p2IsDitto = parentB.eggGroups.includes(EGG_GROUP.DITTO);

  // Helper to extract the inherited DVs (only defense and special)
  const extractDVs = (parent: PokemonWithMetadata): Partial<PokemonDVs> => {
    if (!parent.dvs) return {};
    return {
      defense: parent.dvs.defense,
      special: parent.dvs.special,
    };
  };

  // If one parent is Ditto, the non-Ditto parent passes down its DVs to all offspring.
  if (p1IsDitto || p2IsDitto) {
    // If both are Ditto, they can't breed, but we'll default to returning empty/no inheritance
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

  // Male x Female case
  // Identify which parent is Male and which is Female
  const maleParent = parentA.gender === 'Male' ? parentA : parentB.gender === 'Male' ? parentB : null;
  const femaleParent = parentA.gender === 'Female' ? parentA : parentB.gender === 'Female' ? parentB : null;

  // If we don't have a strict Male x Female pairing (and no Ditto), this is an invalid breed
  if (!maleParent || !femaleParent) {
    return {
      maleOffspring: {},
      femaleOffspring: {},
      genderlessOffspring: {},
    };
  }

  // Offspring inherits from opposite-gender parent
  // Male offspring inherits from Female parent
  // Female offspring inherits from Male parent
  return {
    maleOffspring: extractDVs(femaleParent),
    femaleOffspring: extractDVs(maleParent),
    // Genderless offspring technically shouldn't occur from a Male x Female pair that isn't Ditto,
    // but we can default to empty or the female parent. Let's return empty for safety.
    genderlessOffspring: {},
  };
}
