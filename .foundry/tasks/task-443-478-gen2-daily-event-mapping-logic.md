---
id: task-443-478-gen2-daily-event-mapping-logic
type: TASK
title: Implement extraction logic for Gen 2 Daily and Weekly Events
status: PENDING
owner_persona: coder
created_at: '2026-08-23'
updated_at: '2026-08-24'
depends_on:
  - task-443-477-gen2-daily-event-mapping-types
jules_session_id: null
pr_number: null
parent: story-061-443-gen2-daily-event-mapping
tags:
  - gen2
  - backend
  - save-parsing
  - logic
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement extraction logic for Gen 2 Daily and Weekly Events

## Objective
Implement extraction logic for Gen 2 Daily and Weekly Events.

## Technical Requirements
Map the specific bit indices and bytes documented in `.foundry/docs/knowledge_base/gen2_event_flags_offsets.md` into a new utility function `parseGen2DailyEvents` in `src/engine/saveParser/utils/gen2EventFlags.ts`. Invoke this function in `parseGen2` within `src/engine/saveParser/parsers/gen2.ts` to populate the `gen2DailyEvents` property of `Gen2SaveData`.

## Acceptance Criteria
- [ ] Implement `parseGen2DailyEvents` in `src/engine/saveParser/utils/gen2EventFlags.ts` mapping daily and weekly events from the event flags byte array.
- [ ] Invoke `parseGen2DailyEvents` in `src/engine/saveParser/parsers/gen2.ts` and attach the result to the parsed `SaveData`.
