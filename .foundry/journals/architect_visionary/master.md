# Architect Visionary Journal — 2026-10-14

## Critical Learnings & Observations
- **Monolithic State Management & DX Debt**: DexHelper's central Zustand store (`src/store.ts`) grew into a monolithic 485-line file containing domain calculations (wild item hunting inventory scans), cloud sync handlers, and transient UI flags mixed with persistent preferences. Proposing a modular slice decomposition pattern (`SaveSlice`, `SettingsSlice`, `UiSlice`, `HuntingSlice`, `SyncSlice`) along with memoized custom selectors (`useShallow`) addresses performance re-render bottlenecks while preserving isolated unit testability.
- **Foundry Plan Review Formatting Standards**: Plan review tools strictly enforce single, un-nested forward-looking instructions. Sub-bullet points or conversational intent explanations violate the Specificity Rule.

---

# Architect Visionary Journal — 2026-10-19

## Critical Learnings & Observations
- **Multi-Save Matrix Operations vs Performance**: When extending single-save comparison (`saveComparison.ts` / `boxDiff.ts`) to cross-save N-way matrices, computing set intersections across thousands of Pokémon data points (stats, moves, IVs, held items, regional dex flags) can induce main thread jank if executed synchronously inside React render loops. Standardizing matrix generation through web worker offloading or memoized selector pipelines is critical.
- **Cross-Gen Trade Invariants & Time Capsule Rules**: Simulating trade side-effects across generations (e.g., Gen 1 <-> Gen 2 Time Capsule, Gen 3 Pal Park / inter-version trading) requires enforcing strict domain constraints—such as verifying Gen 2 move/species prohibitions when trading back to Gen 1, and checking National Dex unlocked flags before allowing Ruby/Sapphire to FireRed/LeafGreen trades. Incorporating these rules directly into a high-level trade simulator prevents runtime corruptions during save export operations.

---

# Architect Visionary Journal — 2026-10-28

## Critical Learnings & Observations
- **Off-Main-Thread Processing for Save File Operations**: Offloading heavy binary parsing and multi-save matrix comparisons into Web Workers prevents main-thread rendering frame drops and UI jank during save imports and WASM emulator synchronization.
- **Foundry Global Sequence Numbering**: Sequence numbers for new nodes must be calculated by finding the global maximum across all `.foundry/` node directories to avoid sequence collisions.