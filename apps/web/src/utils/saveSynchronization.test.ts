import { describe, expect, it } from 'vitest';
import type { SaveData } from '@dexhelper/engine/saveParser/parsers/common';
import { calculateSynchronizedState } from './saveSynchronization';

describe('calculateSynchronizedState', () => {
  it('should return empty sets for no saves', () => {
    const result = calculateSynchronizedState({});
    expect(result.owned.size).toBe(0);
    expect(result.seen.size).toBe(0);
    expect(result.items.size).toBe(0);
  });

  it('should unify state from a single save', () => {
    const saves: Record<string, SaveData> = {
      save1: {
        owned: new Set([1, 2]),
        seen: new Set([1, 2, 3]),
        inventory: [{ id: 10, quantity: 1 }],
        pcItems: [{ id: 20, quantity: 5 }],
      } as unknown as SaveData,
    };
    const result = calculateSynchronizedState(saves);
    expect(result.owned).toEqual(new Set([1, 2]));
    expect(result.seen).toEqual(new Set([1, 2, 3]));
    expect(result.items).toEqual(new Set([10, 20]));
  });

  it('should unify state from multiple saves, ignoring zero quantity items', () => {
    const saves: Record<string, SaveData> = {
      save1: {
        owned: new Set([1, 2]),
        seen: new Set([1, 2, 3]),
        inventory: [{ id: 10, quantity: 1 }],
        pcItems: [{ id: 20, quantity: 0 }],
      } as unknown as SaveData,
      save2: {
        owned: new Set([2, 4]),
        seen: new Set([2, 4, 5]),
        inventory: [
          { id: 10, quantity: 2 },
          { id: 30, quantity: 1 },
        ],
        pcItems: [{ id: 40, quantity: 1 }],
      } as unknown as SaveData,
    };
    const result = calculateSynchronizedState(saves);
    expect(result.owned).toEqual(new Set([1, 2, 4]));
    expect(result.seen).toEqual(new Set([1, 2, 3, 4, 5]));
    expect(result.items).toEqual(new Set([10, 30, 40]));
  });
});
