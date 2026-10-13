---
id: story-042-081-preserve-enum-optimizations
type: STORY
title: Preserve Enum-to-Number Optimizations in Generation Pipeline
status: PENDING
owner_persona: tech_lead
created_at: '2026-05-21'
updated_at: '2026-09-20'
depends_on: []
jules_session_id: null
parent: epic-032-042-generation-pipeline-keys
rejection_count: 2
rejection_reason: ''
notes: ''
locks: []
---

# Story: Preserve Enum-to-Number Optimizations in Generation Pipeline

## Objective
Ensure that the enum-to-number mapping logic (like `EVO_TRIGGER`, `ENCOUNTER_METHOD`) in the data generation pipeline (`scripts/generate-pokedata.ts`) is preserved when transitioning to verbose keys, to retain existing deduplication benefits.

## Acceptance Criteria
- [ ] task-081-582-preserve-enum-optimizations-retry-v2-qa
- [ ] task-081-581-preserve-enum-optimizations-retry-v2-impl
- [ ] research-081-575-investigate-retry-failure
- [x] task-081-145-preserve-enum-optimizations-retry-qa
- [x] task-081-144-preserve-enum-optimizations-retry-impl
- [x] task-081-131-preserve-enum-optimizations-qa
- [x] task-081-130-preserve-enum-optimizations-impl
- [x] research-081-006-investigate-enum-optimizations-failure
- [ ] Enum-to-number optimizations are preserved.
