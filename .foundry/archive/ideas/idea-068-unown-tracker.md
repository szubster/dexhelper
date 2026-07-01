---
id: idea-068-unown-tracker
type: IDEA
title: Unown Form Tracker
status: COMPLETED
owner_persona: product_manager
created_at: '2026-05-31'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen2
  - tracking
research_references: []
rejection_count: 0
rejection_reason: ''
notes: 'Capturing Unown forms is a specific, grindy Gen 2 activity.'
---

# Unown Form Tracker

## Problem
In Generation 2 (Gold/Silver/Crystal), Unown has 26 distinct forms based on its DVs. Collecting all 26 forms to unlock the Unown Dex in the Ruins of Alph is a major end-game side quest. Currently, `DexHelper` treats all Unown as a single species and does not track which specific letter forms the player has captured in their PC/party.

## Solution
Leverage our existing programmatic DV parsing in `saveParser` to explicitly compute and display a player's Unown form collection.

1. **DV to Form Logic**: In Gen 2, an Unown's form is determined entirely by its DVs: reading the middle 2 bits of the Attack, Defense, Speed, and Special DVs, combining them into an 8-bit integer, and taking modulo 28 (where 0-25 map to A-Z).
2. **Parser Update**: Modify `parseGen2PokemonInstance` (or a helper) to calculate the `unownForm` string ('A', 'B', etc.) if the `speciesId` is 201.
3. **UI Addition**: Add a dedicated "Unown Dex" panel or filter in the Storage Viewer to show which forms are collected and which are missing, turning a tedious manual search into a clean visual checklist.

## Why it Matters
This directly aligns with the core vision of `DexHelper` as a premium collection manager for hardcore players, turning hidden data (DVs) into a highly actionable and visually satisfying checklist.

## Generated Nodes
- .foundry/prds/prd-068-037-unown-tracker.md
