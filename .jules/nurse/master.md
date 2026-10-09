# Nurse Joy's Learnings

When resolving TypeScript type errors assigning `Uint8Array` to a `fetch` `body` (`BodyInit`), avoid using `as any` by explicitly typing the variable as `Uint8Array<ArrayBuffer>` instead of the wider default `Uint8Array<ArrayBufferLike>`, as `SharedArrayBuffer` is incompatible.

---

---

## [2024-05-18] - Accepted - Nurse: Type-safety improvement for LotteryPokemon

**Type:** Type Narrowing / Interface Tightening
**Outcome:** Successfully replaced the weak structural type `LotteryPokemon` with the core domain `PokemonInstance` type.
**Why:** The Gen 3 lottery matching logic used a narrow, structural interface `{ otId: number }` which forced the test file to use unsafe `as any` and `as unknown` casts to mock the array. This bypassed the TypeScript compiler's checks for the other required fields in a true Pokemon instance. Replacing this with `PokemonInstance` unified the types and allowed removing the unsafe casts.
**Pattern:** When functions expect a subset of a domain object, but callers must use the full domain object, strongly prefer typing the parameter as the full domain object (or `Partial<DomainObject>`) rather than a bespoke structural interface if it leads to unsafe casts at the call site.

Removed unnecessary 'as SuggestionCategory' cast in src/components/AssistantPanel.tsx by replacing objectEntries with objectKeys.

---

# Session Details
- **Issue:** Removed unsafe `as PokemonInstance[]` cast and duck-typing in `breedGenerator.ts`.
- **Solution:** Created explicit `isGen2Save` and `isGen3Save` discriminated union type guards for `SaveData` in `common.ts` to cleanly assert the generation of a save file. Used `isGen2Save` in `breedGenerator.ts` to access `gen2Data.daycare` safely.
- **Learn:** Discriminated union type guards (using custom `isType(obj): obj is Type`) are significantly cleaner and safer than scattering `in` operator checks and `as Type` casts in hot paths like generator loops.

---

## Aggregated from 2026-08-08-01-02-39.md

---

# Nurse Session

---

## Target
Strong typing of `metadata` inside `SaveHistoryDB` from `Record<string, unknown>` to `SaveMetadata`.

---

## What I learned
When working with IndexedDB and `idb` types, you can type the `value` of an object store with an interface like `SaveMetadata` where known properties are explicit (`playthroughId: string`, `timestamp: number`) and a catch-all signature like `[key: string]: unknown` can be used. This avoids needing `as` type casts when extracting the known properties later on.

---

## Why it's critical
It tightens type safety for data loaded from IndexedDB, a common source of implicit `any` and `as` casts in front-end codebases.

---

# Session Details
- **Issue:** Removed unsafe `as Gen3SaveData & { gen3LotteryNumber?: number }` cast in `src/contexts/LotteryContext.tsx`.
- **Solution:** Added `gen3LotteryNumber?: number;` directly to the `Gen3SaveData` interface in `src/engine/saveParser/parsers/common.ts`. Then replaced the manual type coercion with the explicit `isGen3Save()` type guard in `LotteryContext.tsx`.
- **Learn:** When a downstream component requires accessing optional dynamic properties (like extracted lottery numbers) that logically belong to a specific save generation, it is safer to define those optional properties directly on the generation's base interface (`Gen3SaveData`) and use standard discriminated union type guards (`isGen3Save`) rather than relying on on-the-fly intersection types and `as` casts.

---

# Nurse Joy Journal

- **TypeScript strict null checks and `indexOf`**: When replacing `as string` casts (which implicitly handle `undefined` since `indexOf(undefined)` returns `-1`) with null coalescing (`??`), be very careful about `?? ''`. `String.prototype.indexOf('')` returns `0`, not `-1`. This can bypass validation logic that explicitly checks for `-1`. It's much safer to use a runtime type check like `typeof char !== 'string'` and `throw` explicitly, rather than trying to fall back to an empty string.

---

# Nurse Joy Journal

## [2026-09-28] - Accepted - Nurse: Type-safety improvement for usePokerusSpreadPlanner

**Type:** Unnecessary Cast Elimination / Type Narrowing
**Outcome:** Replaced unnecessary `as PokemonInstance | null` casts in `usePokerusSpreadPlanner` with clean nullish coalescing (`?? null`).
**Why:** Reading indexed array values under strict TypeScript configurations yields `T | null | undefined`. Using `as` assertions was an unsafe bypass of the compiler. Adding `?? null` cleanly narrows the expression to `PokemonInstance | null` without resorting to type casting.
**Learn:** Array element access in strict TypeScript modes evaluates with optional `undefined`. Using `array[index] ?? null` is the canonical, safe type narrowing pattern for `(T | null)[]` state arrays.


---

# Nurse Joy Journal Entry

- **Issue:** Unsafe `as string` type assertion in `src/engine/saveParser/gen3/storage/parser.ts` when extracting PC box index (`pokemon.storageLocation.split(' ')[1] as string`).
- **Solution:** Replaced `as string` cast with array destructuring (`const [, boxNumStr] = pokemon.storageLocation.split(' ');`) and an explicit string guard check (`if (!boxNumStr) continue;`).
- **Learn:** When parsing structured string descriptions like `"Box N"` in domain models, favor array destructuring combined with guard checks (`if (!val) continue;`) over direct array indexing with `as string` casts. This improves type safety and prevents potential `NaN` calculations or runtime errors if the input string format changes.

---

# Nurse Joy Journal

## [2026-10-02] - Accepted - Nurse: Type-safety improvement for BugCatchingContestData extraction

**Type:** Type Narrowing / Parameter Union Expansion
**Outcome:** Updated `extractBugCatchingContestData` parameter type from `ArrayBuffer` to `DataView | ArrayBuffer`, and refactored `parseGen2` to evaluate the extractor once.
**Why:** `DataView.prototype.buffer` is typed as `ArrayBufferLike` (`ArrayBuffer | SharedArrayBuffer`), forcing callers like `parseGen2` to use `as ArrayBuffer` casts. Furthermore, `parseGen2` evaluated `extractBugCatchingContestData` twice in a conditional spread object, requiring an unsafe `as BugCatchingContestData` cast.
**Learn:** When an extraction utility takes binary save data, typing its parameter as `DataView | ArrayBuffer` allows direct passage of `DataView` instances without casting `view.buffer`. Evaluating the optional result once into a local variable (`const contestData = extract(...)`) allows TypeScript's conditional object spread (`...(contestData ? { contestData } : {})`) to naturally narrow `contestData` to its truthy type without `as` assertions.

---

# Nurse Joy Journal Entry

- **Issue:** Unsafe `color as PokeblockColor` type assertion in `src/engine/saveParser/gen3/pokeblock/parser.ts`.
- **Solution:** Created an explicit `isPokeblockColor(color: number): color is PokeblockColor` type guard in `src/engine/saveParser/gen3/pokeblock/types.ts` that checks if `color` is an integer in the range `1..14` (Red to Gold), filtering out `0` (None) and out-of-range values. Replaced the `as PokeblockColor` cast in `parseGen3Pokeblocks` with the type guard.
- **Learn:** Raw byte data read from binary structures like `DataView.getUint8()` should be narrowed using integer-range type guards (`Number.isInteger(val) && val >= Min && val <= Max`) instead of `as Enum` casts to ensure compile-time and runtime safety against corrupted or unexpected save data.

---

# Nurse Joy Journal Entry

- **Issue:** Unnecessary `as` type assertions when indexing arrays/objects under TypeScript strict mode (`noUncheckedIndexedAccess: true`), specifically `NATURES[index] as Nature` in `nature.ts`, `TYPES[typeIndex] as string` in `parsers/gen3.ts`, and `(gen2MapLocations as Record<...>)` in `translator.ts`.
- **Solution:**
  1. Replaced `NATURES[index] as Nature` with `NATURES[index] ?? 'hardy'`, safely eliminating the assertion while preserving runtime behavior.
  2. Marked `TYPES` as `as const` and replaced `TYPES[typeIndex] as string` with `TYPES[typeIndex] ?? 'Dark'`, tightening the return type to the string literal union of move types.
  3. Replaced inline `as Record<...>` cast with a typed constant declaration `const locations: Record<string, Record<string, string>> = gen2MapLocations;`.
- **Learn:** When strict `noUncheckedIndexedAccess` is enabled, array and object indexing evaluates to `T | undefined`. Rather than bypassing compiler checks with `as T` or `as string` assertions, use nullish coalescing (`array[index] ?? fallback`) or typed module bindings (`const obj: Record<...> = importedJson`) to achieve safe narrowing without casting.