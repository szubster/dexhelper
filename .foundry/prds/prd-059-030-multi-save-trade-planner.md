---
id: prd-059-030-multi-save-trade-planner
type: PRD
title: 'PRD: Multi-Save Trade Planner'
status: READY
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

## 1. Context & Problem Statement
Completing the Pokédex in Generation 1 and 2 requires trading between different game versions (e.g., Red to Blue, Gold to Silver) to obtain version-exclusive Pokémon and trigger trade evolutions. Players frequently manage multiple concurrent save files. DexHelper currently views a single save file at a time, forcing players to manually track which Pokémon are in which save and manually plan trades.

## 2. Proposed Solution
Build a "Multi-Save Mode" in DexHelper that allows loading and analyzing two or more save files simultaneously. The core feature will evaluate the loaded states and identify actionable trade opportunities.

## 3. Value Proposition
Transforms DexHelper from a single-file viewer into a cross-save Collection Manager, solving the tedious problem of inter-save trading planning.

## 4. Key Features
- **Cross-Save Synergy Analysis**: Automatically identify optimal trade opportunities (e.g., "Save A needs a Vulpix. Save B has 3 spare Vulpix. You should trade.").
- **Trade Evolution Tracking**: Flag Pokémon that can evolve via trade between the loaded saves (e.g., Kadabra to Alakazam).
- **Consolidated Pokédex View**: Display a unified view of Pokédex progress across all active saves.

## 5. Next Steps
- [ ] Architect: Convert this PRD into an ADR detailing the architectural approach for the Multi-Save Mode.
