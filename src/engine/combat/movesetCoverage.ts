export interface MoveMetadata {
  id: number;
  type: string;
  power: number;
  category: 'physical' | 'special' | 'status';
}

export interface CoverageResult {
  maxMultiplier: number;
  bestMoves: MoveMetadata[];
}

export type TypeMultiplierFn = (moveType: string, targetTypes: string[]) => number;

export function calculateMovesetCoverage(
  moves: MoveMetadata[],
  targetTypes: string[],
  getTypeMultiplier: TypeMultiplierFn,
): CoverageResult {
  let maxMultiplier = -1;
  let bestMoves: MoveMetadata[] = [];

  for (const move of moves) {
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

  // If all moves were status moves, or no moves were provided
  if (maxMultiplier === -1) {
    return { maxMultiplier: 1, bestMoves: [] };
  }

  return { maxMultiplier, bestMoves };
}

export function evaluatePartyCoverage(
  partyMovesets: MoveMetadata[][],
  targetTypes: string[],
  getTypeMultiplier: TypeMultiplierFn,
): CoverageResult[] {
  return partyMovesets.map((moves) => calculateMovesetCoverage(moves, targetTypes, getTypeMultiplier));
}
