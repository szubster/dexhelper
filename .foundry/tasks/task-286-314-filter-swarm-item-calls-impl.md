---
id: task-286-314-filter-swarm-item-calls-impl
type: TASK
title: Filter Swarm & Item Calls (Implementation)
status: ACTIVE
owner_persona: coder
created_at: '2026-07-31'
updated_at: '2026-08-02'
depends_on: []
jules_session_id: '17188983552426725444'
pr_number: null
parent: story-118-286-filter-swarm-item-calls
tags:
  - feature
  - gen2
  - data
research_references:
  - .foundry/docs/knowledge_base/gen2_phone_offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Filter Swarm & Item Calls (Implementation)

## Context
The objective is to filter the list of active callers to isolate NPCs that offer rare items or swarm notifications in Gen 2 (Gold/Silver and Crystal).
Memory offsets are documented in `.foundry/docs/knowledge_base/gen2_phone_offsets.md`.

## Contract & Constraints
- **Strict Adherence:** You MUST strictly adhere to Section 13 ("Save File Parsing & Extraction Guidelines") of `.foundry/docs/schema.md`.
  - All memory offsets, lengths, bit locations, and shifts must be explicitly defined as reusable constants at the module level.
  - No inline magic numbers.
  - Catch `RangeError` according to Section 13 guidelines.
- Map the Gen 2 memory offsets (handling Gold/Silver vs Crystal differences) to identify active callers, swarms, and item-giving NPCs.
- Create a filtering layer or flag in the data structure for high-value calls.

## Acceptance Criteria
- [ ] Implement constant definitions for phone offsets (Crystal vs G/S)
- [ ] Implement data logic for identifying high-value Pokegear calls (swarm & item-giving)
- [ ] Comply strictly with Section 13 parsing guidelines (module-level constants, no magic numbers, catch RangeError)
