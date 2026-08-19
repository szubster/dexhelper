import { parseGen3RoamerStruct } from '../../saveParser/parsers/gen3';

const GEN3_ROAMER_OFFSET_RS = 0x3144;
const GEN3_ROAMER_OFFSET_EMERALD = 0x31dc;
const GEN3_ROAMER_OFFSET_FRLG = 0x30d0;

/**
 * Extracts Gen 3 Roamer data for Ruby and Sapphire.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The resolved memory offset to the active SaveBlock1.
 * @returns The parsed Gen3RoamerData object.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3RSRoamer(view: DataView, saveBlock1Offset: number) {
  try {
    const offset = saveBlock1Offset + GEN3_ROAMER_OFFSET_RS;
    return parseGen3RoamerStruct(view, offset);
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Extracts Gen 3 Roamer data for Emerald.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The resolved memory offset to the active SaveBlock1.
 * @returns The parsed Gen3RoamerData object.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3EmeraldRoamer(view: DataView, saveBlock1Offset: number) {
  try {
    const offset = saveBlock1Offset + GEN3_ROAMER_OFFSET_EMERALD;
    return parseGen3RoamerStruct(view, offset);
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Extracts Gen 3 Roamer data for FireRed and LeafGreen.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The resolved memory offset to the active SaveBlock1.
 * @returns The parsed Gen3RoamerData object.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3FRLGRoamer(view: DataView, saveBlock1Offset: number) {
  try {
    const offset = saveBlock1Offset + GEN3_ROAMER_OFFSET_FRLG;
    return parseGen3RoamerStruct(view, offset);
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
