---
id: task-246-436-gen3-box-parsing-aggregation
type: TASK
title: Gen 3 PC Box Stats Calculation and Grouping
status: READY
owner_persona: coder
created_at: '2026-08-17'
updated_at: '2026-08-20'
depends_on:
  - task-246-435-gen3-box-parsing-extraction
jules_session_id: null
pr_number: null
parent: story-108-246-gen3-box-parsing
tags:
  - backend
  - save-parsing
  - gen3
research_references:
  - research-246-244-gen3-box-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Gen 3 PC Box Stats Calculation and Grouping

## Objective
Parse the decrypted Gen 3 PC Box Pokémon data to calculate base stats, shiny status, and group them by species.

## Context
Following the binary extraction and decryption (from task `task-246-435-gen3-box-parsing-extraction`), the raw data needs to be aggregated and calculated into business logic payloads for the frontend Comparison Matrix UI.

## Acceptance Criteria
- [ ] Parse IVs, Natures, Hidden Power (Type and Base Power), and Shininess for each extracted PC Pokémon.
- [ ] Implement aggregation logic to group the processed Pokémon by their species ID.
- [ ] Format the output structure specifically for the frontend Comparison Matrix UI.
- [ ] Add comprehensive unit tests covering the stat calculations and species grouping.
