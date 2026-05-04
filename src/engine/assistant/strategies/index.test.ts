import { describe, expect, it } from 'vitest';

import { gen1Strategy } from './gen1Strategy';
import { getStrategy } from './index';

describe('getStrategy', () => {
  it('returns gen1Strategy for generation 1', () => {
    expect(getStrategy(1)).toBe(gen1Strategy);
  });
});
