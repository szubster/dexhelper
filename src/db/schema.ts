import type { DBSchema } from 'idb';

/**
 * Pokedex Data Schema - Numeric Constants & Interfaces
 * Used for both the generation script and the application runtime.
 */

export const DB_CONFIG = {
  NAME: 'PokeDB',
  VERSION: 7,
  STORES: {
    POKEMON: 'pokemon',
    ENCOUNTERS: 'encounters',
    LOCATIONS: 'locations',
    METADATA: 'metadata',
  },
} as const;

export const POKE_VERSION = {
  RED: 1,
  BLUE: 2,
  YELLOW: 3,
  GOLD: 4,
  SILVER: 5,
  CRYSTAL: 6,
} as const;

export const POKE_VERSION_MAP: Record<string, number> = {
  red: 1,
  blue: 2,
  yellow: 3,
  gold: 4,
  silver: 5,
  crystal: 6,
};

export const REVERSE_VERSION_MAP: Record<number, string> = Object.fromEntries(
  Object.entries(POKE_VERSION_MAP).map(([k, v]) => [v, k]),
);

export const ENCOUNTER_METHOD = {
  WALK: 1,
  SURF: 2,
  OLD_ROD: 3,
  GOOD_ROD: 4,
  SUPER_ROD: 5,
  GIFT: 6,
  ROCK_SMASH: 7,
  HEADBUTT: 8,
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

export const ITEM_MAP: Record<number, string> = {
  81: 'Moon Stone',
  82: 'Fire Stone',
  83: 'Thunder Stone',
  84: 'Water Stone',
  85: 'Leaf Stone',
  191: 'Sun Stone',
  198: "King's Rock",
  210: 'Metal Coat',
  211: 'Dragon Scale',
  212: 'Up-Grade',
};

export interface CompactEncounterDetail {
  c: number; // chance
  m: number; // method (ENCOUNTER_METHOD)
  min: number; // min_level
  max?: number | undefined; // max_level
}

export interface CompactEncounter {
  aid: number; // area id (gameId)
  v: number; // version id
  d: CompactEncounterDetail[];
}

export interface LocationAreaEncounters {
  pid: number;
  enc: CompactEncounter[];
}

export interface UnifiedLocation {
  id: number; // ROM Map ID
  n: string; // display name
  prnt?: number | undefined; // ROM Map ID of parent (e.g., city containing this building)
  conn?: number[] | undefined; // Connected Map IDs for navigation
  pids?: number[] | undefined; // Pokémon IDs found here
  dist?: Record<number, number> | undefined; // Precomputed distance matrix (targetId -> hops)
}

export type GenericLocation = UnifiedLocation;
export type SpecificArea = UnifiedLocation;
export type InverseLocationIndex = UnifiedLocation;

export interface CompactEvolutionDetail {
  tr?: number | undefined; // trigger (EVO_TRIGGER)
  ml?: number | undefined; // min_level
  mh?: number | undefined; // min_happiness
  item?: number | undefined; // item id
  held?: number | undefined; // held item id
  time?: number | undefined; // 1: day, 2: night
}

export interface CompactChainLink {
  id: number; // species id
  eto: CompactChainLink[];
  det: CompactEvolutionDetail[];
  ef?: number | undefined; // evolves from species id
}

export interface PokemonMetadata {
  id: number; // pokemon id
  n: string; // name
  cr: number; // capture rate
  gr?: number | undefined; // gender rate
  baby: boolean; // is baby
  // Embedded evolution data
  eto: CompactChainLink[];
  efrm: number[]; // Parent, Grandparent, etc.
  det: CompactEvolutionDetail[]; // Evolutionary requirements to reach THIS pokemon from parent
}

export type PokemonCompact = PokemonMetadata;

export interface PokeDataExport {
  poke: PokemonMetadata[];
  enc: LocationAreaEncounters[];
  loc: UnifiedLocation[];
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
  [DB_CONFIG.STORES.LOCATIONS]: {
    key: number;
    value: UnifiedLocation;
  };
  [DB_CONFIG.STORES.METADATA]: {
    key: string;
    value: { key: string; value: string };
  };
}
