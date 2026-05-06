## $(date +%Y-%m-%d) - Typed `CATEGORY_STYLES` with `SuggestionCategory`
**Learning:** `Object.entries()` returns keys as `string`, which requires an explicit `as Type` cast when the original object uses a strict union or enum for its keys. Furthermore, when using `.reduce` to build an object with strict string literal keys, use `Partial<Record<TargetKey, ValueType>>` for the initial accumulator so it can start as an empty object (`{}`) without failing type-checks, as opposed to forcing it with `as Record<TargetKey, ValueType>`.
**Action:** Use `Partial` instead of raw `Record` types when starting with empty objects in `.reduce()` functions if not all keys are guaranteed to be populated at start. Remember to cast keys yielded by `Object.entries()` if they need to map back to strict unions, or use `.reduce` instead with typed iterables.
## 2025-02-15 - Unsafe casts in DataLoader

**What was unsafe:**
`as Promise<LocationAreaEncounters>` cast in the `DataLoader` batch function hid the `undefined` return type from `pokeDB.getEncounters`. This caused `DataLoader` to return `undefined` instead of `LocationAreaEncounters` or rejecting the promise for missing values.

**How it was fixed:**
Removed the cast, awaited the result, and mapped `undefined` results to an `Error` object as required by `DataLoader` for missing items.

**What the compiler now catches:**
The compiler ensures that DataLoader batch functions return valid values or Errors, preventing unexpected `undefined` results downstream.
## 2026-04-19 - Nurse: Remove redundant cast in gen2 save parser
**Learning:** When a variable matches the return type exactly or correctly infers it, redundant `as Type` casts should be removed as they circumvent type narrowing and can hide true typing misalignments in future refactors.
**Action:** Replaced unsafe cast with strict explicit variable typing.
## 2026-04-21 - Nurse: Explicitly typing variables removes need for type casting
**Learning:** Sometimes the compiler loses track of a type after a reassignment if the variable wasn't explicitly typed. By explicitly typing `let variableName: TypeName`, we eliminate the need for downstream `as TypeName` assertions, making the code safer and more readable.
**Action:** Replaced unsafe cast in `gen2.ts` by explicitly typing the `gameVersion` variable instead.
- Replaced unsafe `{} as Partial<Record<...>>` with `reduce<Partial<Record<...>>>({}, ...)` to ensure the accumulator is strictly type-checked and properly tracks optional keys instead of forcing an unsafe cast in `AssistantPanel.tsx`.

## 2025-04-23

- **Type narrow arrays in `.reduce` calls directly:** Rather than explicitly typing function parameters and applying an `as` cast on the starting object (`{} as Record<...>`), it is safer and cleaner to provide the generic parameter directly to the reduce function `.reduce<Record<...>>((acc, val) => ... , {})`. This eliminates an unnecessary `as` cast and allows TypeScript to properly catch incorrect shape returns without bypassing type safety.
- **Type narrow via control flow instead of casting:** For variables with loose types (like `string | ArrayBuffer | null` from `FileReader.result`), apply a runtime type guard (e.g., `instanceof ArrayBuffer`) that throws an error or exits early if the condition isn't met. This allows TypeScript to native infer the correct type in subsequent lines and completely eliminates the need for an unsafe `as` cast while providing true runtime safety.
## Replacing Inline Type Casts with `as const` Derived Unions
* **Issue:** When dealing with sets of valid literal string values (e.g., `['secured', 'missing', 'dex-only']`), components often use inline `as Type[]` assertions when iterating, and the union type itself is defined separately (`type FilterType = 'secured' | 'missing' | 'dex-only'`). This causes a disconnect where the array values can drift from the type definition, bypassing compiler checks.
* **Solution:** Create an immutable array `export const FILTER_TYPES = [...] as const;` and derive the union type from it: `export type FilterType = (typeof FILTER_TYPES)[number];`.
* **Learning:** This pattern completely eliminates the need for unsafe `as` casts in the consuming components (e.g., `FILTER_TYPES.map(...)` instead of `(['...'] as FilterType[]).map(...)`), guarantees that the type and the runtime array are always in perfect sync, and successfully compiles under strict mode while maintaining the identical runtime behavior.
## $(date +%Y-%m-%d) - Nurse: Replaced inline string unions and array casting with `as const` derived array and type

**What was unsafe:**
The `StatusType` was defined as a string union `type StatusType = 'none' | 'sleep_freeze' | 'paralyze_burn_poison';`. Inside the component, an inline array of options mapped these values to labels, using `as StatusType` casts to avoid type errors since TypeScript infers string literal properties in arrays as generic `string`.

**How it was fixed:**
Extracted the inline array into a constant `STATUS_OPTIONS` marked with `as const` to freeze the literal types. Then, replaced the explicit string union for `StatusType` with a derived type: `type StatusType = (typeof STATUS_OPTIONS)[number]['id'];`.

**What the compiler now catches:**
The compiler statically guarantees that the `StatusType` union and the `STATUS_OPTIONS` array are always in sync. It eliminates the unsafe `as StatusType` casts while maintaining identical runtime behavior.
- Fixed an unsafe `as IDBValidKey` cast in `src/db/PokeDB.ts`'s `bulkGet` by assigning to a variable and checking for `undefined` before passing to `store.get`.
