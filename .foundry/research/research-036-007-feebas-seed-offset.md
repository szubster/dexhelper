---
id: research-036-007-feebas-seed-offset
type: RESEARCH
title: Investigate Feebas Seed Memory Offset
status: COMPLETED
owner_persona: researcher
created_at: '2026-06-05'
updated_at: '2026-06-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-066-036-feebas-tile-predictor
tags:
  - gen3
  - save-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Feebas Seed Memory Offset

## Objective
Determine the exact memory offset for the Feebas seed in Ruby, Sapphire, and Emerald save files. The Feebas seed is tied to the "trendy phrase" in Dewford Town and determines the 6 water tiles on Route 119 where Feebas can be caught.

## Tasks
- [x] Research Gen 3 save file structure for R/S/E.
- [x] Identify the offset and data type of the Feebas seed.
- [x] Document the PRNG/math algorithm used by Gen 3 to translate the seed into the 6 specific tile coordinates on Route 119.
