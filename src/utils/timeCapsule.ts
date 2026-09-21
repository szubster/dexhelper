import { hasGen2ExclusiveMove } from '../engine/moves/gen2Moves';
import { isGen1Species } from './species';

/**
 * Determines whether a Pokémon is eligible for Time Capsule transfer from Generation 2 back to Generation 1.
 *
 * **Architecture Note:**
 * Time Capsule trading in Pokémon Gold, Silver, and Crystal allows backward compatibility with Generation 1
 * (Red, Blue, Yellow). To prevent save corruption or game crashes when loading the transferred data into a
 * Gen 1 game, two strict conditions must be satisfied:
 * 1. The Pokémon must belong to the original Generation 1 species index (Pokedex IDs 1 to 151).
 * 2. The Pokémon must NOT know any move introduced in Generation 2 (move IDs > 165).
 *
 * @param pokemonId - The National Pokédex species ID of the Pokémon.
 * @param moves - An array of move IDs currently known by the Pokémon.
 * @returns `true` if the Pokémon is eligible to pass through the Time Capsule into Gen 1, `false` otherwise.
 *
 * @example
 * // Pikachu (ID 25) with Thunderbolt (Move 85)
 * isTimeCapsuleEligible(25, [85]); // returns true
 *
 * // Chikorita (ID 152 - Gen 2 species)
 * isTimeCapsuleEligible(152, [33]); // returns false
 */
export function isTimeCapsuleEligible(pokemonId: number, moves: number[]): boolean {
  return isGen1Species(pokemonId) && !hasGen2ExclusiveMove(moves);
}

/**
 * Validates Time Capsule eligibility and provides a descriptive reason if the Pokémon is ineligible.
 *
 * **Architecture Note:**
 * Used by UI components to display diagnostic validation feedback explaining why a Pokémon
 * cannot be traded back to Generation 1 via the Time Capsule.
 *
 * @param pokemonId - The National Pokédex species ID of the Pokémon.
 * @param moves - An array of move IDs currently known by the Pokémon.
 * @returns An object containing `isEligible` (boolean) and an optional `reason` string if ineligible.
 *
 * @example
 * getTimeCapsuleValidation(152, [33]);
 * // returns { isEligible: false, reason: 'INVALID: Gen 2 Species' }
 *
 * getTimeCapsuleValidation(25, [166]);
 * // returns { isEligible: false, reason: 'INVALID: Gen 2 Exclusive Move(s)' }
 *
 * getTimeCapsuleValidation(25, [85]);
 * // returns { isEligible: true }
 */
export function getTimeCapsuleValidation(pokemonId: number, moves: number[]): { isEligible: boolean; reason?: string } {
  if (!isGen1Species(pokemonId)) {
    return { isEligible: false, reason: 'INVALID: Gen 2 Species' };
  }
  if (hasGen2ExclusiveMove(moves)) {
    return { isEligible: false, reason: 'INVALID: Gen 2 Exclusive Move(s)' };
  }
  return { isEligible: true };
}
