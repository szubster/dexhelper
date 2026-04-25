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
# Nurse Learnings

## 2026-04-25 - Fix missing jules_session_id and broken parent link in DAG node

- **What was unsafe**: A DAG node (`.foundry/stories/story-010-015-enforce-strict-oxlint-rules.md`) was missing the mandatory `jules_session_id` field and had an incorrect `parent` reference. This caused the Foundry orchestrator to skip the node and fail to resolve the DAG.
- **How it was fixed**: Added `jules_session_id: null` and corrected the `parent` field to point to an existing epic (`.foundry/epics/epic-010-oxlint-config.md`).
- **What the compiler now catches**: The orchestrator's schema validation now properly validates the node, and the dependency resolver can correctly trace the hierarchy.
