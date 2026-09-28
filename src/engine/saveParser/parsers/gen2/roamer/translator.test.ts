import { describe, expect, it } from 'vitest';
import { translateRoamerLocation } from './translator';

describe('translateRoamerLocation', () => {
  it('should successfully map valid mapGroup and mapId to route names', () => {
    expect(translateRoamerLocation(1, 9)).toBe('Route 38');
    expect(translateRoamerLocation(3, 40)).toBe('Slowpoke Well');
    expect(translateRoamerLocation(26, 1)).toBe('Route 30');
  });

  it('should return Unknown Location for invalid or unmapped coordinates', () => {
    expect(translateRoamerLocation(99, 99)).toBe('Unknown Location');
    expect(translateRoamerLocation(1, 99)).toBe('Unknown Location');
    expect(translateRoamerLocation(undefined, undefined)).toBe('Unknown Location');
    expect(translateRoamerLocation(1, undefined)).toBe('Unknown Location');
  });
});
