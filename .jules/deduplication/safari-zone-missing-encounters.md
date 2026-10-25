# Safari Zone Missing Encounter Deduplication

## Learnings
- **Parallel Generation Logic**: `getMissingGen1SafariEncounters` and `getMissingGen3SafariEncounters` implemented identical filtering loops over `SafariArea[]` using `SaveData` properties (`gameVersion`, `owned`, `party`, `pc`).
- **Unification Strategy**: Abstracted the game version lookup into `getSafariAreasForVersion(gameVersion)` while unifying `getMissingSafariEncounters(saveData)` to handle both Gen 1 and Gen 3 seamlessly.
- **Backward Compatibility**: Retained legacy exports (`getMissingGen1SafariEncounters`, `getMissingGen3SafariEncounters`) delegating to the unified function for non-breaking API usage if referenced downstream.
