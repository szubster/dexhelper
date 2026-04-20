# Gen 2 Complete Implementation Plan

## Overview
While the current app has basic support for parsing Gen 2 (Gold/Silver/Crystal) save files, it lacks the generation-specific logic for map traversal, assistance suggestions, mechanics, and accurate data handling. This document details the missing features and provides a phase-by-phase implementation plan.

## Core Differences: Gen 2 vs Gen 1
1. **Real-Time Clock (RTC):** Gen 2 spawns, evolutions, and events depend heavily on Morning/Day/Night cycles and days of the week. Gen 1 had a static world state.
2. **Breeding & Eggs:** Gen 2 introduced a two-slot Daycare, Pokémon genders, egg groups, and baby Pokémon. Gen 1 only had a single-slot daycare for leveling.
3. **Dual Regions:** Gen 2 spans both Johto and Kanto, requiring a much larger geographical map graph with region-crossing constraints (e.g. Magnet Train, SS Aqua).
4. **Roaming Pokémon:** Raikou, Entei, and Suicune change their locations dynamically. Gen 1 had static legendary encounters.
5. **Complex Evolutions:** Stat-based evolutions (Tyrogue), time-based happiness (Umbreon/Espeon), and held-item trades.
6. **Held Items & Apricorns:** Required for evaluating whether the user can evolve certain Pokémon or craft specific Balls.

---

## Phase-by-Phase Instructions

### Phase 1: Save Parser Expansion (Engine Data Layer)
*The parsing engine (`src/engine/saveParser/parsers/gen2.ts`) is currently missing critical Gen 2 structs.*
* [x] ~~**Real-Time Clock Extraction**~~ (Skipped/Not Needed): Assistant will simply state the time/day requirements to the user, allowing them to wait for the appropriate period instead of restricting suggestions based on emulator-specific RTC metadata.
* [x] **Secondary Daycare Slot:** (Implemented in PR #251) The current parser only reads `daycare1Offset`. Add parsing for the second slot to support breeding detection and egg prediction.
* [x] **Egg State Detection:** (Implemented in PR #251) Party parsing currently just loads species. Need to flag if a party member is currently an Egg (Species ID 253 in RAM, or checking the egg flag) so suggestions don't treat it as a hatched Pokémon.
* [ ] **Detailed Inventory Parsing:** Extract Key Items (Squirtbottle, special Rods), TM/HMs (Headbutt, Rock Smash), Apricorns, and Evolution Items.
* [ ] **Hall of Fame & Roamers:** Extract Hall of fame count (currently hardcoded) and the specific map locations of roaming legendaries from RAM.

### Phase 2: Exclusives & Static Data Setup
*Gen 2 requires its own static configuration similar to Gen 1.*
* [ ] **Gen 2 Exclusives Module:** Create `src/engine/exclusives/gen2Exclusives.ts`. Define availability differences between Gold, Silver, and Crystal (e.g., Mareep line missing in Crystal, Vulpix in Silver, Growlithe in Gold).
* [ ] **Assistant Configuration:** Create `src/engine/data/gen2/assistantData.ts`.
  * [ ] Define `STATIC_GIFT_DATA` for Gen 2 (Togepi Egg, Eevee from Bill, Shuckle in Cianwood, Dratini, Tyrogue).
  * [ ] Define `STATIC_NPC_TRADE_DATA` (e.g., trading Bellsprout for Onix `Rocky`, Drowzee for Machop `Muscle`).

### Phase 3: Johto/Kanto Map Graph Routing
*Gen 2 maps need a unified routing engine.*
* [ ] **Gen 2 Map Graph:** Create `src/engine/mapGraph/gen2Graph.ts`.
* [ ] **Indoor to Outdoor Resolution:** Implement `resolveOutdoorMapId` specifically mapping Johto and Kanto indoor locations to their corresponding outdoor hubs in the Gen 2 map structure.
* [ ] **Cross-Region Distance Algorithm:** Implement `getDistanceToMap` adapted for Gen 2 map relationships (mapping connecting routes between towns). Must include the transition points between Johto and Kanto (Route 27, S.S. Aqua, Magnet Train).

### Phase 4: Strategy & Suggestion Engine Adaptations
*Connect everything through a Gen 2 specific strategy module.*
* [ ] **Gen 2 Strategy Plugin:** Create `src/engine/assistant/strategies/gen2Strategy.ts` conforming to `AssistantStrategy` and link it in `strategies/index.ts`.
* [ ] **Update `suggestionEngine.ts`:**
  * [ ] **Time-Based Suggestions:** Check the missing encounters against the RTC state. Filter or warn if an encounter is only available at a different time of day.
  * [ ] **Breeding Suggestions:** If the user has compatible parents in PC/Party, suggest placing them in the Daycare to get the missing baby evolutions (Pichu, Cleffa, etc.).
  * [ ] **Headbutt / Rock Smash:** Cross-reference `ENCOUNTER_METHOD.HEADBUTT`/`ROCK_SMASH` encounters against the player's extracted TM/HM/Badge inventory.
  * [ ] **Roamer tracking:** Guide the player to checking the Pokédex or tracking roamers if Entei/Raikou/Suicune are missing.
  * [ ] **Stat-Based Evolutions:** Update the evolution logic checking to handle Tyrogue. Since DVs aren't actively used anymore for stats, render dynamic UI messages showing the exact stat requirements (Atk > Def, Atk < Def, Atk = Def).