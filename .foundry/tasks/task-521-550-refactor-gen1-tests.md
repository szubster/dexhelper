---
id: task-521-550-refactor-gen1-tests
type: TASK
title: Refactor Gen 1 Event Flags Tests
status: READY
owner_persona: coder
created_at: '2026-09-05'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-521-521-gen1-utils-refactor
tags:
  - refactor
  - gen1
  - testing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Refactor Gen 1 Event Flags Tests

## Context
In accordance with ADR 028, inline magic numbers must be replaced with module-level constants. `src/engine/saveParser/utils/gen1EventFlags.test.ts` has bitwise operations that must use explicit constants.

## Acceptance Criteria
- [ ] Replace inline magic numbers in bitwise operations in gen1EventFlags.test.ts with constants
