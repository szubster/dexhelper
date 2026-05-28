# Sculptor Journal

- **Lesson**: Extracting massive monolithic loops into single-purpose functions grouped by feature domain greatly reduces cognitive load. In `suggestionEngine.ts`, extracting catch, breed, evolve, and trade/gift logic into a `generators/` directory made the core orchestration function much simpler to read.
- **Constraint**: When moving functions that rely on module-level constants or interfaces (like `STATIC_GIFT_DATA` or `AssistantApiData`), these dependencies must either be exported from their origin or refactored into shared types modules to avoid circular dependencies.
- **Pattern**: When using sets/maps for O(1) lookups during data processing (e.g. `instancesBySpecies`), pass them by reference into the sub-generators so the generator functions can directly evaluate conditions rather than re-computing arrays.
