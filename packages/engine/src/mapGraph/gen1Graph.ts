import type { UnifiedLocation } from '@/db/schema';
import { resolveOutdoorMapId as commonResolveOutdoorMapId, getDistanceToMapBase } from './common';

export const resolveOutdoorMapId = commonResolveOutdoorMapId;

export function getDistanceToMap(
  allLocations: UnifiedLocation[],
  startMapId: number,
  targetAid: number,
): { distance: number; name: string } | null {
  // Saffron City (Map ID 10 in Kanto)
  return getDistanceToMapBase(allLocations, startMapId, targetAid, 10);
}
