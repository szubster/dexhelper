---
id: research-070-197-gen3-hof-offsets
type: RESEARCH
title: Investigate Gen 3 Hall of Fame Data Offsets
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-18'
updated_at: '2026-06-27'
depends_on: []
jules_session_id: '17203521076526655183'
pr_number: null
parent: null
tags:
  - research
  - gen3
  - hall-of-fame
  - offsets
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Hall of Fame Data Offsets

## Context
With the successful extraction of Hall of Fame data from Gen 1 and Gen 2, the next step is to expand the parsing architecture to Generation 3 (Ruby, Sapphire, Emerald, FireRed, LeafGreen). However, the memory structure in Gen 3 is radically different from the SRAM banks used in older generations.

## Goals
- Determine the memory offset for the Hall of Fame data block within Gen 3 save files.
- Determine if the data is stored in SaveBlock1, SaveBlock2, or another section.
- Identify the data structure (e.g., number of entries stored, fields per entry like species, nickname, level, etc.).
- Document how the Hall of Fame count is stored and incremented.

## Acceptance Criteria
- [ ] Document the memory offsets and data structure for Gen 3 Hall of Fame data.
- [ ] Detail any differences between Ruby/Sapphire, Emerald, and FireRed/LeafGreen implementations.
