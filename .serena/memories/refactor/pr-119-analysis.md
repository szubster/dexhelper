Analysis of PR 119 Cleanup:
1. Data migration to numeric IDs is functional but incomplete in the Assistant Engine.
2. 'GEN1_MAP_TO_SLUG' in assistantData.ts is bundled in the client but only used for data generation.
3. SuggestionEngine is recreating slugs at runtime for distance calculation.
4. Gen 2 mapping is missing/placeholder.
Proposed improvements: Move generation helpers out of src, refactor distance logic to use 'aid' (Area ID), and finalize Gen 1 mapping.