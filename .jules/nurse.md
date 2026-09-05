# Nurse Joy's Learnings

When resolving TypeScript type errors assigning `Uint8Array` to a `fetch` `body` (`BodyInit`), avoid using `as any` by explicitly typing the variable as `Uint8Array<ArrayBuffer>` instead of the wider default `Uint8Array<ArrayBufferLike>`, as `SharedArrayBuffer` is incompatible.

## [2024-05-18] - Accepted - Nurse: Type-safety improvement for LotteryPokemon

**Type:** Type Narrowing / Interface Tightening
**Outcome:** Successfully replaced the weak structural type `LotteryPokemon` with the core domain `PokemonInstance` type.
**Why:** The Gen 3 lottery matching logic used a narrow, structural interface `{ otId: number }` which forced the test file to use unsafe `as any` and `as unknown` casts to mock the array. This bypassed the TypeScript compiler's checks for the other required fields in a true Pokemon instance. Replacing this with `PokemonInstance` unified the types and allowed removing the unsafe casts.
**Pattern:** When functions expect a subset of a domain object, but callers must use the full domain object, strongly prefer typing the parameter as the full domain object (or `Partial<DomainObject>`) rather than a bespoke structural interface if it leads to unsafe casts at the call site.


Removed unnecessary 'as SuggestionCategory' cast in src/components/AssistantPanel.tsx by replacing objectEntries with objectKeys.


# Session Details
- **Issue:** Removed unsafe `as PokemonInstance[]` cast and duck-typing in `breedGenerator.ts`.
- **Solution:** Created explicit `isGen2Save` and `isGen3Save` discriminated union type guards for `SaveData` in `common.ts` to cleanly assert the generation of a save file. Used `isGen2Save` in `breedGenerator.ts` to access `gen2Data.daycare` safely.
- **Learn:** Discriminated union type guards (using custom `isType(obj): obj is Type`) are significantly cleaner and safer than scattering `in` operator checks and `as Type` casts in hot paths like generator loops.


---

## Aggregated from 2026-08-08-01-02-39.md

# Nurse Session

## Target
Strong typing of `metadata` inside `SaveHistoryDB` from `Record<string, unknown>` to `SaveMetadata`.

## What I learned
When working with IndexedDB and `idb` types, you can type the `value` of an object store with an interface like `SaveMetadata` where known properties are explicit (`playthroughId: string`, `timestamp: number`) and a catch-all signature like `[key: string]: unknown` can be used. This avoids needing `as` type casts when extracting the known properties later on.

## Why it's critical
It tightens type safety for data loaded from IndexedDB, a common source of implicit `any` and `as` casts in front-end codebases.

# Session Details
- **Issue:** Removed unsafe `as Gen3SaveData & { gen3LotteryNumber?: number }` cast in `src/contexts/LotteryContext.tsx`.
- **Solution:** Added `gen3LotteryNumber?: number;` directly to the `Gen3SaveData` interface in `src/engine/saveParser/parsers/common.ts`. Then replaced the manual type coercion with the explicit `isGen3Save()` type guard in `LotteryContext.tsx`.
- **Learn:** When a downstream component requires accessing optional dynamic properties (like extracted lottery numbers) that logically belong to a specific save generation, it is safer to define those optional properties directly on the generation's base interface (`Gen3SaveData`) and use standard discriminated union type guards (`isGen3Save`) rather than relying on on-the-fly intersection types and `as` casts.
