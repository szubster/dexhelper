---
id: task-081-145-preserve-enum-optimizations-retry-qa
type: TASK
title: QA Preserve Enum Optimizations (Retry)
status: PENDING
owner_persona: qa
created_at: '2026-05-29'
updated_at: '2026-05-29'
depends_on:
  - task-081-144-preserve-enum-optimizations-retry-impl
jules_session_id: null
parent: story-042-081-preserve-enum-optimizations
rejection_count: 0
rejection_reason: ''
notes: 'Replacement for orphaned task-081-131.'
---

# Task: QA Preserve Enum Optimizations (Retry)

## Objective
Verify that the enum-to-number optimizations are preserved when the data generation pipeline is transitioned to verbose keys.

## Contract Reminders
- If you abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Generation script runs successfully without type errors (`pnpm run data:gen`).
- [ ] Generated `data/db/*.jsonl` files contain verbose keys (e.g. `method`) mapped to integer values (e.g. 1, 2) rather than strings.
- [ ] The schema correctly type-checks against the newly generated data format.
