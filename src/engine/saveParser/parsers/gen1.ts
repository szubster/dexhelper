/**
 * @module gen1Parser
 *
 * Contains logic for parsing Generation 1 (Red, Blue, Yellow) Game Boy save files.
 *
 * ## Architecture Overview
 * Generation 1 save files use a monolithic layout where data is laid out sequentially without
 * complex bank-switching or encryption. However, Yellow version introduces minor offset shifts
 * for certain data blocks compared to Red/Blue.
 *
 * This module extracts the player's party, PC box contents, Pokédex completion status, inventory,
 * and event flags (e.g. defeated trainers or collected items).
 *
 * Important structural notes:
 * - Text encoding uses a custom character set (parsed via `decodeGen12String`).
 * - PC storage requires switching between multiple "boxes" stored in different areas of the save file.
 * - Unlike later generations, Pokémon data structs do not hold a "caught location", making origin tracking reliant entirely on Original Trainer (OT) matches.
 */

import gen1MapLocations from '../../data/gen1/mapLocations.json';
import {
  GEN1_TM_HM_TO_MOVE_ID,
  parseGen1NarrativeFlags,
  parseGen1StaticEncounters,
  parseGen1TMFlags,
} from '../utils/gen1EventFlags';
import type { GameVersion, Gen1SaveData, PokemonInstance } from './common';
import { checkShiny, checkShinyGene, decodeGen12String, parseDVs } from './common';

function isValidMapId(id: string): id is keyof typeof gen1MapLocations {
  return id in gen1MapLocations;
}

const HOF_BASE_OFFSET = 0x0598;
const HOF_RECORD_LENGTH = 0x60;
const HOF_MAX_RECORDS = 50;
const EVENT_FLAGS_OFFSET = 0x29e6;
const EVENT_FLAGS_LENGTH = 0x118;
const HIDDEN_ITEM_FLAGS_OFFSET = 0x299c;
const HIDDEN_ITEM_FLAGS_LENGTH = 14;
const HIDDEN_COIN_FLAGS_OFFSET = 0x29aa;
const HIDDEN_COIN_FLAGS_LENGTH = 2;
const HOF_POKEMON_COUNT = 6;
const HOF_POKEMON_LENGTH = 0x10;
const INVENTORY_OFFSET = 0x25c9;
const PC_ITEMS_OFFSET = 0x27e6;
const POKEDEX_OWNED_BASE_RB = 0x25a3;
const POKEDEX_OWNED_BASE_YELLOW = 0x25a4;
const POKEDEX_SEEN_OFFSET_FROM_OWNED = 19;
const POKEDEX_TOTAL_MONS = 151;
const POKEDEX_PADDING_BYTE_OFFSET = 18;
const BITS_PER_BYTE = 8;
const EVENT_FLAGS_MAX_BITS = EVENT_FLAGS_LENGTH * BITS_PER_BYTE;
const BIT_MASK = 1;
const POKEDEX_PADDING_BIT_MASK = 0x80;
const PC_CURRENT_BOX_NUM_OFFSET = 0x284c;
const PC_CURRENT_BOX_COUNT_OFFSET = 0x30c0;
const PC_CURRENT_BOX_DATA_START_OFFSET = 0x30c1;
const PC_CURRENT_BOX_MONS_HEADER_LENGTH = 21;
const PC_CURRENT_BOX_MON_DATA_LENGTH = 33;
const PC_BOX_OT_NAME_LENGTH = 11;
const PC_MAX_BOX_MONS = 20;
const PC_BOX_DATA_START_OFFSET_FROM_COUNT = 22;

import {
  GEN1_PARTY_COUNT_OFFSET as PARTY_COUNT_OFFSET,
  GEN1_PARTY_DATA_START_OFFSET as PARTY_DATA_START_OFFSET,
  GEN1_PARTY_MAX_MONS as PARTY_MAX_MONS,
} from '../utils/detection';

const PARTY_MONS_HEADER_LENGTH = 7;
const PARTY_MON_DATA_LENGTH = 44;
const ITEM_RECORD_SIZE = 2;
const ITEM_LIST_OFFSET = 1;
const PARTY_OT_NAME_LENGTH = 11;

const POKEMON_OFFSET_CURRENT_HP = 1;
const POKEMON_PARTY_OFFSET_LEVEL = 33;
const POKEMON_PC_OFFSET_LEVEL = 3;
const POKEMON_OFFSET_MOVES = 8;
const POKEMON_OFFSET_DVS = 27;

const HOF_POKEMON_OFFSET_LEVEL = 1;
const HOF_POKEMON_OFFSET_NICKNAME = 2;

const PC_BOX_OFFSET_MON_LIST_START = 1;
const TRAINER_NAME_OFFSET = 0x2598;
const BADGES_OFFSET = 0x2602;
const TRAINER_ID_OFFSET = 0x2605;
const CURRENT_MAP_ID_OFFSET = 0x260a;
const HALL_OF_FAME_COUNT_OFFSET = 0x25b3;
const NPC_TRADES_OFFSET = -16;
const NPC_TRADES_COUNT = 16;
const PIKACHU_FOLLOWING_STATUS_OFFSET = 0x271c;
const PIKACHU_HAPPINESS_OFFSET = 0x271d;
const PC_BOX_NUM_MASK = 0x7f;
const PC_MAX_ITEMS = 50;

const GEN1_EMPTY_SLOT = 0xff;

const BANK_1_BOX_1_OFFSET = 0x4000;
const BANK_1_BOX_2_OFFSET = 0x4462;
const BANK_1_BOX_3_OFFSET = 0x48c4;
const BANK_1_BOX_4_OFFSET = 0x4d26;
const BANK_1_BOX_5_OFFSET = 0x5188;
const BANK_1_BOX_6_OFFSET = 0x55ea;
const BANK_2_BOX_7_OFFSET = 0x6000;
const BANK_2_BOX_8_OFFSET = 0x6462;
const BANK_2_BOX_9_OFFSET = 0x68c4;
const BANK_2_BOX_10_OFFSET = 0x6d26;
const BANK_2_BOX_11_OFFSET = 0x7188;
const BANK_2_BOX_12_OFFSET = 0x75ea;
const PC_BOX_OFFSETS = [
  BANK_1_BOX_1_OFFSET,
  BANK_1_BOX_2_OFFSET,
  BANK_1_BOX_3_OFFSET,
  BANK_1_BOX_4_OFFSET,
  BANK_1_BOX_5_OFFSET,
  BANK_1_BOX_6_OFFSET,
  BANK_2_BOX_7_OFFSET,
  BANK_2_BOX_8_OFFSET,
  BANK_2_BOX_9_OFFSET,
  BANK_2_BOX_10_OFFSET,
  BANK_2_BOX_11_OFFSET,
  BANK_2_BOX_12_OFFSET,
];

const INTERNAL_ID_TO_DEX: Record<number, number> = {
  1: 112,
  2: 115,
  3: 32,
  4: 35,
  5: 21,
  6: 100,
  7: 34,
  8: 80,
  9: 2,
  10: 103,
  11: 108,
  12: 102,
  13: 88,
  14: 94,
  15: 29,
  16: 31,
  17: 104,
  18: 111,
  19: 131,
  20: 59,
  21: 151,
  22: 130,
  23: 90,
  24: 72,
  25: 92,
  26: 123,
  27: 120,
  28: 9,
  29: 127,
  30: 114,
  33: 58,
  34: 95,
  35: 22,
  36: 16,
  37: 79,
  38: 64,
  39: 75,
  40: 113,
  41: 67,
  42: 122,
  43: 106,
  44: 107,
  45: 24,
  46: 47,
  47: 54,
  48: 96,
  49: 76,
  51: 126,
  53: 125,
  54: 82,
  55: 109,
  57: 56,
  58: 86,
  59: 50,
  60: 128,
  64: 83,
  65: 48,
  66: 149,
  70: 84,
  71: 60,
  72: 124,
  73: 146,
  74: 144,
  75: 145,
  76: 132,
  77: 52,
  78: 98,
  82: 37,
  83: 38,
  84: 25,
  85: 26,
  88: 147,
  89: 148,
  90: 140,
  91: 141,
  92: 116,
  93: 117,
  96: 27,
  97: 28,
  98: 138,
  99: 139,
  100: 39,
  101: 40,
  102: 133,
  103: 136,
  104: 135,
  105: 134,
  106: 66,
  107: 41,
  108: 23,
  109: 46,
  110: 61,
  111: 62,
  112: 13,
  113: 14,
  114: 15,
  116: 85,
  117: 57,
  118: 51,
  119: 49,
  120: 87,
  123: 10,
  124: 11,
  125: 12,
  126: 68,
  128: 55,
  129: 97,
  130: 42,
  131: 150,
  132: 143,
  133: 129,
  136: 89,
  138: 99,
  139: 91,
  141: 101,
  142: 36,
  143: 110,
  144: 53,
  145: 105,
  147: 93,
  148: 63,
  149: 65,
  150: 17,
  151: 18,
  152: 121,
  153: 1,
  154: 3,
  155: 73,
  157: 118,
  158: 119,
  163: 77,
  164: 78,
  165: 19,
  166: 20,
  167: 33,
  168: 30,
  169: 74,
  170: 137,
  171: 142,
  173: 81,
  176: 4,
  177: 7,
  178: 5,
  179: 8,
  180: 6,
  185: 43,
  186: 44,
  187: 45,
  188: 69,
  189: 70,
  190: 71,
};

/**
 * Scans specific memory offsets to heuristically determine if the save file belongs to
 * Pokémon Yellow. Yellow introduces a unique "following Pikachu" mechanic whose data
 * is stored at specific addresses not used (or used differently) by Red/Blue.
 *
 * In Pokémon Yellow, memory address 0x271C stores Pikachu's status, and 0x271D stores Pikachu's
 * friendship/happiness level. If these bytes are actively utilized (non-zero and not 0xFF),
 * it strongly indicates the save file originated from Yellow version.
 *
 * @param view - The DataView of the save file.
 * @returns True if high-confidence Yellow version markers are present.
 */
function hasYellowPikachuMarkers(view: DataView): boolean {
  // High-confidence Yellow markers in English version
  // PIKACHU_FOLLOWING_STATUS_OFFSET: Following Pikachu status, PIKACHU_HAPPINESS_OFFSET: Pikachu Happiness
  const followingPikachu = view.getUint8(PIKACHU_FOLLOWING_STATUS_OFFSET);
  const pikachuHappiness = view.getUint8(PIKACHU_HAPPINESS_OFFSET);

  // If these are non-zero and not FF (unitialized), it's almost certainly Yellow.
  // We use > 0 and < 0xFF to be safe against garbage data.
  return (
    (followingPikachu > 0 && followingPikachu < GEN1_EMPTY_SLOT) ||
    (pikachuHappiness > 0 && pikachuHappiness < GEN1_EMPTY_SLOT)
  );
}

/**
 * Calculates a heuristic score for determining if a save file is Red, Blue, or Yellow
 * by counting the number of version-exclusive Pokémon the player owns or has seen.
 *
 * This iterates through known version-exclusive Pokémon arrays (e.g., Vulpix in Blue, Growlithe in Red,
 * or Weedle missing in Yellow) and awards points based on whether the player has seen or natively caught them.
 * Native catches (where the Original Trainer ID matches the player's) are weighted more heavily than
 * merely seen Pokémon, since seeing could happen via trades or battles.
 *
 * @param owned - A set of Pokémon Pokédex IDs the player has caught.
 * @param seen - A set of Pokémon Pokédex IDs the player has seen.
 * @param trainerName - The player's Original Trainer (OT) name.
 * @param partyDetails - A quick parsing of the player's party to verify native OT ownership.
 * @returns An object containing heuristic scores for Red (`redScore`), Blue (`blueScore`), and a penalty score for Yellow (`yellowPenalty`).
 */
function calculateVersionScores(
  owned: Set<number>,
  seen: Set<number>,
  trainerName: string,
  partyDetails: { speciesId: number; otName: string }[],
) {
  const redExclusives = [23, 24, 43, 44, 45, 56, 57, 58, 59, 123, 125];
  const blueExclusives = [27, 28, 37, 38, 52, 53, 69, 70, 71, 127, 126];
  const yellowMissing = [13, 14, 15, 23, 24, 26, 52, 53, 109, 110, 124, 125, 126];

  let redScore = 0;
  let blueScore = 0;
  let yellowPenalty = 0;

  // We only want to count Pokemon caught natively in this save file towards the version score.
  // Traded exclusives from other versions would skew the heuristic.
  // We verify this by checking if the Original Trainer (OT) matches the player.
  const isNative = (id: number) => {
    const inParty = partyDetails.find((p) => p.speciesId === id);
    if (inParty) return inParty.otName === trainerName;
    return true;
  };

  for (const id of redExclusives) {
    if (owned.has(id) && isNative(id)) redScore += 2;
    else if (seen.has(id)) redScore += 1;
  }
  for (const id of blueExclusives) {
    if (owned.has(id) && isNative(id)) blueScore += 2;
    else if (seen.has(id)) blueScore += 1;
  }
  for (const id of yellowMissing) {
    if (owned.has(id) && isNative(id)) yellowPenalty += 2;
    else if (seen.has(id)) yellowPenalty += 1;
  }

  return { redScore, blueScore, yellowPenalty };
}

/**
 * Attempts to determine the exact Generation 1 game version (Red, Blue, or Yellow).
 *
 * **Detection Heuristics:**
 * 1. **Yellow Explicit Markers:** Checks for Pikachu-specific memory addresses (e.g., following Pikachu state).
 * 2. **Pokédex Analysis:** If not explicitly Yellow, it evaluates the number of Red/Blue exclusives the player owns.
 * 3. **Native Verification:** Cross-references the party OT names to ensure traded exclusives do not skew the score.
 *
 * @param view - The raw save file data view.
 * @param owned - Set of owned Pokémon species IDs.
 * @param seen - Set of seen Pokémon species IDs.
 * @param trainerName - The player's trainer name.
 * @param partyDetails - Basic party details to check OT names.
 * @returns The determined game version, or 'unknown' if inconclusive.
 */
function detectGen1GameVersion(
  view: DataView,
  owned: Set<number>,
  seen: Set<number>,
  trainerName: string,
  partyDetails: { speciesId: number; otName: string }[],
): GameVersion {
  if (hasYellowPikachuMarkers(view)) {
    return 'yellow';
  }

  const { redScore, blueScore, yellowPenalty } = calculateVersionScores(owned, seen, trainerName, partyDetails);

  const isPikachuStarter = owned.has(25);
  const pikachuInParty = partyDetails.find((p) => p.speciesId === 25);
  const isNativePikachu = pikachuInParty && pikachuInParty.otName === trainerName;

  if (yellowPenalty === 0 && (redScore > 0 || blueScore > 0 || isPikachuStarter)) {
    if (redScore > 0 && blueScore > 0) return 'yellow';
    if (isNativePikachu && redScore === 0 && blueScore === 0) return 'yellow';
  }

  if (Math.abs(redScore - blueScore) < 2 && redScore < 4 && !isNativePikachu) return 'unknown';

  if (redScore > blueScore + 2) return 'red';
  if (blueScore > redScore + 2) return 'blue';

  if (redScore > blueScore) return 'red';
  if (blueScore > redScore) return 'blue';

  return 'unknown';
}

/**
 * Performs a structural check to verify if the binary data is a valid Generation 1 save.
 *
 * **Why these specific checks?**
 * Gen 1 save files lack robust block checksums. If the main save checksum (`0x3523`) is corrupted,
 * we must fallback to structural heuristics to prove the file is indeed a Gen 1 save.
 * We do this by checking the active Party Pokémon block, which always starts at `PARTY_COUNT_OFFSET`:
 * 1. The byte at `PARTY_COUNT_OFFSET` represents the number of Pokémon in the party (must be <= PARTY_MAX_MONS).
 * 2. The subsequent array of species IDs starting at `PARTY_DATA_START_OFFSET` must be explicitly terminated with `0xFF`.
 * 3. The internal IDs before the terminator must map to valid species.
 *
 * @param view - The raw save file DataView.
 * @returns True if the structure looks like a valid Gen 1 save.
 */

/**
 * Parses the Hall of Fame records from a Gen 1 save.
 *
 * @param view - The raw save file DataView.
 * @param hallOfFameCount - The total number of times the player has entered the Hall of Fame.
 * @param trainerName - The player's Original Trainer name.
 * @returns An array of parsed Hall of Fame records.
 */
function parseGen1HallOfFameRecords(view: DataView, hallOfFameCount: number, trainerName: string) {
  const records: {
    playerName: string;
    pokemon: { speciesId: number; level: number; nickname: string }[];
  }[] = [];

  const maxRecords = Math.min(hallOfFameCount, HOF_MAX_RECORDS);

  try {
    for (let recordIndex = 0; recordIndex < maxRecords; recordIndex++) {
      const pokemon: { speciesId: number; level: number; nickname: string }[] = [];

      for (let pokemonIndex = 0; pokemonIndex < HOF_POKEMON_COUNT; pokemonIndex++) {
        const offset = HOF_BASE_OFFSET + recordIndex * HOF_RECORD_LENGTH + pokemonIndex * HOF_POKEMON_LENGTH;
        const internalId = view.getUint8(offset);

        if (internalId === 0x00 || internalId === GEN1_EMPTY_SLOT) {
          continue;
        }

        const speciesId = INTERNAL_ID_TO_DEX[internalId];
        if (!speciesId) {
          continue;
        }

        const level = view.getUint8(offset + HOF_POKEMON_OFFSET_LEVEL);
        const nickname = decodeGen12String(view, offset + HOF_POKEMON_OFFSET_NICKNAME, 11);

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

/**
 * Extracts all relevant game data (party, PC boxes, inventory, Pokédex, etc.) from a Gen 1 save.
 *
 * Gen 1 save file structures differ slightly based on version and region. Notably, Yellow version
 * shifted many memory offsets by +1 byte compared to Red/Blue. Japanese versions also have different
 * string encodings and lengths which affect offset calculations.
 *
 * This parser probes both potential Pokédex offsets (0x25A3 for R/B, 0x25A4 for Yellow) and uses
 * padding bit correctness to dynamically detect the offset shift before extracting the rest of the
 * save data. It relies on `detectGen1GameVersion` internally to infer the exact version if not forced.
 *
 * @param view - The raw save file DataView.
 * @param forcedVersion - An optional game version override, used to bypass heuristics if the user manually specifies it.
 * @returns The fully parsed and structured SaveData object.
 */

/**
 * Determines the specific Game Boy version (Red/Blue vs Yellow) by evaluating heuristics
 * and looking for structural differences. This is necessary because Gen 1 saves do not
 * explicitly declare their version.
 *
 * Pokémon Yellow introduces a 1-byte shift to most structural data blocks to accommodate
 * Pikachu's friendship data earlier in the save file. This shift is returned as `offsetShift`.
 *
 * To determine the correct alignment, this function probes the Pokédex padding bit.
 * The 19th byte of the Pokédex bitmask holds IDs 145-152, but since Pokémon 152 does not exist,
 * the most significant bit (bit 7, or 0x80) MUST be zero.
 *
 * We probe the expected Pokédex start offset for Red/Blue (`0x25A3`) and the expected
 * start offset for Yellow (`0x25A4`). Whichever offset results in a valid zeroed padding bit
 * dictates the structural alignment (`offsetShift`).
 *
 * @param view - The DataView of the save file.
 * @param forcedVersion - A manual override if auto-detection is skipped.
 * @param trainerName - Parsed original trainer name used for origin tracking.
 * @param quickParty - Parsed party summary to aid in cross-referencing caught pokemon.
 * @returns An object containing the detected `offsetShift` (0 or 1), `gameVersion`, and Pokédex state.
 */
function detectVersionAndOffsets(
  view: DataView,
  forcedVersion: GameVersion | undefined,
  trainerName: string,
  quickParty: { speciesId: number; otName: string }[],
) {
  /**
   * Helper function to decode the 152-bit Pokédex bitfields.
   * Gen 1 stores the Pokédex as two separate bitfields: Owned and Seen.
   * Since there are 151 Pokémon, the structure requires 19 bytes (19 * 8 = 152 bits).
   *
   * @param ownedBase - The dynamic memory offset where the 'Owned' bitfield begins.
   */
  const detectForOffset = (ownedBase: number) => {
    const owned = new Set<number>();
    const seen = new Set<number>();
    let paddingBitIsCorrect = false;

    try {
      for (let i = 1; i <= POKEDEX_TOTAL_MONS; i++) {
        const byteIdx = Math.floor((i - 1) / BITS_PER_BYTE);
        const bitIdx = (i - 1) % BITS_PER_BYTE;
        const oByte = view.getUint8(ownedBase + byteIdx);
        // The "Seen" Pokédex flags start 19 bytes after the "Owned" flags
        const sByte = view.getUint8(ownedBase + POKEDEX_SEEN_OFFSET_FROM_OWNED + byteIdx);
        if ((oByte & (1 << bitIdx)) !== 0) owned.add(i);
        if ((sByte & (1 << bitIdx)) !== 0) seen.add(i);
      }
      // Byte 18 (the 19th byte) holds bits for IDs 145-152. ID 152 does not exist, so bit 7 (0x80) must be 0.
      paddingBitIsCorrect = (view.getUint8(ownedBase + POKEDEX_PADDING_BYTE_OFFSET) & POKEDEX_PADDING_BIT_MASK) === 0;
    } catch (e) {
      if (e instanceof RangeError) {
        throw new Error('The save file is corrupted or incomplete.');
      }
      throw e;
    }

    const version = detectGen1GameVersion(view, owned, seen, trainerName, quickParty);
    return { version, owned, seen, paddingBitIsCorrect };
  };

  // Probe offset POKEDEX_OWNED_BASE_RB (Expected Red/Blue start address for Pokédex Owned flags)
  // If the MSB of the 19th byte is 0, this offset alignment is structurally valid.
  const res0 = detectForOffset(POKEDEX_OWNED_BASE_RB);
  // Probe offset POKEDEX_OWNED_BASE_YELLOW (Expected Yellow start address for Pokédex Owned flags, shifted by +1)
  const res1 = detectForOffset(POKEDEX_OWNED_BASE_YELLOW);

  // If the Yellow offset produces a valid padding bit but the Red/Blue offset does not, we use the shifted offset.
  const resToUse = res1.paddingBitIsCorrect && !res0.paddingBitIsCorrect ? res1 : res0;

  let isYellow = forcedVersion === 'yellow';
  if (!forcedVersion) {
    if (resToUse === res1 || res0.version === 'yellow' || res1.version === 'yellow') {
      isYellow = true;
    }
  }

  const offsetShift = resToUse === res1 ? 1 : 0;
  const gameVersion = isYellow
    ? 'yellow'
    : forcedVersion && forcedVersion !== 'unknown'
      ? forcedVersion
      : resToUse.version;

  return { offsetShift, gameVersion, owned: resToUse.owned, seen: resToUse.seen };
}

/**
 * Extracts a single Pokémon instance from a Generation 1 save file block.
 *
 * **Memory Structure Differences:**
 * Party Pokémon use a 44-byte structure which includes current battle stats (HP, Attack, etc.).
 * PC Pokémon use a smaller 33-byte structure since battle stats are recalculated upon withdrawal.
 * In both cases, Original Trainer (OT) names are not stored contiguously with the Pokémon data;
 * they are stored in a separate array that must be accessed via `otOffset`.
 *
 * @param view - The raw save file DataView.
 * @param offset - The memory offset of the 44-byte or 33-byte Pokémon data block.
 * @param otOffset - The memory offset of the 11-byte Original Trainer name string.
 * @param isParty - True if parsing from the 44-byte party list, false if from the 33-byte PC boxes.
 * @param storageLocation - A display string indicating where this Pokémon was found.
 * @param slot - The 1-indexed slot number within its storage container.
 * @returns A parsed PokemonInstance, or null if the internal species ID is invalid.
 */
function parseGen1Pokemon(
  view: DataView,
  offset: number,
  otOffset: number,
  isParty: boolean,
  storageLocation: string,
  slot: number,
): PokemonInstance | null {
  const internalId = view.getUint8(offset);
  const speciesId = INTERNAL_ID_TO_DEX[internalId];
  if (!speciesId) return null;

  const currentHp = isParty ? view.getUint16(offset + POKEMON_OFFSET_CURRENT_HP, false) : undefined;

  // Party has stats, so level is at offset + 33. PC has no stats, level is at offset + 3.
  const level = view.getUint8(isParty ? offset + POKEMON_PARTY_OFFSET_LEVEL : offset + POKEMON_PC_OFFSET_LEVEL);
  const moves: number[] = [];
  for (let j = 0; j < 4; j++) {
    const m = view.getUint8(offset + POKEMON_OFFSET_MOVES + j);
    if (m > 0) moves.push(m);
  }
  const dvs = parseDVs(view.getUint16(offset + POKEMON_OFFSET_DVS, false));
  const isShiny = checkShiny(dvs);
  const isShinyCarrier = checkShinyGene(dvs);
  const otName = decodeGen12String(view, otOffset);

  return {
    speciesId,
    currentHp,
    level,
    isShiny,
    isShinyCarrier,
    moves,
    dvs,
    otName,
    storageLocation,
    slot,
    hash: `${speciesId}-${level}-${otName}-${dvs.hp}-${dvs.atk}-${dvs.def}-${dvs.spd}-${dvs.spc}`,
  };
}

/**
 * Parses the player's active party from a Generation 1 save.
 *
 * **Memory Layout:**
 * The party structure begins with a 1-byte count (max 6), followed by a 7-byte species ID array
 * (terminated by 0xFF). Following the species array is the block of 44-byte Pokémon data structures.
 * Finally, a separate block of 11-byte strings contains the OT names, and another for nicknames.
 *
 * @param view - The raw save file DataView.
 * @param partyCount - The number of Pokémon currently in the party.
 * @param shiftedPartyDataOffset - The calculated start offset for the 44-byte structures.
 * @param shiftedPartyOTOffset - The calculated start offset for the 11-byte OT names array.
 * @returns An array of fully populated PokemonInstance objects.
 */
function parsePartyList(
  view: DataView,
  partyCount: number,
  shiftedPartyDataOffset: number,
  shiftedPartyOTOffset: number,
): PokemonInstance[] {
  const partyDetails: PokemonInstance[] = [];
  try {
    for (let i = 0; i < partyCount; i++) {
      const offset = shiftedPartyDataOffset + i * PARTY_MON_DATA_LENGTH;
      const p = parseGen1Pokemon(view, offset, shiftedPartyOTOffset + i * PARTY_OT_NAME_LENGTH, true, 'Party', i + 1);
      if (p) partyDetails.push(p);
    }
  } catch (e) {
    if (e instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw e;
  }
  return partyDetails;
}

/**
 * Parses all stored Pokémon across the PC Box system in a Generation 1 save.
 *
 * **WRAM vs SRAM Architecture:**
 * Gen 1 games can only keep the "current" box in active Working RAM (WRAM) due to memory constraints.
 * This WRAM snapshot is saved to the main save block (offset `0x30c0`).
 * The remaining inactive boxes are serialized into Save RAM (SRAM) banks located
 * at offsets `0x4000` and `0x6000`.
 * When reading the save file, we extract the active box from WRAM and loop through the SRAM
 * banks for the remaining inactive boxes.
 *
 * @param view - The raw save file DataView.
 * @param offsetShift - The `+1` shift applied if the save is Pokémon Yellow.
 * @returns The simple list of species IDs (`pc`), the detailed instances (`pcDetails`), and the active box count.
 */
function parsePCBoxes(
  view: DataView,
  offsetShift: number,
): { pc: number[]; pcDetails: PokemonInstance[]; currentBoxCount: number } {
  const pc: number[] = [];
  const pcDetails: PokemonInstance[] = [];

  let currentBoxNum = 0;
  let currentBoxCount = 0;

  try {
    currentBoxNum = view.getUint8(PC_CURRENT_BOX_NUM_OFFSET + offsetShift) & PC_BOX_NUM_MASK;
    currentBoxCount = view.getUint8(PC_CURRENT_BOX_COUNT_OFFSET + offsetShift);
    const currentBoxDataOffset = PC_CURRENT_BOX_DATA_START_OFFSET + offsetShift + PC_CURRENT_BOX_MONS_HEADER_LENGTH;
    const currentBoxOTOffset = currentBoxDataOffset + PC_MAX_BOX_MONS * PC_CURRENT_BOX_MON_DATA_LENGTH;

    for (let i = 0; i < currentBoxCount; i++) {
      const id = view.getUint8(PC_CURRENT_BOX_DATA_START_OFFSET + offsetShift + i);
      const dex = INTERNAL_ID_TO_DEX[id];
      if (dex !== undefined) pc.push(dex);

      const offset = currentBoxDataOffset + i * PC_CURRENT_BOX_MON_DATA_LENGTH;
      const p = parseGen1Pokemon(
        view,
        offset,
        currentBoxOTOffset + i * PC_BOX_OT_NAME_LENGTH,
        false,
        `Box ${currentBoxNum + 1}`,
        i + 1,
      );
      if (p) pcDetails.push(p);
    }

    for (const [i, offset] of PC_BOX_OFFSETS.entries()) {
      if (i === currentBoxNum) continue;
      const count = view.getUint8(offset);
      if (count > PC_MAX_BOX_MONS) continue;

      for (let j = 0; j < count; j++) {
        const id = view.getUint8(offset + PC_BOX_OFFSET_MON_LIST_START + j);
        const dex = INTERNAL_ID_TO_DEX[id];
        if (dex !== undefined) pc.push(dex);
      }

      const boxDataOffset = offset + PC_BOX_DATA_START_OFFSET_FROM_COUNT;
      const boxOTOffset = boxDataOffset + PC_MAX_BOX_MONS * PC_CURRENT_BOX_MON_DATA_LENGTH;
      for (let j = 0; j < count; j++) {
        const pOff = boxDataOffset + j * PC_CURRENT_BOX_MON_DATA_LENGTH;
        const p = parseGen1Pokemon(view, pOff, boxOTOffset + j * PC_BOX_OT_NAME_LENGTH, false, `Box ${i + 1}`, j + 1);
        if (p) pcDetails.push(p);
      }
    }
  } catch (e) {
    if (e instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw e;
  }

  return { pc, pcDetails, currentBoxCount };
}

/**
 * Orchestrates the full extraction of a Generation 1 (Red/Blue/Yellow) save file.
 *
 * **Extraction Flow & Memory Architecture:**
 * 1. **Initial Probing:** Reads the trainer name (`0x2598`) and party (`0x2F2C`).
 * 2. **Version Detection & Alignment:** Red/Blue and Yellow have slightly different internal
 *    data structures (Yellow offsets much of the save by `+1` byte to accommodate Pikachu's friendship).
 *    Because the save file doesn't explicitly declare its version, we pass the parsed party and
 *    trainer data to `detectVersionAndOffsets` to heuristically determine the version and the required
 *    `offsetShift`.
 * 3. **Data Extraction:** Uses the calculated `offsetShift` to align reading of the full party,
 *    PC boxes (WRAM + SRAM), inventory, badges, and event flags.
 *
 * @param view - The raw binary save file wrapper, initialized with ArrayBuffer from `.sav` file upload.
 * @param forcedVersion - An optional version override (e.g., 'yellow', 'red') to bypass heuristic detection. Useful for modified ROM saves.
 * @returns The fully constructed SaveData object mapping binary offsets to structured JSON for the frontend.
 */
export function parseGen1(view: DataView, forcedVersion?: GameVersion): Gen1SaveData {
  let trainerName = '';
  let partyCount = 0;
  const quickParty: { speciesId: number; otName: string }[] = [];
  const partyDataOffset = PARTY_DATA_START_OFFSET + PARTY_MONS_HEADER_LENGTH;
  const partyOTOffset = partyDataOffset + PARTY_MAX_MONS * PARTY_MON_DATA_LENGTH;

  try {
    trainerName = decodeGen12String(view, TRAINER_NAME_OFFSET);
    partyCount = view.getUint8(PARTY_COUNT_OFFSET);

    for (let i = 0; i < partyCount; i++) {
      const offset = partyDataOffset + i * PARTY_MON_DATA_LENGTH;
      const internalId = view.getUint8(offset);
      const speciesId = INTERNAL_ID_TO_DEX[internalId];
      if (speciesId) {
        const otName = decodeGen12String(view, partyOTOffset + i * PARTY_OT_NAME_LENGTH);
        quickParty.push({ speciesId, otName });
      }
    }
  } catch (e) {
    if (e instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw e;
  }

  const { offsetShift, gameVersion, owned, seen } = detectVersionAndOffsets(
    view,
    forcedVersion,
    trainerName,
    quickParty,
  );

  const shiftedPartyDataOffset = PARTY_DATA_START_OFFSET + offsetShift + PARTY_MONS_HEADER_LENGTH;
  const shiftedPartyOTOffset = shiftedPartyDataOffset + PARTY_MAX_MONS * PARTY_MON_DATA_LENGTH;
  const partyDetails = parsePartyList(view, partyCount, shiftedPartyDataOffset, shiftedPartyOTOffset);
  const party = partyDetails.map((p) => p.speciesId);

  const { pc, pcDetails, currentBoxCount } = parsePCBoxes(view, offsetShift);

  const inventory: { id: number; quantity: number }[] = [];
  const pcItems: { id: number; quantity: number }[] = [];
  let badges = 0;
  let trainerId = 0;
  let currentMapId = 0;
  let hallOfFameRaw = 0;

  try {
    badges = view.getUint8(BADGES_OFFSET + offsetShift);
    trainerId = view.getUint16(TRAINER_ID_OFFSET + offsetShift, false);
    currentMapId = view.getUint8(CURRENT_MAP_ID_OFFSET + offsetShift);

    const itemCount = view.getUint8(INVENTORY_OFFSET + offsetShift);
    for (let i = 0; i < itemCount; i++) {
      const itemOffset = INVENTORY_OFFSET + ITEM_LIST_OFFSET + offsetShift + i * ITEM_RECORD_SIZE;
      inventory.push({ id: view.getUint8(itemOffset), quantity: view.getUint8(itemOffset + 1) });
    }

    const pcItemCount = view.getUint8(PC_ITEMS_OFFSET + offsetShift);
    for (let i = 0; i < Math.min(pcItemCount, PC_MAX_ITEMS); i++) {
      const itemOffset = PC_ITEMS_OFFSET + ITEM_LIST_OFFSET + offsetShift + i * ITEM_RECORD_SIZE;
      pcItems.push({ id: view.getUint8(itemOffset), quantity: view.getUint8(itemOffset + 1) });
    }

    hallOfFameRaw = view.getUint8(HALL_OF_FAME_COUNT_OFFSET + offsetShift);
  } catch (e) {
    if (e instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw e;
  }

  const mapIdStr = currentMapId.toString();
  const currentMapName = isValidMapId(mapIdStr) ? gen1MapLocations[mapIdStr] : 'Unknown Map';
  const hallOfFameCount = hallOfFameRaw === GEN1_EMPTY_SLOT ? 0 : hallOfFameRaw;
  const hallOfFameRecords = parseGen1HallOfFameRecords(view, hallOfFameCount, trainerName);

  const eventFlagsOffset = EVENT_FLAGS_OFFSET + offsetShift;
  const eventFlags = new Uint8Array(EVENT_FLAGS_LENGTH);
  try {
    for (let i = 0; i < EVENT_FLAGS_LENGTH; i++) {
      eventFlags[i] = view.getUint8(eventFlagsOffset + i);
    }
  } catch (e) {
    if (e instanceof RangeError) throw new Error('The save file is corrupted or incomplete.');
    throw e;
  }

  const trainerFlags: boolean[] = [];
  for (let i = 0; i < EVENT_FLAGS_MAX_BITS; i++) {
    const byteIdx = Math.floor(i / BITS_PER_BYTE);
    const bitIdx = i % BITS_PER_BYTE;
    const byte = eventFlags[byteIdx] ?? 0;
    trainerFlags.push(((byte >> bitIdx) & BIT_MASK) !== 0);
  }

  const hiddenItemFlagsOffset = HIDDEN_ITEM_FLAGS_OFFSET + offsetShift;
  const hiddenItemFlags = new Uint8Array(HIDDEN_ITEM_FLAGS_LENGTH);
  try {
    for (let i = 0; i < HIDDEN_ITEM_FLAGS_LENGTH; i++) {
      hiddenItemFlags[i] = view.getUint8(hiddenItemFlagsOffset + i);
    }
  } catch (e) {
    if (e instanceof RangeError) throw new Error('The save file is corrupted or incomplete.');
    throw e;
  }
  const hiddenCoinFlagsOffset = HIDDEN_COIN_FLAGS_OFFSET + offsetShift;
  const hiddenCoinFlags = new Uint8Array(HIDDEN_COIN_FLAGS_LENGTH);
  try {
    for (let i = 0; i < HIDDEN_COIN_FLAGS_LENGTH; i++) {
      hiddenCoinFlags[i] = view.getUint8(hiddenCoinFlagsOffset + i);
    }
  } catch (e) {
    if (e instanceof RangeError) throw new Error('The save file is corrupted or incomplete.');
    throw e;
  }

  return {
    generation: 1,
    owned,
    seen,
    party,
    pc,
    partyDetails,
    pcDetails,
    gameVersion,
    badges,
    trainerName,
    trainerId,
    currentMapId,
    currentMapName,
    inventory,
    pcItems,
    currentBoxCount,
    hallOfFameCount,
    hallOfFameRecords,
    eventFlags,
    trainerFlags,
    hiddenItemFlags,
    hiddenCoinFlags,
    gen1StaticEncounters: parseGen1StaticEncounters(eventFlags),
    gen1TMEventFlags: parseGen1TMFlags(eventFlags),
    gen1NarrativeFlags: parseGen1NarrativeFlags(eventFlags),
    tms: Object.entries(GEN1_TM_HM_TO_MOVE_ID).map(([idStr, moveId]) => {
      const id = parseInt(idStr, 10);
      const inventoryQty = inventory.find((i) => i.id === id)?.quantity || 0;
      const pcQty = pcItems.find((i) => i.id === id)?.quantity || 0;
      const quantity = inventoryQty + pcQty;
      const isAcquired = quantity > 0 || !!parseGen1TMFlags(eventFlags)[id];
      return { id, moveId, isAcquired, quantity };
    }),
    // Gen 1 trades: The 2 bytes are at eventFlagsOffset - 16 and - 15. We convert this into a boolean array.
    npcTradeFlags: Array.from({ length: NPC_TRADES_COUNT }, (_, i) => {
      const byte = view.getUint8(eventFlagsOffset + NPC_TRADES_OFFSET + Math.floor(i / BITS_PER_BYTE));
      return (byte & (1 << (i % BITS_PER_BYTE))) !== 0;
    }),
  };
}
