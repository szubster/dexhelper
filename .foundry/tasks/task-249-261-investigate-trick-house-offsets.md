---
id: task-249-261-investigate-trick-house-offsets
type: TASK
title: Investigate Gen 3 Trick House Offsets
status: PENDING
owner_persona: coder
created_at: '2026-07-04'
updated_at: '2026-07-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-111-249-investigate-trick-house-offsets
tags:
  - feature
  - gen3
  - mechanics
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Task: Investigate Gen 3 Trick House Offsets

## Description
Investigate the decompiled source code (e.g., `pret/pokeemerald`) or other documentation to locate exactly where the Trick House puzzle state is stored in `SaveBlock1` or `SaveBlock2` for Gen 3 save files (Ruby, Sapphire, Emerald). Document the exact memory offsets and bitflags used for Trick House progression.

## Acceptance Criteria
- [ ] Locate the memory offset and data structure for Trick House.
- [ ] Document the findings in `.foundry/docs/knowledge_base/gen3_trick_house_offsets.md`.

## Notes
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail the task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- When drafting blueprints for save file parsing, explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.
