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
