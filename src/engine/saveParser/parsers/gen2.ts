/**
 * @module gen2Parser
 *
 * Contains logic for parsing Generation 2 (Gold, Silver, Crystal) Game Boy Color save files.
 *
 * ## Architecture Overview
 *
 * Generation 2 maintains a linear memory layout, but with a critical distinction:
 * Memory offsets differ significantly between Gold/Silver and Crystal.
 *
 * 1. **Version Detection & Offset Alignment**:
 *    Because the save file doesn't explicitly declare its version, the parser must
 *    heuristically determine it to apply the correct memory map. Once detected,
 *    a boolean (`isCrystal`) is used to dynamically select the correct offset
 *    variable via ternary operations (e.g., `DAYCARE_SLOT_1_OFFSET_CRYSTAL` vs
 *    `DAYCARE_SLOT_1_OFFSET_GS`).
 *
 * 2. **Length-Prefixed Lists (Inventory)**:
 *    Backpack inventory items (Items, Key Items, Balls) are stored dynamically as
 *    length-prefixed lists. The first byte specifies the total count, followed by
 *    alternating bytes for Item ID and Quantity.
 */
import gen2Landmarks from '../../data/gen2/landmarks.json';
import gen2MapLocations from '../../data/gen2/mapLocations.json';
import { GEN2_VERSION_EXCLUSIVES } from '../../exclusives/gen2Exclusives';
import { parseGen2DailyEvents, parseGen2NarrativeFlags } from '../utils/gen2EventFlags';
import type { GameVersion, Gen2SaveData, PokemonInstance } from './common';
import { checkShiny, checkShinyGene, decodeGen12String, parseDVs, parsePokerus } from './common';
import { parseGen2PokegearData } from './gen2/phone/parser';

const POKEMON_OFFSET_SPECIES_ID = 0;
const POKEMON_OFFSET_ITEM = 1;
const POKEMON_OFFSET_MOVES = 2;
const POKEMON_OFFSET_DVS = 21;
const POKEMON_OFFSET_FRIENDSHIP = 27;
const POKEMON_OFFSET_POKERUS = 28;
const POKEMON_OFFSET_CAUGHT_BYTE_1 = 29;
const POKEMON_OFFSET_CAUGHT_BYTE_2 = 30;
const POKEMON_OFFSET_LEVEL = 31;

const GEN2_TM_EVENT_FLAGS: Record<number, number> = {
  191: 10,
  192: 92,
  193: 206,
  195: 75,
  196: 209,
  197: 211,
  198: 72,
  200: 85,
  202: 119,
  203: 59,
  206: 14,
  209: 208,
  213: 13,
  214: 15,
  219: 215,
  220: 12,
  221: 8,
  226: 86,
  227: 114,
  232: 212,
  235: 11,
  237: 113,
  239: 9,
  240: 80,
};

const GEN2_TM_HM_MOVE_MAP: Record<number, number> = {
  191: 223,
  192: 29,
  193: 174,
  194: 205,
  195: 46,
  196: 92,
  197: 192,
  198: 249,
  199: 143,
  200: 237,
  201: 241,
  202: 230,
  203: 173,
  204: 59,
  205: 63,
  206: 196,
  207: 182,
  208: 240,
  209: 202,
  210: 203,
  211: 218,
  212: 76,
  213: 231,
  214: 225,
  215: 87,
  216: 89,
  217: 216,
  218: 91,
  219: 94,
  220: 247,
  221: 189,
  222: 104,
  223: 8,
  224: 207,
  225: 214,
  226: 188,
  227: 201,
  228: 126,
  229: 129,
  230: 111,
  231: 9,
  232: 138,
  233: 17,
  234: 156,
  235: 213,
  236: 168,
  237: 211,
  238: 7,
  239: 210,
  240: 171,
  241: 15,
  242: 19,
  243: 57,
  244: 70,
  245: 148,
  246: 250,
  247: 127,
};
const POKEMON_DATA_BLOCK_SIZE = 32;
const POKEMON_NAME_LENGTH = 11;
const POKEMON_OFFSET_OT_NAME = POKEMON_DATA_BLOCK_SIZE;
const POKEMON_OFFSET_NICKNAME = POKEMON_DATA_BLOCK_SIZE + POKEMON_NAME_LENGTH;
const POKEMON_OFFSET_CURRENT_HP = 34;
const BOX_SPECIES_LIST_OFFSET = 1;
const BOX_DATA_BLOCK_OFFSET = 22;
const ITEM_LIST_OFFSET = 1;
const ITEM_RECORD_SIZE = 2;
const ITEM_QUANTITY_OFFSET = 1;

const NPC_TRADE_FLAGS_OFFSET_CRYSTAL = 0x24eb;
const NPC_TRADE_FLAGS_OFFSET_GS = 0x250f;
const GEN2_NPC_TRADE_COUNT = 7;
const GEN2_EGG_SPECIES_ID = 253;
const GEN2_EGG_CYCLE_STEPS = 256;

const DAYCARE_SLOT_1_OFFSET_GS = 0x2850;
const DAYCARE_SLOT_2_OFFSET_GS = 0x2817;
const DAYCARE_EGG_FLAG_OFFSET_GS = 0x284f;
const DAYCARE_SLOT_1_OFFSET_CRYSTAL = 0x282c;
const DAYCARE_SLOT_2_OFFSET_CRYSTAL = 0x27f3;
const EVENT_FLAGS_OFFSET_CRYSTAL = 0x2600;
const EVENT_FLAGS_OFFSET_GS = 0x2624;

const DAYCARE_EGG_FLAG_OFFSET_CRYSTAL = 0x282b;
const DAYCARE_EGG_FLAG_MASK = 0x01;

import {
  GEN2_PARTY_COUNT_OFFSET_CRYSTAL as PARTY_COUNT_OFFSET_CRYSTAL,
  GEN2_PARTY_COUNT_OFFSET_GS as PARTY_COUNT_OFFSET_GS,
  GEN2_PARTY_SPECIES_OFFSET_CRYSTAL as PARTY_SPECIES_OFFSET_CRYSTAL,
  GEN2_PARTY_SPECIES_OFFSET_GS as PARTY_SPECIES_OFFSET_GS,
} from '../utils/detection';

const POKEDEX_OWNED_OFFSET_GS = 0x2a4c;
const POKEDEX_OWNED_OFFSET_CRYSTAL = 0x2a69;
const POKEDEX_SEEN_OFFSET_GS = 0x2a6c;
const POKEDEX_SEEN_OFFSET_CRYSTAL = 0x2a89;

const MOMS_MONEY_OFFSET_RELATIVE = -0x06;
const MOM_SAVING_MONEY_OFFSET_RELATIVE = -0x03;
const ACTIVE_DECO_OFFSET_RELATIVE_CRYSTAL = 0x3b8;
const ACTIVE_DECO_OFFSET_RELATIVE_GS = 0x3dd;
const ACTIVE_DECO_COUNT = 8;
const UNLOCKED_DECO_BYTE_OFFSET = 0x54;
const UNLOCKED_DECO_BIT_OFFSET = 4;
const UNLOCKED_DECO_COUNT = 46;
const CURRENT_BOX_NUM_OFFSET_GS = 0x2724;
const CURRENT_BOX_NUM_OFFSET_CRYSTAL = 0x2700;
const CURRENT_BOX_COUNT_OFFSET = 0x2d10;
const CURRENT_BOX_SPECIES_OFFSET = 0x2d11;
const TM_POCKET_OFFSET_GS = 0x23e7;
const TM_POCKET_OFFSET_CRYSTAL = 0x23c8;
const ITEMS_POCKET_OFFSET_GS = 0x2420;
const ITEMS_POCKET_OFFSET_CRYSTAL = 0x2402;
const KEY_ITEMS_POCKET_OFFSET_GS = 0x244a;
const KEY_ITEMS_POCKET_OFFSET_CRYSTAL = 0x242c;
const BALLS_POCKET_OFFSET_GS = 0x2465;
const BALLS_POCKET_OFFSET_CRYSTAL = 0x2447;
const PC_ITEMS_POCKET_OFFSET_GS = 0x247e;
const GEN2_TM_HM_COUNT = 57;
const GEN2_TM_BASE_ITEM_ID = 191;
const PC_ITEMS_POCKET_OFFSET_CRYSTAL = 0x2460;
const ROAMING_LEGENDARIES_OFFSET_GS = 0x28da;
const ROAMING_LEGENDARIES_OFFSET_CRYSTAL = 0x28b6;
const ROAMER_STRUCT_SIZE = 7;
const ROAMER_OFFSET_SPECIES = 0;
const ROAMER_OFFSET_LEVEL = 1;
const ROAMER_OFFSET_MAP_GROUP = 2;
const ROAMER_OFFSET_MAP_NUMBER = 3;
const ROAMER_OFFSET_HP = 4;
const ROAMER_OFFSET_DVS = 5;
const ROAMER_GLOBAL_OFFSET_MAP_NUMBER = 19;
const ROAMER_GLOBAL_OFFSET_MAP_GROUP = 20;
const ROAMER_COUNT = 3;
const ROAMER_INACTIVE_MAP_GROUP = 0xff;
const JOHTO_BADGES_OFFSET_GS = 0x23e4;
const JOHTO_BADGES_OFFSET_CRYSTAL = 0x23e5;
const KANTO_BADGES_OFFSET_GS = 0x23e5;
const KANTO_BADGES_OFFSET_CRYSTAL = 0x23e6;
const TRAINER_NAME_OFFSET = 0x200b;
const TRAINER_ID_OFFSET = 0x2009;
const MAP_BANK_OFFSET_GS = 0x25b3;
const MAP_BANK_OFFSET_CRYSTAL = 0x25c6;
const MAP_ID_OFFSET_GS = 0x25b4;
const MAP_ID_OFFSET_CRYSTAL = 0x25c7;

const EVENT_FLAGS_LENGTH = 0x100;
const EVENT_FLAGS_MAX_BITS = 2048;
const BITS_PER_BYTE = 8;
const BIT_MASK = 1;

const EVENT_FLAG_SUDOWOODO_BYTE = Math.floor(42 / BITS_PER_BYTE);
const EVENT_FLAG_SUDOWOODO_BIT = 42 % BITS_PER_BYTE;
const EVENT_FLAG_HO_OH_BYTE = Math.floor(791 / BITS_PER_BYTE);
const EVENT_FLAG_HO_OH_BIT = 791 % BITS_PER_BYTE;
const EVENT_FLAG_LUGIA_BYTE = Math.floor(792 / BITS_PER_BYTE);
const EVENT_FLAG_LUGIA_BIT = 792 % BITS_PER_BYTE;
const EVENT_FLAG_SNORLAX_BYTE = Math.floor(1872 / BITS_PER_BYTE);
const EVENT_FLAG_SNORLAX_BIT = 1872 % BITS_PER_BYTE;
const EVENT_FLAG_RED_GYARADOS_BYTE = Math.floor(1873 / BITS_PER_BYTE);
const EVENT_FLAG_RED_GYARADOS_BIT = 1873 % BITS_PER_BYTE;

export const EVENT_FLAG_SOLVED_HO_OH_PUZZLE_BYTE = Math.floor(839 / BITS_PER_BYTE);
export const EVENT_FLAG_SOLVED_HO_OH_PUZZLE_BIT = 839 % BITS_PER_BYTE;
export const EVENT_FLAG_SOLVED_KABUTO_PUZZLE_BYTE = Math.floor(840 / BITS_PER_BYTE);
export const EVENT_FLAG_SOLVED_KABUTO_PUZZLE_BIT = 840 % BITS_PER_BYTE;
export const EVENT_FLAG_SOLVED_OMANYTE_PUZZLE_BYTE = Math.floor(841 / BITS_PER_BYTE);
export const EVENT_FLAG_SOLVED_OMANYTE_PUZZLE_BIT = 841 % BITS_PER_BYTE;
export const EVENT_FLAG_SOLVED_AERODACTYL_PUZZLE_BYTE = Math.floor(842 / BITS_PER_BYTE);
export const EVENT_FLAG_SOLVED_AERODACTYL_PUZZLE_BIT = 842 % BITS_PER_BYTE;

const CAUGHT_TIME_MASK = 0xc0;
const CAUGHT_TIME_SHIFT = 6;
const CAUGHT_LEVEL_MASK = 0x3f;
const CAUGHT_TIME_MORNING = 1;
const CAUGHT_TIME_DAY = 2;
const CAUGHT_TIME_NIGHT = 3;
const CAUGHT_LOC_EVENT = 0x7e;
const CAUGHT_LOC_TRADED = 0x7f;
const GEN2_EMPTY_SLOT = 0xff;

const MAX_VALID_SPECIES_ID = 251;
const POKEMON_MOVE_COUNT = 4;
const UNOWN_SPECIES_ID = 201;
const UNOWN_DV_SHIFT = 1;
const UNOWN_DV_MASK = 0b11;
const UNOWN_FORM_ATK_SHIFT = 6;

const BANK_1_BOX_1_OFFSET = 0x4000;
const BANK_1_BOX_2_OFFSET = 0x444e;
const BANK_1_BOX_3_OFFSET = 0x489c;
const BANK_1_BOX_4_OFFSET = 0x4cea;
const BANK_1_BOX_5_OFFSET = 0x5138;
const BANK_1_BOX_6_OFFSET = 0x5586;
const BANK_1_BOX_7_OFFSET = 0x59d4;
const BANK_2_BOX_8_OFFSET = 0x6000;
const BANK_2_BOX_9_OFFSET = 0x644e;
const BANK_2_BOX_10_OFFSET = 0x689c;
const BANK_2_BOX_11_OFFSET = 0x6cea;
const BANK_2_BOX_12_OFFSET = 0x7138;
const BANK_2_BOX_13_OFFSET = 0x7586;
const BANK_2_BOX_14_OFFSET = 0x79d4;

const HALL_OF_FAME_OFFSET_RELATIVE_TO_JOHTO_BADGES = 0xa8;
const HALL_OF_FAME_OFFSET_RELATIVE = 0xf74;
const GEN2_HOF_MAX_RECORDS = 30;
const GEN2_HOF_POKEMON_COUNT = 6;
const GEN2_HOF_RECORD_LENGTH = 0x62;
const GEN2_HOF_POKEMON_LENGTH = 0x10;
const GEN2_HOF_POKEMON_OFFSET_LEVEL = 5;
const GEN2_HOF_POKEMON_OFFSET_NICKNAME = 6;

const UNOWN_FORM_DEF_SHIFT = 4;
const UNOWN_FORM_SPD_SHIFT = 2;
const UNOWN_FORM_MOD = 28;
const UNOWN_FORM_VALID_MAX = 26;
const UNOWN_FORM_ASCII_A = 65;

function isValidLandmark(id: string): id is keyof typeof gen2Landmarks {
  return id in gen2Landmarks;
}

function isValidMapGroup(id: string): id is keyof typeof gen2MapLocations {
  return id in gen2MapLocations;
}

function isValidMapId<T extends Record<string, string>>(id: string, dict: T): id is keyof T & string {
  return id in dict;
}

/**
 * Extracts the caught data (time of day, level, and location) from a Generation 2 Pokémon structure.
 * Caught data is only populated in Crystal version; Gold and Silver leave these bytes as 0.
 * Time and level are packed into a single byte via bitwise operations.
 *
 * @param view - The raw save file view.
 * @param offset - The memory offset of the specific Pokémon structure.
 * @returns An object containing the time, level, location ID, and location name, or undefined if missing.
 */
function parseCaughtData(view: DataView, offset: number) {
  const caughtByte1 = view.getUint8(offset + POKEMON_OFFSET_CAUGHT_BYTE_1);
  const caughtByte2 = view.getUint8(offset + POKEMON_OFFSET_CAUGHT_BYTE_2);

  if (caughtByte1 === 0 && caughtByte2 === 0) return undefined;

  const timeBits = (caughtByte1 & CAUGHT_TIME_MASK) >> CAUGHT_TIME_SHIFT;
  const caughtLevel = caughtByte1 & CAUGHT_LEVEL_MASK;
  const location = caughtByte2;

  let time: 'Morning' | 'Day' | 'Night' | 'Unknown' = 'Unknown';
  if (timeBits === CAUGHT_TIME_MORNING) time = 'Morning';
  else if (timeBits === CAUGHT_TIME_DAY) time = 'Day';
  else if (timeBits === CAUGHT_TIME_NIGHT) time = 'Night';

  let locationName: string | undefined;
  if (location === CAUGHT_LOC_EVENT) locationName = 'Event/Gift';
  else if (location === CAUGHT_LOC_TRADED) locationName = 'Special Event/Traded';
  else {
    const locStr = location.toString();
    locationName = isValidLandmark(locStr) ? gen2Landmarks[locStr] : undefined;
  }

  return { time, level: caughtLevel, location, locationName };
}

/**
 * Extracts details for a single Pokémon from a Generation 2 save block.
 *
 * **Memory Structure Differences:**
 * - Party Pokémon use a 48-byte structure, which includes 16 additional bytes at the end for dynamic battle stats (e.g. current HP, max HP, attack, etc.).
 * - PC/Box Pokémon use a smaller 32-byte structure, as these battle stats are recalculated upon withdrawal.
 * - Unlike Gen 1, Daycare Pokémon store their Original Trainer (OT) name immediately adjacent to their data block (at `offset + 32`),
 *   whereas Party and Box instances store OT names in entirely separate string array blocks elsewhere in memory.
 *
 * **Architecture Note:**
 * This function serves as the central extractor for all Gen 2 Pokémon instances. It maps binary flags to structured data, including checking the DVs for shininess (which is deterministic in Gen 2) and parsing Pokerus status. The `isCrystal` flag is critical because Pokémon Crystal introduced location data (bytes 29 and 30) which Gold and Silver left unused.
 *
 * @param view - The raw save file view.
 * @param offset - The memory offset for the start of the Pokémon's data block.
 * @param isCrystal - Whether the save file is from Pokémon Crystal. Crystal uniquely utilizes bytes 29 and 30 for caught time/level/location data.
 * @param storageLocation - A string indicating where the Pokémon is stored (e.g., 'Party', 'Box 1', 'Daycare').
 * @param slot - The 1-indexed slot the Pokémon occupies in its storage container.
 * @returns A fully constructed PokemonInstance object, or undefined if the species ID is invalid.
 *
 * @example
 * const pokemon = parseGen2PokemonInstance(view, 0x288A, true, 'Party', 1);
 */
function parseGen2PokemonInstance(
  view: DataView,
  offset: number,
  isCrystal: boolean,
  storageLocation: string,
  slot?: number,
): PokemonInstance | undefined {
  let speciesId: number;
  let item: number;
  let moves: number[];
  let rawDVs: number;
  let friendship: number;
  let rawPokerus: number;
  let level: number;
  let currentHp: number | undefined;
  let otName: string | undefined;
  let nickname: string | undefined;

  try {
    speciesId = view.getUint8(offset + POKEMON_OFFSET_SPECIES_ID);
    if (!speciesId || (speciesId > MAX_VALID_SPECIES_ID && speciesId !== GEN2_EGG_SPECIES_ID)) return undefined;

    item = view.getUint8(offset + POKEMON_OFFSET_ITEM);
    moves = [];
    for (let i = 0; i < POKEMON_MOVE_COUNT; i++) {
      const m = view.getUint8(offset + POKEMON_OFFSET_MOVES + i);
      if (m > 0) moves.push(m);
    }
    rawDVs = view.getUint16(offset + POKEMON_OFFSET_DVS, false);
    friendship = view.getUint8(offset + POKEMON_OFFSET_FRIENDSHIP);
    rawPokerus = view.getUint8(offset + POKEMON_OFFSET_POKERUS);
    level = view.getUint8(offset + POKEMON_OFFSET_LEVEL);

    currentHp = storageLocation === 'Party' ? view.getUint16(offset + POKEMON_OFFSET_CURRENT_HP, false) : undefined;
    // OT names in daycare are immediately after the data block
    otName =
      storageLocation === 'Daycare'
        ? decodeGen12String(view, offset + POKEMON_OFFSET_OT_NAME, POKEMON_NAME_LENGTH)
        : undefined;
    nickname =
      storageLocation === 'Daycare'
        ? decodeGen12String(view, offset + POKEMON_OFFSET_NICKNAME, POKEMON_NAME_LENGTH)
        : undefined;
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }

  const dvs = parseDVs(rawDVs);
  const isShiny = checkShiny(dvs);
  const isShinyCarrier = checkShinyGene(dvs);
  const pokerus = parsePokerus(rawPokerus);

  const eggSteps = speciesId === GEN2_EGG_SPECIES_ID ? friendship * GEN2_EGG_CYCLE_STEPS : undefined;
  const caughtData = isCrystal ? parseCaughtData(view, offset) : undefined;

  let unownForm: string | undefined;
  if (speciesId === UNOWN_SPECIES_ID) {
    const atkBits = (dvs.atk >> UNOWN_DV_SHIFT) & UNOWN_DV_MASK;
    const defBits = (dvs.def >> UNOWN_DV_SHIFT) & UNOWN_DV_MASK;
    const spdBits = (dvs.spd >> UNOWN_DV_SHIFT) & UNOWN_DV_MASK;
    const spcBits = (dvs.spc >> UNOWN_DV_SHIFT) & UNOWN_DV_MASK;
    const value =
      (atkBits << UNOWN_FORM_ATK_SHIFT) |
      (defBits << UNOWN_FORM_DEF_SHIFT) |
      (spdBits << UNOWN_FORM_SPD_SHIFT) |
      spcBits;
    const modValue = value % UNOWN_FORM_MOD;
    unownForm = modValue < UNOWN_FORM_VALID_MAX ? String.fromCharCode(UNOWN_FORM_ASCII_A + modValue) : 'A';
  }

  return {
    speciesId,
    currentHp,
    level,
    isShiny,
    isShinyCarrier,
    item,
    moves,
    eggSteps,
    friendship,
    pokerus,
    caughtData,
    dvs,
    otName,
    nickname,
    storageLocation,
    slot,
    unownForm,
    hash: `${speciesId}-${level}-${nickname || otName}-${dvs.hp}-${dvs.atk}-${dvs.def}-${dvs.spd}-${dvs.spc}`,
  };
}

/**
 * Attempts to heuristically determine whether a Generation 2 save is Gold or Silver.
 * This is done by checking the player's Pokédex (owned and seen) against known
 * version-exclusive Pokémon.
 *
 * @param owned - A set of Pokémon Pokédex IDs the player has caught.
 * @param seen - A set of Pokémon Pokédex IDs the player has seen.
 * @returns 'gold', 'silver', or 'unknown'.
 */
function detectGen2GameVersion(owned: Set<number>, seen: Set<number>): GameVersion {
  const goldExclusives = GEN2_VERSION_EXCLUSIVES['gold'] || [];
  const silverExclusives = GEN2_VERSION_EXCLUSIVES['silver'] || [];

  let goldScore = 0;
  let silverScore = 0;

  for (const id of goldExclusives) {
    if (owned.has(id)) silverScore += 2;
    else if (seen.has(id)) silverScore += 1;
  }
  for (const id of silverExclusives) {
    if (owned.has(id)) goldScore += 2;
    else if (seen.has(id)) goldScore += 1;
  }

  if (goldScore > silverScore) return 'gold';
  if (silverScore > goldScore) return 'silver';

  return 'unknown';
}

/**
 * Performs a structural check to verify if the save file is a valid Generation 2 save.
 *
 * **Why check both offsets?**
 * Gen 2 memory blocks shifted significantly between Gold/Silver and Crystal. The active Party block
 * starts at `0x288A` in G/S and `0x2865` in Crystal.
 * If the main save checksum is corrupt, we fallback to parsing these exact offsets.
 * We dynamically check the `countOffset` based on the `crystal` flag, ensuring the party count
 * is valid (<= 6), correctly terminated with `0xFF`, and contains valid internal Pokémon IDs.
 *
 * @param view - The raw save file view.
 * @param crystal - Whether to test offsets specific to Pokémon Crystal.
 * @returns True if the structure looks like a valid Gen 2 save for the specified game type.
 */

/**
 * Extracts all relevant game data (party, PC boxes, inventory, Pokédex, etc.) from a Gen 2 save.
 *
 * Unlike Gen 1 where offsets are mostly static (with minor shifts in Yellow), Gen 2 memory offsets
 * differ significantly between Gold/Silver and Crystal due to engine additions (like the Battle Tower)
 * shifting data blocks down in memory.
 *
 * This function dynamically determines the correct memory map by probing both potential party offset
 * locations (0x288a for GS, 0x2865 for Crystal). Since party sizes are strictly bounded between 1-6,
 * reading a valid count at one offset and an invalid value at the other reliably identifies the version.
 *
 * @param view - The raw save file DataView.
 * @param forceCrystal - An optional boolean flag to override dynamic detection and force the parser to use Crystal memory offsets. Useful for uninitialized early-game saves.
 * @returns The fully parsed and structured SaveData object.
 */

/**
 * Parses the player's seen and caught Pokédex data.
 *
 * **Bitfield Layout:**
 * The Gen 2 Pokédex status is stored as contiguous 32-byte blocks (one for `owned`, one for `seen`).
 * Since 32 bytes * 8 bits = 256 possible bits, this perfectly fits the 251 Pokémon in Generation 2.
 * The bits are 1-indexed (Bulbasaur is bit 0 of byte 0, Chikorita is bit 7 of byte 18, etc.).
 *
 * @param view - The raw save file DataView.
 * @param offsets - The dynamically resolved start offsets for the `owned` and `seen` blocks.
 * @returns An object containing Sets of the `owned` and `seen` Pokémon IDs.
 */
function parsePokedex(view: DataView, offsets: { owned: number; seen: number }) {
  const owned = new Set<number>();
  const seen = new Set<number>();

  for (let dexId = 1; dexId <= 251; dexId++) {
    const byteIdx = Math.floor((dexId - 1) / 8);
    const bitIdx = (dexId - 1) % 8;

    const oByte = view.getUint8(offsets.owned + byteIdx);
    const sByte = view.getUint8(offsets.seen + byteIdx);

    if ((oByte & (1 << bitIdx)) !== 0) {
      owned.add(dexId);
    }
    if ((sByte & (1 << bitIdx)) !== 0) {
      seen.add(dexId);
    }
  }

  return { owned, seen };
}

/**
 * Parses the player's active party from a Generation 2 save.
 *
 * **Memory Layout:**
 * - The party block begins with a 1-byte count of the current party size (max 6).
 * - This is immediately followed by a 7-byte array containing the species IDs of the party members (terminated by `0xFF`).
 * - Following the species array is the sequential block of 48-byte Pokémon data instances (`offset + 7`).
 *
 * @param view - The raw save file DataView.
 * @param offsets - Dynamic offsets containing the start address for `partyCount` and `partySpecies`.
 * @param isCrystal - True if the save file is Pokémon Crystal.
 * @returns An object containing the simple species ID list and the array of fully constructed `PokemonInstance`s.
 */
function parseParty(view: DataView, offsets: { partyCount: number; partySpecies: number }, isCrystal: boolean) {
  const partyCount = view.getUint8(offsets.partyCount);
  const party: number[] = [];
  for (let i = 0; i < partyCount; i++) {
    const id = view.getUint8(offsets.partySpecies + i);
    if (id > 0 && id <= 251) party.push(id);
  }

  const partyDetails: PokemonInstance[] = [];
  const partyDataOffset = offsets.partySpecies + 7; // After species list
  for (let i = 0; i < partyCount; i++) {
    const offset = partyDataOffset + i * 48;
    const p = parseGen2PokemonInstance(view, offset, isCrystal, 'Party', i + 1);
    if (p) {
      partyDetails.push(p);
    }
  }

  return { party, partyDetails };
}

/**
 * Parses all 14 PC Storage Boxes in a Generation 2 save.
 *
 * **WRAM vs SRAM Architecture:**
 * Like Gen 1, only the "currently active" box resides in the main active memory block (WRAM).
 * The remaining 13 inactive boxes are scattered across two inactive SRAM banks.
 * - **Bank 1:** Contains 7 boxes at offsets `0x4000` through `0x59D4`.
 * - **Bank 2:** Contains 7 boxes at offsets `0x6000` through `0x79D4`.
 * This function first processes the WRAM snapshot, then loops through the 14 SRAM
 * offsets to extract the remaining stored Pokémon.
 *
 * @param view - The raw save file DataView.
 * @param offsets - The dynamically resolved start offsets for the active WRAM box.
 * @param isCrystal - True if the save is Crystal.
 * @returns The simple list of species IDs (`pc`) and the detailed instances (`pcDetails`).
 */
function parsePCBoxes(
  view: DataView,
  offsets: { currentBoxNum: number; currentBoxCount: number; currentBoxSpecies: number },
  isCrystal: boolean,
) {
  const currentBoxNum = view.getUint8(offsets.currentBoxNum) & 0x0f;
  const currentBoxCount = view.getUint8(offsets.currentBoxCount);
  const pc: number[] = [];
  for (let i = 0; i < currentBoxCount; i++) {
    const id = view.getUint8(offsets.currentBoxSpecies + i);
    if (id > 0 && (id <= 251 || id === GEN2_EGG_SPECIES_ID)) pc.push(id);
  }

  const pcDetails: PokemonInstance[] = [];
  const currentBoxDataOffset = offsets.currentBoxSpecies + 21; // After species list
  for (let i = 0; i < currentBoxCount; i++) {
    const offset = currentBoxDataOffset + i * POKEMON_DATA_BLOCK_SIZE;
    const p = parseGen2PokemonInstance(view, offset, isCrystal, `Box ${currentBoxNum + 1}`, i + 1);
    if (p) {
      pcDetails.push(p);
    }
  }

  const boxOffsets = [
    BANK_1_BOX_1_OFFSET,
    BANK_1_BOX_2_OFFSET,
    BANK_1_BOX_3_OFFSET,
    BANK_1_BOX_4_OFFSET,
    BANK_1_BOX_5_OFFSET,
    BANK_1_BOX_6_OFFSET,
    BANK_1_BOX_7_OFFSET, // Bank 1
    BANK_2_BOX_8_OFFSET,
    BANK_2_BOX_9_OFFSET,
    BANK_2_BOX_10_OFFSET,
    BANK_2_BOX_11_OFFSET,
    BANK_2_BOX_12_OFFSET,
    BANK_2_BOX_13_OFFSET,
    BANK_2_BOX_14_OFFSET, // Bank 2
  ];

  for (const [i, offset] of boxOffsets.entries()) {
    if (i === currentBoxNum) continue;
    const count = view.getUint8(offset);
    if (count > 20) continue;
    for (let j = 0; j < count; j++) {
      const id = view.getUint8(offset + BOX_SPECIES_LIST_OFFSET + j);
      if (id > 0 && (id <= 251 || id === GEN2_EGG_SPECIES_ID)) pc.push(id);
    }

    const boxDataOffset = offset + BOX_DATA_BLOCK_OFFSET;
    for (let j = 0; j < count; j++) {
      const pOff = boxDataOffset + j * POKEMON_DATA_BLOCK_SIZE;
      const p = parseGen2PokemonInstance(view, pOff, isCrystal, `Box ${i + 1}`, j + 1);
      if (p) {
        pcDetails.push(p);
      }
    }
  }

  return { pc, pcDetails };
}

/**
 * Parses the Pokémon stored in the Daycare, along with Egg availability.
 *
 * **Version Differences:**
 * The Daycare offsets shift by 36 bytes (`0x24`) between G/S and Crystal.
 * The Daycare stores up to 2 Pokémon (hence `daycare1Offset` and `daycare2Offset`),
 * separated by 57 bytes in memory. A boolean flag immediately before `daycare1Offset`
 * indicates if an Egg is waiting to be picked up.
 *
 * @param view - The raw save file DataView.
 * @param isCrystal - True if the save is Crystal.
 * @returns The Daycare Pokémon instances and a boolean indicating if an egg is ready.
 */
function parseDaycare(view: DataView, isCrystal: boolean) {
  const daycare1Offset = isCrystal ? DAYCARE_SLOT_1_OFFSET_CRYSTAL : DAYCARE_SLOT_1_OFFSET_GS;
  const daycare2Offset = isCrystal ? DAYCARE_SLOT_2_OFFSET_CRYSTAL : DAYCARE_SLOT_2_OFFSET_GS;
  const daycareEggOffset = isCrystal ? DAYCARE_EGG_FLAG_OFFSET_CRYSTAL : DAYCARE_EGG_FLAG_OFFSET_GS;

  const daycare: PokemonInstance[] = [];

  const offsets = [daycare1Offset, daycare2Offset];
  for (let i = 0; i < offsets.length; i++) {
    const offset = offsets[i];
    if (offset === undefined) continue;
    const speciesId = view.getUint8(offset);
    if (speciesId !== 0 && speciesId !== GEN2_EMPTY_SLOT) {
      const p = parseGen2PokemonInstance(view, offset, isCrystal, 'Daycare', i + 1);
      if (p) {
        daycare.push(p);
      }
    }
  }

  const daycareHasEgg = (view.getUint8(daycareEggOffset) & DAYCARE_EGG_FLAG_MASK) !== 0;

  return { daycare, daycareHasEgg };
}

/**
 * Parses the player's Backpack inventory across all 4 pockets.
 *
 * **Structure Types:**
 * - **TM/HM Pocket:** This is a fixed-length array of 57 bytes (1 for each TM 01-50 + 7 HMs).
 *   The offset index directly corresponds to the TM number; the value is the quantity.
 * - **Items, Key Items, Balls:** These are dynamic, length-prefixed lists.
 *   The first byte specifies the total number of items in the pocket.
 *   The subsequent bytes alternate between Item ID and Quantity.
 *
 * @param view - The raw save file DataView.
 * @param isCrystal - True if the save is Crystal (shifts all pocket offsets).
 * @returns A unified array of item IDs and quantities across all pockets.
 */
function parseInventory(view: DataView, isCrystal: boolean) {
  const inventory: { id: number; quantity: number }[] = [];

  const tmPocket = isCrystal ? TM_POCKET_OFFSET_CRYSTAL : TM_POCKET_OFFSET_GS;
  const itemsPocket = isCrystal ? ITEMS_POCKET_OFFSET_CRYSTAL : ITEMS_POCKET_OFFSET_GS;
  const keyItemsPocket = isCrystal ? KEY_ITEMS_POCKET_OFFSET_CRYSTAL : KEY_ITEMS_POCKET_OFFSET_GS;
  const ballsPocket = isCrystal ? BALLS_POCKET_OFFSET_CRYSTAL : BALLS_POCKET_OFFSET_GS;

  try {
    // TM/HMs
    for (let i = 0; i < GEN2_TM_HM_COUNT; i++) {
      const qty = view.getUint8(tmPocket + i);
      if (qty > 0) {
        const itemId = GEN2_TM_BASE_ITEM_ID + i;
        inventory.push({ id: itemId, quantity: qty });
      }
    }

    // Items
    const itemsCount = view.getUint8(itemsPocket);
    if (itemsCount > 0 && itemsCount <= 20) {
      for (let i = 0; i < itemsCount; i++) {
        const offset = itemsPocket + ITEM_LIST_OFFSET + i * ITEM_RECORD_SIZE;
        const id = view.getUint8(offset);
        const quantity = view.getUint8(offset + ITEM_QUANTITY_OFFSET);
        inventory.push({ id, quantity });
      }
    }

    // Key Items
    const keyItemsCount = view.getUint8(keyItemsPocket);
    if (keyItemsCount > 0 && keyItemsCount <= 26) {
      for (let i = 0; i < keyItemsCount; i++) {
        const offset = keyItemsPocket + 1 + i;
        const id = view.getUint8(offset);
        inventory.push({ id, quantity: 1 });
      }
    }

    // Balls
    const ballsCount = view.getUint8(ballsPocket);
    if (ballsCount > 0 && ballsCount <= 12) {
      for (let i = 0; i < ballsCount; i++) {
        const offset = ballsPocket + ITEM_LIST_OFFSET + i * ITEM_RECORD_SIZE;
        const id = view.getUint8(offset);
        const quantity = view.getUint8(offset + ITEM_QUANTITY_OFFSET);
        inventory.push({ id, quantity });
      }
    }
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }

  return inventory;
}

/**
 * Parses the current map locations of the legendary beasts (Raikou, Entei, Suicune).
 *
 * Each roaming legendary uses a 7-byte structure containing its species ID, level,
 * and current map coordinates (map group + map ID).
 *
 * @param view - The raw save file DataView.
 * @param isCrystal - True if the save is Crystal.
 * @returns An object detailing each roaming beast's location and the global roaming map tracking variables.
 */
function parseGen2HallOfFameRecords(
  view: DataView,
  hallOfFameOffset: number,
  hallOfFameCount: number,
  trainerName: string,
) {
  const records: {
    playerName: string;
    pokemon: { speciesId: number; level: number; nickname: string }[];
  }[] = [];

  const maxRecords = Math.min(hallOfFameCount, GEN2_HOF_MAX_RECORDS);

  try {
    for (let recordIndex = 0; recordIndex < maxRecords; recordIndex++) {
      const pokemon: { speciesId: number; level: number; nickname: string }[] = [];

      for (let pokemonIndex = 0; pokemonIndex < GEN2_HOF_POKEMON_COUNT; pokemonIndex++) {
        // Skip WinCount byte (1 byte)
        const offset =
          hallOfFameOffset + recordIndex * GEN2_HOF_RECORD_LENGTH + 1 + pokemonIndex * GEN2_HOF_POKEMON_LENGTH;
        const speciesId = view.getUint8(offset);

        // 0x00 or 0xFF usually means empty slot or terminator
        if (speciesId === 0x00 || speciesId === 0xff) {
          continue;
        }

        const level = view.getUint8(offset + GEN2_HOF_POKEMON_OFFSET_LEVEL);
        const nickname = decodeGen12String(view, offset + GEN2_HOF_POKEMON_OFFSET_NICKNAME, 10);

        pokemon.push({ speciesId, level, nickname });
      }

      records.push({
        playerName: trainerName,
        pokemon,
      });
    }
  } catch (e) {
    if (e instanceof RangeError) {
      return records;
    }
    throw e;
  }

  return records;
}

function parseRoamingLegendaries(view: DataView, isCrystal: boolean) {
  const legendaries: {
    speciesId: number;
    level: number;
    mapGroup: number;
    mapId: number;
    isActive: boolean;
    hp: number;
    ivs: { hp: number; atk: number; def: number; spd: number; spAtk: number; spDef: number };
  }[] = [];
  const roamingOffset = isCrystal ? ROAMING_LEGENDARIES_OFFSET_CRYSTAL : ROAMING_LEGENDARIES_OFFSET_GS;
  let curMapGroup: number | undefined;
  let curMapNumber: number | undefined;

  try {
    for (let i = 0; i < ROAMER_COUNT; i++) {
      const structOffset = roamingOffset + i * ROAMER_STRUCT_SIZE;
      const speciesId = view.getUint8(structOffset + ROAMER_OFFSET_SPECIES);
      if (speciesId === 243 || speciesId === 244 || speciesId === 245) {
        const mapGroup = view.getUint8(structOffset + ROAMER_OFFSET_MAP_GROUP);
        const rawDvs = parseDVs(view.getUint16(structOffset + ROAMER_OFFSET_DVS, false));
        const hp = view.getUint8(structOffset + ROAMER_OFFSET_HP);
        legendaries.push({
          speciesId,
          level: view.getUint8(structOffset + ROAMER_OFFSET_LEVEL),
          mapGroup,
          mapId: view.getUint8(structOffset + ROAMER_OFFSET_MAP_NUMBER),
          isActive: mapGroup !== ROAMER_INACTIVE_MAP_GROUP && hp > 0,
          hp,
          ivs: {
            hp: rawDvs.hp,
            atk: rawDvs.atk,
            def: rawDvs.def,
            spd: rawDvs.spd,
            spAtk: rawDvs.spc,
            spDef: rawDvs.spc,
          },
        });
      }
    }

    curMapNumber = view.getUint8(roamingOffset + ROAMER_GLOBAL_OFFSET_MAP_NUMBER);
    curMapGroup = view.getUint8(roamingOffset + ROAMER_GLOBAL_OFFSET_MAP_GROUP);
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }

  return { legendaries, curMapGroup, curMapNumber };
}

/**
 * Orchestrates the full extraction of a Generation 2 (Gold/Silver/Crystal) save file.
 *
 * **Extraction Flow & Memory Architecture:**
 * 1. **Version Verification:** Gen 2 memory offsets differ significantly between Gold/Silver and Crystal
 *    (e.g. Party data is at `0x288A` in G/S but shifted to `0x2865` in Crystal). It checks the party counts
 *    at both offsets to verify if it's Crystal vs Gold/Silver.
 * 2. **Offset Alignment:** Assigns the correct base memory offsets (`offsets` dictionary) based on the detected version.
 * 3. **Data Extraction:** Extracts Pokédex, Party, PC Boxes, Daycare, Inventory, and event flags (badges).
 * 4. **Badge Merging:** Merges Kanto and Johto badges.
 *
 * @param view - The raw binary save file wrapper, mapped to the Gen 2 double-bank payload.
 * @param forceCrystal - Forces the parser to use `_CRYSTAL` memory offsets, overriding the heuristic `PARTY_COUNT` detection check.
 * @returns The extracted save state mapped to the universal `SaveData` schema.
 */
export function parseGen2(view: DataView, forceCrystal = false): Gen2SaveData {
  let isCrystal = forceCrystal;
  if (!isCrystal) {
    const gsPartyCount = view.getUint8(PARTY_COUNT_OFFSET_GS);
    const cPartyCount = view.getUint8(PARTY_COUNT_OFFSET_CRYSTAL);
    if (cPartyCount <= 6 && cPartyCount > 0 && gsPartyCount > 6) {
      isCrystal = true;
    }
  }

  const offsets = isCrystal
    ? {
        owned: POKEDEX_OWNED_OFFSET_CRYSTAL,
        seen: POKEDEX_SEEN_OFFSET_CRYSTAL,
        partyCount: PARTY_COUNT_OFFSET_CRYSTAL,
        partySpecies: PARTY_SPECIES_OFFSET_CRYSTAL,
        currentBoxNum: CURRENT_BOX_NUM_OFFSET_CRYSTAL,
        currentBoxCount: CURRENT_BOX_COUNT_OFFSET,
        currentBoxSpecies: CURRENT_BOX_SPECIES_OFFSET,
      }
    : {
        owned: POKEDEX_OWNED_OFFSET_GS,
        seen: POKEDEX_SEEN_OFFSET_GS,
        partyCount: PARTY_COUNT_OFFSET_GS,
        partySpecies: PARTY_SPECIES_OFFSET_GS,
        currentBoxNum: CURRENT_BOX_NUM_OFFSET_GS,
        currentBoxCount: CURRENT_BOX_COUNT_OFFSET,
        currentBoxSpecies: CURRENT_BOX_SPECIES_OFFSET,
      };

  const { owned, seen } = parsePokedex(view, offsets);
  const { party, partyDetails } = parseParty(view, offsets, isCrystal);
  const { pc, pcDetails } = parsePCBoxes(view, offsets, isCrystal);

  const johtoBadgesOffset = isCrystal ? JOHTO_BADGES_OFFSET_CRYSTAL : JOHTO_BADGES_OFFSET_GS;
  const kantoBadgesOffset = isCrystal ? KANTO_BADGES_OFFSET_CRYSTAL : KANTO_BADGES_OFFSET_GS;

  const { daycare, daycareHasEgg } = parseDaycare(view, isCrystal);
  for (const p of daycare) pcDetails.push(p);

  let badges = 0;
  const jBadges = view.getUint8(johtoBadgesOffset);
  const kBadges = view.getUint8(kantoBadgesOffset);
  for (let i = 0; i < 8; i++) {
    if ((jBadges & (1 << i)) !== 0) badges++;
    if ((kBadges & (1 << i)) !== 0) badges++;
  }

  let gameVersion: GameVersion = isCrystal ? 'crystal' : detectGen2GameVersion(owned, seen);
  if (gameVersion === 'unknown' && !isCrystal) {
    gameVersion = 'gold';
  }

  const trainerName = decodeGen12String(view, TRAINER_NAME_OFFSET);
  const trainerId = view.getUint16(TRAINER_ID_OFFSET, false);

  const mapBankOffset = isCrystal ? MAP_BANK_OFFSET_CRYSTAL : MAP_BANK_OFFSET_GS;
  const mapIdOffset = isCrystal ? MAP_ID_OFFSET_CRYSTAL : MAP_ID_OFFSET_GS;
  const mapGroup = view.getUint8(mapBankOffset);
  const currentMapId = view.getUint8(mapIdOffset);

  let currentMapName = 'Unknown Map';
  const groupStr = mapGroup.toString();
  const mapIdStr = currentMapId.toString();
  const mapGroupDict = isValidMapGroup(groupStr) ? gen2MapLocations[groupStr] : undefined;
  const foundMap = mapGroupDict && isValidMapId(mapIdStr, mapGroupDict) ? mapGroupDict[mapIdStr] : undefined;
  if (foundMap) {
    currentMapName = foundMap;
  }

  const inventory = parseInventory(view, isCrystal);

  const pcItems: { id: number; quantity: number }[] = [];
  const pcItemsPocket = isCrystal ? PC_ITEMS_POCKET_OFFSET_CRYSTAL : PC_ITEMS_POCKET_OFFSET_GS;
  const pcItemsCount = view.getUint8(pcItemsPocket);
  if (pcItemsCount > 0 && pcItemsCount <= 50) {
    for (let i = 0; i < pcItemsCount; i++) {
      const offset = pcItemsPocket + ITEM_LIST_OFFSET + i * ITEM_RECORD_SIZE;
      const id = view.getUint8(offset);
      const quantity = view.getUint8(offset + ITEM_QUANTITY_OFFSET);
      pcItems.push({ id, quantity });
    }
  }

  const hallOfFameOffset = johtoBadgesOffset + HALL_OF_FAME_OFFSET_RELATIVE_TO_JOHTO_BADGES;
  const hallOfFameCount = view.getUint8(hallOfFameOffset);

  const hallOfFameRecordsOffset = johtoBadgesOffset + HALL_OF_FAME_OFFSET_RELATIVE;
  const hallOfFameRecords = parseGen2HallOfFameRecords(view, hallOfFameRecordsOffset, hallOfFameCount, trainerName);

  const {
    legendaries: roamingLegendaries,
    curMapGroup: roamerCurMapGroup,
    curMapNumber: roamerCurMapId,
  } = parseRoamingLegendaries(view, isCrystal);

  const eventFlagsOffset = isCrystal ? EVENT_FLAGS_OFFSET_CRYSTAL : EVENT_FLAGS_OFFSET_GS;
  const eventFlags = new Uint8Array(EVENT_FLAGS_LENGTH);
  try {
    for (let i = 0; i < EVENT_FLAGS_LENGTH; i++) {
      eventFlags[i] = view.getUint8(eventFlagsOffset + i);
    }
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
  const hiddenItemFlags = eventFlags;

  let tms: { id: number; moveId: number; isAcquired: boolean; quantity: number }[] = [];
  try {
    tms = Object.entries(GEN2_TM_HM_MOVE_MAP).map(([idStr, moveId]) => {
      const id = parseInt(idStr, 10);
      const inventoryQty = inventory.find((i) => i.id === id)?.quantity || 0;
      const pcQty = pcItems.find((i) => i.id === id)?.quantity || 0;
      const quantity = inventoryQty + pcQty;

      let isAcquired = quantity > 0;
      if (!isAcquired && GEN2_TM_EVENT_FLAGS[id] !== undefined) {
        const flag = GEN2_TM_EVENT_FLAGS[id];
        const byteIdx = Math.floor(flag / BITS_PER_BYTE);
        const bitIdx = flag % BITS_PER_BYTE;

        // This is safe because we already extracted eventFlags.
        const byte = eventFlags[byteIdx] ?? 0;
        if ((byte & (1 << bitIdx)) !== 0) {
          isAcquired = true;
        }
      }

      return { id, moveId, isAcquired, quantity };
    });
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }

  let gen2MomsSavings: { money: number; savingActive: boolean } | undefined;
  try {
    const momsMoneyOffset = johtoBadgesOffset + MOMS_MONEY_OFFSET_RELATIVE;
    const momsMoney =
      (view.getUint8(momsMoneyOffset) << 16) |
      (view.getUint8(momsMoneyOffset + 1) << 8) |
      view.getUint8(momsMoneyOffset + 2);
    const momSavingMoneyOffset = johtoBadgesOffset + MOM_SAVING_MONEY_OFFSET_RELATIVE;
    const momSavingMoneyByte = view.getUint8(momSavingMoneyOffset);
    const savingActive = (momSavingMoneyByte & (1 << 7)) !== 0;
    gen2MomsSavings = { money: momsMoney, savingActive };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }

  let gen2RoomDecorations: { active: number[]; unlocked: boolean[] } | undefined;
  try {
    const activeDecoOffset = isCrystal
      ? johtoBadgesOffset + ACTIVE_DECO_OFFSET_RELATIVE_CRYSTAL
      : johtoBadgesOffset + ACTIVE_DECO_OFFSET_RELATIVE_GS;
    const active: number[] = [];
    for (let i = 0; i < ACTIVE_DECO_COUNT; i++) {
      active.push(view.getUint8(activeDecoOffset + i));
    }

    const unlocked: boolean[] = [];
    for (let i = 0; i < UNLOCKED_DECO_COUNT; i++) {
      const bitPosition = UNLOCKED_DECO_BIT_OFFSET + i;
      const byteIdx = UNLOCKED_DECO_BYTE_OFFSET + Math.floor(bitPosition / BITS_PER_BYTE);
      const bitIdx = bitPosition % BITS_PER_BYTE;
      const byte = eventFlags[byteIdx] ?? 0;
      unlocked.push((byte & (1 << bitIdx)) !== 0);
    }
    gen2RoomDecorations = { active, unlocked };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }

  const trainerFlags: boolean[] = [];
  for (let i = 0; i < EVENT_FLAGS_MAX_BITS; i++) {
    const byteIdx = Math.floor(i / BITS_PER_BYTE);
    const bitIdx = i % BITS_PER_BYTE;
    const byte = eventFlags[byteIdx] ?? 0;
    trainerFlags.push(((byte >> bitIdx) & BIT_MASK) !== 0);
  }

  const npcTradeFlags: boolean[] = [];
  try {
    const npcTradeFlagsOffset = isCrystal ? NPC_TRADE_FLAGS_OFFSET_CRYSTAL : NPC_TRADE_FLAGS_OFFSET_GS;
    const npcTradeByte = view.getUint8(npcTradeFlagsOffset);
    for (let i = 0; i < GEN2_NPC_TRADE_COUNT; i++) {
      npcTradeFlags.push((npcTradeByte & (1 << i)) !== 0);
    }
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }

  return {
    generation: 2,
    owned,
    seen,
    party,
    pc,
    partyDetails,
    pcDetails,
    gameVersion,
    badges,
    johtoBadges: jBadges,
    kantoBadges: kBadges,
    trainerName,
    trainerId,
    currentMapId,
    currentMapName,
    mapGroup,
    inventory,
    pcItems,
    daycare,
    daycareHasEgg,
    currentBoxCount: 0,
    hallOfFameCount,
    hallOfFameRecords,
    roamingLegendaries,
    roamerCurMapGroup,
    roamerCurMapId,
    eventFlags,
    trainerFlags,
    hiddenItemFlags,
    npcTradeFlags,
    tms,
    gen2MomsSavings,
    gen2RoomDecorations,
    gen2StaticEncounters: {
      sudowoodo: (((eventFlags[EVENT_FLAG_SUDOWOODO_BYTE] ?? 0) >> EVENT_FLAG_SUDOWOODO_BIT) & 1) === 1,
      snorlax: (((eventFlags[EVENT_FLAG_SNORLAX_BYTE] ?? 0) >> EVENT_FLAG_SNORLAX_BIT) & 1) === 1,
      redGyarados: (((eventFlags[EVENT_FLAG_RED_GYARADOS_BYTE] ?? 0) >> EVENT_FLAG_RED_GYARADOS_BIT) & 1) === 1,
      hoOh: (((eventFlags[EVENT_FLAG_HO_OH_BYTE] ?? 0) >> EVENT_FLAG_HO_OH_BIT) & 1) === 1,
      lugia: (((eventFlags[EVENT_FLAG_LUGIA_BYTE] ?? 0) >> EVENT_FLAG_LUGIA_BIT) & 1) === 1,
    },
    gen2NarrativeFlags: parseGen2NarrativeFlags(eventFlags),
    gen2DailyEvents: parseGen2DailyEvents(eventFlags),
    gen2PokegearPhone: parseGen2PokegearData(view, isCrystal),
  };
}
