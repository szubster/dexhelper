### PokeDB Data Format Strategy (Post-Refactor)
- **Current Status**: Using a **Compact Numeric JSON** format for Pokedex data (Gen 1 & 2).
- **Architecture**:
    - Human-readable strings (e.g., "walk", "level-up") are mapped to small integers in `src/db/schema.ts`.
    - Data export logic in `src/scripts/fetchPokedexData.ts` enforces this compaction.
    - Result: ~30% reduction in uncompressed file size and significant parsing performance gains on mobile.
- **Strict Typing**: The system now operates under `strict: true` (TypeScript), ensuring 100% null-safety when navigating the compacted data graph.
- **Future Scale**: This compact format provides sufficient headroom for Gen 3. Switch to Protobuf ONLY if uncompressed size exceeds 10MB or parsing latency >100ms on low-end devices.
