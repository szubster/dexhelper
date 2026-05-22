---
id: story-042-081-preserve-enum-optimizations
type: STORY
title: Preserve Enum-to-Number Optimizations in Generation Pipeline
status: READY
owner_persona: tech_lead
created_at: '2026-05-21'
updated_at: '2026-05-22'
depends_on: []
jules_session_id: null
parent: epic-032-042-generation-pipeline-keys
rejection_reason: ''
notes: ''
rejection_count: 1
---

# Story: Preserve Enum-to-Number Optimizations in Generation Pipeline

## Objective
Ensure that the enum-to-number mapping logic (like `EVO_TRIGGER`, `ENCOUNTER_METHOD`) in the data generation pipeline (`scripts/generate-pokedata.ts`) is preserved when transitioning to verbose keys, to retain existing deduplication benefits.

## Acceptance Criteria
- [ ] Enum-to-number optimizations are preserved.
