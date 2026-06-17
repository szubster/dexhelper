import type { GameVersion, Gen3BerryPatch, Gen3Ribbons, SaveData } from './common';

const SIGNATURE = 0x08012025;
const SECTION_SIZE = 4096;
const NUM_SECTIONS = 14;
const SAVE_BLOCK_A = 0x0000;
const SAVE_BLOCK_B = 0xe000;

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
 * Performs a structural check to verify if the binary data is a valid Generation 3 save.
 * Placeholder implementation for scaffolding.
 *
 * @param view - The raw save file DataView.
 * @returns True if the structure looks like a valid Gen 3 save.
 */

function extractBerryPatches(view: DataView, saveBlock1Offset: number) {
  const patches: Gen3BerryPatch[] = [];
  const baseOffset = saveBlock1Offset + 0x071c;

  for (let i = 0; i < 128; i++) {
    const offset = baseOffset + i * 8;
    try {
      const berryId = view.getUint8(offset);
      const stageByte = view.getUint8(offset + 1);
      const stage = stageByte & 0x7f;
      const stopGrowth = (stageByte & 0x80) !== 0;

      const minutesUntilNextStage = view.getUint16(offset + 2, true);
      const berryYield = view.getUint8(offset + 4);

      const wateredByte = view.getUint8(offset + 5);
      const regrowthCount = wateredByte & 0x0f;
      const watered1 = (wateredByte & 0x10) !== 0;
      const watered2 = (wateredByte & 0x20) !== 0;
      const watered3 = (wateredByte & 0x40) !== 0;
      const watered4 = (wateredByte & 0x80) !== 0;

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

    const gen3PokeNews = parseGen3PokeNews(view, section1Offset + 0x2b50);

    const flagsOffset = section2Offset + 0x02f0;
    const hiddenItemFlags = new Uint8Array(14);

    for (let i = 0; i < 14; i++) {
      const currentByte = view.getUint8(flagsOffset + 62 + i);
      const nextByte = view.getUint8(flagsOffset + 62 + i + 1);
      hiddenItemFlags[i] = ((currentByte >> 4) | ((nextByte & 0x0f) << 4)) & 0xff;
    }

    const mirageIslandOffset = _forcedVersion === 'emerald' ? 0x0464 : 0x0408;
    const mirageIslandValue = parseGen3MirageIslandValue(view, section2Offset + mirageIslandOffset);

    const gen3MatchCall = parseGen3MatchCall(view, section1Offset, section2Offset);

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
      gen3PokeNews,
      gen3MatchCall,
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

/**
 * Parses the upcoming event schedule (PokeNews) from a Gen 3 save file.
 *
 * @param view - The raw save file DataView.
 * @param offset - The offset within the buffer to read the value from.
 * @returns An array of news events.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3PokeNews(view: DataView, offset: number) {
  try {
    const news = [];
    for (let i = 0; i < 16; i++) {
      const itemOffset = offset + i * 4;
      const kind = view.getUint8(itemOffset);
      const state = view.getUint8(itemOffset + 1);
      const dayCountdown = view.getUint16(itemOffset + 2, true);
      news.push({ kind, state, dayCountdown });
    }
    return news;
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

export const GEN3_MATCH_CALL_DATA_OFFSET = 0x09ca;
export const GEN3_MATCH_CALL_DATA_LENGTH = 100;

export const GEN3_FLAGS_SECTION2_OFFSET = 0x02f0;
export const GEN3_HAS_MATCH_CALL_FLAG_ID = 303;
export const GEN3_TRAINER_REGISTERED_FLAGS_START_ID = 348;
export const GEN3_REMATCH_TABLE_ENTRIES = 78;

export function parseGen3MatchCall(view: DataView, section1Offset: number, section2Offset: number) {
  try {
    const trainerRematches: number[] = [];
    const matchCallDataOffset = section1Offset + GEN3_MATCH_CALL_DATA_OFFSET;
    for (let i = 0; i < GEN3_MATCH_CALL_DATA_LENGTH; i++) {
      trainerRematches.push(view.getUint8(matchCallDataOffset + i));
    }

    // FLAG_HAS_MATCH_CALL is flag 303
    const hasMatchCallByteOffset = Math.floor(GEN3_HAS_MATCH_CALL_FLAG_ID / 8);
    const hasMatchCallBitIndex = GEN3_HAS_MATCH_CALL_FLAG_ID % 8;
    const hasMatchCallByte = view.getUint8(section2Offset + GEN3_FLAGS_SECTION2_OFFSET + hasMatchCallByteOffset);
    const hasMatchCall = (hasMatchCallByte & (1 << hasMatchCallBitIndex)) !== 0;

    const registeredTrainers: boolean[] = [];
    const flagsOffset = section2Offset + GEN3_FLAGS_SECTION2_OFFSET;
    for (let i = 0; i < GEN3_REMATCH_TABLE_ENTRIES; i++) {
      const flagId = GEN3_TRAINER_REGISTERED_FLAGS_START_ID + i;
      const byteOffset = Math.floor(flagId / 8);
      const bitIndex = flagId % 8;
      const byteValue = view.getUint8(flagsOffset + byteOffset);
      registeredTrainers.push((byteValue & (1 << bitIndex)) !== 0);
    }

    return { hasMatchCall, registeredTrainers, trainerRematches };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
