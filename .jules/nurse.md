# Learnings

When resolving TypeScript type errors assigning `Uint8Array` to a `fetch` `body` (`BodyInit`), avoid using `as any` by explicitly typing the variable as `Uint8Array<ArrayBuffer>` instead of the wider default `Uint8Array<ArrayBufferLike>`, as `SharedArrayBuffer` is incompatible.

## [2024-05-18] - Accepted - Nurse: Type-safety improvement for LotteryPokemon

**Type:** Type Narrowing / Interface Tightening
**Outcome:** Successfully replaced the weak structural type `LotteryPokemon` with the core domain `PokemonInstance` type.
**Why:** The Gen 3 lottery matching logic used a narrow, structural interface `{ otId: number }` which forced the test file to use unsafe `as any` and `as unknown` casts to mock the array. This bypassed the TypeScript compiler's checks for the other required fields in a true Pokemon instance. Replacing this with `PokemonInstance` unified the types and allowed removing the unsafe casts.
**Pattern:** When functions expect a subset of a domain object, but callers must use the full domain object, strongly prefer typing the parameter as the full domain object (or `Partial<DomainObject>`) rather than a bespoke structural interface if it leads to unsafe casts at the call site.
