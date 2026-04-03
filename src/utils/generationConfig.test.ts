import { describe, it, expect } from 'vitest';
import { getGenerationConfig, getVersionInfo } from './generationConfig';

describe('generationConfig', () => {
  describe('getGenerationConfig', () => {
    it('should return the correct config for Gen 1', () => {
      const config = getGenerationConfig(1);
      expect(config.id).toBe(1);
      expect(config.label).toBe('Gen I');
    });

    it('should return the correct config for Gen 2', () => {
      const config = getGenerationConfig(2);
      expect(config.id).toBe(2);
      expect(config.label).toBe('Gen II');
    });

    it('should fallback to Gen 1 for an unknown generation', () => {
      const config = getGenerationConfig(999);
      expect(config.id).toBe(1);
    });
  });

  describe('getVersionInfo', () => {
    it('should return the correct info for a Gen 1 version (red)', () => {
      const info = getVersionInfo('red');
      expect(info).not.toBeNull();
      expect(info?.genConfig.id).toBe(1);
      expect(info?.version.id).toBe('red');
      expect(info?.version.label).toBe('Red');
    });

    it('should return the correct info for a Gen 2 version (gold)', () => {
      const info = getVersionInfo('gold');
      expect(info).not.toBeNull();
      expect(info?.genConfig.id).toBe(2);
      expect(info?.version.id).toBe('gold');
      expect(info?.version.label).toBe('Gold');
    });

    it('should return null for an invalid version ID', () => {
      const info = getVersionInfo('emerald');
      expect(info).toBeNull();
    });
  });
});
