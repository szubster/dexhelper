export function hasGen2ExclusiveMove(moves: number[]): boolean {
  if (!moves || moves.length === 0) {
    return false;
  }

  return moves.some((moveId) => moveId > 165);
}
