---
id: story-042-081-preserve-enum-optimizations
type: STORY
title: Preserve Enum-to-Number Optimizations in Generation Pipeline
status: READY
owner_persona: tech_lead
created_at: '2026-05-21'
updated_at: '2026-08-24'
depends_on: []
jules_session_id: '12814961437781022023'
parent: epic-032-042-generation-pipeline-keys
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Story: Preserve Enum-to-Number Optimizations in Generation Pipeline

## Objective
Ensure that the enum-to-number mapping logic (like `EVO_TRIGGER`, `ENCOUNTER_METHOD`) in the data generation pipeline (`scripts/generate-pokedata.ts`) is preserved when transitioning to verbose keys, to retain existing deduplication benefits.

## Acceptance Criteria
- [ ] Enum-to-number optimizations are preserved.

### Child Nodes
- `.foundry/tasks/task-081-130-preserve-enum-optimizations-impl.md`
- `.foundry/tasks/task-081-131-preserve-enum-optimizations-qa.md`
- `.foundry/archive/research/research-081-006-investigate-enum-optimizations-failure.md`
- `.foundry/tasks/task-081-144-preserve-enum-optimizations-retry-impl.md`
- `.foundry/tasks/task-081-145-preserve-enum-optimizations-retry-qa.md`
