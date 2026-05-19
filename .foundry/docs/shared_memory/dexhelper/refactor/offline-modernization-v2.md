Refactoring DexHelper to be purely local-first.
Goal: Remove all dependencies on the PokeAPI REST service and the 'pokeapi.ts' shim layer to reduce 'bloat'.
Implementation:
- UI components (e.g., PokemonDetails.tsx) call DexDataLoader and PokeDB directly.
- Use internal 'Compact' schema (schema.ts) for all data objects.
- Map numeric IDs (versions, methods, triggers) to strings using constants in schema.ts.
- Optimized pokedata.json generation script.
- Offline-first verification via PWA logic.