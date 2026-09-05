---
id: adr-154-typescript-generators-and-modern-features
type: ADR
title: Strategic Adoption of TypeScript Generators and Modern TS 7.x Features
status: COMPLETED
owner_persona: architect
created_at: '2026-09-03'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-154-ecosystem-modernization-and-generators
tags:
  - typescript
  - typescript-7
  - generators
  - architecture
  - performance
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# ADR 154: Strategic Adoption of TypeScript Generators and Modern TS 7.x Features

## 1. Context and Problem Statement
The application relies heavily on binary save file parsing (PokeData), game state extraction, and large dataset processing (e.g., box data, history logs). Currently, most parsers eagerly allocate large intermediate arrays (O(N) space complexity), leading to high memory pressure, increased garbage collection overhead, and reduced parsing performance during hot paths.

Simultaneously, the TypeScript ecosystem has advanced significantly with the TS 7.x Go-native toolchain (Project Corsa) and native Node.js Type Stripping. To ensure Dexhelper remains highly performant and maintainable, we need to outline the strategic adoption of generator-based lazy evaluation and other bleeding-edge TypeScript features.

## 2. Decision Drivers
- **Memory Pressure:** Eagerly parsing 3000+ PC Pokemon across multiple boxes consumes significant heap memory unnecessarily when only a subset is displayed.
- **Performance:** Array allocations in hot paths (like scrolling through box views or evaluating assistant suggestions) cause latency spikes.
- **Toolchain Modernization:** Leveraging Node.js native type-stripping and TS 7.x tooling speeds up the build pipeline and simplifies runtime execution.

## 3. Considered Options
1. **Maintain Status Quo:** Continue using eager arrays (`.map()`, `.filter()`).
2. **Custom Iterator Objects:** Build custom iterator protocols without language-level generator syntax.
3. **Native TypeScript Generators & Explicit Resource Management:** Adopt `function*`, `async function*`, and `using` declarations for lazy evaluation and automatic cleanup.

## 4. Decision Outcome
Chosen Option: **Native TypeScript Generators & Explicit Resource Management**

We will aggressively adopt TypeScript generator functions (`function*` and `async function*`) for all sequential data processing, save file parsing, binary chunk streams, tree traversals, and pagination engines.

### 4.1 Guidelines for Adoption
1. **Lazy Evaluation:** Replace eager array allocations (e.g., `const allPokemon = parsePCBuffer()` returning `PokemonInstance[]`) with generators (e.g., `function* iteratePCBuffer()` yielding `PokemonInstance`).
2. **Pipelines:** Use iterator helpers or native stream pipelines for mapping and filtering without intermediate arrays.
3. **Explicit Resource Management:** Use the `using` keyword (and `Symbol.dispose` / `Symbol.asyncDispose`) for deterministic cleanup of WASM memory blocks, file descriptors, and temporary buffers.
4. **Type Stripping Compatibility:** Ensure all save parser code is compatible with Node.js native type stripping. Avoid using TypeScript enums or namespaces in runtime-critical parser paths; prefer union types, `const` objects, and type aliases to allow pure erasure without runtime transformations.

## 5. Consequences
- **Positive:** Massive reduction in peak memory usage and garbage collection pauses during large save file loads.
- **Positive:** Improved DX via standardized, deterministic cleanup of WASM and file handles.
- **Negative:** Increased complexity in consumer code that previously expected complete arrays; they must now explicitly consume the iterator (e.g., using `for...of` or `Array.from()`) if the entire dataset is genuinely needed at once.

## 6. Implementation Strategy
- **Phase 1:** Audit and update PokeData definitions to ensure strict type stripping compatibility (avoiding TS-specific runtime constructs).
- **Phase 2:** Refactor the core Gen 3 and Gen 2 parsers (e.g., PC Box parsing, Roamer extraction) to yield items via `function*`.
- **Phase 3:** Update UI consumers (TanStack Query integrations) to handle generator outputs via lazy rendering or batched array construction.
