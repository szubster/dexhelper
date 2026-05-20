---
id: prd-059-030-multi-save-trade-planner
type: PRD
title: Multi-Save Trade Planner
status: PENDING
owner_persona: architect
created_at: '2026-05-20'
updated_at: '2026-05-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-059-multi-save-trade-planner
tags:
  - feature
  - trades
  - multi-save
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Multi-Save Trade Planner

## Objective
Design and implement a "Multi-Save Mode" in DexHelper to analyze two or more save files simultaneously, helping players complete their Pokédex across different versions (Generation 1 and 2).

## Scope & Granular Epics Breakdown
To encourage granularity and parallel execution, the implementation is broken down into multiple, smaller Epics.

### Epic 1: Multi-Save State Management Architecture
- Modify the state store to support loading and holding multiple save files concurrently in the application state.
- Update UI headers to switch between the 'active' save file and manage loaded save files.

### Epic 2: Cross-Save Synergy Analysis Engine
- Implement the "Cross-Save Synergy Analysis" algorithm.
- Compare missing Pokédex entries in Save A with the inventory (Party/PC Boxes) of Save B (and vice-versa).
- Present optimal trade suggestions to the user (e.g., "Trade extra Vulpix from Save B to Save A to fill dex").

### Epic 3: Trade Evolution Tracking
- Integrate logic to detect trade evolutions (e.g., Kadabra -> Alakazam) or items required for trade evolutions (e.g., Metal Coat for Scyther -> Scizor).
- Flag these Pokémon when analyzing the two saves if transferring them would trigger a new Pokédex entry.

### Epic 4: Consolidated Pokédex View UI
- Provide a new UI view that combines the Pokédex progress from all loaded save files.
- Display a completion percentage reflecting the total collection across the user's multiple saves.

## Acceptance Criteria
- [ ] Architect: Create ADR nodes for Multi-Save State Management Architecture, Cross-Save Synergy Analysis Engine, Trade Evolution Tracking, and Consolidated Pokédex View UI.
