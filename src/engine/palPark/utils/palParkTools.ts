export const MOVE_CUT = 15;
export const MOVE_FLY = 19;
export const MOVE_SURF = 57;
export const MOVE_STRENGTH = 70;
export const MOVE_WATERFALL = 127;
export const MOVE_FLASH = 148;
export const MOVE_ROCK_SMASH = 249;
export const MOVE_DIVE = 291;

/**
 * Generation 3 HM Move IDs
 * Includes: Cut (15), Fly (19), Surf (57), Strength (70), Waterfall (127), Flash (148), Rock Smash (249), and Dive (291).
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

export function hasGen3HMMoves(moveIds: number[]): boolean {
  if (!moveIds || moveIds.length === 0) {
    return false;
  }

  return moveIds.some((moveId) => GEN3_HM_MOVES.includes(moveId));
}
