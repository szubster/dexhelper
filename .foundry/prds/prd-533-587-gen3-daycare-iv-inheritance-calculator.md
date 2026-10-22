---
id: prd-533-587-gen3-daycare-iv-inheritance-calculator
type: PRD
title: Gen 3 Daycare IV & Egg Inheritance Calculator
status: PENDING
owner_persona: epic_planner
created_at: '2026-10-16T18:44:42.869Z'
updated_at: '2026-10-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-533-gen3-daycare-iv-inheritance-calculator
tags:
  - dexhelper
  - gen3
  - breeding
  - ivs
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Gen 3 Daycare IV & Egg Inheritance Calculator PRD

## Overview
Based on `idea-533-gen3-daycare-iv-inheritance-calculator`, this PRD outlines the requirements for building a Gen 3 Daycare IV & Egg Inheritance Calculator within DexHelper. This tool will simulate IV inheritance mechanics for Generation 3 games (Ruby, Sapphire, Emerald, FireRed, LeafGreen), allowing users to predict offspring stats and find optimal breeding pairs from their PC boxes.

## Features & Requirements

### 1. Active Daycare Detection
*   **Requirement:** The application must automatically detect and parse Pokémon deposited in the Gen 3 Daycare.
*   **Data Source:** The Daycare structure resides within `SaveBlock1` memory. The parser needs to locate this structure (considering game-specific offsets for Ruby/Sapphire vs Emerald/FRLG) and extract the Pokémon data.
*   **Extraction Details:** For each deposited Pokémon, extract IVs (HP, Atk, Def, SpA, SpDef, Spe), Nature, Species, Gender, and Held Item (specifically checking for Everstone, which influences Nature inheritance in Emerald).
*   **Schema Rule:** Serialization of this `PokeData` must use `msgpackr` with `useRecords: true`, and property names must follow the PokeData Property Naming Schema (e.g., `captureRate`, `evolvesTo`). Memory block extraction must utilize relative section offsets (e.g., `section1Offset`).

### 2. Inheritance Combinatorics Engine
*   **Requirement:** The core logic must calculate the probability of the offspring inheriting specific IVs based on the parents' IVs.
*   **Gen 3 Breeding Mechanics:**
    *   Exactly 3 IVs are inherited from the parents.
    *   The remaining 3 IVs are generated randomly (0-31).
    *   The 3 inherited IVs are chosen randomly from the combined pool of both parents' IVs.
    *   There are 120 possible permutations for selecting which 3 stats are inherited and from which parent.
*   **Output:** The engine should output a probability distribution for each stat (e.g., probability of HP being 31, probability of Atk being >= 25) and the probability of specific combinations (e.g., 31 in Atk and Spe).

### 3. PC Box Pair Recommendation (Breeding Optimizer)
*   **Requirement:** Allow the user to select a target species and desired minimum IVs, then analyze all compatible Pokémon in the PC Boxes to suggest optimal breeding pairs.
*   **Logic:**
    *   Identify Pokémon in the PC boxes that belong to compatible Egg Groups.
    *   Evaluate all valid pairs using the Inheritance Combinatorics Engine.
    *   Score or rank the pairs based on the probability of yielding the user's desired IV spread.

### 4. UI/UX (Tactical Dashboard)
*   **Requirement:** Present the data using the established "tactical hardware/snooping" aesthetic (ADR 008).
*   **Components:**
    *   A display showing the currently deposited Daycare parents with their IVs and relevant data.
    *   A probability chart/table displaying the calculated IV inheritance chances.
    *   A recommendation section for PC Box breeding pairs.
*   **Styling Rules:** Use `@utility` tactical primitives (`tactical-panel`, `tactical-text`, `tactical-button`), `rounded-none` (sharp edges), `border-dashed`, and monospaced fonts (`font-mono`).

## Acceptance Criteria
- [ ] Break down the PRD into Epic(s) outlining the development phases.
