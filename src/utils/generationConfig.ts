import type { PokeballType } from '../store';

// ─── Core Types ──────────────────────────────────────────────────────

export interface VersionInfo {
  id: string;
  label: string;
  themeClass: string;
  /** Tailwind class for the version dot color, e.g. 'bg-red-500 shadow-red-500/20' */
  dotColor: string;
}

export interface GenerationConfig {
  id: number;
  label: string;
  shortLabel: string;
  maxDex: number;
  versions: VersionInfo[];
  /** Version to fall back to when auto-detection returns 'unknown' */
  defaultVersion: string;
  /** URL builder for the main sprite shown in grids and cards */
  spriteUrl: (pokemonId: number, isShiny: boolean) => string;
  /** Fallback sprite when the primary one fails to load */
  fallbackSpriteUrl: (pokemonId: number) => string;
  /** Pokeball types available in this generation (excludes Safari which is contextual) */
  pokeballs: PokeballType[];
  /** Rod item IDs for fishing encounter checks */
  rodIds?: { OLD: number; GOOD: number; SUPER: number };
  /** Whether this gen supports the Hidden Power mechanic */
  hasHiddenPower: boolean;
  /** Whether this gen uses a unified Special stat (Gen 1) */
  hasUnifiedSpecial: boolean;
  /** Whether breeding exists in this generation */
  hasBreeding: boolean;
  /** Number of PC storage boxes */
  boxCount: number;
  /** Capacity of each PC box */
  boxCapacity: number;
  /** At this box count, warn the player to switch boxes */
  boxWarningThreshold: number;
}

// ─── Gen 1 Config ────────────────────────────────────────────────────

const gen1Config: GenerationConfig = {
  id: 1,
  label: 'Gen I',
  shortLabel: 'I',
  maxDex: 151,
  versions: [
    { id: 'red', label: 'Red', themeClass: 'theme-red', dotColor: 'bg-red-500 shadow-red-500/20' },
    {
      id: 'blue',
      label: 'Blue',
      themeClass: 'theme-blue',
      dotColor: 'bg-blue-500 shadow-blue-500/20',
    },
    {
      id: 'yellow',
      label: 'Yellow',
      themeClass: 'theme-yellow',
      dotColor: 'bg-yellow-400 shadow-yellow-400/20',
    },
  ],
  defaultVersion: 'red',
  spriteUrl: (id) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${id}.png`,
  fallbackSpriteUrl: (id) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
  pokeballs: ['poke', 'great', 'ultra'],
  rodIds: { OLD: 76, GOOD: 77, SUPER: 78 },
  hasHiddenPower: false,
  hasUnifiedSpecial: true,
  hasBreeding: false,
  boxCount: 12,
  boxCapacity: 20,
  boxWarningThreshold: 19,
};

// ─── Gen 2 Config ────────────────────────────────────────────────────

const gen2Config: GenerationConfig = {
  id: 2,
  label: 'Gen II',
  shortLabel: 'II',
  maxDex: 251,
  versions: [
    { id: 'gold', label: 'Gold', themeClass: 'theme-gold', dotColor: 'bg-yellow-500' },
    { id: 'silver', label: 'Silver', themeClass: 'theme-silver', dotColor: 'bg-zinc-400' },
    { id: 'crystal', label: 'Crystal', themeClass: 'theme-crystal', dotColor: 'bg-cyan-400' },
  ],
  defaultVersion: 'gold',
  spriteUrl: (id, isShiny) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/${isShiny ? 'shiny/' : ''}${id}.png`,
  fallbackSpriteUrl: (id) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
  pokeballs: ['poke', 'great', 'ultra', 'heavy', 'lure', 'fast', 'friend', 'moon', 'love', 'level'],
  rodIds: { OLD: 57, GOOD: 58, SUPER: 60 },
  hasHiddenPower: true,
  hasUnifiedSpecial: false,
  hasBreeding: true,
  boxCount: 14,
  boxCapacity: 20,
  boxWarningThreshold: 19,
};

// ─── Registry ────────────────────────────────────────────────────────

/** All registered generation configs, keyed by generation number */
export const GENERATION_CONFIGS: Record<number, GenerationConfig> = {
  1: gen1Config,
  2: gen2Config,
  // Future: 3: gen3Config, 4: gen4Config, etc.
};

/** Get the config for a generation with a safe fallback to Gen 1 */
export function getGenerationConfig(gen: number): GenerationConfig {
  return GENERATION_CONFIGS[gen] ?? (GENERATION_CONFIGS[1] as GenerationConfig);
}

/** Reverse lookup: given a version ID like 'red', find its generation config and version info */
export function getVersionInfo(versionId: string): { genConfig: GenerationConfig; version: VersionInfo } | null {
  for (const genConfig of Object.values(GENERATION_CONFIGS)) {
    const version = genConfig.versions.find((v) => v.id === versionId);
    if (version) return { genConfig, version };
  }
  return null;
}

/** The maximum Pokédex number across all registered generations */
export const MAX_DEX_ACROSS_GENS = Math.max(...Object.values(GENERATION_CONFIGS).map((c) => c.maxDex));

/** Pre-computed map of version ID → CSS theme class */
export const VERSION_THEMES: Record<string, string> = Object.fromEntries([
  ...Object.values(GENERATION_CONFIGS).flatMap((gc) => gc.versions.map((v) => [v.id, v.themeClass])),
  ['unsupported', ''],
  ['unknown', ''],
]);

/** All known version IDs across all registered generations */
export const ALL_VERSION_IDS: string[] = Object.values(GENERATION_CONFIGS).flatMap((gc) =>
  gc.versions.map((v) => v.id),
);

/** Pokeball display labels (generation-independent) */
export const POKEBALL_LABELS: Record<PokeballType, string> = {
  poke: 'Poké Ball',
  great: 'Great Ball',
  ultra: 'Ultra Ball',
  safari: 'Safari Ball',
  heavy: 'Heavy Ball',
  lure: 'Lure Ball',
  fast: 'Fast Ball',
  friend: 'Friend Ball',
  moon: 'Moon Ball',
  love: 'Love Ball',
  level: 'Level Ball',
};
