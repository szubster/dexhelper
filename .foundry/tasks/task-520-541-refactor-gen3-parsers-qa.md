---
id: task-520-541-refactor-gen3-parsers-qa
type: TASK
title: QA Refactored Gen 3 Parsers
status: READY
owner_persona: qa
created_at: '2026-09-05'
updated_at: '2026-09-05'
depends_on:
  - task-520-538-refactor-gen3-pokemon-data-parsers
  - task-520-539-refactor-gen3-world-event-parsers
  - task-520-540-refactor-gen3-items-and-trades-parsers
jules_session_id: null
pr_number: null
parent: story-523-520-gen3-parsers-refactor-core
tags:
  - qa
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# TASK: QA Refactored Gen 3 Parsers

## Context
Verify that the refactored Gen 3 parsers comply with ADR 028.

## Acceptance Criteria
- [ ] Verify all modified Gen 3 parsers comply with ADR 028 by ensuring no inline magic numbers are used for memory offsets
- [ ] Verify relative offsets are correctly implemented using the resolved section offset
