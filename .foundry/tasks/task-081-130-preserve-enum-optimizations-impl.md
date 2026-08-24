---
id: task-081-130-preserve-enum-optimizations-impl
type: TASK
title: Preserve Enum Optimizations with Verbose Keys in Generation Pipeline
status: CANCELLED
owner_persona: coder
created_at: '2026-05-22'
updated_at: '2026-08-23'
depends_on: []
jules_session_id: null
parent: story-042-081-preserve-enum-optimizations
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
notes: >-
  ADR 015 specifies using verbose keys while preserving enum-to-number
  optimizations.
---

# Task: Preserve Enum Optimizations with Verbose Keys in Generation Pipeline

## Objective
Refactor the data generation pipeline (`scripts/generate-pokedata.ts`) and relevant schema types (`src/db/schema.ts`) to use verbose keys (e.g., `captureRate`, `method`) as per ADR 015, while ensuring that enum-to-number optimizations for fields like `method` and `trigger` are fully preserved.

## Acceptance Criteria
- [ ] `scripts/generate-pokedata.ts` updated to use verbose keys instead of minified ones.
- [ ] Compact default values logic in `scripts/generate-pokedata.ts` updated to check against verbose keys (e.g. `method` instead of `m`).
- [ ] `src/db/schema.ts` (if applicable) updated to reflect verbose keys in `CompactEncounterDetail` and `CompactChainLink` types while keeping enum types (number).
- [ ] Enum-to-number mapping logic (e.g. `ENCOUNTER_METHOD_MAP`, `EVO_TRIGGER_MAP`) is maintained.
