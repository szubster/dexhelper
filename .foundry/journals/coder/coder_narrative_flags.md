# Coder Journal: Gen 1 Narrative Flags

Implemented Gen 1 narrative progression flags extraction by updating the `SaveData` schema to use discriminated unions for `gen1NarrativeFlags` and extracting the flags in the `parseGen1Save` function. Created `GEN1_BOSS_EVENT_FLAGS` to map boss events to memory flag locations and wrote `getUpcomingGen1Boss` to determine the next boss the player needs to fight. Added unit tests for these components.
