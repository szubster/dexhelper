---
id: task-081-131-preserve-enum-optimizations-qa
type: TASK
title: QA Preserve Enum Optimizations
status: CANCELLED
owner_persona: qa
created_at: '2026-05-22'
updated_at: '2026-08-23'
depends_on:
  - task-081-130-preserve-enum-optimizations-impl
jules_session_id: null
parent: story-042-081-preserve-enum-optimizations
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-081-130-preserve-enum-optimizations-impl
notes: ''
---

# Task: QA Preserve Enum Optimizations

**CANCELLED:** This task is orphaned because the prerequisite implementation task failed permanently. It has been replaced by `.foundry/tasks/task-081-145-preserve-enum-optimizations-retry-qa.md`.

## Objective
Verify that the enum-to-number optimizations are preserved when the data generation pipeline was transitioned to verbose keys.

## Acceptance Criteria
- [ ] Generation script runs successfully without type errors (`pnpm run data:gen`).
- [ ] Generated `data/db/*.jsonl` files contain verbose keys (e.g. `method`) mapped to integer values (e.g. 1, 2) rather than strings.
- [ ] The schema correctly type-checks against the newly generated data format.
