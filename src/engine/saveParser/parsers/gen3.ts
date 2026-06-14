/**
 * @module gen3Parser
 *
 * This module handles the extraction and parsing of Game Boy Advance Generation 3
 * (Ruby, Sapphire, Emerald, FireRed, LeafGreen) save files.
 *
 * ## Architecture Overview
 *
 * Generation 3 save files (typically 128KB) use a double-buffered flash memory system
 * to prevent data corruption during saves. The memory is divided into two primary blocks:
 * - **SaveBlock A (0x0000 - 0xDFFF)**
 * - **SaveBlock B (0xE000 - 0x1BFFF)**
 *
 * Each block is divided into 14 distinct 4KB Sections (0-13), each responsible for specific
 * game data (e.g., Trainer Info, Party, PC Boxes, Berry Trees).
 *
 * To parse the save safely:
 * 1. The engine scans both blocks to find the latest valid save by comparing the `saveIndex`.
 * 2. It reads the 32-bit `signature` (0x08012025) located at offset 0xFF8 within each 4KB section.
 * 3. It groups the latest version of each Section ID together.
 *
 * This ensures that even if power is lost during saving, the previous valid sections
 * are still used.
 */
import type { GameVersion, Gen3BerryPatch, SaveData } from './common';

const SIGNATURE = 0x08012025;
const SECTION_SIZE = 4096;
const NUM_SECTIONS = 14;
const SAVE_BLOCK_A = 0x0000;
const SAVE_BLOCK_B = 0xe000;

/**
 * Scans the double-buffered flash memory banks to find the byte offset of the latest,
 * valid instance of a specific 4KB data section.
 *
 * Gen 3 rotates sections across two blocks (A and B). To find the active data,
 * we must check both blocks, verify the section signature, and return the offset
 * of the section with the highest `saveIndex`.
 *
 * @param view - The raw save file DataView.
 * @param targetSectionId - The 16-bit ID (0-13) of the data section to locate.
 * @returns The absolute byte offset within the DataView where the valid section begins.
 * @throws Error if the section cannot be found or the signature is invalid.
 */
function getLatestSectionOffset(view: DataView, targetSectionId: number): number {
  let saveIndexA = -1;
  let saveIndexB = -1;
  let sectionOffsetA = -1;
  let sectionOffsetB = -1;

  for (let i = 0; i < NUM_SECTIONS; i++) {
    const offset = SAVE_BLOCK_A + i * SECTION_SIZE;
    try {
      const signature = view.getUint32(offset + 4088, true);
      if (signature === SIGNATURE) {
        const sectionId = view.getUint16(offset + 4084, true);
        const saveIndex = view.getUint32(offset + 4092, true);
        if (saveIndexA === -1) saveIndexA = saveIndex;
        if (sectionId === targetSectionId) sectionOffsetA = offset;
      }
    } catch (error) {
      if (!(error instanceof RangeError)) throw error;
    }
  }

  for (let i = 0; i < NUM_SECTIONS; i++) {
    const offset = SAVE_BLOCK_B + i * SECTION_SIZE;
    try {
      const signature = view.getUint32(offset + 4088, true);
      if (signature === SIGNATURE) {
        const sectionId = view.getUint16(offset + 4084, true);
        const saveIndex = view.getUint32(offset + 4092, true);
        if (saveIndexB === -1) saveIndexB = saveIndex;
        if (sectionId === targetSectionId) sectionOffsetB = offset;
      }
    } catch (error) {
      if (!(error instanceof RangeError)) throw error;
    }
  }

  if (sectionOffsetA === -1 && sectionOffsetB === -1) {
    throw new Error('Target section not found or invalid signature.');
  }

  if (sectionOffsetA !== -1 && sectionOffsetB !== -1) {
    return saveIndexA > saveIndexB ? sectionOffsetA : sectionOffsetB;
  }

  return sectionOffsetA !== -1 ? sectionOffsetA : sectionOffsetB;
}

/**
 * Extracts data for all 128 overworld Berry Trees from the player's save file.
 *
 * Berry tree data is stored sequentially in Section 1 (SaveBlock1) at logical offset 0x169C.
 * Each tree takes exactly 8 bytes and tracks growth stages, time remaining, and watering state.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The absolute byte offset to the start of the valid Section 1.
 * @returns An array of parsed Gen3BerryPatch objects.
 * @throws RangeError if reading extends past the end of the file buffer.
 */
function extractBerryPatches(view: DataView, saveBlock1Offset: number) {
  const patches: Gen3BerryPatch[] = [];
  const baseOffset = saveBlock1Offset + 0x169c;

  for (let i = 0; i < 128; i++) {
    const offset = baseOffset + i * 8;
    try {
      const berryId = view.getUint8(offset);

      // Stage and Growth state are packed into a single byte.
      // Lower 7 bits: Current growth stage (0-4).
      // Highest bit: If 1, the berry tree has reached its final stage or is dead.
      const stageByte = view.getUint8(offset + 1);
      const stage = stageByte & 0x7f;
      const stopGrowth = (stageByte & 0x80) !== 0;

      const minutesUntilNextStage = view.getUint16(offset + 2, true);
      const berryYield = view.getUint8(offset + 4);

      // Watering state and regrowth count are packed into a single byte.
      // Lower 4 bits: Number of times the berry has regrown after dying.
      // Upper 4 bits: Bit flags representing if the plant was watered at each of the 4 growth stages.
      const wateredByte = view.getUint8(offset + 5);
      const regrowthCount = wateredByte & 0x0f;
      const watered1 = (wateredByte & 0x10) !== 0;
      const watered2 = (wateredByte & 0x20) !== 0;
      const watered3 = (wateredByte & 0x40) !== 0;
      const watered4 = (wateredByte & 0x80) !== 0;

      patches.push({
        mapId: i, // We use the array index as the mapId, as researched.
        berryId,
        stage,
        stopGrowth,
        minutesUntilNextStage,
        berryYield,
        regrowthCount,
        watered1,
        watered2,
        watered3,
        watered4,
      });
    } catch (e) {
      if (e instanceof RangeError) {
        throw new RangeError('Out of bounds reading berry patches');
      }
      throw e;
    }
  }
  return patches;
}

/**
 * Performs a structural check to verify if the binary data is a valid Generation 3 save.
 * Placeholder implementation for scaffolding.
 *
 * @param view - The raw save file DataView.
 * @returns True if the structure looks like a valid Gen 3 save.
 */
export function isGen3Save(view: DataView): boolean {
  try {
    // Scaffolding read to allow testing of RangeError handling
    if (view.byteLength > 0) {
      view.getUint8(0);
    }
    return false;
  } catch (error) {
    if (error instanceof RangeError) {
      return false;
    }
    throw error;
  }
}

/**
 * Parses the 16-bit Mirage Island value from a Gen 3 save file.
 *
 * @param view - The raw save file DataView.
 * @param offset - The offset within the buffer to read the value from.
 * @returns The 16-bit unsigned integer representing the Mirage Island value.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3MirageIslandValue(view: DataView, offset: number): number {
  try {
    return view.getUint16(offset, true);
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Extracts all relevant game data from a Gen 3 save.
 * Placeholder implementation for scaffolding.
 *
 * @param view - The raw save file DataView.
 * @param _forcedVersion - An optional game version override.
 * @returns The fully parsed and structured SaveData object.
 * @throws Error - Gen 3 parsing not implemented yet, or "Corrupted Save File" on RangeError.
 */
export function parseGen3(view: DataView, _forcedVersion?: GameVersion): SaveData {
  try {
    let section2Offset: number;
    try {
      section2Offset = getLatestSectionOffset(view, 2);
    } catch {
      throw new RangeError('Out of bounds during block scan');
    }

    let section1Offset: number;
    try {
      section1Offset = getLatestSectionOffset(view, 1);
    } catch {
      throw new RangeError('Out of bounds during block scan');
    }

    const gen3BerryPatches = extractBerryPatches(view, section1Offset);

    const flagsOffset = section2Offset + 0x02f0;
    const hiddenItemFlags = new Uint8Array(14);

    for (let i = 0; i < 14; i++) {
      const currentByte = view.getUint8(flagsOffset + 62 + i);
      const nextByte = view.getUint8(flagsOffset + 62 + i + 1);
      hiddenItemFlags[i] = ((currentByte >> 4) | ((nextByte & 0x0f) << 4)) & 0xff;
    }

    // Dummy scaffold values for now until fully implemented
    return {
      generation: 3,
      owned: new Set(),
      seen: new Set(),
      party: [],
      pc: [],
      partyDetails: [],
      pcDetails: [],
      gameVersion: _forcedVersion || 'ruby',
      badges: 0,
      trainerName: '',
      trainerId: 0,
      currentMapId: 0,
      inventory: [],
      currentBoxCount: 0,
      hallOfFameCount: 0,
      gen3BerryPatches,
      hiddenItemFlags,
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Parses the 32-bit Personality Value (PV) from a Gen 3 save file.
 *
 * @param view - The raw save file DataView.
 * @param offset - The offset within the buffer to read the PV from.
 * @returns The 32-bit unsigned integer representing the PV.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3PersonalityValue(view: DataView, offset: number): number {
  try {
    return view.getUint32(offset, true);
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
