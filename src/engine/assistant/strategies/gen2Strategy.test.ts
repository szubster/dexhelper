import { describe, expect, it } from 'vitest';
import type { UnifiedLocation } from '../../../db/schema';
import type { SaveData } from '../../saveParser/parsers/common';
import { gen2Strategy } from './gen2Strategy';

describe('gen2Strategy', () => {
  const mockLocations: UnifiedLocation[] = [
    { id: 0x0306, n: 'Goldenrod City', conn: [0x0a], dist: { 0x0a: 1 } },
    { id: 0x0a, n: 'Saffron City', conn: [0x0306], dist: { 0x0306: 1 } },
    { id: 0x25, n: 'Goldenrod Pokecenter', prnt: 0x0306, conn: [], dist: {} },
    { id: 0x26, n: 'Goldenrod Pokecenter 2F', prnt: 0x25, conn: [], dist: {} },
  ];

  const mockSaveData: SaveData = {
    trainerName: 'GOLD',
    trainerId: 12345,
    playTime: { hours: 1, minutes: 0, seconds: 0, frames: 0 },
    owned: new Set(),
    seen: new Set(),
    party: [],
    partyDetails: [],
    pcDetails: [],
    currentMapId: 0x0306,
    money: 1000,
    badges: 0,
    inventory: [],
    currentBoxCount: 0,
    hallOfFameCount: 0,
    checksum: 0,
  };

  describe('resolveMapAid', () => {
    it('resolves outdoor map to itself', () => {
      const result = gen2Strategy.resolveMapAid(mockSaveData, mockLocations, 0x0306);
      expect(result).toBe(0x0306);
    });

    it('resolves indoor map to outdoor parent', () => {
      const result = gen2Strategy.resolveMapAid(mockSaveData, mockLocations, 0x25);
      expect(result).toBe(0x0306);
    });

    it('resolves multi-level indoor map to root outdoor parent', () => {
      const result = gen2Strategy.resolveMapAid(mockSaveData, mockLocations, 0x26);
      expect(result).toBe(0x0306);
    });

    it('returns null for unknown mapId', () => {
      const result = gen2Strategy.resolveMapAid(mockSaveData, mockLocations, 0x999);
      expect(result).toBeNull();
    });
  });

  describe('getMapDistance', () => {
    it('calculates distance across regions', () => {
      const result = gen2Strategy.getMapDistance(0x0306, 0x0a, mockLocations);
      expect(result).toEqual({ distance: 1, name: 'Saffron City' });
    });

    it('handles indoor start locations via resolveMapAid integration (manual check)', () => {
      const resolvedStart = gen2Strategy.resolveMapAid(mockSaveData, mockLocations, 0x26);
      if (resolvedStart === null) throw new Error('Failed to resolve start');
      const result = gen2Strategy.getMapDistance(resolvedStart, 0x0a, mockLocations);
      expect(result).toEqual({ distance: 1, name: 'Saffron City' });
    });
  });

  describe('getUnobtainableReason', () => {
    it('delegates to gen2Exclusives', () => {
      // Ekans (23) is Silver exclusive.
      const result = gen2Strategy.getUnobtainableReason(23, 'gold', 0, new Set());
      expect(result).toContain('Must be traded');
    });
  });
});
