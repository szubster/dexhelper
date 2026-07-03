---
id: prd-098-104-gen3-lottery-data-extraction
type: PRD
title: Gen 3 Lottery Data Extraction
status: PENDING
owner_persona: epic_planner
created_at: '2026-07-03'
updated_at: '2026-07-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-098-gen3-pokemon-lottery-predictor
tags:
  - feature
  - gen3
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Lottery Data Extraction

## Goal
Extract the daily winning lottery number/PRNG seed from Gen 3 save files (Ruby, Sapphire, Emerald) to enable the Lottery Predictor feature.

## Context
In Gen 3 games, Lilycove Department Store hosts a Pokémon Lottery Corner. The winning lottery number changes daily based on a PRNG seed stored in the save file. We need to identify the save offsets for this seed and implement the extraction logic using the existing programmatic save parsing architecture (adhering to ADR 010: Gen3 Data Parsing Strategy).

## Requirements
- Identify memory offsets for the daily lottery PRNG seed in Ruby, Sapphire, and Emerald save files.
- Implement data extraction logic in the save parser using the `DataView` API.
- Reconstruct the winning number based on the extracted seed if necessary (e.g., if the seed requires LCG steps).
- Expose the daily winning lottery number to the application state so it can be consumed by the UI.

## Acceptance Criteria
- [ ] Break down into Epics
