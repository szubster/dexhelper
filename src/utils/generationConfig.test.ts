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

  it('should fall back to Gen 1 configuration for an unknown generation (e.g. Gen 3)', () => {
    const config = getGenerationConfig(3);
    // Since Gen 3 is not yet implemented/registered, it should return Gen 1 fallback.
    expect(config).toBe(GENERATION_CONFIGS[1]);
  });

  it('should fall back to Gen 1 configuration for generation 0', () => {
    const config = getGenerationConfig(0);
    expect(config).toBe(GENERATION_CONFIGS[1]);
  });

  it('should fall back to Gen 1 configuration for negative generation numbers', () => {
    const config = getGenerationConfig(-1);
    expect(config).toBe(GENERATION_CONFIGS[1]);
  });

  it('should fall back to Gen 1 configuration for an arbitrarily large generation number', () => {
    const config = getGenerationConfig(999);
    expect(config).toBe(GENERATION_CONFIGS[1]);
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
