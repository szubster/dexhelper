---
id: prd-105-110-tm-hm-inventory-planner
type: PRD
title: Gen 1-3 TM/HM Inventory & Compatibility Planner
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-07-11'
updated_at: '2026-08-05'
depends_on: []
jules_session_id: '17660689076152011293'
pr_number: null
parent: idea-105-tm-hm-inventory-planner
tags:
  - feature
  - gen1
  - gen2
  - gen3
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# PRD: Gen 1-3 TM/HM Inventory & Compatibility Planner

## 1. Problem Statement
Players of Pokémon Gen 1-3 often hoard Technical Machines (TMs) due to their single-use nature and high value. Checking TM compatibility against owned Pokémon in the PC and Party is tedious, requiring manual cross-referencing. This causes friction in team building and resource management.

## 2. Target Audience
Retro Pokémon players using DexHelper to manage their saves, specifically those aiming to optimize their teams for challenging battles (e.g., Elite Four, Battle Frontier) without wasting valuable TMs.

## 3. Scope & Requirements

### 3.1. Save Parsing (Data Layer)
- Parse the Item Bag structure for Gens 1, 2, and 3 save files to extract current TM and HM inventory.
- Identify the specific TM/HM item IDs and their quantities.
- Map the parsed TM/HM items to their corresponding moves.
- Extract Event Flags to determine if one-time TMs have already been collected.

### 3.2. Compatibility Engine (Logic Layer)
- For a selected TM/HM, cross-reference the corresponding move against the learnsets of all Pokémon currently in the player's Party and PC Boxes.
- Filter and identify which Pokémon can learn the move.
- Further refine by identifying Pokémon that can learn the move but do not currently have a move of that type, highlighting strategic gaps.

### 3.3. User Interface (Presentation Layer)
- **Inventory Dashboard**: A visual grid displaying owned TMs/HMs and their quantities.
- **Compatibility Matrix**: A detailed view when a TM is selected, showing all compatible owned Pokémon.
- **Strategic Overlay**: Badges or indicators on compatible Pokémon showing if they lack a move of that TM's type.
- **Acquisition Tracker**: A list of unowned, uncollected TMs with their in-game locations (similar to the Missing Hidden Items Finder).

## 4. Dependencies & Constraints
- Must adhere to ADR 015 regarding full `PokeData` property names.
- Must follow ADR 028 for dynamic save block extraction (no inline magic numbers, use module-level constants for offsets/lengths).
- Requires accurate offset documentation for TM/HM pockets in Gen 1, Gen 2, and Gen 3 bags, as well as event flags for TM pickups.

## Acceptance Criteria
- [x] Break down into EPIC nodes for Data Parsing, Compatibility Logic, and UI.
- [ ] epic-110-306-tm-hm-save-parsing
- [ ] epic-110-307-tm-hm-compatibility-logic
- [ ] epic-110-308-tm-hm-user-interface
