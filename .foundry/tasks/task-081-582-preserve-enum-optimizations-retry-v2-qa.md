---
id: task-081-582-preserve-enum-optimizations-retry-v2-qa
type: TASK
title: QA Preserve Enum Optimizations (Retry v2)
status: READY
owner_persona: qa
created_at: '2026-09-15T23:54:49Z'
updated_at: '2026-09-15T23:54:49Z'
depends_on:
  - task-081-581-preserve-enum-optimizations-retry-v2-impl
jules_session_id: null
parent: story-042-081-preserve-enum-optimizations
rejection_count: 0
rejection_reason: ''
notes: 'Replacement for orphaned task-081-145.'
locks: []
---
# Task: QA Preserve Enum Optimizations (Retry v2)

## Objective
Verify that the enum-to-number optimizations are preserved when the data generation pipeline is transitioned to verbose keys. Ensure the implementation task resolved the findings from `research-081-575-investigate-retry-failure`.

## Acceptance Criteria
- [ ] Generation script runs successfully without type errors (`pnpm run data:gen`).
- [ ] Generated `data/db/*.jsonl` files contain verbose keys mapped to integer values (e.g., `{"method": 1}`).
- [ ] The schema correctly type-checks against the newly generated data format.
