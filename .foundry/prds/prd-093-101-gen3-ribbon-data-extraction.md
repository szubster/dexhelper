---
id: prd-093-101-gen3-ribbon-data-extraction
type: PRD
title: Gen 3 Ribbon Master Challenge Tracker - Data Extraction
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-07-02'
updated_at: '2026-07-04'
depends_on: []
jules_session_id: '4556250785732090485'
pr_number: null
parent: null
tags:
  - gen3
  - save-engine
  - data-extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Ribbon Master Challenge Tracker - Data Extraction

## Background
The "Ribbon Master" challenge is a hardcore Pokémon community activity where a player attempts to collect every single obtainable Ribbon on a single Pokémon. In Generation 3, there are 27 different Ribbons to collect, spanning the Pokémon League, Pokémon Contests, the Battle Tower, and GameCube games (e.g., Mt. Battle). Manually tracking this progress via the in-game UI is tedious and error-prone, risking permanent failure if a Ribbon is missed before migrating the Pokémon to a newer generation.

## Objective
This PRD outlines the requirements for extending our programmatic save parsing engine to extract Ribbon and Contest Condition data from Generation 3 (Ruby, Sapphire, Emerald, FireRed, LeafGreen) save files. This data will feed a downstream UI dashboard to track Ribbon Master challenge progress.

## Requirements

### 1. Ribbon Data Extraction
*   **Target Data:** Extract the 32-bit Ribbon and Obedience bitfield for each Pokémon.
*   **Location:** This data is located in the **Miscellaneous (M)** substructure at **offset 8** of the 48-byte encrypted Data block within the 100-byte Pokémon structure.
*   **Decryption:** The engine must handle the XOR cipher decryption using the Pokémon's Personality Value (PV) and Original Trainer ID (OT ID), and resolve the `PV % 24` permutation to locate the 'M' substructure.
*   **Parsing Logic:** Implement bitwise operations to parse the specific 32-bit field:
    *   Bits 0-14: Contest Ribbons (Cool, Beauty, Cute, Smart, Tough) — 3 bits each, representing ranks 1-4.
    *   Bits 15-26: Miscellaneous Ribbons (Champion, Winning, Victory, Artist, Effort, Battle Champion, Regional Champion, National Champion, Country, National, Earth, World).
    *   Bit 31: Obedience flag (ignore for this feature, but document its presence).

### 2. Contest Condition Data Extraction
*   **Target Data:** Extract the Pokémon's Contest stats (Coolness, Beauty, Cuteness, Smartness, Toughness, Feel).
*   **Location:** This data is located in the **EVs & Condition (E)** substructure of the 48-byte encrypted Data block.
*   **Purpose:** These stats are required to determine if a Pokémon is "Challenge Ready" for specific Contest Ribbons.

### 3. Save File Parser Integration
*   Ensure the extracted Ribbon and Condition data is seamlessly integrated into the application's overall `PokeData` representation.
*   Use MsgPack serialization optimizations where applicable (e.g., omitting `0` or `false` values) to minimize payload size.
*   Maintain backwards compatibility with existing Gen 1 and Gen 2 parsing logic.

## Technical Context
*   Reference `.foundry/docs/knowledge_base/gen3_pokemon_data_structure.md` for specific offsets and the decryption algorithm.
*   Ensure all new memory offsets and bit locations are defined as reusable constants at the module level, avoiding inline magic numbers.

## Acceptance Criteria
- [ ] Define reusable constants for all Ribbon bitmask offsets and lengths.
- [ ] Implement extraction logic for the 32-bit Ribbon bitfield from the 'M' substructure.
- [ ] Implement extraction logic for Contest stats from the 'E' substructure.
- [ ] Write unit tests to verify Ribbon and Condition data extraction using known Gen 3 save file fixtures (`test.extend` pattern).
- [ ] epic-101-133-gen3-ribbon-extraction
- [ ] epic-101-134-gen3-condition-stats-extraction
- [ ] epic-101-135-save-parser-integration
