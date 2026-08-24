import type { Gen3StaticEncounters } from '../../gen3/staticEncounters';

/**
 * @module common
 *
 * Shared utilities and definitions for the save file parser engine.
 *
 * This module serves two critical roles:
 * 1. **Unified Schema (`SaveData`)**: It defines the singular, cross-generation interface
 *    that normalizes wildly different binary architectures (e.g. Gen 1's sequential block
 *    vs Gen 3's A/B encrypted flash banks) into a consistent JSON payload for the UI.
 * 2. **Shared Utilities**: It provides decoding and evaluation functions that are common
 *    across multiple generations, such as character decoding (`decodeGen12String`), stat
 *    DV parsing, and Shininess evaluation (`checkShiny`).
 */

export type GameVersion =
  | 'red'
  | 'blue'
  | 'yellow'
  | 'gold'
  | 'silver'
  | 'crystal'
  | 'ruby'
  | 'sapphire'
  | 'emerald'
  | 'firered'
  | 'leafgreen'
  | 'unknown';

/**
 * Represents a single caught Pokémon found in the player's party, PC boxes, or Daycare.
 * Extracted directly from the 32-byte (Gen 2) or 44-byte (Gen 1) internal save data blocks.
 */
export interface Gen3Ribbons {
  cool: number;
  beauty: number;
  cute: number;
  smart: number;
  tough: number;
}

export interface Gen3ConditionStats {
  cool: number;
  beauty: number;
  cute: number;
  smart: number;
  tough: number;
  sheen: number;
}

export interface PokemonInstance {
  speciesId: number;
  level: number;
  isShiny: boolean;
  isShinyCarrier?: boolean;
  isMirageIslandKey?: boolean;
  item?: number | undefined;
  moves: number[];
  eggSteps?: number | undefined;
  friendship?: number | undefined;
  pokerus?: { strain: number; daysRemaining: number } | undefined;
  currentHp?: number | undefined;
  stats?: { hp: number; atk: number; def: number; spd: number; spatk: number; spdef: number };
  dvs?: { hp: number; atk: number; def: number; spd: number; spc: number };
  ivs?: { hp: number; atk: number; def: number; spd: number; spatk: number; spdef: number };
  nature?: number;
  hiddenPower?: { type: string; power: number };
  statExp?: { hp: number; atk: number; def: number; spd: number; spc: number };
  evs?:
    | { hp: number; attack: number; defense: number; speed: number; specialAttack: number; specialDefense: number }
    | undefined;
  caughtData?:
    | {
        time: 'Morning' | 'Day' | 'Night' | 'Unknown';
        level: number;
        location: number;
        locationName?: string | undefined;
        metLocation?: number;
      }
    | undefined;
  otId?: number | undefined;
  otName?: string | undefined;
  nickname?: string | undefined;
  storageLocation: string;
  /** The 1-indexed position of the Pokémon within its storage container. */
  slot?: number | undefined;
  unownForm?: string | undefined;
  condition?: Gen3ConditionStats | undefined;
  ribbons?: Gen3Ribbons | undefined;
  personalityValue?: number | undefined;
  hash: string;
}

/**
 * Represents the normalized player state extracted from a raw Game Boy save file.
 * This structure bridges the gap between binary memory blocks and the suggestion engine.
 */

export interface Gen3PokeNews {
  kind: number;
  state: number;
  dayCountdown: number;
}

export interface Gen3MixRecord {
  kind: number;
  active: boolean;
  payload?: Uint8Array;
}

export interface Gen3TrainerCard {
  hasHallOfFame: boolean;
  hasHoennDex: boolean;
  hasNationalDex: boolean;
  hasBattleFrontier: boolean;
  hasContestMaster: boolean;
}

export interface Gen3Spinda {
  pid: number;
}

export interface Gen3TVShow {
  kind: number;
  active: boolean;
  payload?: Uint8Array;
  itemOffset: number;
}

export interface Gen3RoamerData {
  isActive: boolean;
  speciesId: number;
  level: number;
  hp: number;
  statusCondition: number;
  personalityValue: number;
  ivs: {
    hp: number;
    atk: number;
    def: number;
    spd: number;
    spAtk: number;
    spDef: number;
  };
}

export interface Gen3ActiveSwarm {
  speciesId: number;
  mapId: number;
  mapGroup: number;
  daysRemaining: number;
  moves?: [number, number, number, number];
  probability?: number;
  level?: number;
  language?: number;
}

export interface Gen3SecretBasePartyMember {
  personality: number;
  moves: number[];
  species: number;
  heldItem: number;
  level: number;
  evs: number;
}

export interface Gen3SecretBase {
  secretBaseId: number;
  mapId: number;
  trainerName: string;
  trainerId: number;
  battledOwnerToday?: boolean;
  numSecretBasesReceived: number;
  numTimesEntered: number;
  decorations: number[];
  decorationPositions: number[];
  party: Gen3SecretBasePartyMember[];
}

export interface Gen3BerryPatch {
  berryId: number;
  stage: number;
  stopGrowth: boolean;
  minutesUntilNextStage: number;
  berryYield: number;
  regrowthCount: number;
  watered1: boolean;
  watered2: boolean;
  watered3: boolean;
  watered4: boolean;
}

export interface Gen3MoveTutors {
  swagger?: boolean;
  rollout?: boolean;
  furyCutter?: boolean;
  mimic?: boolean;
  metronome?: boolean;
  sleepTalk?: boolean;
  substitute?: boolean;
  dynamicPunch?: boolean;
  doubleEdge?: boolean;
  explosion?: boolean;
  thunderWave?: boolean;
  rockSlide?: boolean;
  megaPunch?: boolean;
  megaKick?: boolean;
  dreamEater?: boolean;
  softBoiled?: boolean;
  swordsDance?: boolean;
  seismicToss?: boolean;
  counter?: boolean;
  bodySlam?: boolean;
  frenzyPlant?: boolean;
  blastBurn?: boolean;
  hydroCannon?: boolean;
}

export interface Gen3BattleFrontierWinStreaks {
  tower: { current: number; record: number };
  dome: { current: number; record: number };
  palace: { current: number; record: number };
  arena: { current: number; record: number };
  factory: { current: number; record: number };
  pike: { current: number; record: number };
  pyramid: { current: number; record: number };
}

export interface Gen3BattleFrontierSymbols {
  tower: { silver: boolean; gold: boolean };
  dome: { silver: boolean; gold: boolean };
  palace: { silver: boolean; gold: boolean };
  arena: { silver: boolean; gold: boolean };
  factory: { silver: boolean; gold: boolean };
  pike: { silver: boolean; gold: boolean };
  pyramid: { silver: boolean; gold: boolean };
}

export interface BaseSaveData {
  /** A set of Pokémon species IDs that have been caught (O(1) lookup). */
  owned: Set<number>;
  /** A set of Pokémon species IDs that have been encountered. */
  seen: Set<number>;
  /** Array of species IDs representing the Pokémon currently in the player's active party. */
  party: number[];
  /** Array of species IDs representing all Pokémon currently stored in the PC boxes. */
  pc: number[];
  /** Detailed structural data for each Pokémon in the active party. */
  partyDetails: PokemonInstance[];
  /** Detailed structural data for all Pokémon stored in PC boxes. */
  pcDetails: PokemonInstance[];
  /** The specific game version detected or forced (e.g., 'red', 'crystal'). */
  gameVersion: GameVersion;
  /** Bitflag representation of the total number of gym badges obtained. */
  badges: number;
  /** The decoded trainer name. */
  trainerName: string;
  /** The player's unique Trainer ID (TID), used for static gift verification and shiny calculations in later gens. */
  trainerId: number;
  /** The raw internal Map ID where the player last saved the game. */
  currentMapId: number;
  /** The human-readable name of the current map, resolved via mapping constants. */
  currentMapName?: string;
  /** The player's active bag inventory. */
  inventory: { id: number; quantity: number }[];
  /** TM and HM inventory mapped to moves. */
  tms?: { id: number; moveId: number; isAcquired: boolean; quantity: number }[];
  /** Items stored in the player's PC. */
  pcItems?: { id: number; quantity: number }[];
  /** The total number of Pokémon currently stored in the active PC box. */
  currentBoxCount: number;
  /** The number of times the player has entered the Hall of Fame. Used to verify Mewtwo accessibility in Gen 1. */
  hallOfFameCount: number;
  /** The extracted records of the player's Hall of Fame teams. */
  hallOfFameRecords?: {
    playerName: string;
    pokemon: {
      speciesId: number;
      level: number;
      nickname: string;
    }[];
  }[];
  /** Raw byte array containing all in-game event flags (e.g., claimed static gifts, story progression). */
  eventFlags?: Uint8Array;
  /** Boolean array mapping the 2048 trainer defeat and general event flags in Gen 2. */
  trainerFlags?: boolean[];
  /** Raw byte array containing hidden item event flags. */
  hiddenItemFlags?: Uint8Array;
  /** Raw byte array containing hidden coin event flags. */
  hiddenCoinFlags?: Uint8Array;
  /** Bitflags representing which in-game NPC trades have already been completed. */
  npcTradeFlags?: boolean[];
  /**
   * Information regarding currently roaming Legendaries (Gen 2: Raikou, Entei, Suicune. Gen 3: Latios, Latias).
   *
   * Generation differences for map identification:
   * - Gen 2: `mapGroup` and `mapId` are read as separate distinct bytes from the save file.
   * - Gen 3: Utilizes the unified Map Group / Map Index architecture. `mapGroup` and `mapId` can be conceptually derived from a 16-bit Map ID `(GroupIndex << 8) | MapIndex` (though often stored as separate bytes or fields internally, they form a single coordinate).
   */
  roamingLegendaries?: {
    speciesId: number;
    level: number;
    mapGroup?: number;
    mapId?: number;
    isActive?: boolean;
    ivs?: { hp: number; atk: number; def: number; spd: number; spAtk: number; spDef: number };
    personalityValue?: number;
    hp?: number;
    statusCondition?: number;
  }[];
  /** Global map group tracking variable for roaming legendaries. */
  roamerCurMapGroup?: number;
  /** Global map number tracking variable for roaming legendaries. */
  roamerCurMapId?: number;
}

export interface Gen1SaveData extends BaseSaveData {
  /** The generation of the parsed save file. */
  generation: 1;
  /** Gen 1 specific: Claimed static encounters. */
  gen1StaticEncounters?: Record<number, boolean>;
  /** Gen 1 specific: Event flags for one-time TMs. */
  gen1TMEventFlags?: Record<number, boolean>;
  /** Gen 1 specific: Narrative progression flags. */
  gen1NarrativeFlags?: Record<string, boolean>;
}

export interface Gen2SaveData extends BaseSaveData {
  /** The generation of the parsed save file. */
  generation: 2;
  /** Gen 2 specific: Narrative progression flags. */
  gen2NarrativeFlags?: Record<string, boolean>;
  /** Gen 2 specific: The Map Group ID used alongside currentMapId to uniquely identify a location. */
  mapGroup?: number;
  /** Gen 2 specific: The number of Johto gym badges obtained. */
  johtoBadges?: number;
  /** Gen 2 specific: The number of Kanto gym badges obtained. */
  kantoBadges?: number;
  /** Gen 2 specific: Static encounter event flags. */
  gen2StaticEncounters?: {
    sudowoodo: boolean;
    snorlax: boolean;
    redGyarados: boolean;
    hoOh: boolean;
    lugia: boolean;
  };
  /** Detailed structural data for Pokémon currently left in the Daycare (Gen 2). */
  daycare?: PokemonInstance[];
  /** Gen 2 specific: Indicates if an Egg is currently waiting to be picked up from the Daycare. */
  daycareHasEgg?: boolean;
  /** Gen 2 specific: Mom's bank account savings data. */
  gen2MomsSavings?: { money: number; savingActive: boolean };
  /** Gen 2 specific: The player's active and unlocked room decorations. */
  gen2RoomDecorations?: { active: number[]; unlocked: boolean[] };
}

export interface Gen3SaveData extends BaseSaveData {
  /** The generation of the parsed save file. */
  generation: 3;
  gen3Pokeblocks?: import('../gen3/pokeblock/types').Gen3Pokeblock[];
  gen3TrickHouse?: import('./../gen3/trickHouse/parser').Gen3TrickHouse;
  gen3MatchCall?: import('../../gen3/matchCall/parser').Gen3MatchCall;
  /** In-game NPC trade status flags mapped by their flag name for Gen 3 games. */
  gen3NPCTrades?: Record<string, boolean>;
  /** Gen 3 specific: Calculated valid Feebas tile locations. */
  gen3FeebasTiles?: [number, number][];
  /** Gen 3 specific: The 16-bit Feebas seed, used to calculate Feebas tiles in a Web Worker. */
  gen3FeebasSeed?: number;
  /** The player's Secret ID (SID), introduced in Gen 3 for shiny calculations. */
  secretId?: number;
  /** Gen 3 specific: Information regarding the state of Berry Patches across Hoenn. */
  gen3BerryPatches?: Gen3BerryPatch[];
  /** Gen 3 specific: Active Secret Bases. */
  gen3SecretBases?: Gen3SecretBase[];
  /** Gen 3 specific: Upcoming event schedule. */
  gen3PokeNews?: Gen3PokeNews[];
  /** Gen 3 specific: Inherited Mix Record events. */
  gen3MixRecords?: Gen3MixRecord[];
  /** Gen 3 specific: Active Swarm (Mass Outbreak) data. */
  gen3ActiveSwarm?: Gen3ActiveSwarm;
  /** Gen 3 specific: The 16-bit daily Mirage Island random value. */
  mirageIslandValue?: number;
  /** Gen 3 specific: Battle Frontier win streaks */
  gen3BattleFrontierWinStreaks?: Gen3BattleFrontierWinStreaks;
  /** Gen 3 specific: Battle Frontier symbols */
  gen3BattleFrontierSymbols?: Gen3BattleFrontierSymbols;
  /** Gen 3 specific: Battle Points (BP) balance */
  gen3TotalBattlePoints?: number;
  gen3BattlePoints?: number;
  /** Gen 3 specific: Number of Pokémon caught in the Hoenn Dex. */
  hoennDexCount?: number;
  /** Gen 3 specific: Number of Pokémon caught in the National Dex. */
  nationalDexCount?: number;
  /** Gen 3 specific: Volcanic Ash gather count */
  /** Gen 3 specific: Emerald Move Tutor usage */
  gen3MoveTutors?: Gen3MoveTutors;
  /** Gen 3 specific: Volcanic Ash gather count */
  gen3VolcanicAsh?: number;
  /** Gen 3 specific: Key event items boolean flags. */
  gen3EventItems?: Record<number, boolean>;
  /** Gen 3 specific: Shoal Items (Salt and Shells) */
  gen3ShoalItems?: { shells: number; salt: number };
  /** Gen 3 specific: TM and HM inventory mapped to moves */
  gen3TMHMs?: { itemId: number; quantity: number; moveId: number }[];
  /** Gen 3 specific: TM event flags for one-time TM collection */
  gen3TMEventFlags?: Record<string, boolean>;
  /** Gen 3 specific: Story progression narrative flags */
  gen3NarrativeFlags?: Record<string, boolean>;
  /** Gen 3 specific: Upcoming major narrative boss based on progression */
  gen3UpcomingBoss?: string;
  /** Gen 3 specific: Static encounters completion flags */
  gen3StaticEncounters?: Gen3StaticEncounters;
  /** Gen 3 specific: Standard trainer defeat flags */
  gen3TrainerDefeatFlags?: boolean[];
  /** Gen 3 specific: Rematch trainer state flags */
  gen3TrainerRematchFlags?: number[];
  /** Gen 3 specific: Trainer Card Upgrade conditions */
  gen3TrainerCard?: Gen3TrainerCard;
  /** Gen 3 specific: Extracted Spinda Pokémon */
  gen3Spindas?: Gen3Spinda[];
}

export type SaveData = Gen1SaveData | Gen2SaveData | Gen3SaveData;

export function isGen2Save(saveData: SaveData): saveData is Gen2SaveData {
  return saveData.generation === 2;
}

export function isGen3Save(saveData: SaveData): saveData is Gen3SaveData {
  return saveData.generation === 3;
}

// Removed byte helper as DataView provides getUint8 natively.

const GEN12_CHAR_MAP: Record<number, string> = {
  0x7f: ' ',
  0x80: 'A',
  0x81: 'B',
  0x82: 'C',
  0x83: 'D',
  0x84: 'E',
  0x85: 'F',
  0x86: 'G',
  0x87: 'H',
  0x88: 'I',
  0x89: 'J',
  0x8a: 'K',
  0x8b: 'L',
  0x8c: 'M',
  0x8d: 'N',
  0x8e: 'O',
  0x8f: 'P',
  0x90: 'Q',
  0x91: 'R',
  0x92: 'S',
  0x93: 'T',
  0x94: 'U',
  0x95: 'V',
  0x96: 'W',
  0x97: 'X',
  0x98: 'Y',
  0x99: 'Z',
  0x9a: '(',
  0x9b: ')',
  0x9c: ':',
  0x9d: ';',
  0x9e: '[',
  0x9f: ']',
  0xa0: 'a',
  0xa1: 'b',
  0xa2: 'c',
  0xa3: 'd',
  0xa4: 'e',
  0xa5: 'f',
  0xa6: 'g',
  0xa7: 'h',
  0xa8: 'i',
  0xa9: 'j',
  0xaa: 'k',
  0xab: 'l',
  0xac: 'm',
  0xad: 'n',
  0xae: 'o',
  0xaf: 'p',
  0xb0: 'q',
  0xb1: 'r',
  0xb2: 's',
  0xb3: 't',
  0xb4: 'u',
  0xb5: 'v',
  0xb6: 'w',
  0xb7: 'x',
  0xb8: 'y',
  0xb9: 'z',
  0xe0: "'",
  0xe1: 'PK',
  0xe2: 'MN',
  0xe3: '-',
  0xe6: '?',
  0xe7: '!',
  0xe8: '♂',
  0xe9: '/',
  0xea: ',',
  0xed: '♀',
  0xee: '0',
  0xef: '1',
  0xf0: '2',
  0xf1: '3',
  0xf2: '4',
  0xf3: '5',
  0xf4: '6',
  0xf5: '7',
  0xf6: '8',
  0xf7: '9',
};

/**
 * Decodes a custom character-encoded string from a Generation 1 or 2 save file.
 *
 * @param view - The DataView of the raw save buffer.
 * @param offset - The memory offset where the string begins.
 * @param maxLength - The maximum number of bytes to read (defaults to 11 for standard names).
 * @returns The decoded, human-readable UTF-8 string.
 *
 * @remarks
 * Early Pokémon games do not use standard ASCII or UTF-8. Instead, they use a custom character
 * map where `0x80` is 'A', `0x81` is 'B', etc. The string is typically terminated by `0x50`
 * (end of string indicator) or `0x00`/`0xFF`.
 *
 * @example
 * // Decode a player name starting at offset 0x2598
 * const playerName = decodeGen12String(view, 0x2598, 11);
 */
export function decodeGen12String(view: DataView, offset: number, maxLength: number = 11): string {
  let result = '';
  for (let i = 0; i < maxLength; i++) {
    let charCode: number;
    try {
      charCode = view.getUint8(offset + i);
    } catch (e) {
      if (e instanceof RangeError) break;
      throw e;
    }

    if (charCode === 0x50 || charCode === 0x00 || charCode === COMMON_EMPTY_SLOT) break;
    result += GEN12_CHAR_MAP[charCode] ?? '?';
  }
  return result.trim();
}

/**
 * Unpacks a 16-bit DV (Determinant Value) integer into its constituent internal stat genes.
 *
 * @param dvValue - The 16-bit integer representing the combined DVs (extracted via `view.getUint16(offset, false)`).
 * @returns An object containing the 4-bit DVs for HP, Attack, Defense, Speed, and Special.
 *
 * @remarks
 * In Gen 1 and 2, DVs are stored as 4-bit nibbles across two bytes (e.g., Attack/Defense in the first byte,
 * Speed/Special in the second).
 * The HP DV is not stored directly; it is calculated dynamically by taking the least significant bit (LSB)
 * of the other four stats and shifting them into a single 4-bit number.
 *
 * @example
 * // Parse DVs from Gen 2 memory block
 * const stats = parseDVs(view.getUint16(offset + 21, false));
 */
const DV_BYTE_SHIFT = 8;
const DV_BYTE_MASK = 0xff;
const DV_NIBBLE_SHIFT = 4;
const DV_NIBBLE_MASK = 0x0f;
const DV_HP_LSB_MASK = 1;
const DV_HP_ATK_SHIFT = 3;
const DV_HP_DEF_SHIFT = 2;
const DV_HP_SPD_SHIFT = 1;

export function parseDVs(dvValue: number) {
  const b0 = (dvValue >> DV_BYTE_SHIFT) & DV_BYTE_MASK;
  const b1 = dvValue & DV_BYTE_MASK;
  const atk = b0 >> DV_NIBBLE_SHIFT;
  const def = b0 & DV_NIBBLE_MASK;
  const spd = b1 >> DV_NIBBLE_SHIFT;
  const spc = b1 & DV_NIBBLE_MASK;
  const hp =
    ((atk & DV_HP_LSB_MASK) << DV_HP_ATK_SHIFT) |
    ((def & DV_HP_LSB_MASK) << DV_HP_DEF_SHIFT) |
    ((spd & DV_HP_LSB_MASK) << DV_HP_SPD_SHIFT) |
    (spc & DV_HP_LSB_MASK);
  return { hp, atk, def, spd, spc };
}

const SHINY_REQUIRED_DEF = 10;
const SHINY_REQUIRED_SPD = 10;
const SHINY_REQUIRED_SPC = 10;
const SHINY_REQUIRED_SPC_CARRIER_ALT = 2;
const SHINY_VALID_ATK_DVS = [2, 3, 6, 7, 10, 11, 14, 15];

/**
 * Evaluates whether a Pokémon is "Shiny" based solely on its Determinant Values (DVs).
 *
 * @param dvs - The unpacked stat DVs from `parseDVs`.
 * @returns True if the DV combination meets the Gen 2 Shininess criteria.
 *
 * @remarks
 * In Generation 2, Shininess is determined directly by stat DVs, meaning a Pokémon's
 * shininess is permanent and can even be transferred retroactively to Gen 1.
 * A Pokémon is Shiny if its Defense, Speed, and Special DVs are exactly `10`,
 * and its Attack DV is `2`, `3`, `6`, `7`, `10`, `11`, `14`, or `15`.
 *
 * @example
 * const isShiny = checkShiny({ atk: 10, def: 10, spd: 10, spc: 10 }); // true
 */
export function checkShiny(dvs: { atk: number; def: number; spd: number; spc: number }) {
  return (
    dvs.def === SHINY_REQUIRED_DEF &&
    dvs.spd === SHINY_REQUIRED_SPD &&
    dvs.spc === SHINY_REQUIRED_SPC &&
    SHINY_VALID_ATK_DVS.includes(dvs.atk)
  );
}

/**
 * Evaluates whether a Pokémon possesses the "Shiny Gene" (Shiny Carrier) based on its DVs.
 *
 * @param dvs - The unpacked stat DVs from `parseDVs`.
 * @returns True if the DV combination meets the Gen 2 Shiny Carrier criteria.
 *
 * @remarks
 * In Gen 2, a Pokémon can pass down Shininess to its offspring if its DVs satisfy:
 * Defense DV is exactly 10, and Special DV is either 2 or 10.
 *
 * @example
 * const isShinyCarrier = checkShinyGene({ atk: 5, def: 10, spd: 5, spc: 2 }); // true
 */
export function checkShinyGene(dvs: { atk: number; def: number; spd: number; spc: number }) {
  return (
    dvs.def === SHINY_REQUIRED_DEF && (dvs.spc === SHINY_REQUIRED_SPC_CARRIER_ALT || dvs.spc === SHINY_REQUIRED_SPC)
  );
}

const POKERUS_STRAIN_SHIFT = 4;
const POKERUS_DAYS_MASK = 0x0f;
const COMMON_EMPTY_SLOT = 0xff;

/**
 * Parses the Pokerus byte.
 *
 * @param rawPokerus - The raw byte value representing Pokerus.
 * @returns An object with strain and daysRemaining if the Pokemon was infected, otherwise undefined.
 */
export function parsePokerus(rawPokerus: number) {
  if (rawPokerus === 0) {
    return undefined;
  }

  return {
    strain: rawPokerus >> POKERUS_STRAIN_SHIFT,
    daysRemaining: rawPokerus & POKERUS_DAYS_MASK,
  };
}
