---
id: task-286-315-filter-swarm-item-calls-qa
type: TASK
title: Filter Swarm & Item Calls (QA)
status: COMPLETED
owner_persona: qa
created_at: '2026-07-31'
updated_at: '2026-08-05'
depends_on:
  - task-286-314-filter-swarm-item-calls-impl
jules_session_id: null
pr_number: null
parent: story-118-286-filter-swarm-item-calls
tags:
  - feature
  - gen2
  - data
  - qa
research_references:
  - .foundry/docs/knowledge_base/gen2_phone_offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Filter Swarm & Item Calls (QA)

## Context
Verify the implementation of the Gen 2 phone call filtering logic (Swarms & Items) implemented in `task-286-314-filter-swarm-item-calls-impl`.

## Contract & Constraints
- Verify that the Coder strictly adhered to Section 13 ("Save File Parsing & Extraction Guidelines") of `.foundry/docs/schema.md`.
- Ensure there are NO magic numbers used for parsing logic and all constants are module-level.
- Verify `RangeError` handling.
- Validate logic handles the differences between Gold/Silver and Crystal versions.

## Acceptance Criteria
- [x] Verify magic numbers are not used and constants are module-level
- [x] Verify RangeError is caught
- [x] Run test suite and ensure no regressions
