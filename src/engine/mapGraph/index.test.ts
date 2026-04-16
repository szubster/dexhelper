import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { UnifiedLocation } from '../../db/schema';
import { getDistanceToMap, getOutdoorMapId } from './gen1Graph';
import { getMapGraph } from './index';

vi.mock('./gen1Graph', () => ({
  getDistanceToMap: vi.fn(),
  getOutdoorMapId: vi.fn(),
}));

describe('getMapGraph', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null for an unsupported generation', () => {
    expect(getMapGraph(2)).toBeNull();
    expect(getMapGraph(99)).toBeNull();
  });

  it('returns a MapGraph for generation 1', () => {
    const graph = getMapGraph(1);
    expect(graph).not.toBeNull();
    expect(typeof graph?.getDistanceToMap).toBe('function');
    expect(typeof graph?.resolveOutdoorMapId).toBe('function');
  });

  it('delegates getDistanceToMap to gen1Graph for generation 1', () => {
    const graph = getMapGraph(1);
    const mockLocations: UnifiedLocation[] = [];

    vi.mocked(getDistanceToMap).mockReturnValueOnce({ distance: 5, name: 'Test' });

    const result = graph?.getDistanceToMap(mockLocations, 1, 2);

    expect(getDistanceToMap).toHaveBeenCalledWith(mockLocations, 1, 2);
    expect(getDistanceToMap).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ distance: 5, name: 'Test' });
  });

  it('delegates resolveOutdoorMapId to gen1Graph getOutdoorMapId for generation 1', () => {
    const graph = getMapGraph(1);
    const mockLocations: UnifiedLocation[] = [];

    vi.mocked(getOutdoorMapId).mockReturnValueOnce(42);

    const result = graph?.resolveOutdoorMapId(mockLocations, 10);

    expect(getOutdoorMapId).toHaveBeenCalledWith(mockLocations, 10);
    expect(getOutdoorMapId).toHaveBeenCalledTimes(1);
    expect(result).toBe(42);
  });
});
