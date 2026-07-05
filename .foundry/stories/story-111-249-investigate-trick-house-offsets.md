---
id: story-111-249-investigate-trick-house-offsets
type: STORY
title: Investigate Gen 3 Trick House Offsets
status: PENDING
owner_persona: tech_lead
created_at: '2026-07-02'
updated_at: '2026-07-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-054-111-trick-house-save-parsing
tags:
  - feature
  - gen3
  - mechanics
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Investigate Gen 3 Trick House Offsets

## Objective
Investigate and document the exact memory offsets and bitflags used for Trick House progression in Gen 3 (Ruby, Sapphire, Emerald) save files.

## Scope
- Spawning a task to investigate the decompiled source code (e.g., `pret/pokeemerald`) or other documentation to locate where the Trick House puzzle state is stored in `SaveBlock1` or `SaveBlock2`.
- Documenting the findings in the `.foundry/docs/knowledge_base/` directory (e.g., as `gen3_trick_house_offsets.md`).

## Acceptance Criteria
- [ ] task-249-261-investigate-trick-house-offsets
- [ ] Locate the memory offset and data structure for Trick House.
- [ ] Document the findings in the knowledge base.
