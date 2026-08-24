---
id: task-443-477-gen2-daily-event-mapping-types
type: TASK
title: Extend Gen2SaveData for Gen 2 Daily and Weekly Events
status: ACTIVE
owner_persona: coder
created_at: '2026-08-23'
updated_at: '2026-08-24'
depends_on: []
jules_session_id: '4074480562967157086'
pr_number: null
parent: story-061-443-gen2-daily-event-mapping
tags:
  - gen2
  - backend
  - save-parsing
  - types
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Extend Gen2SaveData for Gen 2 Daily and Weekly Events

## Objective
Extend the `Gen2SaveData` interface in `src/engine/saveParser/parsers/common.ts` to support Gen 2 daily and weekly events.

## Technical Requirements
Add a new `gen2DailyEvents` property to the `Gen2SaveData` interface in `src/engine/saveParser/parsers/common.ts`. This property should be a structured object containing boolean states for the following events, based on offsets from `.foundry/docs/knowledge_base/gen2_event_flags_offsets.md`:
- Friday Lapras (ID 1888)
- Bug Catching Contest (IDs 1814-1833)
- Haircut Brothers (IDs 1876, 1877)
- Daily Mystery Gift (ID 1809)
- Buena's Password (IDs 670, 828, 829)
- Weekday Siblings (IDs 1886, 1881, 1884, 1882, 1880, 1885, 1883)

## Acceptance Criteria
- [x] Add `gen2DailyEvents` to `Gen2SaveData` interface in `common.ts` with types for the specified daily and weekly events.
