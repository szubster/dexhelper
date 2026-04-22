---
id: prd-005-gen2-expansion
type: PRD
title: "Gen 2 Expansion: Phases 1 & 2 (Save Parser & Static Data)"
status: PENDING
owner_persona: epic_planner
created_at: "2026-04-22"
updated_at: "2026-04-22"
depends_on:
  - .foundry/ideas/idea-006-gen2-expansion.md
jules_session_id: null
parent: .foundry/ideas/idea-006-gen2-expansion.md
tags:
  - gen2
  - engine
  - save-parser
notes: "Phase 1 and 2 focus on engine-level data collection and static knowledge. Map graph routing and strategy layers will be addressed in subsequent PRDs."
---

# PRD: Gen 2 Expansion - Phases 1 & 2

## Executive Summary
This PRD outlines the requirements for the first half of the Gen 2 Support Expansion, focusing strictly on foundational data extraction and static knowledge integration. By completing Phases 1 and 2, the application will possess the necessary metadata from Gen 2 save files (inventory, roamer locations, progress) and the static knowledge base (version exclusives, gift data) required to support advanced suggestion engines and map routing in the future.

## Objectives
1. Extract missing Gen 2 structures from SRAM (Detailed Inventory, Roamers, Hall of Fame).
2. Establish the Gen 2 static configuration modules (Exclusives, Assistant Data).

## Scope of Work

### Phase 1: Save Parser Expansion (Engine Data Layer)
Expand `src/engine/saveParser/parsers/gen2.ts` to include:
- **Detailed Inventory**: Extract Key Items (e.g., Squirtbottle), special Rods, TMs/HMs (specifically Headbutt and Rock Smash), Apricorns, and Evolution Items.
- **Roamer Tracking**: Extract the map locations of roaming legendaries (Raikou, Entei, Suicune) directly from RAM.
- **Progress Metadata**: Extract the Hall of Fame count (currently hardcoded) and regional badge progression accurately.

### Phase 2: Exclusives & Static Data Setup
Establish the static knowledge base for Gen 2 in the engine:
- **Version Exclusives Module** (`src/engine/exclusives/gen2Exclusives.ts`): Define availability differences between Gold, Silver, and Crystal (e.g., Mareep line missing in Crystal).
- **Assistant Configuration** (`src/engine/data/gen2/assistantData.ts`):
  - Catalog `STATIC_GIFT_DATA` for Gen 2 (e.g., Togepi Egg, Eevee from Bill, Shuckle in Cianwood, Dratini, Tyrogue).
  - Catalog `STATIC_NPC_TRADE_DATA` (e.g., trading Bellsprout for Onix `Rocky`, Drowzee for Machop `Muscle`).

## Out of Scope
- Implementation of the unified Johto/Kanto Map Graph (Phase 3).
- Updates to the core Suggestion Engine (Time-based suggestions, Breeding suggestions, Stat-based evolutions) (Phase 4).

## Next Steps
- [ ] **Epic Planner**: Break down this PRD into Epics mapping out Phase 1 and Phase 2.
