import type { DBSchema } from 'idb';

/**
 * Pokedex Data Schema - Numeric Constants & Interfaces
 * Used for both the generation script and the application runtime.
 */

export const DB_CONFIG = {
  NAME: 'PokeDB',
  VERSION: 10,
  STORES: {
    POKEMON: 'pokemon',
    ENCOUNTERS: 'encounters',
    LOCATIONS: 'locations',
    ITEMS: 'items',
    METADATA: 'metadata',
  },
} as const;

export const POKE_VERSION_MAP: Record<string, number> = {
  red: 1,
  blue: 2,
  yellow: 3,
  gold: 4,
  silver: 5,
  crystal: 6,
  ruby: 7,
  sapphire: 8,
  emerald: 9,
  firered: 10,
  leafgreen: 11,
};

export const ENCOUNTER_METHOD = {
  WALK: 1,
  SURF: 2,
  OLD_ROD: 3,
  GOOD_ROD: 4,
  SUPER_ROD: 5,
  GIFT: 6,
  ROCK_SMASH: 7,
  HEADBUTT: 8,
  BUG_CATCHING_CONTEST: 18,
} as const;

export const ENCOUNTER_METHOD_MAP: Record<string, number> = {
  walk: 1,
  surf: 2,
  'old-rod': 3,
  'good-rod': 4,
  'super-rod': 5,
  gift: 6,
  'rock-smash': 7,
  headbutt: 8,
  'headbutt-low': 9,
  'headbutt-normal': 10,
  'headbutt-high': 11,
  'npc-trade': 12,
  'only-one': 13,
  pokeflute: 14,
  'gift-egg': 15,
  'squirt-bottle': 16,
  'roaming-grass': 17,
  'bug-catching-contest': 18,
  static: 19,
  'roaming-water': 20,
  'devon-scope': 21,
  'feebas-tile-fishing': 22,
};

export const REVERSE_METHOD_MAP: Record<number, string> = Object.fromEntries(
  Object.entries(ENCOUNTER_METHOD_MAP).map(([k, v]) => [v, k]),
);

export const EVO_TRIGGER = {
  LEVEL_UP: 1,
  TRADE: 2,
  USE_ITEM: 3,
  SHED: 4,
} as const;

export const EVO_TRIGGER_MAP: Record<string, number> = {
  'level-up': 1,
  trade: 2,
  'use-item': 3,
  shed: 4,
};

/** @public */
export const POKEMON_TYPE = {
  NORMAL: 1,
  FIGHTING: 2,
  FLYING: 3,
  POISON: 4,
  GROUND: 5,
  ROCK: 6,
  BUG: 7,
  GHOST: 8,
  STEEL: 9,
  FIRE: 10,
  WATER: 11,
  GRASS: 12,
  ELECTRIC: 13,
  PSYCHIC: 14,
  ICE: 15,
  DRAGON: 16,
  DARK: 17,
  FAIRY: 18,
} as const;

export const POKEMON_TYPE_MAP: Record<string, number> = {
  normal: 1,
  fighting: 2,
  flying: 3,
  poison: 4,
  ground: 5,
  rock: 6,
  bug: 7,
  ghost: 8,
  steel: 9,
  fire: 10,
  water: 11,
  grass: 12,
  electric: 13,
  psychic: 14,
  ice: 15,
  dragon: 16,
  dark: 17,
  fairy: 18,
};

export const EGG_GROUP = {
  MONSTER: 1,
  WATER1: 2,
  BUG: 3,
  FLYING: 4,
  GROUND: 5,
  FAIRY: 6,
  PLANT: 7,
  HUMANSHAPE: 8,
  WATER3: 9,
  MINERAL: 10,
  INDETERMINATE: 11,
  WATER2: 12,
  DITTO: 13,
  DRAGON: 14,
  NO_EGGS: 15,
} as const;

export const EGG_GROUP_MAP: Record<string, number> = {
  monster: 1,
  water1: 2,
  bug: 3,
  flying: 4,
  ground: 5,
  fairy: 6,
  plant: 7,
  humanshape: 8,
  water3: 9,
  mineral: 10,
  indeterminate: 11,
  water2: 12,
  ditto: 13,
  dragon: 14,
  'no-eggs': 15,
};

export const MOVE_DAMAGE_CLASS = {
  PHYSICAL: 1,
  SPECIAL: 2,
  STATUS: 3,
} as const;

export interface CompactEncounterDetail {
  chance: number;
  method: number;
  minLevel: number;
  maxLevel?: number | undefined;
  timeOfDay?: number | undefined;
}

export interface CompactEncounter {
  areaId: number;
  versionId: number;
  details: CompactEncounterDetail[];
}

export interface LocationAreaEncounters {
  pokemonId: number;
  encounters: CompactEncounter[];
}

export interface UnifiedLocation {
  id: number;
  name: string;
  parent?: number | undefined;
  connections?: number[] | undefined;
  pokemonIds?: number[] | undefined;
  distances?: Record<number, number> | undefined;
}

export type GenericLocation = UnifiedLocation;

interface CompactEvolutionDetail {
  trigger?: number | undefined;
  minLevel?: number | undefined;
  minHappiness?: number | undefined;
  itemId?: number | undefined;
  heldItemId?: number | undefined;
  timeOfDay?: number | undefined;
  relativePhysicalStats?: number | undefined;
}

export interface CompactChainLink {
  id: number;
  evolvesTo: CompactChainLink[];
  evolutionDetails: CompactEvolutionDetail[];
  evolvesFromId?: number | undefined;
}

export interface PokemonMetadata {
  id: number;
  name: string;
  captureRate: number;
  genderRate?: number | undefined;
  eggGroups?: number[] | undefined;
  types?: number[] | undefined;
  baby: boolean;
  evolvesTo: CompactChainLink[];
  evolvesFrom: number[];
  evolutionDetails: CompactEvolutionDetail[];
  em?: Record<number, number[]> | undefined;
}

export interface ItemMetadata {
  id: number;
  name: string;
  cost?: number | undefined;
  category?: number | undefined;
  flingPower?: number | undefined;
  effect?: string | undefined;
  sprite?: string | undefined;
}

export interface HiddenItemData {
  flagOffset: number;
  flagBit: number;
  locationId: number;
  itemId: number;
  isAcquired?: boolean;
}

export interface PokeDataExport {
  pokemon: PokemonMetadata[];
  encounters: LocationAreaEncounters[];
  locations: UnifiedLocation[];
  items: ItemMetadata[];
  hash: string;
  sourceSha?: string;
}

export interface PokeDBSchema extends DBSchema {
  [DB_CONFIG.STORES.POKEMON]: {
    key: number;
    value: PokemonMetadata;
  };
  [DB_CONFIG.STORES.ENCOUNTERS]: {
    key: number;
    value: LocationAreaEncounters;
  };
  [DB_CONFIG.STORES.ITEMS]: {
    key: number;
    value: ItemMetadata;
  };
  [DB_CONFIG.STORES.LOCATIONS]: {
    key: number;
    value: UnifiedLocation;
  };
  [DB_CONFIG.STORES.METADATA]: {
    key: string;
    value: { key: string; value: string };
  };
}

export const SAVE_HISTORY_DB_CONFIG = {
  NAME: 'SaveHistoryDB',
  VERSION: 1,
  STORES: {
    SAVES: 'saves',
    METADATA: 'metadata',
    INDEXES: 'indexes',
  },
} as const;

export interface SaveHistoryDBSchema extends DBSchema {
  [SAVE_HISTORY_DB_CONFIG.STORES.SAVES]: {
    key: string;
    value: Uint8Array;
  };
  [SAVE_HISTORY_DB_CONFIG.STORES.METADATA]: {
    key: string;
    value: Record<string, unknown>;
  };
  [SAVE_HISTORY_DB_CONFIG.STORES.INDEXES]: {
    key: string;
    value: Record<string, unknown>;
  };
}
