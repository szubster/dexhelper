---
id: prd-110-112-npc-size-record-assistant
type: PRD
title: Gen 2 & Gen 3 NPC Size Record Assistant
status: PENDING
owner_persona: auditor
created_at: '2026-07-12'
updated_at: '2026-08-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-110-npc-size-record-assistant
tags:
  - dexhelper
  - dashboard
  - generation-2
  - generation-3
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Gen 2 & Gen 3 NPC Size Record Assistant

## 1. Problem Statement
In Generation 2 (e.g., Lake of Rage Magikarp) and Generation 3 (e.g., Route 119 Feebas/Barboach, Heracross/Shroomish), there are NPCs who challenge the player to show them exceptionally large or small Pokémon. The game internally calculates a Pokémon's size using a convoluted mathematical formula based on its DVs (Gen 2) or Personality Value/IVs (Gen 3) combined with base species data.

Because this size is entirely hidden until the player speaks to the specific NPC, players are forced to manually catch dozens of the target species, place them in their party, and talk to the NPC one by one in a tedious trial-and-error process to beat the current record and earn the reward (usually a valuable item like an Elixir or specific hold items).

## 2. Proposed Solution
We will introduce an "NPC Size Record Assistant" dashboard. By leveraging our programmatic save parsing engine, we can extract the IVs/DVs and PID of every Pokémon in the player's PC Boxes and automatically run the specific generation's size calculation formula.

### Key Features:
1. **Target Species Filter:** Automatically filter the player's PC boxes to only show the specific species relevant to the size-checking NPCs in that generation (e.g., Magikarp, Barboach, Feebas, Heracross, Shroomish).
2. **Exact Size Display:** Calculate and display the exact size (in inches/meters, matching the in-game display) for every instance of those species the player owns.
3. **Record Beater Highlight:** Automatically sort and highlight the largest (or smallest, depending on the NPC) Pokémon the player currently possesses, making it instantly clear which one they should withdraw and show to the NPC.

## 3. Scope & Requirements

### 3.1 Supported Generations & Games
- **Generation 2:** Gold, Silver, Crystal
  - NPC: Fishing Guru at Lake of Rage
  - Target Species: Magikarp
  - Goal: Largest
- **Generation 3:** Ruby, Sapphire, Emerald, FireRed, LeafGreen
  - NPCs:
    - Route 119: Feebas (Largest) and Barboach (Largest)
    - Island Cave (FRLG): Heracross (Largest)
    - Pattern Bush (FRLG): Shroomish (Largest)
  - *Note: While some NPCs may only exist in specific games, the calculation logic is tied to the generation.*

### 3.2 Data Extraction Requirements
- **Generation 2:**
  - Extract DVs (Attack, Defense, Speed, Special) for each Pokémon.
- **Generation 3:**
  - Extract Personality Value (PV) for each Pokémon.
  - Extract IVs (HP, Attack, Defense, Speed, Special Attack, Special Defense) for each Pokémon.
- The extraction must correctly parse the 48-byte encrypted Data block (Growth, Attacks, EVs & Condition, Miscellaneous) taking into account the substructure order determined by `PV % 24`.

### 3.3 Size Calculation Logic
- Implement the exact mathematical formulas used by the respective generations to calculate size based on DVs/IVs and PV.
- The calculated size must match the in-game display exactly (inches/meters depending on localization).

### 3.4 User Interface
- A dedicated dashboard view for the "NPC Size Record Assistant".
- A dropdown or toggle to select the target NPC challenge (e.g., "Lake of Rage Magikarp", "Route 119 Feebas").
- A list displaying all matching Pokémon currently in the player's PC boxes and party.
- For each Pokémon, display:
  - Box and Slot location.
  - Exact calculated size.
  - An indicator showing if it's the current "Record Beater" (largest/smallest).
- Adhere to the ADR 008 "tactical hardware/snooping" aesthetic (sharp edges, dashed borders, monospaced telemetry fonts).

## 4. Value Proposition
Targeting mathematically complex, hidden sub-mechanics provides incredible unique utility. By automating this opaque calculation across all stored Pokémon, we completely eliminate manual trial-and-error. This perfectly leverages DexHelper's programmatic parsing strengths, turning a frustrating, blind guessing game into an instant, actionable insight. This reinforces our position as an indispensable, premium companion app for hardcore completionists.

## 5. Success Metrics
- Accurate size calculation matching in-game values for all supported species.
- Correct identification of the largest/smallest Pokémon for a given NPC challenge.
- Performant scanning of all PC boxes without noticeable lag.

## Acceptance Criteria
- [x] Break down this PRD into EPIC nodes.
- [x] epic-112-400-npc-size-record-data-extraction
- [x] epic-112-401-npc-size-record-calculation-engine
- [x] epic-112-402-npc-size-record-dashboard-ui
