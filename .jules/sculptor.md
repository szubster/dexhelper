# Sculptor Refactoring Journal

## AI-Readable Refactoring: Extracting the Suggestion Engine Generators
The `src/engine/assistant/suggestionEngine.ts` file had grown over 1000 lines, encompassing the data fetching layer, the main orchestrator (`generateSuggestions`), and four distinct sub-generators for Catch, Trade/Gift, Breed, and Evolve suggestions.

### Why this confused AI:
When an LLM attempts to parse or modify suggestion priority logic, the sheer length of the file prevents the AI from fitting the entire context window correctly without truncation. Furthermore, it tightly coupled the high-level decision flow (`generateSuggestions` orchestrating missing Pokedex loops) with the low-level logic (e.g., bitwise checking `checkFlag`, calculating DV shininess, evaluating Gen 2 evolutionary stones).

### How it was refactored:
1. **Extraction Pattern**: Created a `generators/` sub-directory (`catch.ts`, `trade.ts`, `breed.ts`, `evolve.ts`).
2. **Circular Dependency Fix**: Extracted the large shared interface `AssistantApiData` into a separate `types.ts` module to prevent circular dependency warnings between the generators and the main suggestion engine.
3. **Decoupling**: Moved constants (`EVO_ITEM_NAMES`, `POKEAPI_TO_GEN1_ITEM`) and specific helpers (`getGameItemId`, `checkFlag`) strictly alongside their relevant generators instead of sitting broadly in the engine orchestrator.

### Critical Lesson for Future Agents:
When dealing with heavy TypeScript files with heavily coupled types, simply slicing files via regex will almost always fail because of lost, un-exported interface properties (`AssistantApiData`). We must ensure isolated types packages or decouple types prior to extracting pure function logic.
