import gen2MapLocations from '../../../../data/gen2/mapLocations.json';

const locations: Record<string, Record<string, string>> = gen2MapLocations;

/**
 * Translates Gen 2 roamer coordinates (mapGroup, mapId) to human-readable names.
 * Returns 'Unknown Location' if the coordinate pair is not found or invalid.
 */
export function translateRoamerLocation(mapGroup?: number, mapId?: number): string {
  if (mapGroup === undefined || mapId === undefined) {
    return 'Unknown Location';
  }

  const groupStr = mapGroup.toString();
  const mapIdStr = mapId.toString();

  const mapGroupDict = locations[groupStr];
  if (mapGroupDict?.[mapIdStr]) {
    return mapGroupDict[mapIdStr];
  }

  return 'Unknown Location';
}
