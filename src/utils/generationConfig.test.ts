import { describe, expect, it } from 'vitest';
import {
  ALL_VERSION_IDS,
  GENERATION_CONFIGS,
  getGenerationConfig,
  getVersionInfo,
  MAX_DEX_ACROSS_GENS,
  POKEBALL_LABELS,
  VERSION_THEMES,
} from './generationConfig';

describe('getGenerationConfig', () => {
  it('should return the correct configuration for an existing generation (Gen 1)', () => {
    const config = getGenerationConfig(1);
    expect(config).toBe(GENERATION_CONFIGS[1]);
    expect(config.id).toBe(1);
  });

  it('should return the correct configuration for an existing generation (Gen 2)', () => {
    const config = getGenerationConfig(2);
    expect(config).toBe(GENERATION_CONFIGS[2]);
    expect(config.id).toBe(2);
  });

  it('should throw an error for an unknown generation (e.g. Gen 3)', () => {
    expect(() => getGenerationConfig(3)).toThrow('Unknown generation: 3');
  });

  it('should throw an error for generation 0', () => {
    expect(() => getGenerationConfig(0)).toThrow('Unknown generation: 0');
  });

  it('should throw an error for negative generation numbers', () => {
    expect(() => getGenerationConfig(-1)).toThrow('Unknown generation: -1');
  });

  it('should throw an error for an arbitrarily large generation number', () => {
    expect(() => getGenerationConfig(999)).toThrow('Unknown generation: 999');
  });
});

describe('getVersionInfo', () => {
  it('should return correct genConfig and version for known version id (red)', () => {
    const info = getVersionInfo('red');
    expect(info).not.toBeNull();
    expect(info?.genConfig.id).toBe(1);
    expect(info?.version.id).toBe('red');
  });

  it('should return correct genConfig and version for known version id (crystal)', () => {
    const info = getVersionInfo('crystal');
    expect(info).not.toBeNull();
    expect(info?.genConfig.id).toBe(2);
    expect(info?.version.id).toBe('crystal');
  });

  it('should return null for unknown version id', () => {
    const info = getVersionInfo('emerald');
    expect(info).toBeNull();
  });

  it('should return null for empty string version id', () => {
    const info = getVersionInfo('');
    expect(info).toBeNull();
  });

  it('should return null for undefined or null version id values', () => {
    // using 'as string' to test runtime behavior against undefined/null-ish inputs
    expect(getVersionInfo(undefined as unknown as string)).toBeNull();
    expect(getVersionInfo(null as unknown as string)).toBeNull();
  });
});

describe('generation config sprite URLs', () => {
  it('Gen 1 sprite URLs should be correct', () => {
    const gen1 = GENERATION_CONFIGS[1];
    if (!gen1) throw new Error('Gen 1 config missing');

    expect(gen1.spriteUrl(25, false)).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/25.png',
    );
    expect(gen1.spriteUrl(25, true)).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/25.png',
    );
    expect(gen1.fallbackSpriteUrl(25)).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    );
  });

  it('Gen 2 sprite URLs should be correct', () => {
    const gen2 = GENERATION_CONFIGS[2];
    if (!gen2) throw new Error('Gen 2 config missing');

    expect(gen2.spriteUrl(25, false)).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/25.png',
    );
    expect(gen2.spriteUrl(25, true)).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/shiny/25.png',
    );
    expect(gen2.fallbackSpriteUrl(25)).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    );
  });
});

describe('generation config constants', () => {
  it('MAX_DEX_ACROSS_GENS should be the maximum of maxDex across all generations', () => {
    // Dynamically test MAX_DEX_ACROSS_GENS based on GENERATION_CONFIGS
    const expectedMaxDex = Math.max(...Object.values(GENERATION_CONFIGS).map((c) => c.maxDex));
    expect(MAX_DEX_ACROSS_GENS).toBe(expectedMaxDex);
  });

  it('VERSION_THEMES should contain entries for all versions, unsupported, and unknown', () => {
    // Assert known values
    expect(VERSION_THEMES.red).toBe('theme-red');
    expect(VERSION_THEMES.gold).toBe('theme-gold');
    expect(VERSION_THEMES.unsupported).toBe('');
    expect(VERSION_THEMES.unknown).toBe('');

    // Dynamically assert that all version IDs have a theme class
    Object.values(GENERATION_CONFIGS).forEach((gc) => {
      gc.versions.forEach((v) => {
        expect(VERSION_THEMES[v.id]).toBe(v.themeClass);
      });
    });
  });

  it('ALL_VERSION_IDS should contain all known version IDs across all registered generations', () => {
    const expectedIds = Object.values(GENERATION_CONFIGS).flatMap((gc) => gc.versions.map((v) => v.id));
    expect(ALL_VERSION_IDS).toEqual(expectedIds);
    expect(ALL_VERSION_IDS.includes('red')).toBe(true);
    expect(ALL_VERSION_IDS.includes('crystal')).toBe(true);
  });

  it('POKEBALL_LABELS should contain labels for all known pokeball types', () => {
    expect(POKEBALL_LABELS.poke).toBe('Poké Ball');
    expect(POKEBALL_LABELS.great).toBe('Great Ball');
    expect(POKEBALL_LABELS.safari).toBe('Safari Ball');
    // Ensure it's an object with the correct structure
    expect(typeof POKEBALL_LABELS).toBe('object');
  });
});
