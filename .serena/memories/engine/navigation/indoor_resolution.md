# Indoor Map Resolution for Navigation

To provide relevant suggestions and clean navigation summaries, the system resolves specific indoor maps to their parent outdoor areas.

## Logic Overview
The `gen1Strategy` implementation in `resolveMapSlug` handles this mapping.

### Hierarchy Resolution
1.  **Direct Mapping**: A map ID is checked against `INDOOR_TO_PARENT_MAP`.
2.  **Parenting**: Iffound, the `mapId` is replaced with the parent ID (e.g., floors of Silph Co. or specific houses resolve to the main city).
3.  **Slugification**: The final `mapId` is converted to a slug (e.g., `pallet-town-area`) via `GEN1_MAPS`.

## Benefits
- **Relevant Suggestions**: Instead of suggesting to "Capture Rattata" while inside a building, the assistant understands the player is effectively in the surrounding route/city context.
- **Distance Calculation**: Using `getDistanceToMap` with parented IDs allows the map graph to calculate realistic travel times even from deep inside a building.
