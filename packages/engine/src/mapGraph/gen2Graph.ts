import type { UnifiedLocation } from '@/db/schema';
import { resolveOutdoorMapId as commonResolveOutdoorMapId, getDistanceToMapBase } from './common';

export const resolveOutdoorMapId = commonResolveOutdoorMapId;

export function getDistanceToMap(
  allLocations: UnifiedLocation[],
  startMapId: number,
  targetAid: number,
): { distance: number; name: string } | null {
  // Goldenrod City (Map Group 3, Map ID 6 -> 0x0306)
  return getDistanceToMapBase(allLocations, startMapId, targetAid, 0x0306);
}
