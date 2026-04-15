# Unified Pokémon Identification Refactor

The application has been unified to use a single `id` field for Pokémon identification, removing the redundant `sid` (Species ID) property and pruning unused `GenericLocation.coords`.

## Changes Summary
- **Schema**: Removed `PokemonMetadata.sid` and `GenericLocation.coords`.
- **Chains**: `CompactChainLink` now uses `id` instead of `sid`.
- **Data**: `pokedata.json` regenerated with the updated schema.
- **Logic**: `DexDataLoader` and `suggestionEngine` updated to use `id` for all lookups and traversals.
- **UI**: `PokedexCard` and `PokemonDetails` updated to align with the unified ID model.

## Impact
- Reduced data payload in `pokedata.json`.
- Simplified traversal logic for evolution chains.
- Consistent property naming across the entire codebase.
