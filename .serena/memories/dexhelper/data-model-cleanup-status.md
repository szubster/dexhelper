### Lean Data Model Cleanup

- **Unused Fields Removed**:
    - `PokemonMetadata.stats` (and related DV logic) - Removed during previous tasks.
    - `PokemonMetadata.types` - Removed during previous tasks.
    - `GenericLocation.coords` - Removed on 2026-04-15. Confirmed unused in both generation script and runtime.

- **Objective**: Maintain a slim data model by proactively removing fields that were either deprecated or never implemented.
