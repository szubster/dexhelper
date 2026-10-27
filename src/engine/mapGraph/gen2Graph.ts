import type { UnifiedLocation } from '../../db/schema';
import {
  getDistanceToMap as unifiedGetDistanceToMap,
  getGen2MapName as unifiedGetGen2MapName,
  resolveOutdoorMapId as unifiedResolveOutdoorMapId,
} from './index';

export const resolveOutdoorMapId = unifiedResolveOutdoorMapId;
export const getGen2MapName = unifiedGetGen2MapName;

export function getDistanceToMap(
  allLocations: UnifiedLocation[],
  startMapId: number,
  targetAid: number,
): { distance: number; name: string } | null {
  return unifiedGetDistanceToMap(allLocations, startMapId, targetAid, 2);
}
