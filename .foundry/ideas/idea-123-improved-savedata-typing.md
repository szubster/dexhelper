---
id: idea-123-improved-savedata-typing
type: IDEA
title: Improve SaveData Typing with Discriminated Generation Unions
status: PENDING
owner_persona: product_manager
created_at: '2026-07-26'
updated_at: '2026-08-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - savedata
  - typescript
  - refactoring
  - type-safety
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Improve SaveData Typing with Discriminated Generation Unions

## Problem
In the `saveParser` module, the `SaveData` interface is a single monolithic type representing the parsed state across all supported Pokémon generations (Gen 1, Gen 2, and Gen 3). Because these generations have vastly different save structures and feature sets:
1. Properties specific to single generations (e.g., `gen1StaticEncounters`, `daycare`, `gen3BerryPatches`, `mirageIslandValue`, etc.) are typed as optional on the main `SaveData` interface.
2. Code consuming the `SaveData` object must perform extensive manual property existence checks or use optional chaining (`?.`), which is highly error-prone and offers poor compile-time type-safety.
3. There is no type-level guarantee that checking `if (data.generation === 1)` guarantees the availability of Gen 1 fields or prevents access to Gen 3 fields.

## Proposed Solution
We should refactor the `SaveData` type to utilize **Discriminated Unions** based on the `generation` discriminator. This leverages TypeScript’s control flow analysis to narrow down types perfectly.

We propose:
1. **Base Type (`BaseSaveData`)**: Holds properties shared across all save files regardless of generation (e.g., `trainerName`, `trainerId`, `owned`, `seen`, `party`, `pc`, etc.).
2. **Generation-Specific Types**:
   - `Gen1SaveData` (extends `BaseSaveData`): Explicitly sets `generation: 1` and makes Gen 1 specific properties required/present.
   - `Gen2SaveData` (extends `BaseSaveData`): Explicitly sets `generation: 2` and makes Gen 2 specific properties required/present.
   - `Gen3SaveData` (extends `BaseSaveData`): Explicitly sets `generation: 3` and makes Gen 3 specific properties required/present.
3. **The Unified Type**:
   - `type SaveData = Gen1SaveData | Gen2SaveData | Gen3SaveData;`

### Conceptual Code Example
```typescript
export interface BaseSaveData {
  owned: Set<number>;
  seen: Set<number>;
  party: number[];
  pc: number[];
  partyDetails: PokemonInstance[];
  pcDetails: PokemonInstance[];
  gameVersion: GameVersion;
  badges: number;
  trainerName: string;
  trainerId: number;
  currentMapId: number;
  currentMapName?: string;
  inventory: { id: number; quantity: number }[];
  currentBoxCount: number;
  hallOfFameCount: number;
}

export interface Gen1SaveData extends BaseSaveData {
  generation: 1;
  kantoBadges: number;
  gen1StaticEncounters: Record<number, boolean>;
  gen1TMEventFlags: Record<number, boolean>;
  tms: { id: number; moveId: number; isAcquired: boolean; quantity: number }[];
  pcItems: { id: number; quantity: number }[];
  eventFlags: Uint8Array;
  hiddenItemFlags: Uint8Array;
  hiddenCoinFlags: Uint8Array;
  npcTradeFlags: boolean[];
}

export interface Gen2SaveData extends BaseSaveData {
  generation: 2;
  mapGroup: number;
  johtoBadges: number;
  kantoBadges: number;
  daycare?: PokemonInstance[]; // Still optional if empty, but explicitly defined on Gen 2
  daycareHasEgg?: boolean;
  pcItems: { id: number; quantity: number }[];
  roamingLegendaries?: any[];
  eventFlags: Uint8Array;
  hiddenItemFlags: Uint8Array;
  npcTradeFlags: boolean[];
  gen2StaticEncounters: {
    sudowoodo: boolean;
    snorlax: boolean;
    redGyarados: boolean;
    hoOh: boolean;
    lugia: boolean;
  };
}

export interface Gen3SaveData extends BaseSaveData {
  generation: 3;
  secretId: number;
  hiddenItemFlags: Uint8Array;
  mirageIslandValue?: number;
  gen3BerryPatches?: Gen3BerryPatch[];
  gen3SecretBases?: Gen3SecretBase[];
  gen3PokeNews?: Gen3PokeNews[];
  gen3MixRecords?: Gen3MixRecord[];
  gen3ActiveSwarm?: Gen3ActiveSwarm;
  roamingLegendaries?: any[];
  gen3BattleFrontierWinStreaks?: Gen3BattleFrontierWinStreaks;
  gen3BattleFrontierSymbols?: Gen3BattleFrontierSymbols;
  gen3TotalBattlePoints?: number;
  gen3BattlePoints?: number;
  gen3MoveTutors?: Gen3MoveTutors;
  gen3VolcanicAsh?: number;
  gen3TMHMs?: { itemId: number; quantity: number; moveId: number }[];
  gen3TMEventFlags?: Record<string, boolean>;
  gen3NPCTrades?: Record<string, boolean>;
  npcTradeFlags?: boolean[];
  gen3TrickHouse?: any;
  gen3FeebasTiles?: number[];
}

export type SaveData = Gen1SaveData | Gen2SaveData | Gen3SaveData;
```

## Value Proposition
- **Developer Experience (DX)**: Developers can confidently access generation-specific properties when inside a generation check block without any compiler workarounds or manual casting.
- **Robustness**: Prevents accidental generation property mismatch errors (e.g., trying to read `mirageIslandValue` on a Gen 1 save), significantly reducing potential runtime bugs or crashes.
- **Self-Documenting Code**: By looking at the types, anyone can instantly understand exactly what features and fields are present on each generation's save file.

## Acceptance Criteria
- [x] Product Manager: Convert this idea into a PRD to define the expected structure and design.
- [ ] prd-123-122-improved-savedata-typing
- [ ] Architect: Design and draft an ADR (Architecture Decision Record) detailing the typed schema, and map out downstream consumer components that will benefit from this type narrowing.
- [ ] Coder: Refactor the `SaveData` union type in `src/engine/saveParser/parsers/common.ts` and ensure all parser modules (`gen1.ts`, `gen2.ts`, `gen3.ts`) return their respective narrowed types properly.
- [ ] QA: Run all existing parser tests to ensure no regressions occur and verify type-narrowing works seamlessly.
