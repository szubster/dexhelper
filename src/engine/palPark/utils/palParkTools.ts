/**
 * Generation 3 HM Move IDs
 * Includes: Cut (15), Fly (19), Surf (57), Strength (70), Flash (148), Rock Smash (249), Waterfall (127), and Dive (291).
 */
export const GEN3_HM_MOVES: number[] = [15, 19, 57, 70, 127, 148, 249, 291];

export function hasGen3HMMoves(moveIds: number[]): boolean {
  if (!moveIds || moveIds.length === 0) {
    return false;
  }

  return moveIds.some((moveId) => GEN3_HM_MOVES.includes(moveId));
}
