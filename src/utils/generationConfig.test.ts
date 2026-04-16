import { describe, expect, it } from 'vitest';
import { GENERATION_CONFIGS, getGenerationConfig, getVersionInfo } from './generationConfig';

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
