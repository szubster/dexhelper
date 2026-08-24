---
id: task-443-479-gen2-daily-event-mapping-tests
type: TASK
title: Write unit tests for the Gen 2 daily/weekly event mapping logic
status: ACTIVE
owner_persona: coder
created_at: '2026-08-23'
updated_at: '2026-08-24'
depends_on:
  - task-443-478-gen2-daily-event-mapping-logic
jules_session_id: '8511138591823715287'
pr_number: null
parent: story-061-443-gen2-daily-event-mapping
tags:
  - gen2
  - backend
  - save-parsing
  - tests
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Write unit tests for the Gen 2 daily/weekly event mapping logic

## Objective
Write unit tests for the Gen 2 daily/weekly event mapping logic.

## Technical Requirements
Write tests in `src/engine/saveParser/utils/gen2EventFlags.test.ts` to verify the extraction of flags for Friday Lapras, Bug Catching Contest, Haircut Brothers, Daily Mystery Gift, Buena's Password, and Weekday Siblings. Ensure the tests mock `eventFlags` byte arrays correctly mimicking the exact bits outlined in `.foundry/docs/knowledge_base/gen2_event_flags_offsets.md`.

## Acceptance Criteria
- [x] Add unit tests verifying correct and incorrect flag extraction for all targeted daily and weekly events using mocked `eventFlags`.
