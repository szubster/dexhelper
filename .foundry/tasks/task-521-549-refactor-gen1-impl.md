---
id: task-521-549-refactor-gen1-impl
type: TASK
title: Refactor Gen 1 Event Flags Implementation
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
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Refactor Gen 1 Event Flags Implementation

## Context
In accordance with ADR 028, inline magic numbers must be replaced with module-level constants. `src/engine/saveParser/utils/gen1EventFlags.ts` has bitwise operations that must use explicit constants.

## Acceptance Criteria
- [ ] Replace inline magic numbers in bitwise operations in gen1EventFlags.ts with constants
