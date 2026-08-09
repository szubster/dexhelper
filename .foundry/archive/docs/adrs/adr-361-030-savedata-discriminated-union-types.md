---
id: adr-361-030-savedata-discriminated-union-types
type: ADR
title: SaveData Typed Schema - Types
status: COMPLETED
owner_persona: architect
created_at: '2026-08-09'
updated_at: '2026-08-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - savedata
  - typescript
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# ADR: SaveData Typed Schema - Types

## Status
Accepted

## Context
The current `SaveData` interface defined in `src/engine/saveParser/parsers/common.ts` is monolithic, meaning it contains all properties for all generations. Generation-specific properties like `gen3FeebasTiles` or `gen1StaticEncounters` are marked as optional (`?`). This creates a poor developer experience as downstream consumers (React components, other utilities) must manually check for the existence of these properties or use non-null assertions (`!`), even when the data generation is known from the context.

## Decision
We will refactor the `SaveData` type into a discriminated union based on the `generation` field.

The structure will be:
```typescript
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
}

export interface Gen1SaveData extends BaseSaveData {
  /** The generation of the parsed save file. */
  generation: 1;
  /** Gen 1 specific: Claimed static encounters. */
  gen1StaticEncounters?: Record<number, boolean>;
  /** Gen 1 specific: Event flags for one-time TMs. */
  gen1TMEventFlags?: Record<number, boolean>;
}

export interface Gen2SaveData extends BaseSaveData {
  /** The generation of the parsed save file. */
  generation: 2;
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
  /** Gen 3 specific: TM and HM inventory mapped to moves */
  gen3TMHMs?: { itemId: number; quantity: number; moveId: number }[];
  /** Gen 3 specific: TM event flags for one-time TM collection */
  gen3TMEventFlags?: Record<string, boolean>;
  /** Gen 3 specific: Static encounters completion flags */
  gen3StaticEncounters?: Gen3StaticEncounters;
}

export type SaveData = Gen1SaveData | Gen2SaveData | Gen3SaveData;
```

## Implementation Impact
- **Core Parser Updates:** The core generation-specific parsers (`parseGen1Save`, `parseGen2Save`, `parseGen3Save`) must be updated to explicitly return their respective specific types (`Gen1SaveData`, `Gen2SaveData`, `Gen3SaveData`) rather than a generic `SaveData`.
- **Downstream Consumer Adjustments:** React components and utility functions that consume `SaveData` will need to implement type guards or use type narrowing (e.g., `if (data.generation === 3)`) to securely access generation-specific properties without relying on non-null assertions or encountering type errors.

## Consequences
- **Positive:** Increased type safety. TypeScript will automatically narrow the type based on `if (saveData.generation === 3)`, allowing safe access to `saveData.gen3FeebasTiles` without optional chaining or non-null assertions.
- **Positive:** Better developer experience and self-documenting code.
- **Negative:** Downstream consumers might need to add type guards or update their props to expect a specific generation type if they were previously relying on the monolithic optional properties.
- **Negative:** The core save parser functions (e.g., `parseGen3Save`) will need to be updated to explicitly return their specific generation types rather than the generic `SaveData`.
