import { describe, expect, it } from 'vitest';
import { objectEntries, objectKeys } from './object';

describe('object utilities', () => {
  it('objectEntries correctly types and returns entries', () => {
    type TestUnion = 'A' | 'B';
    const obj: Partial<Record<TestUnion, number>> = { A: 1, B: 2 };
    const entries = objectEntries(obj);
    expect(entries).toEqual([
      ['A', 1],
      ['B', 2],
    ]);
  });

  it('objectKeys correctly types and returns keys', () => {
    type TestUnion = 'A' | 'B';
    const obj: Partial<Record<TestUnion, number>> = { A: 1 };
    const keys = objectKeys(obj);
    expect(keys).toEqual(['A']);
  });
});
