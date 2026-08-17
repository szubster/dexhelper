import { describe, expect, it } from 'vitest';
import { MB_HORIZONTAL_RAIL } from './acroBikeParser';
import { MB_MUDDY_SLOPE } from './machBikeParser';
import { parseBikeRequirements } from './mapRequirements';

describe('parseBikeRequirements', () => {
  it('should return false for both bikes if no specific metatiles are present', () => {
    const req = parseBikeRequirements([0x00, 0x01]);
    expect(req.requiresMachBike).toBe(false);
    expect(req.requiresAcroBike).toBe(false);
  });

  it('should return true for Mach bike if Mach bike metatile is present', () => {
    const req = parseBikeRequirements([MB_MUDDY_SLOPE]);
    expect(req.requiresMachBike).toBe(true);
    expect(req.requiresAcroBike).toBe(false);
  });

  it('should return true for Acro bike if Acro bike metatile is present', () => {
    const req = parseBikeRequirements([MB_HORIZONTAL_RAIL]);
    expect(req.requiresMachBike).toBe(false);
    expect(req.requiresAcroBike).toBe(true);
  });

  it('should return true for both if both metatiles are present', () => {
    const req = parseBikeRequirements([MB_MUDDY_SLOPE, MB_HORIZONTAL_RAIL]);
    expect(req.requiresMachBike).toBe(true);
    expect(req.requiresAcroBike).toBe(true);
  });
});
