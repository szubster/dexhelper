---
id: idea-540-multi-save-diffing-and-trade-simulation
type: IDEA
title: Real-Time Multi-Save Diffing Engine and Cross-Save Trade Simulation Pipeline
status: PENDING
owner_persona: product_manager
created_at: '2026-10-19'
updated_at: '2026-10-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - saveParser
  - diffing
  - trading
  - architecture
  - gen3
  - gen2
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Idea: Real-Time Multi-Save Diffing Engine and Cross-Save Trade Simulation Pipeline

## Problem
While DexHelper provides single-save state parsing and historical save diffing via `SaveHistoryDB` (`src/db/SaveHistoryDB.ts`), players running concurrent playthroughs or managing multi-game save files (e.g. Generation 1 Red, Generation 2 Gold, or Generation 3 Ruby/Emerald/FireRed) currently lack a real-time, side-by-side comparative diffing and trade compatibility engine.

Currently:
1. `src/utils/saveComparison.ts` and `src/engine/saveParser/utils/boxDiff.ts` perform single-dimensional array comparison (identifying added, removed, or modified box Pokémon within a single save file's timeline).
2. Players wanting to identify trade-compatible Version Exclusive Pokémon, missing Pokédex entries across two distinct saves, or evaluate evolution-by-trade triggers (e.g. Haunter to Gengar, Machoke to Machamp, or Item-based trades like Seadra with Dragon Scale) must manually inspect both save files in separate views.
3. Cross-save trade simulation requires predicting trade side-effects (e.g. level caps, obedience flags, move legality, and held item transfers) before modifying or generating `.sav` or `.pkm` exports.

## Proposed Solution
Architect a dedicated **Real-Time Multi-Save Diffing Engine and Cross-Save Trade Simulation Pipeline** operating within `src/engine/saveParser/utils/` and exposed via visual UI primitives in `src/components/`:

1. **Multi-Save Matrix Comparison Engine (`MultiSaveDiffEngine`)**:
   - Accepts multiple parsed save payloads (`ParsedSaveData[]` across Gen 1, Gen 2, and Gen 3).
   - Computes set intersections across Living Dex progress, missing version exclusives, item inventory gaps (e.g. missing evolutionary stones/held items), and missing moves/TMs.
   - Outputs a unified `MultiSaveComparisonMatrix` with structured trade recommendations.

2. **Cross-Save Trade Compatibility & Side-Effect Simulator (`TradeSimulator`)**:
   - Evaluates bidirectional trade compatibility between two saves (handling Gen 1 <-> Gen 2 Time Capsule restrictions and Gen 3 version/regional Pokedex constraints).
   - Simulates trade evolution outcomes (e.g. automatically resolving trade-evolved species, stat recalculations, OT/ID handling, obedience level verification based on acquired badges, and held item consumption).
   - Generates deterministic pre-trade and post-trade preview states for both save files prior to commit/export.

3. **Visual Tactical Comparison Component (`MultiSaveDiffViewer`)**:
   - Renders side-by-side tactical comparison panels utilizing existing `@utility` tactical primitives (`tactical-panel`, `tactical-card`, `InlineDataPoint`).
   - Displays trade recommendation chips and conflict warnings (e.g. trade refusal due to unreleased Gen 2 species in Gen 1, or missing National Dex in Gen 3).

## Value
Significantly enhances DexHelper's multi-save analysis capabilities, unlocks automated trade path generation across concurrent playthroughs, guarantees trade rule compliance before user exports, and addresses critical DX gaps in multi-game living dex completion.

## Acceptance Criteria
- [x] PRD generated specifying the Multi-Save Diffing Matrix and Trade Compatibility Engine.
- [ ] prd-540-727-multi-save-diffing-and-trade-simulation
- [ ] Core `MultiSaveDiffEngine` and `TradeSimulator` modules implemented in `src/engine/saveParser/utils/`.
- [ ] Unit test suite added verifying multi-save set operations, Time Capsule rules, and trade evolution simulation.
- [ ] Tactical `MultiSaveDiffViewer` component integrated into the application view hierarchy.
