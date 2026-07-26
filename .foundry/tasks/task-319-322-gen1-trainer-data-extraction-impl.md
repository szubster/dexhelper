---
id: task-319-322-gen1-trainer-data-extraction-impl
type: TASK
title: Gen 1 Trainer Data Extraction Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-07-14'
updated_at: '2026-07-26'
depends_on: []
jules_session_id: '5181364094416490295'
pr_number: null
parent: story-306-319-gen1-trainer-data-extraction
tags:
  - gen1
  - save-engine
  - extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 1 Trainer Data Extraction Implementation

## Context
We need to extract the trainer defeat flags for Generation 1 games. This is part of the save parsing engine.

## Requirements
1. Extract trainer defeat flags from the Gen 1 save file.
2. Ensure explicit bitwise logic is used with boundary testing (ADR 026). Use explicit bitwise shifting (`>>`) and masking (`&`) to isolate multi-value bitfields into discrete properties rather than evaluating the entire byte.
3. Use relative offsets and constants (ADR 028) strictly. No inline magic numbers are allowed. All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level.
4. Implement boundary testing that covers absolute zero state, boundary states, and max boundary values.
5. If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
6. If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
7. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement Gen 1 trainer data extraction.
- [ ] Define all memory offsets, lengths, bit locations, and shifts as reusable constants at the module level.
- [ ] Use explicit bitwise logic with boundary testing.
- [ ] Write unit tests for extraction.
