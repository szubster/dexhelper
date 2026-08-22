import {
  BANK_A_START,
  BANK_B_START,
  BIT_MASK,
  EMERALD_VARS_OFFSET,
  EVENT_FLAGS_OFFSET,
  FLAG_BIT_MASK,
  FLAG_BYTE_SHIFT,
  NUM_SECTIONS,
  RS_VARS_OFFSET,
  SAVE_INDEX_OFFSET,
  SECTION_ID_OFFSET,
  SECTION_SIZE,
  SIGNATURE_OFFSET,
  SIGNATURE_VALUE,
  VARIABLE_SIZE,
  VARS_START,
} from './constants';

/**
 * Extracts a specific game variable (u16) from the save file using relative offsets.
 *
 * @param view The raw save file DataView.
 * @param saveBlock1Offset The resolved memory offset to the active SaveBlock1.
 * @param variableId The internal ID of the game variable (e.g., 0x4048).
 * @param isEmerald True if the game is Emerald, false for Ruby/Sapphire.
 * @returns The value of the game variable as a number.
 * @throws Error if the read is out of bounds.
 */
export function extractGameVariable(
  view: DataView,
  saveBlock1Offset: number,
  variableId: number,
  isEmerald: boolean,
): number {
  try {
    const varsOffset = isEmerald ? EMERALD_VARS_OFFSET : RS_VARS_OFFSET;
    const baseOffset = saveBlock1Offset + varsOffset;
    const variableIndex = variableId - VARS_START;
    const byteOffset = baseOffset + variableIndex * VARIABLE_SIZE;

    return view.getUint16(byteOffset, true);
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Extracts a specific event flag from the save file using relative offsets.
 *
 * @param view The raw save file DataView.
 * @param saveBlock1Offset The resolved memory offset to the active SaveBlock1.
 * @param flagId The internal ID of the event flag.
 * @returns boolean indicating if the flag is set.
 */
export function extractEventFlag(view: DataView, saveBlock1Offset: number, flagId: number): boolean {
  try {
    const baseOffset = saveBlock1Offset + EVENT_FLAGS_OFFSET;
    const byteOffset = baseOffset + (flagId >> FLAG_BYTE_SHIFT);
    const bitIndex = flagId & FLAG_BIT_MASK;

    return !!((view.getUint8(byteOffset) >> bitIndex) & BIT_MASK);
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Extracts the latest relative bank offset for a given section from the live memory.
 * Scans both A/B flash banks to find the section with the most recent save index.
 *
 * @param view The raw save file DataView.
 * @param targetSectionId The internal ID of the section to locate.
 * @returns The memory offset of the most recent valid section block.
 * @throws Error if the section cannot be found or the file is corrupted.
 */
export function extractLatestSectionOffset(view: DataView, targetSectionId: number): number {
  let saveIndexA = -1;
  let saveIndexB = -1;
  let sectionOffsetA = -1;
  let sectionOffsetB = -1;

  // Scan Save Bank A
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const offset = BANK_A_START + i * SECTION_SIZE;
    try {
      const signature = view.getUint32(offset + SIGNATURE_OFFSET, true);
      if (signature === SIGNATURE_VALUE) {
        const sectionId = view.getUint16(offset + SECTION_ID_OFFSET, true);
        const saveIndex = view.getUint32(offset + SAVE_INDEX_OFFSET, true);
        if (saveIndexA === -1) saveIndexA = saveIndex;
        if (sectionId === targetSectionId) sectionOffsetA = offset;
      }
    } catch (error) {
      if (!(error instanceof RangeError)) throw error;
    }
  }

  // Scan Save Bank B
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const offset = BANK_B_START + i * SECTION_SIZE;
    try {
      const signature = view.getUint32(offset + SIGNATURE_OFFSET, true);
      if (signature === SIGNATURE_VALUE) {
        const sectionId = view.getUint16(offset + SECTION_ID_OFFSET, true);
        const saveIndex = view.getUint32(offset + SAVE_INDEX_OFFSET, true);
        if (saveIndexB === -1) saveIndexB = saveIndex;
        if (sectionId === targetSectionId) sectionOffsetB = offset;
      }
    } catch (error) {
      if (!(error instanceof RangeError)) throw error;
    }
  }

  if (sectionOffsetA !== -1 && sectionOffsetB !== -1) {
    return saveIndexA > saveIndexB ? sectionOffsetA : sectionOffsetB;
  }

  if (sectionOffsetA !== -1) return sectionOffsetA;
  if (sectionOffsetB !== -1) return sectionOffsetB;

  throw new Error(`The save file is corrupted or incomplete: missing section ${targetSectionId}.`);
}
