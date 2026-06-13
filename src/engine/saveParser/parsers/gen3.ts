import type { GameVersion, SaveData } from './common';

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
 * Parses the Gen 3 condition stats (Cool, Beauty, Cute, Smart, Tough) for a Pokémon.
 *
 * @param view - The raw save file DataView.
 * @param pokemonOffset - The start offset of the 80-byte Pokémon struct.
 * @param personalityValue - The 32-bit Personality Value used for decryption and layout.
 * @param otId - The 32-bit OT ID used for decryption.
 * @returns An object containing the extracted condition stats.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3ConditionStats(
  view: DataView,
  pokemonOffset: number,
  personalityValue: number,
  otId: number,
): { cool: number; beauty: number; cute: number; smart: number; tough: number } {
  try {
    const decryptionKey = personalityValue ^ otId;
    const substructOrder = personalityValue % 24;

    // The index (0-3) of the EVs/Condition substructure (Substruct E)
    const evConditionSubstructIndex = [2, 3, 1, 1, 3, 2, 2, 3, 1, 1, 3, 2, 0, 0, 0, 0, 0, 0, 3, 2, 3, 2, 1, 1][
      substructOrder
    ];

    if (evConditionSubstructIndex === undefined) {
      throw new Error('Invalid substructOrder');
    }

    const dataBlockStart = pokemonOffset + 32;
    const substructStart = dataBlockStart + evConditionSubstructIndex * 12;

    // Conditions are stored starting at offset 6 within the 12-byte EV/Condition substructure.
    // They are stored as:
    // +6: cool, +7: beauty
    // +8: cute, +9: smart
    // +10: tough, +11: feel (ignored here)

    // Decrypt the two 32-bit integers that span the Condition bytes (offsets 4-7 and 8-11 of the substructure).
    const dword1 = view.getUint32(substructStart + 4, true) ^ decryptionKey;
    const dword2 = view.getUint32(substructStart + 8, true) ^ decryptionKey;

    // Extract the bytes from the decrypted dwords.
    // dword1 (little-endian): [offset + 4] [offset + 5] [offset + 6] [offset + 7]
    // cool is at offset + 6 (byte 2 of dword1), beauty is at offset + 7 (byte 3 of dword1)
    const cool = (dword1 >> 16) & 0xff;
    const beauty = (dword1 >> 24) & 0xff;

    // dword2 (little-endian): [offset + 8] [offset + 9] [offset + 10] [offset + 11]
    // cute is at offset + 8 (byte 0 of dword2), smart is at offset + 9 (byte 1 of dword2)
    // tough is at offset + 10 (byte 2 of dword2)
    const cute = dword2 & 0xff;
    const smart = (dword2 >> 8) & 0xff;
    const tough = (dword2 >> 16) & 0xff;

    return { cool, beauty, cute, smart, tough };
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
