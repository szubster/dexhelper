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

import type { GameVersion, Gen3BerryPatch, Gen3Ribbons, Gen3SecretBase, SaveData } from './common';

const SIGNATURE = 0x08012025;
const SECTION_SIZE = 4096;
const NUM_SECTIONS = 14;
const SECRET_BASES_COUNT = 20;
const SECRET_BASE_SIZE = 160;
const SECRET_BASE_OFFSET_RS = 0x1a08;
const SECRET_BASE_OFFSET_EMERALD = 0x1a9c;

const SAVE_BLOCK_A = 0x0000;
const SAVE_BLOCK_B = 0xe000;

const GEN3_ROAMER_OFFSET_RS = 0x3144;
const GEN3_ROAMER_OFFSET_EMERALD = 0x31dc;
const GEN3_ROAMER_OFFSET_FRLG = 0x30d0;

const ROAMER_IVS_OFFSET = 0;
const ROAMER_PV_OFFSET = 4;
const ROAMER_SPECIES_ID_OFFSET = 8;
const ROAMER_HP_OFFSET = 10;
const ROAMER_LEVEL_OFFSET = 12;
const ROAMER_STATUS_OFFSET = 13;
const ROAMER_ACTIVE_OFFSET = 19;

const IV_MASK = 0x1f;
const IV_SHIFT_HP = 0;
const IV_SHIFT_ATK = 5;
const IV_SHIFT_DEF = 10;
const IV_SHIFT_SPD = 15;
const IV_SHIFT_SPATK = 20;
const IV_SHIFT_SPDEF = 25;

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
 * Each berry patch is represented by an 8-byte structure starting at offset `0x071C` within SaveBlock1.
 * - `Byte 0`: Berry ID (which berry is planted).
 * - `Byte 1`: Growth stage (bits 0-6) and a flag indicating if growth has stopped (bit 7).
 * - `Bytes 2-3`: A 16-bit little-endian integer tracking minutes until the next growth stage.
 * - `Byte 4`: Berry yield (how many berries can be picked).
 * - `Byte 5`: A packed bitfield tracking watering history across the 4 growth stages,
 *             plus the number of times the patch has regrown without being picked (lower 4 bits).
 * - `Bytes 6-7`: Unused padding.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The resolved memory offset to the active SaveBlock1.
 * @returns An array of parsed `Gen3BerryPatch` objects representing the state of all 128 patches.
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
 * **Version-Specific Memory Shifts:**
 * The roamer data block does not have a fixed location; it shifts significantly depending
 * on the game engine version due to differing lengths of preceding data structures
 * (like PC items, mail, or battle tower stats):
 * - Ruby/Sapphire: `SaveBlock1 + 0x3144`
 * - Emerald: `SaveBlock1 + 0x31DC`
 * - FireRed/LeafGreen: `SaveBlock1 + 0x30D0`
 *
 * **Binary Data Structure:**
 * - `Bytes 0-3`: A 32-bit little-endian integer containing the packed Individual Values (IVs).
 *   The IVs are densely packed as six 5-bit sequences:
 *   - HP (bits 0-4), Attack (bits 5-9), Defense (bits 10-14),
 *   - Speed (bits 15-19), Sp. Attack (bits 20-24), Sp. Defense (bits 25-29).
 * - `Bytes 4-7`: The 32-bit Personality Value (PV).
 * - `Bytes 8-9`: The 16-bit Species ID.
 * - `Bytes 10-11`: Current HP.
 * - `Byte 12`: Level.
 * - `Byte 13`: Status Condition.
 * - `Byte 19`: Active boolean flag (determines if the roamer is currently roaming or caught/fainted).
 *
 * *Note:* Gen 3 Pokémon roamer map locations are stored in dynamic EWRAM while the game is running
 * and are *not* serialized into the .sav battery save file. Therefore, only static attributes can be extracted.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The resolved memory offset to the active SaveBlock1.
 * @param gameVersion - The detected game version used to apply the correct memory shift.
 * @returns An object containing the extracted roamer data, including unpacked IVs.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3Roamer(view: DataView, saveBlock1Offset: number, gameVersion: string) {
  let offset = saveBlock1Offset;
  if (gameVersion === 'ruby' || gameVersion === 'sapphire') {
    offset += GEN3_ROAMER_OFFSET_RS;
  } else if (gameVersion === 'emerald') {
    offset += GEN3_ROAMER_OFFSET_EMERALD;
  } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
    offset += GEN3_ROAMER_OFFSET_FRLG;
  } else {
    // Defaulting to ruby offset if unknown
    offset += GEN3_ROAMER_OFFSET_RS;
  }

  try {
    const ivs = view.getUint32(offset + ROAMER_IVS_OFFSET, true);
    const personalityValue = view.getUint32(offset + ROAMER_PV_OFFSET, true);
    const speciesId = view.getUint16(offset + ROAMER_SPECIES_ID_OFFSET, true);
    const hp = view.getUint16(offset + ROAMER_HP_OFFSET, true);
    const level = view.getUint8(offset + ROAMER_LEVEL_OFFSET);
    const statusCondition = view.getUint8(offset + ROAMER_STATUS_OFFSET);
    const active = view.getUint8(offset + ROAMER_ACTIVE_OFFSET) !== 0;

    const ivHp = (ivs >> IV_SHIFT_HP) & IV_MASK;
    const atk = (ivs >> IV_SHIFT_ATK) & IV_MASK;
    const def = (ivs >> IV_SHIFT_DEF) & IV_MASK;
    const spd = (ivs >> IV_SHIFT_SPD) & IV_MASK;
    const spAtk = (ivs >> IV_SHIFT_SPATK) & IV_MASK;
    const spDef = (ivs >> IV_SHIFT_SPDEF) & IV_MASK;

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

/**
 * Parses Secret Base records from a Gen 3 save file.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The resolved memory offset to the active SaveBlock1.
 * @param gameVersion - The detected game version used to apply the correct memory shift.
 * @returns An array of active secret base locations.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3SecretBases(view: DataView, saveBlock1Offset: number, gameVersion: string): Gen3SecretBase[] {
  let baseOffset = saveBlock1Offset;
  if (gameVersion === 'emerald') {
    baseOffset += SECRET_BASE_OFFSET_EMERALD;
  } else {
    baseOffset += SECRET_BASE_OFFSET_RS; // Defaulting to RS offset for ruby/sapphire and unknown since FRLG doesn't use secret bases in the same way.
  }

  try {
    const secretBases: Gen3SecretBase[] = [];
    for (let i = 0; i < SECRET_BASES_COUNT; i++) {
      const offset = baseOffset + i * SECRET_BASE_SIZE;
      const secretBaseId = view.getUint8(offset);

      // We only consider secret bases with an ID > 0 as active
      if (secretBaseId > 0) {
        secretBases.push({ secretBaseId });
      }
    }
    return secretBases;
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

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
    const gen3SecretBases = parseGen3SecretBases(view, section1Offset, _forcedVersion || 'ruby');

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
      gen3SecretBases,
      hiddenItemFlags,
      mirageIslandValue,
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
