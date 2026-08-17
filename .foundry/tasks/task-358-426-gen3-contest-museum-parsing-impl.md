---
id: task-358-426-gen3-contest-museum-parsing-impl
type: TASK
title: Task - Gen 3 Contest Museum Parsing Implementation
status: READY
owner_persona: coder
created_at: '2026-08-14'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-400-358-gen3-trainer-card-parsing-core
tags:
  - feature
  - gen3
  - completionist
research_references:
  - .foundry/research/research-358-406-gen3-trainer-card-offsets.md
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Task: Gen 3 Contest Museum Parsing Implementation

## Description
Implement the core parsing logic to extract the Gen 3 Trainer Card upgrade criteria for Contest Master Rank. Add `hasContestMaster` boolean property to `Gen3TrainerCard`. For Contest Master Rank, verify the 5 Museum Contest paintings (flags starting at `0x2e90` in SaveBlock1, index 8). Ensure strict adherence to the schema guidelines.

## Acceptance Criteria
- [ ] Implement `parseGen3ContestMaster` logic in `src/engine/saveParser/parsers/gen3.ts` using the museum offsets detailed in `.foundry/docs/knowledge_base/gen3_contest_museum_offsets.md`.
- [ ] Construct and return `gen3TrainerCard.hasContestMaster` object within `parseGen3`.
- [ ] Verify the implementation using appropriate unit tests.
