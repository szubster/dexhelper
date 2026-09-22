/**
 * Evaluates whether a list of move IDs contains any move introduced in Generation 2.
 *
 * **Architecture Note:**
 * Generation 1 (Red/Blue/Yellow) contains exactly 165 moves (Pound through Struggle).
 * Generation 2 (Gold/Silver/Crystal) expanded the move pool starting at ID 166 (Sketch).
 * When trading Pokémon back to Generation 1 via the Time Capsule in Generation 2,
 * any move with an ID greater than 165 is invalid and causes the trade to be rejected.
 *
 * @param moves - An array of internal move IDs known by the Pokémon.
 * @returns `true` if any move ID in the array is greater than 165, `false` otherwise.
 *
 * @example
 * // Move 1 (Pound) and Move 85 (Thunderbolt) are Gen 1 moves
 * hasGen2ExclusiveMove([1, 85]); // returns false
 *
 * // Move 166 (Sketch) was introduced in Gen 2
 * hasGen2ExclusiveMove([1, 166]); // returns true
 */
export function hasGen2ExclusiveMove(moves: number[]): boolean {
  if (!moves || moves.length === 0) {
    return false;
  }

  return moves.some((moveId) => moveId > 165);
}
