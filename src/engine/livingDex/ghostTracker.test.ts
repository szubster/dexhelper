import { describe, expect, it, vi } from 'vitest';
import * as configModule from '../../utils/generationConfig';
import type { SaveData } from '../saveParser/parsers/common';
import { getLivingDexGhosts } from './ghostTracker';

// Mock getGenerationConfig
vi.mock('../../utils/generationConfig', () => ({
  getGenerationConfig: vi.fn<typeof configModule.getGenerationConfig>(),
}));

describe('ghostTracker', () => {
  it('identifies missing physical pokemon correctly up to maxDex', () => {
    // Mock Gen 1 with 151
    vi.mocked(configModule.getGenerationConfig).mockReturnValueOnce({
      maxDex: 151,
    } as import('../../utils/generationConfig').GenerationConfig);

    const mockSave: Partial<SaveData> = {
      generation: 1,
      party: [1, 2, 3, 0, 0, 0], // Bulbasaur, Ivysaur, Venusaur
      pc: [4, 5, 200, 0], // Charmander, Charmeleon (200 is invalid/egg/beyond maxDex)
    };

    const ghosts = getLivingDexGhosts(mockSave as SaveData);

    // We have 1,2,3,4,5. We are missing 6-151.
    // Length should be 151 - 5 = 146
    expect(ghosts.length).toBe(146);
    expect(ghosts.includes(1)).toBe(false);
    expect(ghosts.includes(5)).toBe(false);
    expect(ghosts.includes(6)).toBe(true);
    expect(ghosts.includes(151)).toBe(true);
    expect(ghosts.includes(200)).toBe(false); // Out of bounds
  });

  it('throws NotImplemented when regionalOnly is true', () => {
    const mockSave: Partial<SaveData> = {
      generation: 1,
      party: [],
      pc: [],
    };
    expect(() => getLivingDexGhosts(mockSave as SaveData, true)).toThrowError(/NotImplemented/);
  });
});
