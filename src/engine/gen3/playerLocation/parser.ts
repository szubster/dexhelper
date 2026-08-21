import { GEN3_INDOOR_TO_PARENT_MAP } from '../../../../scripts/data/gen3/mapping';

// SaveBlock1 Offsets for WarpData
export const LOCATION_OFFSET = 0x04;
export const MAP_NUM_OFFSET = LOCATION_OFFSET + 0x01;
export const WARP_ID_OFFSET = LOCATION_OFFSET + 0x02;
export const X_COORD_OFFSET = LOCATION_OFFSET + 0x04;
export const Y_COORD_OFFSET = LOCATION_OFFSET + 0x06;

export interface PlayerLocation {
  mapGroup: number;
  mapNum: number;
  mapId: number;
  x: number;
  y: number;
  warpId: number;
}

/**
 * Extracts the player's current location from Gen 3 SaveBlock1.
 * @param saveData The complete save file DataView.
 * @param saveBlock1Offset The resolved memory offset to the active SaveBlock1.
 * @returns The parsed PlayerLocation.
 */
export function extractPlayerLocation(saveData: DataView, saveBlock1Offset: number): PlayerLocation {
  if (saveBlock1Offset < 0 || saveBlock1Offset + Y_COORD_OFFSET + 2 > saveData.byteLength) {
    throw new RangeError('The save file is corrupted or incomplete.');
  }

  const mapGroup = saveData.getInt8(saveBlock1Offset + LOCATION_OFFSET);
  const mapNum = saveData.getInt8(saveBlock1Offset + MAP_NUM_OFFSET);
  const warpId = saveData.getInt8(saveBlock1Offset + WARP_ID_OFFSET);
  const x = saveData.getInt16(saveBlock1Offset + X_COORD_OFFSET, true);
  const y = saveData.getInt16(saveBlock1Offset + Y_COORD_OFFSET, true);

  const rawMapId = (mapGroup << 8) | mapNum;
  // If the player is indoors, attempt to map to parent map
  const mapId = GEN3_INDOOR_TO_PARENT_MAP[rawMapId] ?? rawMapId;

  return { mapGroup, mapNum, mapId, x, y, warpId };
}
