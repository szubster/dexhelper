---
id: task-081-144-preserve-enum-optimizations-retry-impl
type: TASK
title: Preserve Enum Optimizations with Verbose Keys in Generation Pipeline (Retry)
status: ACTIVE
owner_persona: coder
created_at: '2026-05-29'
updated_at: '2026-08-23'
depends_on: []
jules_session_id: '2493699443032940820'
parent: story-042-081-preserve-enum-optimizations
rejection_count: 0
rejection_reason: ''
notes: Replacement for permanently failed task-081-130.
---
# Task: Preserve Enum Optimizations with Verbose Keys in Generation Pipeline (Retry)

## Objective
Refactor the data generation pipeline (`scripts/generate-pokedata.ts`) and relevant schema types (`src/db/schema.ts`) to use verbose keys (e.g., `captureRate`, `method`) as per ADR 015, while ensuring that enum-to-number optimizations for fields like `method` and `trigger` are fully preserved. Address findings from the prerequisite research task.

## Contract Reminders
- If you abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] `scripts/generate-pokedata.ts` updated to use verbose keys instead of minified ones.
- [ ] Compact default values logic in `scripts/generate-pokedata.ts` updated to check against verbose keys.
- [ ] Enum-to-number mapping logic (e.g. `ENCOUNTER_METHOD_MAP`, `EVO_TRIGGER_MAP`) is maintained.
- [ ] `src/db/schema.ts` (if applicable) updated to reflect verbose keys while keeping enum types (number).
