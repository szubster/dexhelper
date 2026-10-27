import type { UnifiedLocation } from '../../db/schema';
import {
  getDistanceToMap as unifiedGetDistanceToMap,
  resolveOutdoorMapId as unifiedResolveOutdoorMapId,
} from './index';

export const resolveOutdoorMapId = unifiedResolveOutdoorMapId;

export function getDistanceToMap(
  allLocations: UnifiedLocation[],
  startMapId: number,
  targetAid: number,
): { distance: number; name: string } | null {
  return unifiedGetDistanceToMap(allLocations, startMapId, targetAid, 3);
}
