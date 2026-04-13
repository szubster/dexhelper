/**
 * Pokedex Data Schema - Numeric Constants & Interfaces
 * Used for both the generation script and the application runtime.
 */

export const DB_CONFIG = {
  NAME: 'PokeDB',
  VERSION: 1,
  STORES: {
    POKEMON: 'pokemon',
    SPECIES: 'species',
    ENCOUNTERS: 'encounters',
    CHAINS: 'chains',
    LOCATIONS: 'locations',
    AREAS: 'areas',
    INDEX: 'index',
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
  max: number; // max_level
}

export interface CompactEncounter {
  slug: string; // location area slug
  v: number; // version (POKE_VERSION)
  d: CompactEncounterDetail[];
}

export interface LocationAreaEncounters {
  pid: number;
  encounters: CompactEncounter[];
}

export interface GenericLocation {
  id: number;
  n: string; // display name
  slug: string; // location slug
  coords?: { x: number; y: number }; // town map coords
}

export interface SpecificArea {
  id: number;
  n: string; // display name
  slug: string; // area slug
  lid: number; // generic location id
}

export interface InverseLocationIndex {
  lid: number; // generic location id
  pids: number[]; // pokemon ids found here
}

export interface CompactEvolutionDetail {
  tr: number; // trigger (EVO_TRIGGER)
  min_l?: number; // min_level
  min_h?: number; // min_happiness
  item?: number; // item id
  held?: number; // held item id
  time?: number; // 1: day, 2: night
  rel_s?: number; // relative_physical_stats (-1, 0, 1)
}

export interface CompactChainLink {
  sid: number; // species id
  evolves_to: CompactChainLink[];
  details: CompactEvolutionDetail[];
}

export interface CompactEvolutionChain {
  id: number;
  chain: CompactChainLink;
}

export interface PokemonCompact {
  id: number;
  sid: number; // species id
  n: string; // name
  s: number[]; // stats: [hp, atk, def, spa, spd, spe]
}

export interface SpeciesCompact {
  id: number;
  cid: number; // chain id
  n: string; // name
  cr: number; // capture rate
  gr: number; // gender rate
  baby: boolean; // is baby
  pre?: number; // evolves from species id
}

export interface PokeDataExport {
  pokemon: PokemonCompact[];
  species: SpeciesCompact[];
  encounters: LocationAreaEncounters[];
  chains: CompactEvolutionChain[];
  locations: GenericLocation[];
  areas: SpecificArea[];
  locationIndex: Record<number, number[]>;
  hash: string;
  sourceSha?: string;
}
