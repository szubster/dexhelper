import type { UnifiedLocation } from '../../db/schema';
import { resolveOutdoorMapId as commonResolveOutdoorMapId, getDistanceToMapBase, getLocation } from './common';

export const resolveOutdoorMapId = commonResolveOutdoorMapId;

export const DEFAULT_FALLBACK_MAP_IDS: Record<number, number> = {
  1: 10,
  2: 0x0306,
  3: 0,
};

export function getDistanceToMap(
  allLocations: UnifiedLocation[],
  startMapId: number,
  targetAid: number,
  generation = 1,
): { distance: number; name: string } | null {
  const fallback = DEFAULT_FALLBACK_MAP_IDS[generation] ?? 0;
  return getDistanceToMapBase(allLocations, startMapId, targetAid, fallback);
}

export function getGen2MapName(allLocations: UnifiedLocation[], mapGroup: number, mapId: number): string {
  const gameId = (mapGroup << 8) | mapId;
  const loc = getLocation(allLocations, gameId);
  return loc?.n || 'Unknown Location';
}
