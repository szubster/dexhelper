import { describe, expect, it, vi } from 'vitest';
import { pokeDB } from '../../db/PokeDB';
import type { UnifiedLocation } from '../../db/schema';
import { gen3HoennMapGraph, gen3KantoMapGraph, getDistanceToMap, resolveOutdoorMapId } from './gen3Graph';

// Mock the pokeDB dependency
vi.mock('../../db/PokeDB', () => {
  return {
    pokeDB: {
      getAllAreas: vi.fn<() => Promise<UnifiedLocation[]>>(),
    },
  };
});

const mockLocations: UnifiedLocation[] = [
  { id: 0, name: 'Littleroot Town', connections: [1], distances: { 0: 0, 1: 1, 2: 2 } },
  { id: 1, name: 'Route 101', connections: [0, 2], distances: { 1: 0, 0: 1, 2: 1 } },
  { id: 2, name: 'Oldale Town', connections: [1], distances: { 2: 0, 1: 1, 0: 2 } },
  { id: 3, name: 'Player House', parentId: 0, connections: [], distances: {} },
  { id: 4, name: 'Player House 2F', parentId: 3, connections: [], distances: {} },
  { id: 42, name: 'Pallet Town', connections: [43], distances: { 42: 0, 43: 1 } },
  { id: 43, name: 'Route 1', connections: [42], distances: { 43: 0, 42: 1 } },
  { id: 44, name: 'Player House Kanto', parentId: 42, connections: [], distances: {} },
  { id: 45, name: 'Player House Kanto 2F', parentId: 44, connections: [], distances: {} },
];

describe('gen3Graph', () => {
  describe('getDistanceToMap', () => {
    it('returns distance 0 when starting map is the target', async () => {
      vi.mocked(pokeDB.getAllAreas).mockResolvedValue(mockLocations);
      const result = await getDistanceToMap(0, 0);
      expect(result).toEqual({ distance: 0, name: 'Littleroot Town' });
    });

    it('returns distance 1 for an adjacent map', async () => {
      vi.mocked(pokeDB.getAllAreas).mockResolvedValue(mockLocations);
      const result = await getDistanceToMap(0, 1);
      expect(result).toEqual({ distance: 1, name: 'Route 101' });
    });

    it('gracefully falls back to parent map for indoor locations', async () => {
      vi.mocked(pokeDB.getAllAreas).mockResolvedValue(mockLocations);
      const result = await getDistanceToMap(3, 1);
      expect(result).toEqual({ distance: 1, name: 'Route 101' });
    });

    it('gracefully falls back to root parent map for multi-level indoor locations', async () => {
      vi.mocked(pokeDB.getAllAreas).mockResolvedValue(mockLocations);
      const result = await getDistanceToMap(4, 1);
      expect(result).toEqual({ distance: 1, name: 'Route 101' });
    });

    it('gracefully falls back to parent map for indoor locations in Kanto', async () => {
      vi.mocked(pokeDB.getAllAreas).mockResolvedValue(mockLocations);
      const result = await getDistanceToMap(44, 43);
      expect(result).toEqual({ distance: 1, name: 'Route 1' });
    });

    it('gracefully falls back to root parent map for multi-level indoor locations in Kanto', async () => {
      vi.mocked(pokeDB.getAllAreas).mockResolvedValue(mockLocations);
      const result = await getDistanceToMap(45, 43);
      expect(result).toEqual({ distance: 1, name: 'Route 1' });
    });

    it('defaults to map ID 0 for an unknown starting map', async () => {
      vi.mocked(pokeDB.getAllAreas).mockResolvedValue(mockLocations);
      const result = await getDistanceToMap(999, 1);
      expect(result).toEqual({ distance: 1, name: 'Route 101' });
    });

    it('returns null for an unknown target aid', async () => {
      vi.mocked(pokeDB.getAllAreas).mockResolvedValue(mockLocations);
      const result = await getDistanceToMap(0, 9999);
      expect(result).toBeNull();
    });

    it('returns null when start location cannot be resolved (no map id and no fallback map ID 0)', async () => {
      const locationsWithoutZero: UnifiedLocation[] = [
        { id: 1, name: 'Route 101', connections: [], distances: { 1: 0 } },
      ];
      vi.mocked(pokeDB.getAllAreas).mockResolvedValue(locationsWithoutZero);
      const result = await getDistanceToMap(999, 1);
      expect(result).toBeNull();
    });

    it('returns null when no distance is precomputed between start and target', async () => {
      const locationsWithoutDist: UnifiedLocation[] = [
        { id: 0, name: 'Littleroot Town', connections: [], distances: {} },
        { id: 1, name: 'Route 101', connections: [], distances: {} },
      ];
      vi.mocked(pokeDB.getAllAreas).mockResolvedValue(locationsWithoutDist);
      const result = await getDistanceToMap(0, 1);
      expect(result).toBeNull();
    });
  });

  describe('resolveOutdoorMapId', () => {
    it('correctly resolves a map ID with no prnt to itself', async () => {
      vi.mocked(pokeDB.getAllAreas).mockResolvedValue(mockLocations);
      const result = await resolveOutdoorMapId(0);
      expect(result).toBe(0);
    });

    it('correctly resolves a single-level indoor map to its outdoor hub', async () => {
      vi.mocked(pokeDB.getAllAreas).mockResolvedValue(mockLocations);
      const result = await resolveOutdoorMapId(3);
      expect(result).toBe(0);
    });

    it('correctly resolves a multi-level indoor map to its root outdoor hub', async () => {
      vi.mocked(pokeDB.getAllAreas).mockResolvedValue(mockLocations);
      const result = await resolveOutdoorMapId(4);
      expect(result).toBe(0);
    });

    it('correctly resolves a single-level indoor map to its outdoor hub in Kanto', async () => {
      vi.mocked(pokeDB.getAllAreas).mockResolvedValue(mockLocations);
      const result = await resolveOutdoorMapId(44);
      expect(result).toBe(42);
    });

    it('correctly resolves a multi-level indoor map to its root outdoor hub in Kanto', async () => {
      vi.mocked(pokeDB.getAllAreas).mockResolvedValue(mockLocations);
      const result = await resolveOutdoorMapId(45);
      expect(result).toBe(42);
    });

    it('handles circular prnt references gracefully', async () => {
      const circularLocations = [
        ...mockLocations,
        { id: 90, name: 'Loop A', parentId: 91, connections: [], distances: {} },
        { id: 91, name: 'Loop B', parentId: 90, connections: [], distances: {} },
      ];
      vi.mocked(pokeDB.getAllAreas).mockResolvedValue(circularLocations);
      const result = await resolveOutdoorMapId(90);
      expect(result).toBe(90);
    });
  });

  describe('Constants', () => {
    it('should export gen3HoennMapGraph', () => {
      expect(gen3HoennMapGraph).toBeDefined();
    });

    it('should export gen3KantoMapGraph', () => {
      expect(gen3KantoMapGraph).toBeDefined();
    });
  });
});
