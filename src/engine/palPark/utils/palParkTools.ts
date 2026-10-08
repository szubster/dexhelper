/**
 * @module palParkTools
 *
 * Utilities for evaluating Generation 3 Pokémon compatibility with Pal Park migration.
 *
 * **Why this is necessary:**
 * In Generation 4 (Diamond, Pearl, Platinum, HeartGold, SoulSilver), Pal Park allows players
 * to transfer Pokémon from Gen 3 Game Boy Advance cartridges (Ruby, Sapphire, Emerald,
 * FireRed, LeafGreen). However, the original game engine strictly prohibits migrating Pokémon
 * that currently know any Hidden Machine (HM) move.
 *
 * **Architectural Rationale:**
 * HM moves (such as Surf, Cut, or Fly) are required to navigate overworld obstacles in Gen 3.
 * Allowing a player to transfer their only HM-knowing Pokémon out of a Gen 3 save file could
 * result in sequence breaks, progression soft-locks, or unrecoverable save states.
 * Therefore, the application identifies HM-knowers so players can delete these moves at a Move Deleter
 * before attempting transfer.
 */

/** HM01 Cut internal move ID (Gen 3). Used for clearing small trees in the overworld. */
export const MOVE_CUT = 15;
/** HM02 Fly internal move ID (Gen 3). Used for fast-traveling to previously visited towns. */
export const MOVE_FLY = 19;
/** HM03 Surf internal move ID (Gen 3). Used for traveling across water bodies. */
export const MOVE_SURF = 57;
/** HM04 Strength internal move ID (Gen 3). Used for pushing heavy boulders. */
export const MOVE_STRENGTH = 70;
/** HM07 (R/S/E) / HM08 (FR/LG) Waterfall internal move ID (Gen 3). Used for climbing waterfalls. */
export const MOVE_WATERFALL = 127;
/** HM05 Flash internal move ID (Gen 3). Used for illuminating dark caves. */
export const MOVE_FLASH = 148;
/** HM06 Rock Smash internal move ID (Gen 3). Used for breaking cracked rocks. */
export const MOVE_ROCK_SMASH = 249;
/** HM08 (R/S/E) Dive internal move ID (Gen 3). Used for diving into deep ocean trenches. */
export const MOVE_DIVE = 291;

/**
 * Array of all Generation 3 Hidden Machine (HM) Move IDs.
 *
 * Includes:
 * - Cut (15)
 * - Fly (19)
 * - Surf (57)
 * - Strength (70)
 * - Waterfall (127)
 * - Flash (148)
 * - Rock Smash (249)
 * - Dive (291)
 */
export const GEN3_HM_MOVES: number[] = [
  MOVE_CUT,
  MOVE_FLY,
  MOVE_SURF,
  MOVE_STRENGTH,
  MOVE_WATERFALL,
  MOVE_FLASH,
  MOVE_ROCK_SMASH,
  MOVE_DIVE,
];

/**
 * Checks whether a list of move IDs contains at least one Generation 3 HM move.
 *
 * @param moveIds - An array of internal move IDs known by a Pokémon candidate.
 * @returns `true` if any move ID in the array matches a Gen 3 HM move, `false` otherwise.
 *
 * @example
 * // Check a Pokemon knowing Tackle (33) and Cut (15)
 * const holdsHM = hasGen3HMMoves([33, 15]);
 * console.log(holdsHM); // true (Cut is HM01)
 *
 * @example
 * // Check a Pokemon knowing only standard moves
 * const holdsHM = hasGen3HMMoves([33, 52]);
 * console.log(holdsHM); // false
 */
export function hasGen3HMMoves(moveIds: number[]): boolean {
  if (!moveIds || moveIds.length === 0) {
    return false;
  }

  return moveIds.some((moveId) => GEN3_HM_MOVES.includes(moveId));
}
