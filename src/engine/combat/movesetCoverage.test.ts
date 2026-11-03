import { describe, expect, it, vi } from 'vitest';
import { calculateMovesetCoverage, evaluatePartyCoverage, type MoveMetadata } from './movesetCoverage';

describe('movesetCoverage', () => {
  const mockTypeMultiplier = vi.fn<(moveType: string, targetTypes: string[]) => number>(
    (moveType: string, targetTypes: string[]) => {
      if (moveType === 'fire' && targetTypes.includes('grass')) return 2;
      if (moveType === 'water' && targetTypes.includes('fire')) return 2;
      if (moveType === 'grass' && targetTypes.includes('fire')) return 0.5;
      if (moveType === 'electric' && targetTypes.includes('ground')) return 0;
      return 1;
    },
  );

  const fireMove: MoveMetadata = { id: 1, type: 'fire', power: 90, category: 'special' };
  const waterMove: MoveMetadata = { id: 2, type: 'water', power: 90, category: 'special' };
  const grassMove: MoveMetadata = { id: 3, type: 'grass', power: 90, category: 'special' };
  const statusMove: MoveMetadata = { id: 4, type: 'normal', power: 0, category: 'status' };

  describe('calculateMovesetCoverage', () => {
    it('returns the maximum multiplier and the best moves', () => {
      const moves = [fireMove, waterMove, grassMove];
      const result = calculateMovesetCoverage(moves, ['grass'], mockTypeMultiplier);

      expect(result.maxMultiplier).toBe(2);
      expect(result.bestMoves).toHaveLength(1);
      expect(result.bestMoves[0]?.id).toBe(1); // fire move
    });

    it('ignores status moves', () => {
      const moves = [statusMove];
      const result = calculateMovesetCoverage(moves, ['grass'], mockTypeMultiplier);

      expect(result.maxMultiplier).toBe(1);
      expect(result.bestMoves).toHaveLength(0);
    });

    it('handles multiple best moves with the same multiplier', () => {
      const moves = [fireMove, waterMove];
      // Target types both grass and fire, wait mock doesn't handle multiple targets well
      // But we can just use single target 'grass'
      // wait, fire->grass is 2, water->fire is 2. Let's make mock handle two targets?
      // Our mock returns 1 for fire vs fire, so let's just make two moves return 2
      const customMock = vi.fn<(moveType: string) => number>((moveType: string) => {
        if (moveType === 'fire' || moveType === 'water') return 2;
        return 1;
      });
      const result = calculateMovesetCoverage(moves, ['grass'], customMock);

      expect(result.maxMultiplier).toBe(2);
      expect(result.bestMoves).toHaveLength(2);
      expect(result.bestMoves.map((m) => m.id)).toEqual([1, 2]);
    });

    it('returns 1 and empty array when no moves are provided', () => {
      const result = calculateMovesetCoverage([], ['grass'], mockTypeMultiplier);

      expect(result.maxMultiplier).toBe(1);
      expect(result.bestMoves).toHaveLength(0);
    });
  });

  describe('evaluatePartyCoverage', () => {
    it('evaluates coverage for multiple movesets', () => {
      const party = [[fireMove, statusMove], [waterMove], [grassMove]];

      const results = evaluatePartyCoverage(party, ['fire'], mockTypeMultiplier);

      expect(results).toHaveLength(3);
      expect(results[0]?.maxMultiplier).toBe(1); // fire vs fire
      expect(results[1]?.maxMultiplier).toBe(2); // water vs fire
      expect(results[2]?.maxMultiplier).toBe(0.5); // grass vs fire
    });
  });
});
