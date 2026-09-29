# Nurse Joy Journal

## [2026-09-28] - Accepted - Nurse: Type-safety improvement for usePokerusSpreadPlanner

**Type:** Unnecessary Cast Elimination / Type Narrowing
**Outcome:** Replaced unnecessary `as PokemonInstance | null` casts in `usePokerusSpreadPlanner` with clean nullish coalescing (`?? null`).
**Why:** Reading indexed array values under strict TypeScript configurations yields `T | null | undefined`. Using `as` assertions was an unsafe bypass of the compiler. Adding `?? null` cleanly narrows the expression to `PokemonInstance | null` without resorting to type casting.
**Learn:** Array element access in strict TypeScript modes evaluates with optional `undefined`. Using `array[index] ?? null` is the canonical, safe type narrowing pattern for `(T | null)[]` state arrays.
