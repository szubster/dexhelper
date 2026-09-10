---
id: task-336-569-update-runtime-interfaces-keys-qa-v2
type: TASK
title: Update Runtime Interfaces to Verbose Keys QA (v2)
status: READY
owner_persona: qa
created_at: '2026-09-10'
updated_at: '2026-09-10'
depends_on:
  - task-336-568-update-runtime-interfaces-keys-impl-v2
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
locks: []
---

# Task: Update Runtime Interfaces to Verbose Keys QA (v2)

## Objective
Verify the implementation of ADR 015, ensuring the application runtime uses verbose keys correctly and all type safety/tests pass.

## Acceptance Criteria
- [ ] Application compiles without type errors.
- [ ] Tests and linter pass.
- [ ] Manual or E2E tests confirm that poke data is successfully loaded from DB and properly hydrated.
