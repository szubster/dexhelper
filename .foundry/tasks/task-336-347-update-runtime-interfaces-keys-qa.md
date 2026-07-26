---
id: task-336-347-update-runtime-interfaces-keys-qa
type: TASK
title: Update Runtime Interfaces to Verbose Keys QA
status: PENDING
owner_persona: qa
created_at: '2026-07-26'
updated_at: '2026-07-26'
depends_on:
  - task-336-346-update-runtime-interfaces-keys-impl
jules_session_id: null
pr_number: null
parent: story-043-336-update-runtime-interfaces-keys
tags:
  - qa
  - feature
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Update Runtime Interfaces to Verbose Keys QA

## Objective
Verify the implementation of ADR 015, ensuring the application runtime uses verbose keys correctly and all type safety/tests pass.

## Acceptance Criteria
- [ ] Application compiles without type errors.
- [ ] Tests and linter pass.
- [ ] Manual or E2E tests confirm that poke data is successfully loaded from DB and properly hydrated.
