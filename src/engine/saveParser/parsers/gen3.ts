import type { GameVersion, Gen3BerryPatch, Gen3Ribbons, SaveData } from './common';

const SIGNATURE = 0x08012025;
const SECTION_SIZE = 4096;
const NUM_SECTIONS = 14;
const SAVE_BLOCK_A = 0x0000;
const SAVE_BLOCK_B = 0xe000;

/**
 * Scans the Game Boy Advance save file's double-buffered structure (Block A and Block B)
 * to locate the most recent and valid memory offset for a specific data section.
 *
 * @param view - The raw save file DataView.
 * @param targetSectionId - The internal ID (0-13) of the save section to locate (e.g., 1 for Team/Items, 2 for Game State).
 * @returns The absolute byte offset where the requested section begins.
 * @throws Error - If the target section cannot be found or if both blocks have invalid signatures.
 *
 * @remarks
 * **Double-Buffering Architecture:**
 * Gen 3 uses two 56KB save blocks (A at `0x0000`, B at `0xE000`) to prevent corruption during saves.
 * Each block contains 14 sections (4KB each). Since the game saves sections non-sequentially,
 * the parser must check the 32-bit `saveIndex` at the end of each section to determine which block
 * contains the most recently written (valid) version of the requested data.
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
 * Extracts the state of all 128 berry patches across the Hoenn region.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The absolute memory offset where Save Section 1 begins.
 * @returns An array of parsed `Gen3BerryPatch` objects representing the growth and watering status of each patch.
 *
 * @remarks
 * **Data Structure (8 bytes per patch):**
 * - Byte 0: Berry ID.
 * - Byte 1: Growth stage and flags. The lower 7 bits (`0x7F`) represent the stage (1-4). The highest bit (`0x80`) is a flag indicating if growth has stopped.
 * - Bytes 2-3: Minutes remaining until the berry advances to the next stage (16-bit little-endian).
 * - Byte 4: Number of berries this patch will yield upon harvest.
 * - Byte 5: Watering and regrowth tracking. The lower nibble (`0x0F`) tracks how many times the berry has regrown after dying. The upper 4 bits are boolean flags indicating if the patch was watered during each of its 4 growth stages.
 */
function extractBerryPatches(view: DataView, saveBlock1Offset: number) {
  const patches: Gen3BerryPatch[] = [];
  const baseOffset = saveBlock1Offset + 0x071c;

  for (let i = 0; i < 128; i++) {
    // Each berry patch record is exactly 8 bytes long.
    const offset = baseOffset + i * 8;
    try {
      const berryId = view.getUint8(offset);

      // Growth Stage & Stop Flag
      const stageByte = view.getUint8(offset + 1);
      const stage = stageByte & 0x7f; // Lower 7 bits: Growth stage (1 = Planted, 2 = Sprouted, 3 = Taller, 4 = Blooming, 5 = Berries)
      const stopGrowth = (stageByte & 0x80) !== 0; // Highest bit: True if the berry has died/stopped growing

      const minutesUntilNextStage = view.getUint16(offset + 2, true);
      const berryYield = view.getUint8(offset + 4);

      // Watered Status & Regrowth
      const wateredByte = view.getUint8(offset + 5);
      const regrowthCount = wateredByte & 0x0f; // Lower nibble: number of times regrown

      // Upper 4 bits represent whether the patch was watered during each specific growth stage
      const watered1 = (wateredByte & 0x10) !== 0; // Watered during Stage 1
      const watered2 = (wateredByte & 0x20) !== 0; // Watered during Stage 2
      const watered3 = (wateredByte & 0x40) !== 0; // Watered during Stage 3
      const watered4 = (wateredByte & 0x80) !== 0; // Watered during Stage 4

      patches.push({
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
 *
 * @param view - The raw save file DataView.
 * @returns True if the structure looks like a valid Gen 3 save.
 *
 * @remarks
 * **Scaffolding Note:**
 * This function currently serves as a placeholder. It intentionally triggers a
 * basic read to ensure `RangeError` bounds checking propagates correctly to the
 * orchestrating `parseSaveFile` function. It currently returns `false` by default
 * until full Gen 3 signature verification is implemented.
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
export function parseGen3ConditionStats(view: DataView, offset: number) {
  try {
    const cool = view.getUint8(offset + 0x06);
    const beauty = view.getUint8(offset + 0x07);
    const cute = view.getUint8(offset + 0x08);
    const smart = view.getUint8(offset + 0x09);
    const tough = view.getUint8(offset + 0x0a);
    const sheen = view.getUint8(offset + 0x0b);

    return { cool, beauty, cute, smart, tough, sheen };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

export function parseGen3MirageIslandValue(view: DataView, offset: number): number {
  try {
    // Read the 16-bit little-endian value using the DataView API
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

    const mirageIslandOffset = _forcedVersion === 'emerald' ? 0x0464 : 0x0408;
    const mirageIslandValue = parseGen3MirageIslandValue(view, section2Offset + mirageIslandOffset);

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
      mirageIslandValue,
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

/**
 * Parses the 32-bit Ribbon bitfield from a Gen 3 save file.
 *
 * @param view - The raw save file DataView.
 * @param offset - The offset within the buffer to read the value from.
 * @returns An object containing the extracted 3-bit Contest Ribbon ranks.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3Ribbons(view: DataView, offset: number): Gen3Ribbons {
  try {
    const bitfield = view.getUint32(offset, true);

    const cool = bitfield & 0x07;
    const beauty = (bitfield >> 3) & 0x07;
    const cute = (bitfield >> 6) & 0x07;
    const smart = (bitfield >> 9) & 0x07;
    const tough = (bitfield >> 12) & 0x07;

    return { cool, beauty, cute, smart, tough };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
