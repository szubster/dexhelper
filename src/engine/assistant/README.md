# Assistant Recommendation Engine Architecture

The `suggestionEngine.ts` module is the core intelligence of the application, responsible for analyzing a player's save file and generating prioritized, actionable advice on how to obtain missing Pokémon for their Pokédex (or Living Dex).

## Overview

The engine operates on a synchronous pipeline that evaluates missing Pokédex entries against offline-first metadata (such as locations, encounter rates, evolutions, and events). It aggregates suggestions, deduplicates them, and ranks them by priority so the user sees the most immediately actionable advice first.

The core orchestrator is `generateSuggestions`, which delegates evaluation to specific generation sub-helpers:
- **`generateCatchSuggestions`**: Evaluates wild encounters. It prioritizes "Local Catches" (on the exact map the player is standing) followed by "Nearby Catches" (within 1-8 map transitions, resolved via `gen1Graph`/`gen2Graph`).
- **`generateGiftAndTradeSuggestions`**: Handles in-game NPC trades, static/gift encounters, and unobtainable versions exclusives.
- **`generateEvolutionAndBreedingSuggestions`**: Analyzes the player's physical party and PC box instances to find ready-to-evolve pre-evolutions (by level-up, stones, trade, or happiness) or breedable candidates.

## Priority System

Suggestions are scored with a `priority` integer. Higher values appear at the top of the UI.
- **120**: Local Catches (Current map).
- **100-119**: Nearby Catches (Inverse scaling based on distance).
- **90-95**: Ready-to-Evolve (Required level reached, or player holds the required evolution stone).
- **70-89**: Pending Evolutions, NPC Trades, and Event Pokémon.
- **10**: Unobtainable/Version Exclusive (Requires external Link Cable trade).

## O(1) Performance Optimizations

Because the engine evaluates hundreds of missing Pokémon across thousands of potential encounter routes simultaneously, it must never block the main UI thread.

The architecture strictly avoids `O(N)` or `O(N^2)` array operations in the hot path.
Several key optimizations ("Bolt" flags) are implemented:
- **Set & Map Caching**: Intermediate data structures (`missingIds`, `myOtIds`, `localPids`, `validNpcTradeIds`) use JavaScript `Set` and `Map` to guarantee `O(1)` lookups.
- **Single-Pass Parsing**: Functions avoid `.filter().map()` chains, preventing intermediate array allocations and garbage collection overhead.
- **Cached Graph Lookups**: Graph traversal in map distance calculations uses a pre-populated `dist` matrix (Floyd-Warshall distances built statically) and caches `locationCache` to prevent `O(N)` `Array.find` sweeps on every location resolution.

## Strategy Pattern

The engine employs a Strategy Pattern (`AssistantStrategy`) to abstract Generation-specific mechanical differences:
- `resolveMapAid`: Normalizes internal map IDs into Area IDs.
- `getMapDistance`: Specific map graph implementations for Kanto (Gen 1) and Johto/Kanto (Gen 2).
- `getSpecialSuggestions`: Rules distinct to an era (e.g., Gen 1 Box Full warnings vs Gen 2 breeding).
