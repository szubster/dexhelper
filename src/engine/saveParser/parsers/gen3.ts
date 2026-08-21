/**
 * @module gen3Parser
 *
 * Contains logic for parsing Generation 3 Game Boy Advance save files (Ruby, Sapphire, Emerald, FireRed, LeafGreen).
 *
 * ## Architecture Overview
 * Generation 3 uses a complex A/B bank flash memory architecture to prevent data corruption.
 * The game alternates writing between two 56KB blocks (`0x0000` and `0xe000`). Each block is
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

import { extractFeebasSeed } from '../../gen3/feebas';
import { parseGen3MatchCall } from '../../gen3/matchCall/parser';
import { parseSecretBaseRecord } from '../../gen3/secretBase/parser';
import { extractGen3StaticEncounterFlags } from '../../gen3/staticEncounters';
import {
  parseGen3BattleFrontierSymbols,
  parseGen3BattleFrontierWinStreaks,
  parseGen3BattlePoints,
  parseGen3TotalBattlePoints,
} from '../gen3/battleFrontier/parser';
import { parseGen3EventItems } from '../gen3/inventory/parser';
import { parseGen3Pokeblocks } from '../gen3/pokeblock/parser';
import { parseGen3TrainerDefeatFlags, parseGen3TrainerRematchFlags } from '../gen3/trainerFlags/parser';
import { parseTrickHouse } from '../gen3/trickHouse/parser';
import type {
  GameVersion,
  Gen3ActiveSwarm,
  Gen3BattleFrontierSymbols,
  Gen3BattleFrontierWinStreaks,
  Gen3BerryPatch,
  Gen3MoveTutors,
  Gen3Ribbons,
  Gen3RoamerData,
  Gen3SecretBase,
  Gen3TVShow,
} from './common';

const SIGNATURE = 0x08012025;
const SIGNATURE_OFFSET = 0x0ff8;
const SECTION_ID_OFFSET = 0x0ff4;
const SAVE_INDEX_OFFSET = 0x0ffc;
const BERRY_STAGE_OFFSET = 0x01;
const BERRY_MINUTES_OFFSET = 0x02;
const BERRY_YIELD_OFFSET = 0x04;
const BERRY_WATERED_OFFSET = 0x05;

// Berry patches use bitwise flags to cram status data into single bytes.
// Byte 1 stores the growth stage (bits 0-6) and whether growth has stopped (bit 7).
const BERRY_STAGE_MASK = 0x7f;
const BERRY_STOP_GROWTH_MASK = 0x80;
// Byte 5 stores the watering history (bits 4-7) and the number of times it has regrown (bits 0-3).
const BERRY_REGROWTH_MASK = 0x0f;
const BERRY_WATERED_1_MASK = 0x10;
const BERRY_WATERED_2_MASK = 0x20;
const BERRY_WATERED_3_MASK = 0x40;
const BERRY_WATERED_4_MASK = 0x80;
const NIBBLE_MASK = 0x0f;

const HIDDEN_ITEM_FLAGS_OFFSET = 0x3e;

const SECTION_SIZE = 4096;
const GEN3_BERRY_PATCH_OFFSET = 0x071c;
const GEN3_FLAGS_SECTION2_OFFSET = 0x02f0;
const MIRAGE_ISLAND_OFFSET_EMERALD = 0x0464;
const MIRAGE_ISLAND_OFFSET_RS = 0x0408;
const GEN3_TRAINER_ID_OFFSET = 0x000a;
const SECRET_ID_SHIFT = 16;
const NUM_SECTIONS = 14;
const SECRET_BASES_COUNT = 20;
const SECRET_BASE_SIZE = 160;
const SECRET_BASE_OFFSET_RS = 0x1a08;
const SECRET_BASE_OFFSET_EMERALD = 0x1a9c;

const SAVE_BLOCK_A = 0x0000;
const SAVE_BLOCK_B = 0xe000;
export const LOWER_16_BIT_MASK = 0xffff;
const LOWER_8_BIT_MASK = 0xff;

const GEN3_ROAMER_OFFSET_RS = 0x3144;
const GEN3_ROAMER_OFFSET_EMERALD = 0x31dc;
const GEN3_ROAMER_OFFSET_FRLG = 0x30d0;

const ROAMER_IVS_OFFSET = 0x00;
const ROAMER_PV_OFFSET = 0x04;
const ROAMER_SPECIES_ID_OFFSET = 0x08;
const ROAMER_HP_OFFSET = 0x0a;
const ROAMER_LEVEL_OFFSET = 0x0c;
const ROAMER_STATUS_OFFSET = 0x0d;
const ROAMER_ACTIVE_OFFSET = 0x13;
const ROAMER_COOL_OFFSET = 0x0e;
const ROAMER_BEAUTY_OFFSET = 0x0f;
const ROAMER_CUTE_OFFSET = 0x10;
const ROAMER_SMART_OFFSET = 0x11;
const ROAMER_TOUGH_OFFSET = 0x12;

const CONDITION_COOL_OFFSET = 0x06;
const CONDITION_BEAUTY_OFFSET = 0x07;
const CONDITION_CUTE_OFFSET = 0x08;
const CONDITION_SMART_OFFSET = 0x09;
const CONDITION_TOUGH_OFFSET = 0x0a;
const CONDITION_SHEEN_OFFSET = 0x0b;

const RIBBON_RANK_MASK = 0x07;
const RIBBON_COOL_SHIFT = 0;
const RIBBON_BEAUTY_SHIFT = 3;
const RIBBON_CUTE_SHIFT = 6;
const RIBBON_SMART_SHIFT = 9;
const RIBBON_TOUGH_SHIFT = 12;

export const GEN3_PARTY_SIZE_OFFSET_RSE = 0x0234;
export const GEN3_PARTY_SIZE_OFFSET_FRLG = 0x0034;
export const GEN3_PARTY_LIST_OFFSET_RSE = 0x0238;
export const GEN3_PARTY_LIST_OFFSET_FRLG = 0x0038;
export const GEN3_PARTY_MAX_SIZE = 6;
export const GEN3_PARTY_STATUS_OFFSET = 0x50;
export const GEN3_PARTY_LEVEL_OFFSET = 0x54;
export const GEN3_PARTY_HP_OFFSET = 0x56;
export const GEN3_PARTY_MAX_HP_OFFSET = 0x58;
export const GEN3_PARTY_ATTACK_OFFSET = 0x5a;
export const GEN3_PARTY_DEFENSE_OFFSET = 0x5c;
export const GEN3_PARTY_SPEED_OFFSET = 0x5e;
export const GEN3_PARTY_SPATK_OFFSET = 0x60;
export const GEN3_PARTY_SPDEF_OFFSET = 0x62;

export const IV_MASK = 0x1f;
export const IV_SHIFT_HP = 0;
export const IV_SHIFT_ATK = 5;
export const IV_SHIFT_DEF = 10;
export const IV_SHIFT_SPD = 15;
export const IV_SHIFT_SPATK = 20;
export const IV_SHIFT_SPDEF = 25;
export const EV_HP_OFFSET = 0x00;
export const EV_ATK_OFFSET = 0x01;
export const EV_DEF_OFFSET = 0x02;
export const EV_SPD_OFFSET = 0x03;
export const EV_SPATK_OFFSET = 0x04;
export const EV_SPDEF_OFFSET = 0x05;

export const TV_SHOWS_OFFSET = 0x27cc;
export const TV_SHOWS_COUNT = 25;
export const TVSHOW_STRUCT_SIZE = 36;
export const TV_SHOW_KIND_OFFSET = 0x00;
export const TV_SHOW_ACTIVE_OFFSET = 0x01;
export const TV_SHOW_PAYLOAD_OFFSET = 0x02;
export const TV_SHOW_PAYLOAD_LENGTH = 34;

export const TVGROUP_RECORD_MIX_START = 21;
export const TVGROUP_RECORD_MIX_END = 40;

export const TVSHOW_MASS_OUTBREAK = 41;
export const OUTBREAK_MOVES_OFFSET = 0x04;
export const OUTBREAK_MOVE_2_OFFSET = 0x06;
export const OUTBREAK_MOVE_3_OFFSET = 0x08;
export const OUTBREAK_MOVE_4_OFFSET = 0x0a;
export const OUTBREAK_SPECIES_OFFSET = 0x0c;
export const OUTBREAK_MAP_NUM_OFFSET = 0x10;
export const OUTBREAK_MAP_GROUP_OFFSET = 0x11;
export const OUTBREAK_PROBABILITY_OFFSET = 0x13;
export const OUTBREAK_LEVEL_OFFSET = 0x14;
export const OUTBREAK_DAYS_BEFORE_OFFSET = 0x16;
export const OUTBREAK_LANGUAGE_OFFSET = 0x18;

const POKE_NEWS_OFFSET = 0x2b50;
const POKE_NEWS_COUNT = 16;
const POKE_NEWS_SIZE = 4;
const POKE_NEWS_KIND_OFFSET = 0x00;
const POKE_NEWS_STATE_OFFSET = 0x01;
const POKE_NEWS_COUNTDOWN_OFFSET = 0x02;

const MISC_IV_EGG_ABILITY_OFFSET = 0x04;
export const MET_LOCATION_OFFSET_IN_M = 1;
const IS_EGG_BIT_SHIFT = 30;
const GROWTH_FRIENDSHIP_OFFSET = 0x04;
const EGG_CYCLE_STEPS = 256;

export const TM_POCKET_OFFSET_RS = 0x0640;
export const TM_POCKET_OFFSET_EMERALD = 0x0690;
export const TM_POCKET_OFFSET_FRLG = 0x0464;
export const TM_POCKET_SIZE_RS = 256;
export const TM_POCKET_SIZE_EMERALD = 256;
export const TM_POCKET_SIZE_FRLG = 232;

export const ITEMS_POCKET_OFFSET_RS = 0x0560;
export const ITEMS_POCKET_OFFSET_EMERALD = 0x0560;
export const ITEMS_POCKET_OFFSET_FRLG = 0x0310;
export const ITEMS_POCKET_SIZE_RS = 80;
export const ITEMS_POCKET_SIZE_EMERALD = 120;
export const ITEMS_POCKET_SIZE_FRLG = 168;

export const ITEM_SHOAL_SALT = 0x02b;
export const ITEM_SHOAL_SHELL = 0x02c;

export const ITEM_INDEX_OFFSET = 0x00;
export const ITEM_QUANTITY_OFFSET = 0x02;
export const ITEM_ENTRY_SIZE = 4;

export const SECURITY_KEY_OFFSET_EMERALD = 0x00ac;
export const SECURITY_KEY_OFFSET_FRLG = 0x0af8;

export const GEN3_EVENT_FLAGS_OFFSET = 0x02f0;
// Extracted from pokeemerald/pokefirered constants
export const FLAG_RECEIVED_TM_BRICK_BREAK = 0x79;
export const FLAG_RECEIVED_TM_ROCK_TOMB = 0xa5;
export const FLAG_RECEIVED_TM_BULK_UP = 0xa6;
export const FLAG_RECEIVED_TM_SHOCK_WAVE = 0xa7;
export const FLAG_RECEIVED_TM_OVERHEAT = 0xa8;
export const FLAG_RECEIVED_TM_FACADE = 0xa9;
export const FLAG_RECEIVED_TM_AERIAL_ACE = 0xaa;
export const FLAG_RECEIVED_TM_CALM_MIND = 0xab;
export const FLAG_RECEIVED_TM_WATER_PULSE = 0xac;
export const FLAG_GOT_TM_THUNDERBOLT_FROM_WATTSON = 0xd1;
export const FLAG_RECEIVED_TM_RETURN = 0xe5;
export const FLAG_RECEIVED_TM_SLUDGE_BOMB = 0xe6;
export const FLAG_RECEIVED_TM_ROAR = 0xe7;
export const FLAG_RECEIVED_TM_GIGA_DRAIN = 0xe8;
export const FLAG_RECEIVED_TM_REST = 0xea;
export const FLAG_RECEIVED_TM_ATTRACT = 0xeb;
export const FLAG_RECEIVED_TM_SNATCH = 0x104;
export const FLAG_RECEIVED_TM_DIG = 0x105;
export const FLAG_RECEIVED_TM_BULLET_SEED = 0x106;
export const FLAG_RECEIVED_TM_HIDDEN_POWER = 0x108;
export const FLAG_RECEIVED_TM_TORMENT = 0x109;
export const FLAG_RECEIVED_TM_THIEF = 0x10d;

export const FLAG_GOT_TM34_FROM_SURGE = 0x231;
export const FLAG_GOT_TM42_AT_MEMORIAL_PILLAR = 0x236;
export const FLAG_GOT_TM28_FROM_ROCKET = 0x23f;
export const FLAG_GOT_TM29_FROM_MR_PSYCHIC = 0x245;
export const FLAG_GOT_TM38_FROM_BLAINE = 0x24e;
export const FLAG_GOT_TM39_FROM_BROCK = 0x254;
export const FLAG_GOT_TM06_FROM_KOGA = 0x259;
export const FLAG_GOT_TM27 = 0x25b;
export const FLAG_GOT_TM19_FROM_ERIKA = 0x293;
export const FLAG_GOT_TM33_FROM_THIRSTY_GIRL = 0x294;
export const FLAG_GOT_TM20_FROM_THIRSTY_GIRL = 0x295;
export const FLAG_GOT_TM16_FROM_THIRSTY_GIRL = 0x296;
export const FLAG_GOT_TM03_FROM_MISTY = 0x297;
export const FLAG_GOT_TM26_FROM_GIOVANNI = 0x298;
export const FLAG_GOT_TM04_FROM_SABRINA = 0x29a;

export const GEN3_POKEMON_STRUCT_SIZE = 100;
export const GEN3_POKEMON_PV_OFFSET = 0;
export const GEN3_POKEMON_OT_ID_OFFSET = 4;
export const GEN3_POKEMON_DATA_OFFSET = 32;
export const MISC_IVS_OFFSET = 0x04;
export const GEN3_PARTY_COUNT_OFFSET = 0x0234;
export const GEN3_PARTY_COUNT_OFFSET_FRLG = 0x0034;
export const GEN3_PARTY_POKEMON_LIST_OFFSET = 0x0238;
export const GEN3_PARTY_POKEMON_LIST_OFFSET_FRLG = 0x0038;
export const SUBSTRUCTURE_SIZE = 12;
export const PC_BOX_BUFFER_SIZE = 33744;
export const PC_BOX_CURRENT_BOX_OFFSET = 0x0000;
export const PC_BOX_POKEMON_LIST_OFFSET = 0x0004;
export const PC_BOX_NAMES_OFFSET = 0x8344;
export const PC_BOX_WALLPAPERS_OFFSET = 0x83c2;
export const PC_BOX_COUNT = 14;
export const PC_BOX_CAPACITY = 30;
export const PC_BOX_SECTION_5_TO_12_SIZE = 3968;
export const PC_BOX_SECTION_13_SIZE = 2000;
export const GEN3_PC_POKEMON_STRUCT_SIZE = 80;
export const GEN3_POKEMON_SPECIES_OFFSET_IN_G = 0x00;
export const GEN3_POKEMON_ITEM_OFFSET_IN_G = 0x02;
export const GEN3_POKEMON_MOVES_OFFSET_IN_A = 0x00;
export const GEN3_POKEMON_MOVE_2_OFFSET = 0x02;
export const GEN3_POKEMON_MOVE_3_OFFSET = 0x04;
export const GEN3_POKEMON_MOVE_4_OFFSET = 0x06;
export const UPPER_16_BIT_SHIFT = 16;
export const NUM_SUBSTRUCTURE_PERMUTATIONS = 24;

export const GEN3_CONTEST_WINNERS_SECTION_ID = 3;
export const GEN3_CONTEST_WINNERS_RELATIVE_OFFSET = 0x10;
export const MUSEUM_CONTEST_WINNERS_START = 8;
export const MUSEUM_CONTEST_WINNERS_COUNT = 5;
export const CONTEST_WINNER_STRUCT_SIZE = 32;
export const CONTEST_WINNER_SPECIES_OFFSET = 0x08;

/**
 * Maps the 24 possible permutations of a Gen 3 Pokémon's 48-byte data block.
 * The permutation index is determined by `PV % 24`.
 * The four blocks are: Growth (G), Attacks (A), EVs/Condition (E), and Miscellaneous (M).
 */
export const SUBSTRUCTURE_ORDER = [
  'GAEM',
  'GAME',
  'GEAM',
  'GEMA',
  'GMAE',
  'GMEA',
  'AGEM',
  'AGME',
  'AEGM',
  'AEMG',
  'AMGE',
  'AMEG',
  'EGAM',
  'EGMA',
  'EAGM',
  'EAMG',
  'EMGA',
  'EMAG',
  'MGAE',
  'MGEA',
  'MAGE',
  'MAEG',
  'MEGA',
  'MEAG',
];

export const EMERALD_MOVE_TUTOR_BYTE_1_OFFSET = 0x36;
export const EMERALD_MOVE_TUTOR_BYTE_2_OFFSET = 0x37;

export const SPECIES_SPINDA = 327;

export const FRLG_MOVE_TUTOR_BYTE_1_OFFSET = 0x58;
export const FRLG_MOVE_TUTOR_BYTE_2_OFFSET = 0x59;
export const FRLG_MOVE_TUTOR_BYTE_3_OFFSET = 0x5b;
export const FRLG_MOVE_TUTOR_BYTE_4_OFFSET = 0x5c;

// NPC Trade Flags (RSE)
const FLAG_RUSTBORO_NPC_TRADE_COMPLETED = 0x99;
const FLAG_PACIFIDLOG_NPC_TRADE_COMPLETED = 0x9a;
const FLAG_FORTREE_NPC_TRADE_COMPLETED = 0x9b;
const FLAG_BATTLE_FRONTIER_TRADE_DONE = 0x9c; // Emerald Only

// NPC Trade Flags (FRLG)
const FLAG_DID_MIMIEN_TRADE = 0x248;
const FLAG_DID_ZYNX_TRADE = 0x24a;
const FLAG_DID_MS_NIDO_TRADE = 0x24b;
const FLAG_DID_CH_DING_TRADE = 0x24d;
const FLAG_DID_NINA_TRADE = 0x251;
const FLAG_DID_MARC_TRADE = 0x257;
const FLAG_DID_ESPHERE_TRADE = 0x274;
const FLAG_DID_TANGENY_TRADE = 0x275;
const FLAG_DID_SEELOR_TRADE = 0x276;

const FLAG_BYTE_SHIFT = 3;
const FLAG_BIT_MASK = 7;

const MOVE_TUTOR_SWAGGER_BIT = 1;
const MOVE_TUTOR_ROLLOUT_BIT = 2;
const MOVE_TUTOR_FURY_CUTTER_BIT = 3;
const MOVE_TUTOR_MIMIC_BIT = 4;
const MOVE_TUTOR_METRONOME_BIT = 5;
const MOVE_TUTOR_SLEEP_TALK_BIT = 6;
const MOVE_TUTOR_SUBSTITUTE_BIT = 7;

const MOVE_TUTOR_DYNAMIC_PUNCH_BIT = 0;
const MOVE_TUTOR_DOUBLE_EDGE_BIT = 1;
const MOVE_TUTOR_EXPLOSION_BIT = 2;

const FRLG_MOVE_TUTOR_DOUBLE_EDGE_BIT = 0;
const FRLG_MOVE_TUTOR_THUNDER_WAVE_BIT = 1;
const FRLG_MOVE_TUTOR_ROCK_SLIDE_BIT = 2;
const FRLG_MOVE_TUTOR_FRLG_EXPLOSION_BIT = 3;
const FRLG_MOVE_TUTOR_MEGA_PUNCH_BIT = 4;
const FRLG_MOVE_TUTOR_MEGA_KICK_BIT = 5;
const FRLG_MOVE_TUTOR_DREAM_EATER_BIT = 6;
const FRLG_MOVE_TUTOR_SOFT_BOILED_BIT = 7;

const FRLG_MOVE_TUTOR_SUBSTITUTE_BIT = 0;
const FRLG_MOVE_TUTOR_SWORDS_DANCE_BIT = 1;
const FRLG_MOVE_TUTOR_SEISMIC_TOSS_BIT = 2;
const FRLG_MOVE_TUTOR_COUNTER_BIT = 3;
const FRLG_MOVE_TUTOR_METRONOME_BIT = 4;
const FRLG_MOVE_TUTOR_MIMIC_BIT = 5;
const FRLG_MOVE_TUTOR_BODY_SLAM_BIT = 6;

const FRLG_MOVE_TUTOR_FRENZY_PLANT_BIT = 6;
const FRLG_MOVE_TUTOR_BLAST_BURN_BIT = 7;

const FRLG_MOVE_TUTOR_HYDRO_CANNON_BIT = 0;

export const GEN3_EMERALD_VARS_OFFSET = 0x139c;
export const GEN3_RS_VARS_OFFSET = 0x1340;
export const GEN3_ASH_VAR_RELATIVE_OFFSET = 0x90;

export const GEN3_GAME_STATS_OFFSET_EMERALD = 0x159c;
export const GEN3_GAME_STATS_OFFSET_RS = 0x1540;
export const GEN3_GAME_STATS_OFFSET_FRLG = 0x1200;
export const GAME_STAT_ENTERED_HOF_ID = 10;
export const BYTES_PER_GAME_STAT = 4;
export const BITS_PER_BYTE = 8;

export const GEN3_POKEDEX_OFFSET = 0x18;
export const GEN3_POKEDEX_OWNED_OFFSET = 0x10;
export const GEN3_POKEDEX_SEEN_OFFSET = 0x44;
export const NATIONAL_DEX_MAX = 386;

/**
 * Maps National Dex IDs to their inclusion in the Regional Hoenn Pokédex.
 * Used to calculate the `hoennDexCount` stat since the save file only tracks
 * Pokédex completion globally via National Dex flags.
 */
export const HOENN_DEX_ORDER = [
  252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274,
  275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 63, 64, 65, 290, 291, 292, 293, 294, 295,
  296, 297, 118, 119, 129, 130, 298, 183, 184, 74, 75, 76, 299, 300, 301, 41, 42, 169, 72, 73, 302, 303, 304, 305, 306,
  66, 67, 68, 307, 308, 309, 310, 311, 312, 81, 82, 100, 101, 313, 314, 43, 44, 45, 182, 84, 85, 315, 316, 317, 318,
  319, 320, 321, 322, 323, 218, 219, 324, 88, 89, 109, 110, 325, 326, 27, 28, 327, 227, 328, 329, 330, 331, 332, 333,
  334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 174, 39, 40, 349, 350, 351, 120, 121, 352,
  353, 354, 355, 356, 357, 358, 359, 37, 38, 172, 25, 26, 54, 55, 360, 202, 177, 178, 203, 231, 232, 127, 214, 111, 112,
  361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 222, 170, 171, 371, 116, 117, 230, 372, 373, 374, 375, 376, 377,
  378, 379, 380, 381, 382, 383, 384, 385, 386,
];

export const HOENN_DEX_NATIONAL_IDS = new Set<number>(HOENN_DEX_ORDER);

/**
 * Locates the most recent memory offset for a specific save section in Gen 3 flash memory.
 *
 * @remarks
 * **A/B Bank Architecture:**
 * Gen 3 games use flash memory divided into two 56KB blocks: Bank A (`0x0000`) and Bank B (`0xe000`).
 * When saving, the game writes to whichever bank was NOT used previously, acting as a fail-safe
 * against data corruption if the device powers off mid-save.
 * Each bank is further divided into 14 4KB sections.
 *
 * This function scans both banks for the target section using the magic signature `0x08012025`.
 * If the section exists in both banks, it compares their `saveIndex` values (the number of times
 * the game has been saved) to return the offset of the most recent, non-corrupted write.
 *
 * **Architecture Note:**
 * Generation 3 uses a complex A/B bank flash memory architecture to prevent data corruption.
 * The game alternates writing between two 56KB blocks (`0x0000` and `0xe000`). Each block is
 * further divided into 14 4KB sections. The engine must scan both banks, verify the `0x08012025`
 * signature, and compare `saveIndex` values to locate the most recent, non-corrupted data block.
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

  // Scan Save Bank A (0x0000 to 0xDFFF)
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const offset = SAVE_BLOCK_A + i * SECTION_SIZE;
    try {
      const signature = view.getUint32(offset + SIGNATURE_OFFSET, true);
      if (signature === SIGNATURE) {
        const sectionId = view.getUint16(offset + SECTION_ID_OFFSET, true);
        const saveIndex = view.getUint32(offset + SAVE_INDEX_OFFSET, true);
        if (saveIndexA === -1) saveIndexA = saveIndex;
        if (sectionId === targetSectionId) sectionOffsetA = offset;
      }
    } catch (error) {
      if (!(error instanceof RangeError)) throw error;
    }
  }

  // Scan Save Bank B (0xE000 to 0x1BFFF)
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const offset = SAVE_BLOCK_B + i * SECTION_SIZE;
    try {
      const signature = view.getUint32(offset + SIGNATURE_OFFSET, true);
      if (signature === SIGNATURE) {
        const sectionId = view.getUint16(offset + SECTION_ID_OFFSET, true);
        const saveIndex = view.getUint32(offset + SAVE_INDEX_OFFSET, true);
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

  // If both banks are valid, the one with the higher saveIndex is the most recent save
  if (sectionOffsetA !== -1 && sectionOffsetB !== -1) {
    return saveIndexA > saveIndexB ? sectionOffsetA : sectionOffsetB;
  }

  // Fallback: If only one bank is valid (e.g. the other was corrupted during saving), use it
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
 * Each berry patch is represented by an 8-byte structure starting at offset `0x071c` within SaveBlock1.
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
  const baseOffset = saveBlock1Offset + GEN3_BERRY_PATCH_OFFSET;

  for (let i = 0; i < 128; i++) {
    const offset = baseOffset + i * 8;
    try {
      const berryId = view.getUint8(offset);
      const stageByte = view.getUint8(offset + BERRY_STAGE_OFFSET);
      const stage = stageByte & BERRY_STAGE_MASK;
      const stopGrowth = (stageByte & BERRY_STOP_GROWTH_MASK) !== 0;

      const minutesUntilNextStage = view.getUint16(offset + BERRY_MINUTES_OFFSET, true);
      const berryYield = view.getUint8(offset + BERRY_YIELD_OFFSET);

      const wateredByte = view.getUint8(offset + BERRY_WATERED_OFFSET);
      const regrowthCount = wateredByte & BERRY_REGROWTH_MASK;
      const watered1 = (wateredByte & BERRY_WATERED_1_MASK) !== 0;
      const watered2 = (wateredByte & BERRY_WATERED_2_MASK) !== 0;
      const watered3 = (wateredByte & BERRY_WATERED_3_MASK) !== 0;
      const watered4 = (wateredByte & BERRY_WATERED_4_MASK) !== 0;

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
 * @remarks
 * **Why is this currently stubbed?**
 * Unlike Gen 1 and Gen 2 which use simple SRAM, Gen 3 games use a flash memory chip
 * with an A/B bank rotation system (`0x0000` and `0xe000`) to prevent corruption during saves.
 * A proper validation requires scanning all 14 sectors in both banks to locate the `0x08012025`
 * signature and verifying the checksums of the most recent `saveIndex`. Because the actual
 * `parseGen3` function performs this exhaustive scan anyway, this check is currently bypassed
 * (returning false) until a lightweight signature-only scanner is implemented to prevent
 * double-reading the memory blocks during initial file detection.
 *
 * @param view - The raw save file DataView.
 * @returns True if the structure looks like a valid Gen 3 save.
 */

/**
 * Extracts the PV and IVs for a Gen 3 Pokémon.
 *
 * @param view - The raw save file DataView.
 * @param offset - The memory offset to the start of the 100-byte Pokémon structure.
 * @returns An object containing the IVs and the PV.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
/**
 * Reconstructs the contiguous PC Buffer from Gen 3 save sections 5 through 13.
 *
 * @remarks
 * **Architecture Note:**
 * Gen 3 PC Box data is spread across multiple 4KB sections (sections 5 through 13).
 * Before individual Pokémon can be parsed, those scattered sections must be concatenated into
 * a single contiguous buffer (`pcBufferView`).
 *
 * @param view - The raw save file DataView.
 * @returns A Uint8Array containing the contiguous PC Buffer.
 * @throws RangeError if a required section is out of bounds or missing.
 */
export function parseGen3PCBuffer(view: DataView): Uint8Array {
  try {
    const pcBuffer = new Uint8Array(PC_BOX_BUFFER_SIZE);
    let pcBufferOffset = 0;

    for (let sectionId = 5; sectionId <= 13; sectionId++) {
      const sectionOffset = getLatestSectionOffset(view, sectionId);

      // Sections 5-12 contain 3968 bytes, Section 13 contains 2000 bytes.
      const bytesToCopy = sectionId === 13 ? PC_BOX_SECTION_13_SIZE : PC_BOX_SECTION_5_TO_12_SIZE;

      for (let i = 0; i < bytesToCopy; i++) {
        pcBuffer[pcBufferOffset++] = view.getUint8(sectionOffset + i);
      }
    }

    return pcBuffer;
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Parses the player's active party from a Generation 3 save file.
 *
 * @remarks
 * **Architecture Note:**
 * Gen 3 party data is stored in Section 1 (SaveBlock1) of the current A/B bank.
 * The memory offsets for the party count and list differ between Ruby/Sapphire/Emerald
 * and FireRed/LeafGreen, so the function uses `gameVersion` to dynamically resolve them.
 *
 * @param view - The raw save file DataView.
 * @param section1Offset - The absolute memory offset to the start of the most recent Section 1 block.
 * @param gameVersion - The specific Gen 3 game version ('ruby', 'sapphire', 'emerald', 'firered', 'leafgreen').
 * @returns An object containing the simple array of species IDs (`party`) and detailed instances (`partyDetails`).
 */
export function parseGen3Party(view: DataView, section1Offset: number, gameVersion: import('./common').GameVersion) {
  const party: number[] = [];
  const partyDetails: import('./common').PokemonInstance[] = [];

  try {
    const countOffset =
      section1Offset +
      (gameVersion === 'firered' || gameVersion === 'leafgreen'
        ? GEN3_PARTY_COUNT_OFFSET_FRLG
        : GEN3_PARTY_COUNT_OFFSET);
    const listOffset =
      section1Offset +
      (gameVersion === 'firered' || gameVersion === 'leafgreen'
        ? GEN3_PARTY_POKEMON_LIST_OFFSET_FRLG
        : GEN3_PARTY_POKEMON_LIST_OFFSET);

    // team size in FRLG is 1 byte at 0x34 or 4 bytes at 0x234 in RSE
    const partyCount =
      gameVersion === 'firered' || gameVersion === 'leafgreen'
        ? view.getUint8(countOffset)
        : view.getUint32(countOffset, true);

    for (let i = 0; i < partyCount; i++) {
      if (i >= 6) break;

      const offset = listOffset + i * GEN3_POKEMON_STRUCT_SIZE;

      const pv = view.getUint32(offset + GEN3_POKEMON_PV_OFFSET, true);
      const otId = view.getUint32(offset + GEN3_POKEMON_OT_ID_OFFSET, true);

      // If both PV and OTID are 0, it's an empty slot.
      if (pv === 0 && otId === 0) continue;

      const decryptionKey = pv ^ otId;
      const permutationIndex = pv % NUM_SUBSTRUCTURE_PERMUTATIONS;
      const permutation = SUBSTRUCTURE_ORDER[permutationIndex];
      if (!permutation) {
        throw new Error('The save file is corrupted or incomplete.');
      }

      const indexOfG = permutation.indexOf('G');
      const indexOfA = permutation.indexOf('A');

      const growthSubstructureOffset = offset + GEN3_POKEMON_DATA_OFFSET + indexOfG * SUBSTRUCTURE_SIZE;
      const attacksSubstructureOffset = offset + GEN3_POKEMON_DATA_OFFSET + indexOfA * SUBSTRUCTURE_SIZE;

      const encryptedSpecies = view.getUint16(growthSubstructureOffset + GEN3_POKEMON_SPECIES_OFFSET_IN_G, true);
      const encryptedItem = view.getUint16(growthSubstructureOffset + GEN3_POKEMON_ITEM_OFFSET_IN_G, true);
      const speciesId = encryptedSpecies ^ (decryptionKey & LOWER_16_BIT_MASK);
      const item = encryptedItem ^ (decryptionKey >>> UPPER_16_BIT_SHIFT);

      const encryptedMove1 = view.getUint16(attacksSubstructureOffset + GEN3_POKEMON_MOVES_OFFSET_IN_A, true);
      const encryptedMove2 = view.getUint16(
        attacksSubstructureOffset + GEN3_POKEMON_MOVES_OFFSET_IN_A + GEN3_POKEMON_MOVE_2_OFFSET,
        true,
      );
      const encryptedMove3 = view.getUint16(
        attacksSubstructureOffset + GEN3_POKEMON_MOVES_OFFSET_IN_A + GEN3_POKEMON_MOVE_3_OFFSET,
        true,
      );
      const encryptedMove4 = view.getUint16(
        attacksSubstructureOffset + GEN3_POKEMON_MOVES_OFFSET_IN_A + GEN3_POKEMON_MOVE_4_OFFSET,
        true,
      );

      const moves = [
        encryptedMove1 ^ (decryptionKey & LOWER_16_BIT_MASK),
        encryptedMove2 ^ (decryptionKey >>> UPPER_16_BIT_SHIFT),
        encryptedMove3 ^ (decryptionKey & LOWER_16_BIT_MASK),
        encryptedMove4 ^ (decryptionKey >>> UPPER_16_BIT_SHIFT),
      ].filter((m) => m > 0);

      party.push(speciesId);
      partyDetails.push({
        speciesId,
        level: view.getUint8(offset + GEN3_PARTY_LEVEL_OFFSET),
        isShiny: false, // We'll implement shiny calculation separately
        item: item > 0 ? item : undefined,
        moves,
        personalityValue: pv,
        storageLocation: 'Party',
        hash: `${pv}-${otId}`,
        currentHp: view.getUint16(offset + GEN3_PARTY_HP_OFFSET, true),
        stats: {
          hp: view.getUint16(offset + GEN3_PARTY_MAX_HP_OFFSET, true),
          atk: view.getUint16(offset + GEN3_PARTY_ATTACK_OFFSET, true),
          def: view.getUint16(offset + GEN3_PARTY_DEFENSE_OFFSET, true),
          spd: view.getUint16(offset + GEN3_PARTY_SPEED_OFFSET, true),
          spatk: view.getUint16(offset + GEN3_PARTY_SPATK_OFFSET, true),
          spdef: view.getUint16(offset + GEN3_PARTY_SPDEF_OFFSET, true),
        },
      });
    }
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }

  return { party, partyDetails };
}

/**
 * Parses the PC Boxes to extract all stored Pokemon.
 *
 * @remarks
 * **Architecture Note:**
 * Gen 3 PC Box data is spread across multiple 4KB sections (sections 5 through 13).
 * Before this function is called, those scattered sections must be concatenated into
 * a single contiguous buffer (`pcBufferView`).
 *
 * @param pcBufferView - A DataView of the reconstructed PC Buffer.
 * @returns An object containing the simple array of species IDs (`pc`) and the detailed `pcDetails`.
 * @throws Error - "The save file is corrupted or incomplete." on invalid data.
 */
export function parseGen3PCBoxes(pcBufferView: DataView) {
  const pc: number[] = [];
  const pcDetails: import('./common').PokemonInstance[] = [];

  try {
    for (let box = 0; box < PC_BOX_COUNT; box++) {
      for (let slot = 0; slot < PC_BOX_CAPACITY; slot++) {
        const pokemonIndex = box * PC_BOX_CAPACITY + slot;
        const offset = PC_BOX_POKEMON_LIST_OFFSET + pokemonIndex * GEN3_PC_POKEMON_STRUCT_SIZE;

        const pv = pcBufferView.getUint32(offset + GEN3_POKEMON_PV_OFFSET, true);
        const otId = pcBufferView.getUint32(offset + GEN3_POKEMON_OT_ID_OFFSET, true);

        // If both PV and OTID are 0, it's an empty slot.
        if (pv === 0 && otId === 0) continue;

        const decryptionKey = pv ^ otId;
        const permutationIndex = pv % NUM_SUBSTRUCTURE_PERMUTATIONS;
        const permutation = SUBSTRUCTURE_ORDER[permutationIndex];
        if (!permutation) {
          throw new Error('The save file is corrupted or incomplete.');
        }

        const indexOfG = permutation.indexOf('G');
        const indexOfA = permutation.indexOf('A');

        const growthSubstructureOffset = offset + GEN3_POKEMON_DATA_OFFSET + indexOfG * SUBSTRUCTURE_SIZE;
        const attacksSubstructureOffset = offset + GEN3_POKEMON_DATA_OFFSET + indexOfA * SUBSTRUCTURE_SIZE;

        const encryptedSpecies = pcBufferView.getUint16(
          growthSubstructureOffset + GEN3_POKEMON_SPECIES_OFFSET_IN_G,
          true,
        );
        const encryptedItem = pcBufferView.getUint16(growthSubstructureOffset + GEN3_POKEMON_ITEM_OFFSET_IN_G, true);
        const speciesId = encryptedSpecies ^ (decryptionKey & LOWER_16_BIT_MASK);
        const item = encryptedItem ^ (decryptionKey >>> UPPER_16_BIT_SHIFT);

        const encryptedMove1 = pcBufferView.getUint16(attacksSubstructureOffset + GEN3_POKEMON_MOVES_OFFSET_IN_A, true);
        const encryptedMove2 = pcBufferView.getUint16(
          attacksSubstructureOffset + GEN3_POKEMON_MOVES_OFFSET_IN_A + GEN3_POKEMON_MOVE_2_OFFSET,
          true,
        );
        const encryptedMove3 = pcBufferView.getUint16(
          attacksSubstructureOffset + GEN3_POKEMON_MOVES_OFFSET_IN_A + GEN3_POKEMON_MOVE_3_OFFSET,
          true,
        );
        const encryptedMove4 = pcBufferView.getUint16(
          attacksSubstructureOffset + GEN3_POKEMON_MOVES_OFFSET_IN_A + GEN3_POKEMON_MOVE_4_OFFSET,
          true,
        );

        const moves = [
          encryptedMove1 ^ (decryptionKey & LOWER_16_BIT_MASK),
          encryptedMove2 ^ (decryptionKey >>> UPPER_16_BIT_SHIFT),
          encryptedMove3 ^ (decryptionKey & LOWER_16_BIT_MASK),
          encryptedMove4 ^ (decryptionKey >>> UPPER_16_BIT_SHIFT),
        ].filter((m) => m > 0);

        const isShiny = false; // We can skip full shiny calculation for PC boxes for now unless requested

        const p: import('./common').PokemonInstance = {
          hash: `${pv}-${otId}`,
          speciesId,
          level: 1, // PC pokemon don't have level in the 80 bytes, it's generated on withdrawal.
          isShiny,
          item: item > 0 ? item : undefined,
          moves,
          personalityValue: pv,
          storageLocation: `Box ${box + 1}`,
          slot,
        };

        pc.push(speciesId);
        pcDetails.push(p);
      }
    }
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }

  return { pc, pcDetails };
}

/**
 * Extracts Spinda personality values from parsed party and PC data.
 */
export function extractGen3Spindas(
  partyDetails: import('./common').PokemonInstance[],
  pcDetails: import('./common').PokemonInstance[]
): import('./common').Gen3Spinda[] {
  const spindas: import('./common').Gen3Spinda[] = [];
  const allPokemon = [...partyDetails, ...pcDetails];
  for (const pokemon of allPokemon) {
    if (pokemon.speciesId === SPECIES_SPINDA && pokemon.personalityValue !== undefined) {
      spindas.push({ personalityValue: pokemon.personalityValue });
    }
  }
  return spindas;
}

/**
 * Extracts the Personality Value (PV) and Individual Values (IVs) from a Pokémon's data structure.
 *
 * **Architecture Note:**
 * In Gen 3, each Pokémon's core data is stored in a 48-byte encrypted substructure block.
 * To read this block, two operations are required:
 * 1. **Decryption:** The data is XORed against a decryption key derived from `Personality Value (PV) ^ Original Trainer ID (OT_ID)`.
 * 2. **Permutation:** The 48 bytes are divided into four 12-byte substructures (Growth, Attacks, EVs, Misc).
 *    Their order (e.g., GAEM vs MGEA) varies per Pokémon and is determined by `PV % 24`.
 *
 * @param view - The DataView of the raw save buffer or PC buffer.
 * @param offset - The memory offset where the Pokémon's 100-byte structure begins.
 * @returns An object containing the PV and a raw 32-bit integer representing the packed IVs.
 * @throws Error - "The save file is corrupted or incomplete." on invalid data.
 */
export function parseGen3EVs(view: DataView, offset: number) {
  try {
    const hp = view.getUint8(offset + EV_HP_OFFSET);
    const attack = view.getUint8(offset + EV_ATK_OFFSET);
    const defense = view.getUint8(offset + EV_DEF_OFFSET);
    const speed = view.getUint8(offset + EV_SPD_OFFSET);
    const specialAttack = view.getUint8(offset + EV_SPATK_OFFSET);
    const specialDefense = view.getUint8(offset + EV_SPDEF_OFFSET);

    return { hp, attack, defense, speed, specialAttack, specialDefense };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

export function parseGen3PokemonPVAndIVs(view: DataView, offset: number) {
  try {
    const pv = view.getUint32(offset + GEN3_POKEMON_PV_OFFSET, true);
    const otId = view.getUint32(offset + GEN3_POKEMON_OT_ID_OFFSET, true);

    const decryptionKey = pv ^ otId;
    const permutationIndex = pv % NUM_SUBSTRUCTURE_PERMUTATIONS;
    const permutation = SUBSTRUCTURE_ORDER[permutationIndex];
    if (!permutation) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    const indexOfM = permutation.indexOf('M');

    // The Miscellaneous (M) substructure starts at offset + 32 + (indexOfM * 12)
    const miscSubstructureOffset = offset + GEN3_POKEMON_DATA_OFFSET + indexOfM * SUBSTRUCTURE_SIZE;

    // The IVs are located at offset 4 within the M substructure. This corresponds to the second 32-bit word.
    const encryptedIVs = view.getUint32(miscSubstructureOffset + MISC_IVS_OFFSET, true);
    const decryptedIVs = encryptedIVs ^ decryptionKey;

    const hp = (decryptedIVs >> IV_SHIFT_HP) & IV_MASK;
    const attack = (decryptedIVs >> IV_SHIFT_ATK) & IV_MASK;
    const defense = (decryptedIVs >> IV_SHIFT_DEF) & IV_MASK;
    const speed = (decryptedIVs >> IV_SHIFT_SPD) & IV_MASK;
    const specialAttack = (decryptedIVs >> IV_SHIFT_SPATK) & IV_MASK;
    const specialDefense = (decryptedIVs >> IV_SHIFT_SPDEF) & IV_MASK;

    return { hp, attack, defense, speed, specialAttack, specialDefense, pv };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Calculates the exact remaining steps for an Egg to hatch in Gen 3.
 *
 * @remarks
 * In Gen 3, the "Is Egg" bit flag is located at bit 30 of the 32-bit IVs/Egg/Ability bitfield
 * within the Miscellaneous (M) substructure. If set, the Friendship byte in the Growth (G)
 * substructure is repurposed to store the remaining Egg Cycles. Each cycle takes 256 steps.
 *
 * @param view - The raw save file DataView.
 * @param miscSubstructureOffset - The resolved memory offset to the Miscellaneous (M) substructure.
 * @param growthSubstructureOffset - The resolved memory offset to the Growth (G) substructure.
 * @returns The exact remaining steps to hatch, or null if the Pokémon is not an egg.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3EggSteps(
  view: DataView,
  miscSubstructureOffset: number,
  growthSubstructureOffset: number,
): number | null {
  try {
    const ivEggAbility = view.getUint32(miscSubstructureOffset + MISC_IV_EGG_ABILITY_OFFSET, true);
    const isEgg = (ivEggAbility >> IS_EGG_BIT_SHIFT) & 1;

    if (!isEgg) {
      return null;
    }

    const eggCycles = view.getUint8(growthSubstructureOffset + GROWTH_FRIENDSHIP_OFFSET);
    return eggCycles * EGG_CYCLE_STEPS;
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
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
 * - Emerald: `SaveBlock1 + 0x31dc`
 * - FireRed/LeafGreen: `SaveBlock1 + 0x30d0`
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
 * **Why memory offsets shift:**
 * Game Freak continually modified the SaveBlock1 layout throughout Generation 3 to accommodate
 * new mechanics. For example, FireRed/LeafGreen removed Secret Bases and Contests, while Emerald
 * added Battle Frontier data, causing the Roamer block to shift to different static offsets
 * across releases (`0x3144` in RS, `0x31dc` in Emerald, `0x30d0` in FRLG).
 *
 * **Data Packing:**
 * To conserve memory, all 6 Individual Values (IVs) are bit-packed into a single 32-bit integer,
 * rather than stored as separate bytes.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The resolved memory offset to the active SaveBlock1.
 * @param gameVersion - The detected game version used to apply the correct memory shift.
 * @returns An object containing the extracted roamer data, including unpacked IVs.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
/**
 * Generic DataView parser for extracting Gen 3 Roamer data structures.
 *
 * @param dataView - The raw save file DataView.
 * @param offset - The memory offset to the start of the roamer structure.
 * @returns The parsed Gen3RoamerData object.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3RoamerStruct(dataView: DataView, offset: number): Gen3RoamerData {
  try {
    const rawIvs = dataView.getUint32(offset + ROAMER_IVS_OFFSET, true);
    const personalityValue = dataView.getUint32(offset + ROAMER_PV_OFFSET, true);
    const speciesId = dataView.getUint16(offset + ROAMER_SPECIES_ID_OFFSET, true);
    const hp = dataView.getUint16(offset + ROAMER_HP_OFFSET, true);
    const level = dataView.getUint8(offset + ROAMER_LEVEL_OFFSET);
    const statusCondition = dataView.getUint8(offset + ROAMER_STATUS_OFFSET);
    const isActive = dataView.getUint8(offset + ROAMER_ACTIVE_OFFSET) !== 0;

    const hpIv = (rawIvs >> IV_SHIFT_HP) & IV_MASK;
    const atkIv = (rawIvs >> IV_SHIFT_ATK) & IV_MASK;
    const defIv = (rawIvs >> IV_SHIFT_DEF) & IV_MASK;
    const spdIv = (rawIvs >> IV_SHIFT_SPD) & IV_MASK;
    const spAtkIv = (rawIvs >> IV_SHIFT_SPATK) & IV_MASK;
    const spDefIv = (rawIvs >> IV_SHIFT_SPDEF) & IV_MASK;

    return {
      isActive,
      speciesId,
      level,
      hp,
      statusCondition,
      personalityValue,
      ivs: {
        hp: hpIv,
        atk: atkIv,
        def: defIv,
        spd: spdIv,
        spAtk: spAtkIv,
        spDef: spDefIv,
      },
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

export function parseGen3Roamer(view: DataView, saveBlock1Offset: number, gameVersion: GameVersion) {
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
    const roamerData = parseGen3RoamerStruct(view, offset);

    // Also parse contest stats which are specific to the legacy parseGen3Roamer return type
    // (They are skipped in the strict Gen3RoamerData model)
    const cool = view.getUint8(offset + ROAMER_COOL_OFFSET);
    const beauty = view.getUint8(offset + ROAMER_BEAUTY_OFFSET);
    const cute = view.getUint8(offset + ROAMER_CUTE_OFFSET);
    const smart = view.getUint8(offset + ROAMER_SMART_OFFSET);
    const tough = view.getUint8(offset + ROAMER_TOUGH_OFFSET);

    return {
      ...roamerData,
      status: roamerData.statusCondition,
      personality: roamerData.personalityValue,
      ivs: view.getUint32(offset + ROAMER_IVS_OFFSET, true), // Legacy implementation expects packed 32-bit IVs
      unpackedIvs: roamerData.ivs,
      cool,
      beauty,
      cute,
      smart,
      tough,
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Core DataView parser for the Gen 3 TV Block.
 *
 * @remarks
 * Safely iterates through the TV Block array extracting structural metadata.
 * Uses native DataView methods to prevent out-of-bounds reads.
 *
 * @param view - The raw save file DataView.
 * @param offset - The offset within the buffer to read the TV Shows array from.
 * @returns An array of parsed Gen3TVShow metadata.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3TVBlock(view: DataView, offset: number): Gen3TVShow[] {
  try {
    const shows: Gen3TVShow[] = [];
    for (let i = 0; i < TV_SHOWS_COUNT; i++) {
      const itemOffset = offset + i * TVSHOW_STRUCT_SIZE;
      const kind = view.getUint8(itemOffset + TV_SHOW_KIND_OFFSET);
      const active = view.getUint8(itemOffset + TV_SHOW_ACTIVE_OFFSET) !== 0;

      shows.push({ kind, active, itemOffset });
    }
    return shows;
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
    const shows = parseGen3TVBlock(view, offset);

    for (const show of shows) {
      // Check if the show is a Mix Record event (21 to 40)
      if (show.active && show.kind >= TVGROUP_RECORD_MIX_START && show.kind <= TVGROUP_RECORD_MIX_END) {
        const payloadStart = show.itemOffset + TV_SHOW_PAYLOAD_OFFSET;
        const payload = new Uint8Array(
          view.buffer.slice(view.byteOffset + payloadStart, view.byteOffset + payloadStart + TV_SHOW_PAYLOAD_LENGTH),
        );
        mixRecords.push({ kind: show.kind, active: show.active, payload });
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
 * Parses Active Swarm (Mass Outbreak) data from a Gen 3 save file.
 *
 * @remarks
 * Mass outbreak events are stored within the TV Show array. Shows with a specific
 * kind (e.g., 41) indicate a mass outbreak. We scan the array to extract the active
 * swarm data (species, location, and days remaining).
 *
 * @param view - The raw save file DataView.
 * @param offset - The offset within the buffer to read the TV Shows array from.
 * @returns An object containing the extracted Gen3ActiveSwarm data or undefined if none found.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
/**
 * Extracts the Volcanic Ash gather count from a Gen 3 save file.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The absolute offset of SaveBlock1.
 * @param version - The specific game version.
 * @returns The amount of Volcanic Ash gathered.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3VolcanicAsh(view: DataView, saveBlock1Offset: number, version: GameVersion): number {
  try {
    const varsOffset = version === 'emerald' ? GEN3_EMERALD_VARS_OFFSET : GEN3_RS_VARS_OFFSET;
    return view.getUint16(saveBlock1Offset + varsOffset + GEN3_ASH_VAR_RELATIVE_OFFSET, true);
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Parses the TV Shows block to detect an active Mass Outbreak (Swarm) event.
 * Swarms alter wild encounter tables temporarily (e.g., Seedot on Route 102).
 *
 * @param view - The raw save file DataView.
 * @param offset - The memory offset of the TV Shows block.
 * @returns An object containing swarm details if active, or undefined if no swarm is occurring.
 */
export function parseGen3ActiveSwarm(view: DataView, offset: number): Gen3ActiveSwarm | undefined {
  try {
    const shows = parseGen3TVBlock(view, offset);

    for (const show of shows) {
      // Check if the show is a Mass Outbreak event and active
      if (show.active && show.kind === TVSHOW_MASS_OUTBREAK) {
        const speciesId = view.getUint16(show.itemOffset + OUTBREAK_SPECIES_OFFSET, true);
        const mapId = view.getUint8(show.itemOffset + OUTBREAK_MAP_NUM_OFFSET);
        const mapGroup = view.getUint8(show.itemOffset + OUTBREAK_MAP_GROUP_OFFSET);
        const daysRemaining = view.getUint16(show.itemOffset + OUTBREAK_DAYS_BEFORE_OFFSET, true);
        const moves: [number, number, number, number] = [
          view.getUint16(show.itemOffset + OUTBREAK_MOVES_OFFSET, true),
          view.getUint16(show.itemOffset + OUTBREAK_MOVE_2_OFFSET, true),
          view.getUint16(show.itemOffset + OUTBREAK_MOVE_3_OFFSET, true),
          view.getUint16(show.itemOffset + OUTBREAK_MOVE_4_OFFSET, true),
        ];
        const probability = view.getUint8(show.itemOffset + OUTBREAK_PROBABILITY_OFFSET);
        const level = view.getUint8(show.itemOffset + OUTBREAK_LEVEL_OFFSET);
        const language = view.getUint8(show.itemOffset + OUTBREAK_LANGUAGE_OFFSET);

        // We only extract the first active swarm we find
        return {
          speciesId,
          mapId,
          mapGroup,
          daysRemaining,
          moves,
          probability,
          level,
          language,
        };
      }
    }
    return undefined;
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
 * They are extracted sequentially from offset `0x06` to `0x0b` relative to the substructure's base.
 *
 * @param view - The raw save file DataView.
 * @param offset - The offset within the buffer to the base of the E substructure.
 * @returns An object containing the extracted Contest attributes.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3ConditionStats(view: DataView, offset: number) {
  try {
    const cool = view.getUint8(offset + CONDITION_COOL_OFFSET);
    const beauty = view.getUint8(offset + CONDITION_BEAUTY_OFFSET);
    const cute = view.getUint8(offset + CONDITION_CUTE_OFFSET);
    const smart = view.getUint8(offset + CONDITION_SMART_OFFSET);
    const tough = view.getUint8(offset + CONDITION_TOUGH_OFFSET);
    const sheen = view.getUint8(offset + CONDITION_SHEEN_OFFSET);

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
 * **Why this exists:**
 * In Ruby, Sapphire, and Emerald, Mirage Island is a hidden location on Route 130 that only
 * appears if the lower 16 bits of a party Pokémon's Personality Value (PV) matches this
 * 16-bit randomly generated daily integer. The engine extracts this so the assistant can
 * notify the user if they currently possess a matching Pokémon in their PC or Party.
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
export function parseGen3SecretBases(
  view: DataView,
  saveBlock1Offset: number,
  gameVersion: GameVersion,
): Gen3SecretBase[] {
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
      const record = parseSecretBaseRecord(view, offset);
      if (record) {
        secretBases.push(record);
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

/**
 * Main entry point for parsing a Generation 3 (R/S/E/FR/LG) save file.
 *
 * ## Execution Flow & Architecture
 *
 * 1. **Section Resolution (The A/B Flash System):**
 *    Gen 3 games use flash memory, which is vulnerable to corruption if power is lost mid-write.
 *    To solve this, the game alternates saving between Bank A (`0x0000`) and Bank B (`0xe000`).
 *    This function *must* scan both banks to find `SaveBlock1` (player data) and `SaveBlock2` (system data),
 *    comparing their internal `saveIndex` values to determine which bank contains the most recent,
 *    uncorrupted save state.
 *
 * 2. **State Extraction:**
 *    Once the active `SaveBlock1` and `SaveBlock2` offsets are resolved, it extracts world state data
 *    including Berry Patches, Secret Bases, PokeNews, Mix Records, and Roaming Legendaries.
 *
 * 3. **Version Shifting:**
 *    Unlike earlier generations, Gen 3 offsets shift wildly between Ruby/Sapphire, FireRed/LeafGreen,
 *    and Emerald because Game Freak added new mechanics (like the Battle Frontier) into the middle
 *    of the `SaveBlock1` struct.
 *
 * @param view - The raw save file DataView.
 * @param _forcedVersion - An optional game version override (e.g. 'ruby', 'emerald') to dictate memory offsets.
 * @returns The fully constructed SaveData object.
 * @throws {Error} If the save file is corrupted, incomplete, or out-of-bounds reads occur.
 */
export function parseGen3TrainerId(view: DataView, section0Offset: number): { trainerId: number; secretId: number } {
  try {
    const val = view.getUint32(section0Offset + GEN3_TRAINER_ID_OFFSET, true);
    const trainerId = val & LOWER_16_BIT_MASK;
    const secretId = val >>> SECRET_ID_SHIFT;
    return { trainerId, secretId };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Parses the Contest Winners array to determine if the player has unlocked the
 * Contest Master Rank on their Trainer Card (earned by having 5 museum paintings).
 *
 * @param view - The raw save file DataView.
 * @param section3Offset - The resolved memory offset to the active Section 3.
 * @returns True if all 5 museum paintings exist.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3ContestMaster(view: DataView, section3Offset: number): boolean {
  try {
    const baseOffset = section3Offset + GEN3_CONTEST_WINNERS_RELATIVE_OFFSET;

    for (let i = 0; i < MUSEUM_CONTEST_WINNERS_COUNT; i++) {
      const winnerIndex = MUSEUM_CONTEST_WINNERS_START + i;
      const offset = baseOffset + winnerIndex * CONTEST_WINNER_STRUCT_SIZE;

      // Check if the species field is non-zero
      const species = view.getUint16(offset + CONTEST_WINNER_SPECIES_OFFSET, true);
      if (species === 0) {
        return false;
      }
    }

    return true;
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * The main entry point for parsing a complete Generation 3 save file.
 *
 * @remarks
 * **Architecture Overview & Orchestration:**
 * 1. **Sector Resolution:** The parser first identifies the most recent valid blocks for Section 0 (Trainer Info),
 *    Section 1 (Team/Items), and Section 2 (GameState/Time) by scanning both A and B flash memory banks checking the `saveIndex`.
 * 2. **PC Buffer Stitching:** Gen 3 PC Box data is spread across 9 different 4KB sections (Sections 5-13).
 *    The engine resolves the latest versions of these sectors and stitches them together into a contiguous buffer.
 * 3. **Data Extraction:** Extracts Pokémon (decrypting their 48-byte substructures), inventory,
 *    event flags, and metadata specific to Hoenn or Kanto (Gen 3).
 *
 * @param view - The raw binary data of the .sav file.
 * @param _forcedVersion - An optional version override provided by the user (defaults to 'ruby' for fallbacks).
 * @returns The structured Gen3SaveData object containing all parsed player progress.
 * @throws RangeError if the file bounds are exceeded during the initial block scan.
 */
export function parseGen3(view: DataView, _forcedVersion?: GameVersion): import('./common').Gen3SaveData {
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

    let section0Offset: number;
    try {
      section0Offset = getLatestSectionOffset(view, 0);
    } catch {
      throw new RangeError('Out of bounds during block scan');
    }

    let section3Offset: number;
    try {
      section3Offset = getLatestSectionOffset(view, 3);
    } catch {
      // Ignored for older Gen 3 games if necessary, or let it fail gracefully
      section3Offset = -1;
    }

    const gen3BerryPatches = extractBerryPatches(view, section1Offset);
    const gen3SecretBases = parseGen3SecretBases(view, section1Offset, _forcedVersion || 'ruby');
    const gen3StaticEncounters = extractGen3StaticEncounterFlags(view, _forcedVersion || 'ruby', section1Offset);

    const gen3Pokeblocks = parseGen3Pokeblocks(view, section1Offset, _forcedVersion || 'ruby');
    const gen3PokeNews = parseGen3PokeNews(view, section1Offset + POKE_NEWS_OFFSET);
    const gen3MixRecords = parseGen3MixRecords(view, section1Offset + TV_SHOWS_OFFSET);
    const gen3ActiveSwarm = parseGen3ActiveSwarm(view, section1Offset + TV_SHOWS_OFFSET);
    const gen3VolcanicAsh = parseGen3VolcanicAsh(view, section1Offset, _forcedVersion || 'ruby');
    const gen3EventItems = parseGen3EventItems(view, section1Offset, _forcedVersion || 'ruby');

    const roamingLegendaries = [];
    try {
      const roamer = parseGen3Roamer(view, section1Offset, _forcedVersion || 'ruby');
      if (roamer?.isActive) {
        roamingLegendaries.push({
          speciesId: roamer.speciesId,
          level: roamer.level,
          isActive: roamer.isActive,
          ivs: roamer.unpackedIvs,
          personalityValue: roamer.personalityValue,
          hp: roamer.hp,
          statusCondition: roamer.statusCondition,
        });
      }
    } catch {
      // Ignored
    }

    const flagsOffset = section2Offset + GEN3_FLAGS_SECTION2_OFFSET;
    const hiddenItemFlags = new Uint8Array(14);

    for (let i = 0; i < 14; i++) {
      const currentByte = view.getUint8(flagsOffset + HIDDEN_ITEM_FLAGS_OFFSET + i);
      const nextByte = view.getUint8(flagsOffset + HIDDEN_ITEM_FLAGS_OFFSET + i + 1);
      hiddenItemFlags[i] = ((currentByte >> 4) | ((nextByte & NIBBLE_MASK) << 4)) & LOWER_8_BIT_MASK;
    }

    const mirageIslandOffset = _forcedVersion === 'emerald' ? MIRAGE_ISLAND_OFFSET_EMERALD : MIRAGE_ISLAND_OFFSET_RS;
    const mirageIslandValue = parseGen3MirageIslandValue(view, section2Offset + mirageIslandOffset);

    let gen3BattleFrontierWinStreaks: Gen3BattleFrontierWinStreaks | undefined;
    let gen3BattleFrontierSymbols: Gen3BattleFrontierSymbols | undefined;
    let gen3TotalBattlePoints: number | undefined;
    let gen3BattlePoints: number | undefined;
    let gen3MoveTutors: Gen3MoveTutors | undefined;
    let gen3NPCTrades: Record<string, boolean> | undefined;

    if (_forcedVersion === 'emerald') {
      try {
        gen3MoveTutors = parseGen3EmeraldMoveTutors(view, section1Offset);
      } catch {
        // Ignored
      }
      try {
        gen3NPCTrades = parseGen3RSENPCTrades(view, section1Offset);
      } catch {
        // Ignored
      }
    } else if (_forcedVersion === 'ruby' || _forcedVersion === 'sapphire') {
      try {
        gen3NPCTrades = parseGen3RSENPCTrades(view, section1Offset);
      } catch {
        // Ignored
      }
    } else if (_forcedVersion === 'firered' || _forcedVersion === 'leafgreen') {
      try {
        gen3MoveTutors = parseGen3FRLGMoveTutors(view, section1Offset);
      } catch {
        // Ignored
      }
      try {
        gen3NPCTrades = parseGen3FRLGNPCTrades(view, section1Offset);
      } catch {
        // Ignored
      }
    }

    if (_forcedVersion === 'emerald') {
      try {
        gen3BattleFrontierWinStreaks = parseGen3BattleFrontierWinStreaks(view, section2Offset);
      } catch {
        // Ignored if missing or corrupted, allowing the rest of the save to load
      }
      try {
        gen3BattleFrontierSymbols = parseGen3BattleFrontierSymbols(view, section1Offset);
      } catch {
        // Ignored if missing or corrupted, allowing the rest of the save to load
      }
      try {
        gen3TotalBattlePoints = parseGen3TotalBattlePoints(view, section2Offset);
      } catch {
        // Ignored if missing or corrupted, allowing the rest of the save to load
      }
      try {
        gen3BattlePoints = parseGen3BattlePoints(view, section2Offset);
      } catch {
        // Ignored if missing or corrupted, allowing the rest of the save to load
      }
    }
    let gen3FeebasSeed: number | undefined;
    if (_forcedVersion === 'ruby' || _forcedVersion === 'sapphire' || _forcedVersion === 'emerald') {
      try {
        gen3FeebasSeed = extractFeebasSeed(view, _forcedVersion, section1Offset);
      } catch {
        // Ignored
      }
    }

    let gen3TrainerDefeatFlags: boolean[] | undefined;
    let gen3TrainerRematchFlags: number[] | undefined;

    if (
      _forcedVersion === 'ruby' ||
      _forcedVersion === 'sapphire' ||
      _forcedVersion === 'emerald' ||
      _forcedVersion === 'firered' ||
      _forcedVersion === 'leafgreen'
    ) {
      try {
        gen3TrainerDefeatFlags = parseGen3TrainerDefeatFlags(view, section1Offset, _forcedVersion);
        gen3TrainerRematchFlags = parseGen3TrainerRematchFlags(view, section1Offset, _forcedVersion);
      } catch {
        // Ignored
      }
    }

    const { trainerId, secretId } = parseGen3TrainerId(view, section0Offset);
    const securityKey = parseGen3SecurityKey(view, section0Offset, _forcedVersion || 'ruby');
    const gen3ShoalItems = parseGen3ShoalItems(view, section1Offset, _forcedVersion || 'ruby', securityKey);
    const gen3TMHMs = parseGen3TMHMs(view, section1Offset, _forcedVersion || 'ruby', securityKey);

    const gen3TMEventFlags = parseGen3TMEventFlags(view, section1Offset, _forcedVersion || 'ruby');
    const gen3MatchCall = parseGen3MatchCall(view, section1Offset, section2Offset, _forcedVersion || 'ruby');

    let gameStatsOffset = GEN3_GAME_STATS_OFFSET_RS;
    if (_forcedVersion === 'emerald') gameStatsOffset = GEN3_GAME_STATS_OFFSET_EMERALD;
    else if (_forcedVersion === 'firered' || _forcedVersion === 'leafgreen')
      gameStatsOffset = GEN3_GAME_STATS_OFFSET_FRLG;

    let hallOfFameCount = 0;
    try {
      hallOfFameCount = view.getUint32(
        section1Offset + gameStatsOffset + GAME_STAT_ENTERED_HOF_ID * BYTES_PER_GAME_STAT,
        true,
      );
    } catch (error) {
      if (error instanceof RangeError) {
        throw new Error('The save file is corrupted or incomplete.');
      }
      throw error;
    }

    const owned = new Set<number>();
    const seen = new Set<number>();
    const pokedexOwnedOffset = section0Offset + GEN3_POKEDEX_OFFSET + GEN3_POKEDEX_OWNED_OFFSET;
    const pokedexSeenOffset = section0Offset + GEN3_POKEDEX_OFFSET + GEN3_POKEDEX_SEEN_OFFSET;

    try {
      // In Gen 3, the National Dex goes up to 386.
      for (let dexId = 1; dexId <= NATIONAL_DEX_MAX; dexId++) {
        // Internal flags are 0-indexed where index 0 is Bulbasaur (Dex ID 1)
        const bitIndex = dexId - 1;
        const byteIdx = Math.floor(bitIndex / BITS_PER_BYTE);
        const bitPos = bitIndex % BITS_PER_BYTE;
        const oByte = view.getUint8(pokedexOwnedOffset + byteIdx);
        const sByte = view.getUint8(pokedexSeenOffset + byteIdx);
        if ((oByte & (1 << bitPos)) !== 0) owned.add(dexId);
        if ((sByte & (1 << bitPos)) !== 0) seen.add(dexId);
      }
    } catch (error) {
      if (error instanceof RangeError) {
        throw new Error('The save file is corrupted or incomplete.');
      }
      throw error;
    }

    let hoennDexCount = 0;
    for (const id of owned) {
      if (HOENN_DEX_NATIONAL_IDS.has(id)) hoennDexCount++;
    }
    const nationalDexCount = owned.size;

    const hasBattleFrontier = !!(
      gen3BattleFrontierSymbols?.tower.gold &&
      gen3BattleFrontierSymbols.dome.gold &&
      gen3BattleFrontierSymbols.palace.gold &&
      gen3BattleFrontierSymbols.arena.gold &&
      gen3BattleFrontierSymbols.factory.gold &&
      gen3BattleFrontierSymbols.pike.gold &&
      gen3BattleFrontierSymbols.pyramid.gold
    );

    let hasContestMaster = false;
    const version = _forcedVersion || 'ruby';
    if (section3Offset !== -1 && (version === 'ruby' || version === 'sapphire' || version === 'emerald')) {
      try {
        hasContestMaster = parseGen3ContestMaster(view, section3Offset);
      } catch {
        // Ignored
      }
    }

    const gen3TrainerCard = {
      hasHallOfFame: hallOfFameCount > 0,
      hasHoennDex: hoennDexCount === 202,
      hasNationalDex: nationalDexCount === 386,
      hasBattleFrontier,
      hasContestMaster,
    };

    let pc: number[] = [];
    let pcDetails: import('./common').PokemonInstance[] = [];
    let currentBoxCount = 0;

    try {
      const pcBuffer = parseGen3PCBuffer(view);
      const pcBufferView = new DataView(pcBuffer.buffer);
      currentBoxCount = pcBufferView.getUint32(PC_BOX_CURRENT_BOX_OFFSET, true) + 1;
      const boxesResult = parseGen3PCBoxes(pcBufferView);
      pc = boxesResult.pc;
      pcDetails = boxesResult.pcDetails;
    } catch (error) {
      if (
        error instanceof RangeError ||
        (error instanceof Error && error.message === 'The save file is corrupted or incomplete.')
      ) {
        throw new Error('The save file is corrupted or incomplete.');
      }
      // Ignored, PC data might be missing or corrupt
    }

    const { party, partyDetails } = parseGen3Party(view, section1Offset, _forcedVersion || 'ruby');

    const gen3Spindas = extractGen3Spindas(partyDetails, pcDetails);

    // Dummy scaffold values for now until fully implemented
    const result: import('./common').Gen3SaveData = {
      generation: 3,
      owned,
      seen,
      party,
      pc,
      partyDetails,
      pcDetails,
      gameVersion: _forcedVersion || 'ruby',
      badges: 0,
      trainerName: '',
      trainerId,
      secretId,
      currentMapId: 0,
      inventory: [],
      currentBoxCount,
      hallOfFameCount,
      hoennDexCount,
      nationalDexCount,

      ...(gen3StaticEncounters ? { gen3StaticEncounters } : {}),
      gen3BerryPatches,
      gen3Spindas,
      gen3SecretBases,
      hiddenItemFlags,
      mirageIslandValue,
      gen3PokeNews,
      gen3MixRecords,
      ...(gen3ActiveSwarm !== undefined ? { gen3ActiveSwarm } : {}),
      roamingLegendaries,
      gen3VolcanicAsh,
      gen3EventItems,
      gen3ShoalItems,
      gen3TMHMs,
      gen3TMEventFlags,
      ...(gen3Pokeblocks ? { gen3Pokeblocks } : {}),
      gen3TrickHouse: parseTrickHouse(view, section1Offset),
      ...(gen3MatchCall ? { gen3MatchCall } : {}),
      gen3TrainerCard,
    };
    if (gen3FeebasSeed !== undefined) {
      result.gen3FeebasSeed = gen3FeebasSeed;
    }
    if (gen3BattleFrontierWinStreaks) {
      result.gen3BattleFrontierWinStreaks = gen3BattleFrontierWinStreaks;
    }
    if (gen3BattleFrontierSymbols) {
      result.gen3BattleFrontierSymbols = gen3BattleFrontierSymbols;
    }
    if (gen3MoveTutors !== undefined) {
      result.gen3MoveTutors = gen3MoveTutors;
    }
    if (gen3TotalBattlePoints !== undefined) {
      result.gen3TotalBattlePoints = gen3TotalBattlePoints;
    }
    if (gen3BattlePoints !== undefined) {
      result.gen3BattlePoints = gen3BattlePoints;
    }
    if (gen3NPCTrades !== undefined) {
      result.gen3NPCTrades = gen3NPCTrades;
      result.npcTradeFlags = Object.values(gen3NPCTrades);
    }
    if (gen3TrainerDefeatFlags !== undefined) {
      result.gen3TrainerDefeatFlags = gen3TrainerDefeatFlags;
    }
    if (gen3TrainerRematchFlags !== undefined) {
      result.gen3TrainerRematchFlags = gen3TrainerRematchFlags;
    }
    return result;
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
 * @returns An object containing the 32-bit PV and its lower 16-bits pre-calculated.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3PersonalityValue(view: DataView, offset: number): { pv: number; lower16: number } {
  try {
    const pv = view.getUint32(offset, true);
    return { pv, lower16: pv & LOWER_16_BIT_MASK };
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

    const cool = (bitfield >> RIBBON_COOL_SHIFT) & RIBBON_RANK_MASK;
    const beauty = (bitfield >> RIBBON_BEAUTY_SHIFT) & RIBBON_RANK_MASK;
    const cute = (bitfield >> RIBBON_CUTE_SHIFT) & RIBBON_RANK_MASK;
    const smart = (bitfield >> RIBBON_SMART_SHIFT) & RIBBON_RANK_MASK;
    const tough = (bitfield >> RIBBON_TOUGH_SHIFT) & RIBBON_RANK_MASK;

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
    for (let i = 0; i < POKE_NEWS_COUNT; i++) {
      const itemOffset = offset + i * POKE_NEWS_SIZE;
      const kind = view.getUint8(itemOffset + POKE_NEWS_KIND_OFFSET);
      const state = view.getUint8(itemOffset + POKE_NEWS_STATE_OFFSET);
      const dayCountdown = view.getUint16(itemOffset + POKE_NEWS_COUNTDOWN_OFFSET, true);
      news.push({ kind, state, dayCountdown });
    }
    return news;
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete: Invalid PokeNews struct.');
    }
    throw error;
  }
}

/**
 * Parses the Emerald Move Tutor usage flags.
 *
 * @remarks
 * **Binary Data Structure:**
 * Move tutor usage in Emerald is tracked via specific event flags packed into a multi-byte sequence
 * starting at `SaveBlock1 + 0x02f0 + 0x36` (Byte 1) and `0x37` (Byte 2).
 * Each tutor move is assigned a specific bit within these bytes.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The resolved memory offset to the active SaveBlock1.
 * @returns An object containing boolean flags for each move tutor.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3EmeraldMoveTutors(view: DataView, saveBlock1Offset: number) {
  try {
    const baseOffset = saveBlock1Offset + GEN3_EVENT_FLAGS_OFFSET;
    const byte1 = view.getUint8(baseOffset + EMERALD_MOVE_TUTOR_BYTE_1_OFFSET);
    const byte2 = view.getUint8(baseOffset + EMERALD_MOVE_TUTOR_BYTE_2_OFFSET);

    return {
      swagger: !!((byte1 >> MOVE_TUTOR_SWAGGER_BIT) & 1),
      rollout: !!((byte1 >> MOVE_TUTOR_ROLLOUT_BIT) & 1),
      furyCutter: !!((byte1 >> MOVE_TUTOR_FURY_CUTTER_BIT) & 1),
      mimic: !!((byte1 >> MOVE_TUTOR_MIMIC_BIT) & 1),
      metronome: !!((byte1 >> MOVE_TUTOR_METRONOME_BIT) & 1),
      sleepTalk: !!((byte1 >> MOVE_TUTOR_SLEEP_TALK_BIT) & 1),
      substitute: !!((byte1 >> MOVE_TUTOR_SUBSTITUTE_BIT) & 1),
      dynamicPunch: !!((byte2 >> MOVE_TUTOR_DYNAMIC_PUNCH_BIT) & 1),
      doubleEdge: !!((byte2 >> MOVE_TUTOR_DOUBLE_EDGE_BIT) & 1),
      explosion: !!((byte2 >> MOVE_TUTOR_EXPLOSION_BIT) & 1),
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Parses the FRLG Move Tutor usage flags.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The resolved memory offset to the active SaveBlock1.
 * @returns An object containing boolean flags for each move tutor.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
/**
 * Parses the NPC trade completion flags from a Gen 3 RSE save file.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The resolved memory offset to the active SaveBlock1.
 * @returns An object containing boolean statuses for each RSE NPC trade.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export { parseGen3LotteryNumber } from '../gen3/lottery/parser';

export const GEN3_TM_HM_MOVE_MAP: Record<number, number> = {
  289: 264,
  290: 337,
  291: 352,
  292: 347,
  293: 46,
  294: 92,
  295: 258,
  296: 339,
  297: 331,
  298: 237,
  299: 241,
  300: 269,
  301: 58,
  302: 59,
  303: 63,
  304: 113,
  305: 182,
  306: 240,
  307: 202,
  308: 219,
  309: 218,
  310: 76,
  311: 231,
  312: 85,
  313: 87,
  314: 89,
  315: 216,
  316: 91,
  317: 94,
  318: 247,
  319: 280,
  320: 104,
  321: 115,
  322: 351,
  323: 53,
  324: 188,
  325: 201,
  326: 126,
  327: 317,
  328: 332,
  329: 259,
  330: 263,
  331: 290,
  332: 156,
  333: 213,
  334: 168,
  335: 211,
  336: 285,
  337: 289,
  338: 315,
  339: 15,
  340: 19,
  341: 57,
  342: 70,
  343: 148,
  344: 249,
  345: 127,
  346: 291,
};

/**
 * Extracts the Security Key used for encryption (money, items) in Gen 3 FRLG/Emerald saves.
 *
 * **Architecture Note: Anti-Tampering (XOR Encryption)**
 * While Ruby and Sapphire store player inventory and money in plain text, FireRed, LeafGreen,
 * and Emerald introduced a rudimentary anti-tampering system to prevent trivial GameShark edits.
 *
 * At save time, the game generates a randomized 32-bit Security Key and stores it in Section 0.
 * Critical values (like item quantities and wallet balances) are then XORed (`^`) against this
 * key before being written to flash memory.
 * To read the true quantity of a TM or item, the parser must first extract this dynamically
 * shifting key and XOR it against the encrypted inventory values in SaveBlock1.
 *
 * @param view - The raw save file DataView.
 * @param section0Offset - The resolved memory offset to Section 0 (where the key is located).
 * @param gameVersion - The detected game version (determines the key's exact offset within Section 0).
 * @returns The 32-bit security key (or 0 if Ruby/Sapphire, as they do not use encryption).
 */
export function parseGen3SecurityKey(view: DataView, section0Offset: number, gameVersion: GameVersion): number {
  try {
    if (gameVersion === 'emerald') {
      return view.getUint32(section0Offset + SECURITY_KEY_OFFSET_EMERALD, true);
    } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
      return view.getUint32(section0Offset + SECURITY_KEY_OFFSET_FRLG, true);
    }
    return 0; // Ruby/Sapphire do not use the security key
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Parses the TM/HM pocket from the Gen 3 save file.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The resolved memory offset to the active SaveBlock1.
 * @param gameVersion - The detected game version.
 * @param securityKey - The 32-bit security key extracted from Section 0.
 * @returns An array of TM/HM items mapped to their corresponding moves.
 */
/**
 * Parses the Items pocket from the Gen 3 save file to extract Shoal Salt and Shoal Shells counts.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The resolved memory offset to the active SaveBlock1.
 * @param gameVersion - The detected game version.
 * @param securityKey - The 32-bit security key extracted from Section 0.
 * @returns An object containing the counts of shells and salt.
 */
export function parseGen3ShoalItems(
  view: DataView,
  saveBlock1Offset: number,
  gameVersion: GameVersion,
  securityKey: number,
): { shells: number; salt: number } {
  let offset = saveBlock1Offset;
  let size = 0;

  if (gameVersion === 'emerald') {
    offset += ITEMS_POCKET_OFFSET_EMERALD;
    size = ITEMS_POCKET_SIZE_EMERALD;
  } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
    offset += ITEMS_POCKET_OFFSET_FRLG;
    size = ITEMS_POCKET_SIZE_FRLG;
  } else {
    offset += ITEMS_POCKET_OFFSET_RS;
    size = ITEMS_POCKET_SIZE_RS;
  }

  try {
    const shoalItems = { shells: 0, salt: 0 };
    const numItems = size / ITEM_ENTRY_SIZE;

    // In Gen 3, item quantity is masked with the lower 16 bits of the security key
    const mask = securityKey & LOWER_16_BIT_MASK;

    for (let i = 0; i < numItems; i++) {
      const itemOffset = offset + i * ITEM_ENTRY_SIZE;
      const itemId = view.getUint16(itemOffset + ITEM_INDEX_OFFSET, true);
      const maskedQuantity = view.getUint16(itemOffset + ITEM_QUANTITY_OFFSET, true);

      // 0 indicates an empty slot
      if (itemId === 0) continue;

      const quantity = maskedQuantity ^ mask;

      if (itemId === ITEM_SHOAL_SHELL) {
        shoalItems.shells = quantity;
      } else if (itemId === ITEM_SHOAL_SALT) {
        shoalItems.salt = quantity;
      }
    }

    return shoalItems;
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

export function parseGen3TMHMs(
  view: DataView,
  saveBlock1Offset: number,
  gameVersion: GameVersion,
  securityKey: number,
) {
  let offset = saveBlock1Offset;
  let size = 0;

  if (gameVersion === 'emerald') {
    offset += TM_POCKET_OFFSET_EMERALD;
    size = TM_POCKET_SIZE_EMERALD;
  } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
    offset += TM_POCKET_OFFSET_FRLG;
    size = TM_POCKET_SIZE_FRLG;
  } else {
    offset += TM_POCKET_OFFSET_RS;
    size = TM_POCKET_SIZE_RS;
  }

  try {
    const inventory: { itemId: number; quantity: number; moveId: number }[] = [];
    const numItems = size / ITEM_ENTRY_SIZE;

    // In Gen 3, item quantity is masked with the lower 16 bits of the security key
    const mask = securityKey & LOWER_16_BIT_MASK;

    for (let i = 0; i < numItems; i++) {
      const itemOffset = offset + i * ITEM_ENTRY_SIZE;
      const itemId = view.getUint16(itemOffset + ITEM_INDEX_OFFSET, true);
      const maskedQuantity = view.getUint16(itemOffset + ITEM_QUANTITY_OFFSET, true);

      // 0 indicates an empty slot
      if (itemId === 0) continue;

      const quantity = maskedQuantity ^ mask;

      if (quantity > 0) {
        const moveId = GEN3_TM_HM_MOVE_MAP[itemId];
        if (moveId) {
          inventory.push({ itemId, quantity, moveId });
        }
      }
    }

    return inventory;
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Helper to read a specific bit flag from the event flags block.
 *
 * @remarks
 * Event flags in Generation 3 are packed into a continuous byte array.
 * To find the exact byte and bit for a specific flag:
 * 1. `flag >> FLAG_BYTE_SHIFT` (divide by 8) gives the byte offset.
 * 2. `flag & FLAG_BIT_MASK` (modulo 8) gives the specific bit index within that byte.
 *
 * @param view - The raw save file DataView.
 * @param baseOffset - The absolute offset to the start of the event flags block.
 * @param flag - The specific flag ID to query.
 * @returns True if the flag is set (1), false otherwise (0).
 */
function readEventFlag(view: DataView, baseOffset: number, flag: number): boolean {
  const byteOffset = baseOffset + (flag >> FLAG_BYTE_SHIFT);
  const bitIndex = flag & FLAG_BIT_MASK;
  return !!((view.getUint8(byteOffset) >> bitIndex) & 1);
}

/**
 * Extracts event flags indicating if specific TMs have been collected.
 *
 * @remarks
 * Why version context is required:
 * TM IDs and their associated unlock methods (flags) are drastically different
 * between Hoenn (RSE) and Kanto (FRLG). For example, TM34 (Shock Wave) has a
 * unique flag for Wattson in Hoenn, but a different flag for Surge in Kanto.
 * We must route the flag lookups based on the underlying `gameVersion`.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock2Offset - The resolved memory offset to the active SaveBlock2.
 * @param gameVersion - The detected game version to correctly map TM flags.
 * @returns An object containing boolean statuses for collected one-time TMs.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3TMEventFlags(
  view: DataView,
  saveBlock1Offset: number,
  gameVersion: GameVersion,
): Record<string, boolean> {
  try {
    const baseOffset = saveBlock1Offset + GEN3_EVENT_FLAGS_OFFSET;

    // TMs are unique per version, so we check version context
    if (gameVersion === 'emerald' || gameVersion === 'ruby' || gameVersion === 'sapphire') {
      return {
        TM31_BRICK_BREAK: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_BRICK_BREAK),
        TM39_ROCK_TOMB: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_ROCK_TOMB),
        TM08_BULK_UP: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_BULK_UP),
        TM34_SHOCK_WAVE: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_SHOCK_WAVE),
        TM50_OVERHEAT: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_OVERHEAT),
        TM42_FACADE: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_FACADE),
        TM40_AERIAL_ACE: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_AERIAL_ACE),
        TM04_CALM_MIND: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_CALM_MIND),
        TM03_WATER_PULSE: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_WATER_PULSE),
        TM24_THUNDERBOLT: readEventFlag(view, baseOffset, FLAG_GOT_TM_THUNDERBOLT_FROM_WATTSON),
        TM27_RETURN: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_RETURN),
        TM36_SLUDGE_BOMB: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_SLUDGE_BOMB),
        TM05_ROAR: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_ROAR),
        TM19_GIGA_DRAIN: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_GIGA_DRAIN),
        TM44_REST: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_REST),
        TM45_ATTRACT: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_ATTRACT),
        TM49_SNATCH: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_SNATCH),
        TM28_DIG: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_DIG),
        TM09_BULLET_SEED: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_BULLET_SEED),
        TM10_HIDDEN_POWER: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_HIDDEN_POWER),
        TM41_TORMENT: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_TORMENT),
        TM46_THIEF: readEventFlag(view, baseOffset, FLAG_RECEIVED_TM_THIEF),
      };
    } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
      return {
        TM34_SHOCK_WAVE: readEventFlag(view, baseOffset, FLAG_GOT_TM34_FROM_SURGE),
        TM42_FACADE: readEventFlag(view, baseOffset, FLAG_GOT_TM42_AT_MEMORIAL_PILLAR),
        TM28_DIG: readEventFlag(view, baseOffset, FLAG_GOT_TM28_FROM_ROCKET),
        TM29_PSYCHIC: readEventFlag(view, baseOffset, FLAG_GOT_TM29_FROM_MR_PSYCHIC),
        TM38_FIRE_BLAST: readEventFlag(view, baseOffset, FLAG_GOT_TM38_FROM_BLAINE),
        TM39_ROCK_TOMB: readEventFlag(view, baseOffset, FLAG_GOT_TM39_FROM_BROCK),
        TM06_TOXIC: readEventFlag(view, baseOffset, FLAG_GOT_TM06_FROM_KOGA),
        TM27_RETURN: readEventFlag(view, baseOffset, FLAG_GOT_TM27),
        TM19_GIGA_DRAIN: readEventFlag(view, baseOffset, FLAG_GOT_TM19_FROM_ERIKA),
        TM33_REFLECT: readEventFlag(view, baseOffset, FLAG_GOT_TM33_FROM_THIRSTY_GIRL),
        TM20_SAFEGUARD: readEventFlag(view, baseOffset, FLAG_GOT_TM20_FROM_THIRSTY_GIRL),
        TM16_LIGHT_SCREEN: readEventFlag(view, baseOffset, FLAG_GOT_TM16_FROM_THIRSTY_GIRL),
        TM03_WATER_PULSE: readEventFlag(view, baseOffset, FLAG_GOT_TM03_FROM_MISTY),
        TM26_EARTHQUAKE: readEventFlag(view, baseOffset, FLAG_GOT_TM26_FROM_GIOVANNI),
        TM04_CALM_MIND: readEventFlag(view, baseOffset, FLAG_GOT_TM04_FROM_SABRINA),
      };
    }
    return {};
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Parses the event flags to determine which in-game NPC trades have been completed in Ruby, Sapphire, and Emerald.
 *
 * @remarks
 * **Architecture Note:**
 * NPC Trade completion is tracked via standard event flags stored in a contiguous multi-byte array.
 * Evaluating these flags is critical because some version-exclusive Pokemon
 * are only obtainable via these trades (e.g., Makuhita in Rustboro).
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The resolved memory offset to the active SaveBlock1.
 * @returns A record mapping NPC trade internal names to a boolean indicating if they have been completed.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3RSENPCTrades(view: DataView, saveBlock1Offset: number): Record<string, boolean> {
  try {
    const baseOffset = saveBlock1Offset + GEN3_EVENT_FLAGS_OFFSET;

    // Bitwise extraction: divide flag by 8 to find the byte, modulo 8 to find the bit.
    const readFlag = (flag: number) => {
      const byteOffset = baseOffset + (flag >> FLAG_BYTE_SHIFT);
      const bitIndex = flag & FLAG_BIT_MASK;
      return !!((view.getUint8(byteOffset) >> bitIndex) & 1);
    };

    return {
      RUSTBORO: readFlag(FLAG_RUSTBORO_NPC_TRADE_COMPLETED),
      PACIFIDLOG: readFlag(FLAG_PACIFIDLOG_NPC_TRADE_COMPLETED),
      FORTREE: readFlag(FLAG_FORTREE_NPC_TRADE_COMPLETED),
      BATTLE_FRONTIER: readFlag(FLAG_BATTLE_FRONTIER_TRADE_DONE), // Emerald only, but safe to extract
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Parses the NPC trade completion flags from a Gen 3 FRLG save file.
 *
 * @remarks
 * Similar to RSE, FireRed and LeafGreen use event flags to track NPC trades.
 * However, the specific flags and the Pokemon involved differ (e.g., Mr. Mime / MIMIEN).
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The resolved memory offset to the active SaveBlock1 block.
 * @returns An object containing boolean statuses for each FRLG NPC trade.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3FRLGNPCTrades(view: DataView, saveBlock1Offset: number): Record<string, boolean> {
  try {
    const baseOffset = saveBlock1Offset + GEN3_EVENT_FLAGS_OFFSET;

    // Bitwise extraction: divide flag by 8 to find the byte, modulo 8 to find the bit.
    const readFlag = (flag: number) => {
      const byteOffset = baseOffset + (flag >> FLAG_BYTE_SHIFT);
      const bitIndex = flag & FLAG_BIT_MASK;
      return !!((view.getUint8(byteOffset) >> bitIndex) & 1);
    };

    return {
      MIMIEN: readFlag(FLAG_DID_MIMIEN_TRADE),
      ZYNX: readFlag(FLAG_DID_ZYNX_TRADE),
      MS_NIDO: readFlag(FLAG_DID_MS_NIDO_TRADE),
      CH_DING: readFlag(FLAG_DID_CH_DING_TRADE),
      NINA: readFlag(FLAG_DID_NINA_TRADE),
      MARC: readFlag(FLAG_DID_MARC_TRADE),
      ESPHERE: readFlag(FLAG_DID_ESPHERE_TRADE),
      TANGENY: readFlag(FLAG_DID_TANGENY_TRADE),
      SEELOR: readFlag(FLAG_DID_SEELOR_TRADE),
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Parses the event flags to determine which one-time Move Tutors have been used in FireRed and LeafGreen.
 *
 * @remarks
 * **Binary Data Structure:**
 * In FRLG, one-time move tutors (like Double-Edge and Seismic Toss) are tracked
 * across a specific, contiguous 4-byte sequence within the event flags block
 * starting at `SaveBlock1 + 0x02f0 + 0x58`.
 * This parser reads those 4 sequential bytes directly and extracts the individual bits for each move.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The resolved memory offset to the active SaveBlock1.
 * @returns An object containing boolean statuses for each FRLG move tutor.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3FRLGMoveTutors(view: DataView, saveBlock1Offset: number) {
  try {
    const baseOffset = saveBlock1Offset + GEN3_EVENT_FLAGS_OFFSET;

    // Extract the 4 sequential bytes that store tutor states
    const byte1 = view.getUint8(baseOffset + FRLG_MOVE_TUTOR_BYTE_1_OFFSET);
    const byte2 = view.getUint8(baseOffset + FRLG_MOVE_TUTOR_BYTE_2_OFFSET);
    const byte3 = view.getUint8(baseOffset + FRLG_MOVE_TUTOR_BYTE_3_OFFSET);
    const byte4 = view.getUint8(baseOffset + FRLG_MOVE_TUTOR_BYTE_4_OFFSET);

    // Bit mask to boolean: shift the specific move's bit to the 0th position and mask with 1.
    return {
      doubleEdge: !!((byte1 >> FRLG_MOVE_TUTOR_DOUBLE_EDGE_BIT) & 1),
      thunderWave: !!((byte1 >> FRLG_MOVE_TUTOR_THUNDER_WAVE_BIT) & 1),
      rockSlide: !!((byte1 >> FRLG_MOVE_TUTOR_ROCK_SLIDE_BIT) & 1),
      explosion: !!((byte1 >> FRLG_MOVE_TUTOR_FRLG_EXPLOSION_BIT) & 1),
      megaPunch: !!((byte1 >> FRLG_MOVE_TUTOR_MEGA_PUNCH_BIT) & 1),
      megaKick: !!((byte1 >> FRLG_MOVE_TUTOR_MEGA_KICK_BIT) & 1),
      dreamEater: !!((byte1 >> FRLG_MOVE_TUTOR_DREAM_EATER_BIT) & 1),
      softBoiled: !!((byte1 >> FRLG_MOVE_TUTOR_SOFT_BOILED_BIT) & 1),
      substitute: !!((byte2 >> FRLG_MOVE_TUTOR_SUBSTITUTE_BIT) & 1),
      swordsDance: !!((byte2 >> FRLG_MOVE_TUTOR_SWORDS_DANCE_BIT) & 1),
      seismicToss: !!((byte2 >> FRLG_MOVE_TUTOR_SEISMIC_TOSS_BIT) & 1),
      counter: !!((byte2 >> FRLG_MOVE_TUTOR_COUNTER_BIT) & 1),
      metronome: !!((byte2 >> FRLG_MOVE_TUTOR_METRONOME_BIT) & 1),
      mimic: !!((byte2 >> FRLG_MOVE_TUTOR_MIMIC_BIT) & 1),
      bodySlam: !!((byte2 >> FRLG_MOVE_TUTOR_BODY_SLAM_BIT) & 1),
      frenzyPlant: !!((byte3 >> FRLG_MOVE_TUTOR_FRENZY_PLANT_BIT) & 1),
      blastBurn: !!((byte3 >> FRLG_MOVE_TUTOR_BLAST_BURN_BIT) & 1),
      hydroCannon: !!((byte4 >> FRLG_MOVE_TUTOR_HYDRO_CANNON_BIT) & 1),
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

export {
  parseGen3BattleFrontierSymbols,
  parseGen3BattleFrontierWinStreaks,
  parseGen3BattlePoints,
  parseGen3TotalBattlePoints,
} from '../gen3/battleFrontier/parser';

/**
 * Parses the met location byte for a Gen 3 Pokémon.
 *
 * @remarks
 * In Gen 3, the `metLocation` is stored in the 48-byte Encrypted Data block,
 * specifically in the Miscellaneous (M) substructure.
 * The `metLocation` is a 1-byte value located at offset 1 within the M substructure.
 *
 * @param view - The raw save file DataView.
 * @param miscSubstructureOffset - The resolved memory offset to the Miscellaneous (M) substructure.
 * @returns The raw byte value representing the met location.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3MetLocation(view: DataView, miscSubstructureOffset: number): number {
  try {
    return view.getUint8(miscSubstructureOffset + MET_LOCATION_OFFSET_IN_M);
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

export * from '../gen3/trainerFlags/parser';
