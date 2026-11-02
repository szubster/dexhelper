---
id: task-081-692-preserve-enum-optimizations-retry-v3-qa
type: TASK
title: QA Preserve Enum Optimizations (Retry v3)
status: FAILED
owner_persona: qa
created_at: '2026-10-16T17:44:50.707Z'
updated_at: '2026-11-02'
depends_on:
  - task-081-691-preserve-enum-optimizations-retry-v3-impl
jules_session_id: null
parent: story-042-081-preserve-enum-optimizations
rejection_count: 0
rejection_reason: Merged with unfulfilled acceptance criteria
notes: >-
  Replacement for cancelled
  task-081-582-preserve-enum-optimizations-retry-v2-qa.
locks: []
---

# Task: QA Preserve Enum Optimizations (Retry v3)

## Objective
Verify that the enum-to-number optimizations are preserved when the data generation pipeline is transitioned to verbose keys. Ensure the implementation task resolved the findings from `research-081-690-investigate-retry-failure-v2`.

## Acceptance Criteria
- [ ] Generation script runs successfully without type errors (`pnpm run data:gen`).
- [ ] Generated `data/db/*.jsonl` files contain verbose keys mapped to integer values (e.g., `{"method": 1}`).
- [ ] The schema correctly type-checks against the newly generated data format.
