---
id: task-443-480-gen2-daily-event-mapping-qa
type: TASK
title: Verify correctness of the Gen 2 daily/weekly event mapping
status: ACTIVE
owner_persona: qa
created_at: '2026-08-23'
updated_at: '2026-08-25'
depends_on:
  - task-443-479-gen2-daily-event-mapping-tests
jules_session_id: '9757209009654844353'
pr_number: null
parent: story-061-443-gen2-daily-event-mapping
tags:
  - gen2
  - backend
  - save-parsing
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Verify correctness of the Gen 2 daily/weekly event mapping

## Objective
Verify correctness of the Gen 2 daily/weekly event mapping.

## Technical Requirements
Review the implemented logic in `src/engine/saveParser/utils/gen2EventFlags.ts` against `.foundry/docs/knowledge_base/gen2_event_flags_offsets.md`. Ensure that bits are correctly offset from bytes, and that boolean mapping appropriately reflects the completion states of the time-gated events. Review that tests provide adequate coverage.

## Acceptance Criteria
- [ ] Verify event bits are offset correctly and tests cover the mapping matrix.
