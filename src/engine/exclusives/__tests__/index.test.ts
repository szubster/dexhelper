import { describe, expect, it } from 'vitest';
import { getExclusivesChecker } from '../index';
import { getUnobtainableReason } from '../gen1Exclusives';

describe('getExclusivesChecker', () => {
  it('returns gen1UnobtainableReason for generation 1', () => {
    const checker = getExclusivesChecker(1);
    expect(checker).toBe(getUnobtainableReason);
  });

  it('returns null for unsupported generations', () => {
    expect(getExclusivesChecker(2)).toBeNull();
    expect(getExclusivesChecker(3)).toBeNull();
    expect(getExclusivesChecker(0)).toBeNull();
  });
});
