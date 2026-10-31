---
id: task-081-691-preserve-enum-optimizations-retry-v3-impl
type: TASK
title: >-
  Preserve Enum Optimizations with Verbose Keys in Generation Pipeline (Retry
  v3)
status: READY
owner_persona: coder
created_at: '2026-10-16T17:44:50.697Z'
updated_at: '2026-10-31'
depends_on:
  - research-081-690-investigate-retry-failure-v2
jules_session_id: null
parent: story-042-081-preserve-enum-optimizations
rejection_count: 0
rejection_reason: ''
notes: >-
  Replacement for cancelled
  task-081-581-preserve-enum-optimizations-retry-v2-impl.
locks: []
---

# Task: Preserve Enum Optimizations with Verbose Keys in Generation Pipeline (Retry v3)

## Objective
Refactor the data generation pipeline (`scripts/generate-pokedata.ts`) and relevant schema types (`src/db/schema.ts`) to use verbose keys (e.g., `method`, `trigger`) as per ADR 015, while ensuring that enum-to-number optimizations for fields like `method` and `trigger` are fully preserved. Address findings from the prerequisite research task `research-081-690-investigate-retry-failure-v2`.

## Acceptance Criteria
- [x] `scripts/generate-pokedata.ts` updated to use verbose keys instead of minified ones (e.g. `method` instead of `m`).
- [x] `src/db/schema.ts` updated to reflect verbose keys (`method`, `trigger`) while keeping enum types (number).
- [x] Enum-to-number mapping logic (e.g. `ENCOUNTER_METHOD_MAP`, `EVO_TRIGGER_MAP`) is maintained and properly mapped to the new verbose keys.
