# Assistant Engine Architecture

The `assistant` module is the core recommendation engine of the application. It aggregates data from the player's save file, Pokédex completion status, and geographic location to generate context-aware suggestions for catching, evolving, trading, or breeding Pokémon.

## Architecture & Data Flow

Because the recommendation engine needs to evaluate hundreds of potential encounters, evolution paths, and location distances simultaneously, it is designed with a strict **2-Phase Execution Model** to prevent the UI from freezing.

### 1. Asynchronous Data Gathering Phase (`fetchAssistantApiData`)
Before any logic runs, the engine performs bulk data fetching from the local IndexedDB. It gathers:
- All static map locations and encounter rates.
- Pokémon metadata, evolution chains, and base stats.
- Relevant event flags and badges from the parsed save data.
By pooling all required data into a single memory object upfront, we avoid `N+1` asynchronous queries during the generation loop.

### 2. Synchronous Generation Phase (`generateSuggestions`)
With all data loaded into memory, the core algorithm runs purely synchronously.
- It uses `O(1)` lookups (e.g., via Maps and Sets) instead of expensive `Array.find` calls.
- It iterates over the target missing Pokémon and assigns priority scores to different actions (e.g., catching locally, evolving a pre-evolution, triggering an NPC trade).
- The resulting suggestions are ordered by priority descending, prioritizing immediate, actionable steps over those requiring significant travel or prerequisites.

## The Strategy Pattern (`AssistantStrategy`)

Pokémon generations have fundamentally different mechanics (e.g., Gen 2 added breeding, time of day, and new evolution items, while Gen 1 has different map layouts and no held items).

To handle these differences without cluttering the core engine with `if (gen === 1)` statements, the engine leverages the `AssistantStrategy` interface.
- Each generation implements its own strategy (`gen1Strategy`, `gen2Strategy`).
- Strategies encapsulate generation-specific logic such as:
  - Resolving a map ID to an Area ID.
  - Calculating map distances (often relying on precomputed Floyd-Warshall distance matrices).
  - Determining version exclusivities and unobtainable reasons.
  - Providing special mechanics (like Daycare tracking in Gen 2).
