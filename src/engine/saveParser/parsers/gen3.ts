/**
 * @module gen3Parser
 *
 * Contains logic for parsing Generation 3 Game Boy Advance save files (Ruby, Sapphire, Emerald, FireRed, LeafGreen).
 *
 * ## Architecture Overview
 * Generation 3 uses a complex A/B bank flash memory architecture to prevent data corruption.
 * The game alternates writing between two 56KB blocks (`0x0000` and `0xE000`). Each block is
 * further divided into 14 4KB sections. The engine must scan both banks, verify the `0x08012025`
 * signature, and compare `saveIndex` values to locate the most recent, non-corrupted data block.
 *
 * - **SaveBlock1:** Contains player data, inventory, event flags, and active party Pokémon.
 * - **SaveBlock2:** Contains system data, PC storage, and global time values.
 *
 * Furthermore, individual Pokémon data structures are 100 bytes long, with a 48-byte encrypted
 * substructure block. The decryption key is derived from the Pokémon's Personality Value (PV)
 * XORed with the Original Trainer (OT) ID, and the substructure permutation (e.g., GAEM vs MGEA)
 * is determined by `PV % 24`.
 */

import type { GameVersion, Gen3BerryPatch, Gen3Ribbons, SaveData, Gen3BattleFrontier } from './common';

const SIGNATURE = 0x08012025;
const SECTION_SIZE = 4096;
const NUM_SECTIONS = 14;
const SAVE_BLOCK_A = 0x0000;
const SAVE_BLOCK_B = 0xe000;

/**
 * Locates the most recent memory offset for a specific save section in Gen 3 flash memory.
 *
 * **A/B Bank Architecture:**
 * Gen 3 games use flash memory divided into two 56KB blocks: Bank A (`0x0000`) and Bank B (`0xE000`).
 * When saving, the game writes to whichever bank was NOT used previously, acting as a fail-safe
 * against data corruption if the device powers off mid-save.
 * Each bank is further divided into 14 4KB sections.
 *
 * This function scans both banks for the target section using the magic signature `0x08012025`.
 * If the section exists in both banks, it compares their `saveIndex` values (the number of times
 * the game has been saved) to return the offset of the most recent, non-corrupted write.
 *
 * @param view - The raw save file DataView.
 * @param targetSectionId - The internal ID of the section to locate (e.g., 1 for SaveBlock1, 2 for SaveBlock2).
 * @returns The memory offset of the most recent section.
 * @throws Error if the section cannot be found or if neither bank contains a valid signature.
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
 * Performs a structural check to verify if the binary data is a valid Generation 3 save.
 * Placeholder implementation for scaffolding.
 *
 * @param view - The raw save file DataView.
 * @returns True if the structure looks like a valid Gen 3 save.
 */

/**
 * Extracts the status and growth data of all 128 Berry Patches in Hoenn.
 *
 * **Binary Data Structure:**
 * Each berry patch is represented by an 8-byte structure:
 * - `Byte 0`: Berry ID (which berry is planted).
 * - `Byte 1`: Growth Stage & Stop Flag. The lower 7 bits represent the current growth stage.
 *   The highest bit (`0x80`) is a boolean flag indicating if growth has been stopped (e.g., fully grown).
 * - `Bytes 2-3`: 16-bit timer indicating minutes until the next growth stage.
 * - `Byte 4`: The total berry yield expected when harvested.
 * - `Byte 5`: Regrowth Count & Watering Flags. The lower 4 bits track how many times the plant has
 *   regrown after dropping its berries. The upper 4 bits are individual boolean flags indicating
 *   if the plant was watered during each of its 4 growth stages (`0x10`, `0x20`, `0x40`, `0x80`).
 * - `Bytes 6-7`: Padding / unused.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The base offset of SaveBlock1.
 * @returns An array of parsed `Gen3BerryPatch` objects.
 * @throws RangeError if the read goes out of bounds.
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

/**
 * Performs a structural check to verify if the binary data is a valid Generation 3 save.
 *
 * @param view - The raw save file DataView.
 * @returns True if the structure looks like a valid Gen 3 save.
 *
 * @remarks
 * This is currently a placeholder implementation for scaffolding purposes. A full implementation
 * would scan both `0x0000` and `0xE000` memory banks for the `0x08012025` flash memory signature
 * to confirm the presence of Gen 3 save structures.
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
 * Parses the Gen 3 Roamer data (e.g., Latias or Latios) from the save file.
 *
 * @remarks
 * Roaming Pokémon data is stored in a specific memory block depending on the game version.
 * The structure contains the Pokémon's IVs (packed into a 32-bit integer), Personality Value,
 * Species ID, HP, Level, Status Condition, and an active boolean flag.
 *
 * Note: Gen 3 Pokémon roamer map locations are stored in dynamic EWRAM while the game is running
 * and are *not* serialized into the .sav battery save file. Therefore, only static attributes
 * (like IVs and PV) can be extracted.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The offset where SaveBlock1 starts.
 * @param gameVersion - The version of the Gen 3 game.
 * @returns An object containing the extracted roamer data.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3Roamer(view: DataView, saveBlock1Offset: number, gameVersion: string) {
  let offset = saveBlock1Offset;
  if (gameVersion === 'ruby' || gameVersion === 'sapphire') {
    offset += 0x3144;
  } else if (gameVersion === 'emerald') {
    offset += 0x31dc;
  } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
    offset += 0x30d0;
  } else {
    // Defaulting to ruby offset if unknown
    offset += 0x3144;
  }

  try {
    const ivs = view.getUint32(offset, true);
    const personalityValue = view.getUint32(offset + 4, true);
    const speciesId = view.getUint16(offset + 8, true);
    const hp = view.getUint16(offset + 10, true);
    const level = view.getUint8(offset + 12);
    const statusCondition = view.getUint8(offset + 13);
    const active = view.getUint8(offset + 19) !== 0;

    const ivHp = ivs & 0x1f;
    const atk = (ivs >> 5) & 0x1f;
    const def = (ivs >> 10) & 0x1f;
    const spd = (ivs >> 15) & 0x1f;
    const spAtk = (ivs >> 20) & 0x1f;
    const spDef = (ivs >> 25) & 0x1f;

    return {
      ivs: { hp: ivHp, atk, def, spd, spAtk, spDef },
      personalityValue,
      speciesId,
      hp,
      level,
      statusCondition,
      active,
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Parses Mix Record events from a Gen 3 save file.
 *
 * @remarks
 * The Mix Record feature allows players to share television shows, secret bases, and other
 * events with friends via the Game Link Cable. These events are stored sequentially in memory,
 * each taking 36 bytes. The first byte identifies the event `kind` (21 to 40 for Mix Records),
 * and the second byte acts as an `active` boolean flag.
 *
 * @param view - The raw save file DataView.
 * @param offset - The offset within the buffer to read the value from.
 * @returns An array of inherited Mix Record events.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3MixRecords(view: DataView, offset: number) {
  try {
    const mixRecords = [];
    for (let i = 0; i < 25; i++) {
      const itemOffset = offset + i * 36;
      const kind = view.getUint8(itemOffset);
      const active = view.getUint8(itemOffset + 1) !== 0;

      // Check if the show is a Mix Record event (21 to 40)
      if (active && kind >= 21 && kind <= 40) {
        mixRecords.push({ kind, active });
      }
    }
    return mixRecords;
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Parses the 6-byte Condition stats (Contest attributes) for a Gen 3 Pokémon.
 *
 * @remarks
 * Contest attributes (Cool, Beauty, Cute, Smart, Tough) and Sheen (Feel) are stored as individual
 * bytes within the 12-byte "EVs & Condition (E)" substructure of the 48-byte encrypted Data block.
 * They are extracted sequentially from offset `0x06` to `0x0B` relative to the substructure's base.
 *
 * @param view - The raw save file DataView.
 * @param offset - The offset within the buffer to the base of the E substructure.
 * @returns An object containing the extracted Contest attributes.
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

/**
 * Parses the 16-bit Mirage Island value from a Gen 3 save file.
 *
 * @remarks
 * The Mirage Island value is a 16-bit random number generated daily by the game's RTC.
 * It is compared against the lower 16 bits of the Personality Values of all Pokémon in
 * the player's party to determine if Mirage Island spawns on Route 130.
 *
 * @param view - The raw save file DataView.
 * @param offset - The offset within the buffer to read the value from.
 * @returns The 16-bit unsigned integer representing the Mirage Island value.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
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
    const gen3MixRecords = parseGen3MixRecords(view, section1Offset + 0x27cc);

    const flagsOffset = section2Offset + 0x02f0;
    const hiddenItemFlags = new Uint8Array(14);

    for (let i = 0; i < 14; i++) {
      const currentByte = view.getUint8(flagsOffset + 62 + i);
      const nextByte = view.getUint8(flagsOffset + 62 + i + 1);
      hiddenItemFlags[i] = ((currentByte >> 4) | ((nextByte & 0x0f) << 4)) & 0xff;
    }

    const mirageIslandOffset = _forcedVersion === 'emerald' ? 0x0464 : 0x0408;
    const mirageIslandValue = parseGen3MirageIslandValue(view, section2Offset + mirageIslandOffset);

    const gen3BattleFrontier = parseGen3BattleFrontier(view, section2Offset);

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
      gen3BattleFrontier,
      gen3PokeNews,
      gen3MixRecords,
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

const TOWER_WIN_STREAKS_OFFSET = 0x0ce0;
const TOWER_RECORD_WIN_STREAKS_OFFSET = 0x0cf0;
const DOME_WIN_STREAKS_OFFSET = 0x0d0c;
const DOME_RECORD_WIN_STREAKS_OFFSET = 0x0d14;
const PALACE_WIN_STREAKS_OFFSET = 0x0dc8;
const PALACE_RECORD_WIN_STREAKS_OFFSET = 0x0dd0;
const ARENA_WIN_STREAKS_OFFSET = 0x0dda;
const ARENA_RECORD_STREAKS_OFFSET = 0x0dde;
const FACTORY_WIN_STREAKS_OFFSET = 0x0de2;
const FACTORY_RECORD_WIN_STREAKS_OFFSET = 0x0dea;
const PIKE_WIN_STREAKS_OFFSET = 0x0e04;
const PIKE_RECORD_STREAKS_OFFSET = 0x0e08;
const PYRAMID_WIN_STREAKS_OFFSET = 0x0e1a;
const PYRAMID_RECORD_STREAKS_OFFSET = 0x0e1e;

/**
 * Parses the Battle Frontier win streaks from a Gen 3 save file.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock2Offset - The offset within the buffer to the start of SaveBlock2.
 * @returns The Battle Frontier win streaks data structure.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3BattleFrontier(view: DataView, saveBlock2Offset: number): Gen3BattleFrontier {
  try {
    const read1D = (baseOffset: number): number[] => {
      const arr = [];
      for (let lvl = 0; lvl < 2; lvl++) {
        arr.push(view.getUint16(saveBlock2Offset + baseOffset + lvl * 2, true));
      }
      return arr;
    };

    const read2D = (baseOffset: number, battleModes: number): number[][] => {
      const arr: number[][] = [];
      for (let battle = 0; battle < battleModes; battle++) {
        const lvlArr = [];
        for (let lvl = 0; lvl < 2; lvl++) {
          lvlArr.push(view.getUint16(saveBlock2Offset + baseOffset + (battle * 2 + lvl) * 2, true));
        }
        arr.push(lvlArr);
      }
      return arr;
    };

    return {
      tower: {
        winStreaks: read2D(TOWER_WIN_STREAKS_OFFSET, 4),
        recordWinStreaks: read2D(TOWER_RECORD_WIN_STREAKS_OFFSET, 4),
      },
      dome: {
        winStreaks: read2D(DOME_WIN_STREAKS_OFFSET, 2),
        recordWinStreaks: read2D(DOME_RECORD_WIN_STREAKS_OFFSET, 2),
      },
      palace: {
        winStreaks: read2D(PALACE_WIN_STREAKS_OFFSET, 2),
        recordWinStreaks: read2D(PALACE_RECORD_WIN_STREAKS_OFFSET, 2),
      },
      arena: {
        winStreaks: read1D(ARENA_WIN_STREAKS_OFFSET),
        recordWinStreaks: read1D(ARENA_RECORD_STREAKS_OFFSET),
      },
      factory: {
        winStreaks: read2D(FACTORY_WIN_STREAKS_OFFSET, 2),
        recordWinStreaks: read2D(FACTORY_RECORD_WIN_STREAKS_OFFSET, 2),
      },
      pike: {
        winStreaks: read1D(PIKE_WIN_STREAKS_OFFSET),
        recordWinStreaks: read1D(PIKE_RECORD_STREAKS_OFFSET),
      },
      pyramid: {
        winStreaks: read1D(PYRAMID_WIN_STREAKS_OFFSET),
        recordWinStreaks: read1D(PYRAMID_RECORD_STREAKS_OFFSET),
      },
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
 * @remarks
 * The PV is a central cryptographic and mechanical mechanism in Gen 3. It dictates
 * a Pokémon's gender, ability, nature, shininess, Unown letter, Spinda spot pattern,
 * and the 24-permutation substructure ordering (`PV % 24`) used to decrypt its 48-byte Data block.
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
 * Parses the 32-bit Ribbon and Obedience bitfield from a Gen 3 save file.
 *
 * @remarks
 * Ribbons are densely packed into a 32-bit integer located at offset `8` of the
 * "Miscellaneous (M)" substructure. Contest Ribbons (Cool, Beauty, Cute, Smart, Tough)
 * require 3 bits each because they represent 4 sequential ranks (Normal=1, Super=2,
 * Hyper=3, Master=4).
 *
 * For example, the `smart` rank is extracted by right-shifting the bitfield by 9 bits
 * and masking with `0x07` (binary `111`).
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
 * @remarks
 * PokeNews tracks TV broadcasts like swarms, sales, or the Lilycove Department Store clearance.
 * It is an array of 16 events, each taking 4 bytes: `kind` (event type), `state` (active/inactive),
 * and a 16-bit `dayCountdown` dictating when the event will occur relative to the RTC.
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
