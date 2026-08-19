import { describe, expect, it } from 'vitest';
import { GENERATION_CONFIGS, getGenerationConfig, POKEBALL_LABELS, VERSION_THEMES } from './generationConfig';

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
  it('VERSION_THEMES should contain entries for all versions, unsupported, and unknown', () => {
    // Assert known values
    // biome-ignore lint/complexity/useLiteralKeys: Using literal access here fails type-check due to index signature
    expect(VERSION_THEMES['red']).toBe('theme-red');
    // biome-ignore lint/complexity/useLiteralKeys: Using literal access here fails type-check due to index signature
    expect(VERSION_THEMES['gold']).toBe('theme-gold');
    // biome-ignore lint/complexity/useLiteralKeys: Using literal access here fails type-check due to index signature
    expect(VERSION_THEMES['unsupported']).toBe('');
    // biome-ignore lint/complexity/useLiteralKeys: Using literal access here fails type-check due to index signature
    expect(VERSION_THEMES['unknown']).toBe('');

    // Dynamically assert that all version IDs have a theme class
    Object.values(GENERATION_CONFIGS).forEach((gc) => {
      gc.versions.forEach((v) => {
        expect(VERSION_THEMES[v.id]).toBe(v.themeClass);
      });
    });
  });

  it('POKEBALL_LABELS should contain labels for all known pokeball types', () => {
    expect(POKEBALL_LABELS.poke).toBe('Poké Ball');
    expect(POKEBALL_LABELS.great).toBe('Great Ball');
    expect(POKEBALL_LABELS.safari).toBe('Safari Ball');
    // Ensure it's an object with the correct structure
    expect(typeof POKEBALL_LABELS).toBe('object');
  });
});
