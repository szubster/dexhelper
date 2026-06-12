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
- Replaced an unsafe `as` cast in `src/components/SyncProgress.tsx` with a runtime type guard `isSyncProgressDetail`. This ensures both type safety and runtime safety when handling custom events, specifically verifying the presence and types of `current`, `total`, and `stage` in the event detail.

## 2024-05-19: Unsafe Record casts for Imported JSON objects
*   **Issue:** Directly importing JSON modules (e.g., `landmarks.json`) and casting them via `as Record<string, string>` breaks type safety and can cause `any` type propagation or `never` evaluation issues when combined with narrowing operators like `in` later in the control flow. If a variable is narrowed using `mapGroupDict && mapIdStr in mapGroupDict ? ...`, trying to use `as keyof typeof mapGroupDict` evaluates to `never` because the initial declaration inferred `| undefined` from a ternary assignment.
*   **Resolution:** Remove the `as Record<...>` or inline explicit castings for imported JSON objects. Instead, rely on standard property access or safe type narrowing. If a variable might be `undefined`, explicitly handle the truthy condition before indexing with literal types, or use safe type assertions like `(mapGroupDict as Record<string, string>)[mapIdStr]` ONLY inside a block where `mapGroupDict` is proven to exist, rather than fighting `keyof typeof` on union types.

## 2024-05-18
- **Tricky type narrowing pattern**: When refactoring `unknown` payloads (like event details) to remove unsafe `as Record<string, unknown>` assertions under `@tsconfig/strictest`, avoid replacing the broad cast with multiple narrower inline casts (e.g. `typeof (detail as { current: unknown }).current === 'number'`). Code reviewers will correctly reject this as it merely multiplies the number of casts.
- **Solution**: Modern TypeScript correctly narrows object types when using the `in` operator. You can safely write:
  ```typescript
  if ('current' in detail && typeof detail.current === 'number')
  ```
  This cleanly resolves strict index-signature property access errors without needing any `as` casts or `// biome-ignore` overrides, keeping the type guard both safe and readable.
- Use a generic `objectEntries` or `objectKeys` utility wrapper rather than inline `as` casts when iterating over objects with string literal union keys (e.g. `Record<UnionType, ValueType>`). TypeScript's standard `Object.entries` widens string literal types to `string` in keys, leading to unsafe casts back to the union type, which can be cleanly avoided with a simple generic typed utility.
- When using React Flow (`@xyflow/react`), custom node data types provided to the `FlowNode<T>` generic must explicitly extend or intersect with `Record<string, unknown>` to satisfy TypeScript constraints.
- GitHub CI enforces a strict 80% patch coverage target via Codecov. When modifying files (even for purely type-safety or refactoring purposes), ensure all logical branches (such as switch cases) in the modified code are covered by tests to prevent CI pipeline failures.
- When testing React Flow (`@xyflow/react`) interactions in Vitest browser mode, clicking the background pane requires targeting the `.react-flow__pane` element specifically, as generic background clicks may not register correctly.
- To view Vitest coverage summaries directly in the terminal (especially in CI environments where coverage files might not be readily accessible), use the `text` or `text-summary` reporter (e.g., `npx vitest run --coverage.reporter=text-summary`).
- When testing React Flow (`@xyflow/react`) interactions in Vitest browser mode, clicking the background pane requires targeting the `.react-flow__pane` element specifically. Furthermore, use native DOM events like `dispatchEvent(new MouseEvent('click', { bubbles: true }))` rather than `.click()` on the pane element to ensure events register reliably in test environments.

## 2025-05-20 - Type Narrowing `ArrayBuffer`

- **Context:** The `parseSaveFile` function was typed to only accept `ArrayBuffer`, forcing the caller to explicitly cast `buffer.buffer as ArrayBuffer` since IndexedDB fetches return `Uint8Array` whose `.buffer` property resolves to `ArrayBufferLike`.
- **Learning:** When accepting binary buffers that will be parsed via `DataView`, type the parameter as `ArrayBufferLike` rather than strictly `ArrayBuffer`. `DataView` inherently supports `ArrayBufferLike` (which encompasses `ArrayBuffer`, `SharedArrayBuffer`, etc.), preventing the need for explicit type overrides at the call site.
## $(date +%Y-%m-%d) - Type-Safety: Derived Type Parameters over Explicit Casts
**Learning:** Hardcoding string primitives inside interfaces (e.g., `id: string` for a `VersionInfo` interface) forces all downstream consumers—like mapping loops or click handlers—to unsafely cast variables (`v.id as GameVersion`) back to their strict domain types to fulfill function signatures.
**Action:** When a domain property should strictly align with an internal type like `GameVersion`, the root interface or data array should be strictly typed (e.g., `id: GameVersion` or `const versions: { id: GameVersion | 'unknown', label: string }[]`). This naturally propagates the type-safety downstream and cleanly eliminates all implicit `as` overrides.
Unnecessary 'as' casts were found where TypeScript already inferred the type correctly from the mapped array prop. Always rely on TS inference before defaulting to a cast.

## $(date +%Y-%m-%d) - Type-Safety: `as keyof typeof` for JSON imports
**Learning:** When resolving unsafe `as keyof typeof JSON_DICT` casts on imported JSON objects, do not upcast the entire object to `Record<string, string>` via assertion (e.g., `(MyJson as Record<string, string>)[key]`). This merely swaps one cast for another and degrades type safety by allowing any string key. Instead, introduce a strict custom type guard function (e.g., `function isValidKey(id: string): id is keyof typeof MyJson { return id in MyJson; }`) to organically narrow the type and satisfy the compiler.
**Action:** When adding these utility type guards to a file, ensure they are placed after the `import` statements at the top of the file to adhere to standard ES module formatting conventions, rather than blindly prepending them to the file which can trigger stylistic linting failures.
## 2024-05-21 - Type-Safety: File System Access API
**Learning:** When using the File System Access API (`window.showOpenFilePicker`, `handle.queryPermission`, etc.), avoid bypassing type checks with `(window as any)`. Instead, add the community definitions like `@types/wicg-file-system-access` to `devDependencies` and explicitly include them in the `types` array of `tsconfig.json`. This allows the TypeScript compiler to natively check options and return types.
**Action:** Replaced unsafe `as any` casts with correct File System Access API types via `@types/wicg-file-system-access`.
## $(date +%Y-%m-%d) - Type-Safety: Narrowed primitive types down to strict literal unions
**Learning:** Functions accepting `string` types for variables that are naturally constrained (like Game Versions) lead to unnecessary defensive casts `(val as GameVersion)` within components. Instead of allowing `string` and type-casting, use precise union types (e.g. `GameVersion | 'unknown'`) that fully eliminate the need for `as` and allow the compiler to enforce correctness statically.
**Action:** When working with types that map to fixed sets of allowed states, tighten the interfaces from primitives like `string` to explicit unions, which automatically removes the need for downstream `as` casts while enabling proper discriminated typing.

## $(date +%Y-%m-%d) - Type-Safety: `as keyof typeof` for mapped arrays
**Learning:** Hardcoding string arrays as objects mapped over by keys, and then utilizing `gameVersion as keyof (typeof staticEncounters)[number]` forces an implicit `any` bypass when trying to reference those values elsewhere in components.
**Action:** Replace `as keyof typeof` casts that attempt to enforce string literals within mapped type arrays with strict type guard functions. By checking `includes` or equivalent logic within an `isValidKey` function and declaring `version is keyof (typeof Array)[number]`, we can natively narrow string literals and remove unsafe casts safely and correctly.
## $(date +%Y-%m-%d) - Type-Safety: `as` casts in component callbacks
**Learning:** React generic UI components (like `TacticalSegmentedControl`) are sometimes written without the generic argument populated at the call site, which forces downstream callbacks like `onValueChange` to fallback to wider types or unions like `string | number`. Developers then hack around this by wrapping the setter in an inline arrow function that forcibly `as` casts the argument (`(val) => setGlobalPokeball(val as PokeballType)`).
**Action:** When using generic React components like `TacticalSegmentedControl`, explicitly pass generic type arguments (e.g., `<TacticalSegmentedControl<PokeballType>>`) to leverage TypeScript inference. This automatically types the internal `val` inside `onValueChange`, allowing you to completely eliminate the inline cast and simplify the callback to just `onValueChange={setGlobalPokeball}`.
## $(date +%Y-%m-%d) - Type-Safety: `as` casts in mapped array reduce functions
**Learning:** When using `reduce` with typed objects containing inner arrays (like `encounterInfo?.[pid]`), forcing an `as` cast on index zero (`encs[0] as EncounterDetail`) bypasses standard TS `undefined` checks. In strict mode with `noUncheckedIndexedAccess`, indexed access can return `undefined`.
**Action:** Remove explicit `as EncounterDetail` casts on array index lookups within array reduction and iteration. Simply retrieve the value `const enc = encs[i]` and add a natural nullish guard `if (enc)` before accessing its properties. This naturally satisfies the TypeScript compiler without explicitly overriding types with `as`.
To avoid unsafe `as` casts in callbacks for generic UI components like `TacticalMultiSelectControl` and `TacticalSegmentedControl`, ensure the generic type parameter is explicitly provided in the JSX tag (e.g., `<TacticalMultiSelectControl<FilterType>>`).

## $(date +%Y-%m-%d) - Type-Safety: `Object.entries` widens strict Record keys to `string`
**Learning:** When changing an object type from `Record<string, unknown>` to a strict mapped type like `Record<SuggestionCategory, number>`, methods like `Object.entries()` will still widen the resulting keys in loops or callbacks to `string`. Accessing the mapping again with these string keys causes TS7053 errors (`Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Record<SuggestionCategory, number>'`).
**Action:** When mapping over strictly typed objects where `Object.entries` widens keys to `string`, you must either use type guards, correctly type the reducer/iterator parameters, or cleanly cast the accessing key (e.g., `key as keyof typeof Map`) to satisfy strict indexing constraints without breaking the TypeScript build.
## $(date +%Y-%m-%d) - Type-Safety: `as keyof typeof` for static objects
**Learning:** When sorting or reducing over Object keys/entries that are inferred as `string`, using `[a as keyof typeof MY_OBJ]` bypasses TypeScript's strict mode checks.
**Action:** Replace `as keyof typeof` casts by implementing a strict type guard function, e.g., `function isValidKey(k: string): k is KeyType { return k in MY_OBJ; }`. Using this type guard inside loops or `sort` functions safely narrows the string to the correct key type without needing `as`.
