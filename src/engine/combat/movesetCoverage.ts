/**
 * @module combat/movesetCoverage
 * Evaluates offensive type coverage for single Pokémon movesets and entire player parties
 * against given defending type configurations.
 */

/**
 * Structural metadata for an offensive or status move required for coverage evaluation.
 */
export interface MoveMetadata {
  /** Unique move identifier matching the database and ROM move indices. */
  id: number;
  /** Primary elemental type name (e.g., 'fire', 'water', 'electric'). */
  type: string;
  /** Base attack power value; 0 for non-damaging status moves. */
  power: number;
  /** Damage split classification determining whether the move executes damage or utility effects. */
  category: 'physical' | 'special' | 'status';
}

/**
 * Result of evaluating offensive moveset effectiveness against a defender's type composition.
 */
export interface CoverageResult {
  /**
   * The highest type-effectiveness damage multiplier achievable by the moveset.
   * Defaults to 1 (neutral effectiveness) when no damaging moves are available.
   */
  maxMultiplier: number;
  /**
   * List of moves from the evaluated moveset that tie for the maximum damage multiplier.
   * Empty if no damaging moves were available.
   */
  bestMoves: MoveMetadata[];
}

/**
 * Function contract for resolving the cumulative type-effectiveness multiplier
 * of an attacking move type against an array of target defending types (including dual types).
 *
 * @param moveType - Elemental type string of the attacking move.
 * @param targetTypes - Array of defending elemental type strings.
 * @returns The compound effectiveness multiplier (e.g., 0, 0.25, 0.5, 1, 2, 4).
 */
export type TypeMultiplierFn = (moveType: string, targetTypes: string[]) => number;

/**
 * Determines the maximum offensive multiplier and top-performing moves from a moveset
 * against a specific target type composition.
 *
 * @remarks
 * Status moves are intentionally skipped because they do not deal direct type-based damage.
 * If all provided moves are status moves, or if an empty moveset is supplied, the multiplier
 * defaults to 1 (neutral baseline) and an empty list of best moves is returned to avoid
 * skewing coverage scores with false zeros or nulls.
 *
 * @param moves - List of move metadata representing the Pokémon's current known moveset.
 * @param targetTypes - Defending type array of the opposing Pokémon.
 * @param getTypeMultiplier - Callback resolving attacker-to-defender type matchups.
 * @returns An object containing the highest multiplier achieved and all moves achieving that multiplier.
 *
 * @example
 * ```ts
 * const coverage = calculateMovesetCoverage(
 *   [
 *     { id: 53, type: 'fire', power: 90, category: 'special' },
 *     { id: 55, type: 'water', power: 90, category: 'special' },
 *   ],
 *   ['grass'],
 *   (moveType, targets) => (moveType === 'fire' ? 2 : 0.5),
 * );
 * // coverage => { maxMultiplier: 2, bestMoves: [{ id: 53, type: 'fire', ... }] }
 * ```
 */
export function calculateMovesetCoverage(
  moves: MoveMetadata[],
  targetTypes: string[],
  getTypeMultiplier: TypeMultiplierFn,
): CoverageResult {
  let maxMultiplier = -1;
  let bestMoves: MoveMetadata[] = [];

  for (const move of moves) {
    // Non-damaging status moves do not contribute to direct elemental damage coverage
    if (move.category === 'status') {
      continue;
    }
    const multiplier = getTypeMultiplier(move.type, targetTypes);
    if (multiplier > maxMultiplier) {
      maxMultiplier = multiplier;
      bestMoves = [move];
    } else if (multiplier === maxMultiplier) {
      bestMoves.push(move);
    }
  }

  // Fallback to neutral 1x when no direct damaging moves are available
  if (maxMultiplier === -1) {
    return { maxMultiplier: 1, bestMoves: [] };
  }

  return { maxMultiplier, bestMoves };
}

/**
 * Evaluates offensive coverage across each Pokémon's moveset in an active player party.
 *
 * @param partyMovesets - Array of movesets, where each entry represents a party member's moves.
 * @param targetTypes - Defending type array of the opposing encounter or trainer Pokémon.
 * @param getTypeMultiplier - Callback resolving attacker-to-defender type matchups.
 * @returns Array of coverage results corresponding index-by-index to the provided party movesets.
 *
 * @example
 * ```ts
 * const partyResults = evaluatePartyCoverage(
 *   [moveset1, moveset2],
 *   ['fire'],
 *   getTypeMultiplier,
 * );
 * ```
 */
export function evaluatePartyCoverage(
  partyMovesets: MoveMetadata[][],
  targetTypes: string[],
  getTypeMultiplier: TypeMultiplierFn,
): CoverageResult[] {
  return partyMovesets.map((moves) => calculateMovesetCoverage(moves, targetTypes, getTypeMultiplier));
}
