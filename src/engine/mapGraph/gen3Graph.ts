import type { UnifiedLocation } from '../../db/schema';
import { resolveOutdoorMapId as commonResolveOutdoorMapId, getDistanceToMapBase } from './common';

export const resolveOutdoorMapId = commonResolveOutdoorMapId;

export function getDistanceToMap(
  allLocations: UnifiedLocation[],
  startMapId: number,
  targetAid: number,
): { distance: number; name: string } | null {
  // Littleroot Town (Map ID 0)
  return getDistanceToMapBase(allLocations, startMapId, targetAid, 0);
}
