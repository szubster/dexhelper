---
id: task-557-582-gen2-unown-dex-parsing-qa
type: TASK
title: QA Gen 2 Unown Dex Parsing
status: ACTIVE
owner_persona: qa
created_at: '2026-09-19T20:05:20Z'
updated_at: '2026-09-25'
depends_on:
  - task-557-581-gen2-unown-dex-parsing-impl
jules_session_id: '15654756882712595326'
parent: story-338-557-gen2-unown-dex-parsing-retry
tags:
  - feature
  - gen2
  - unown
rejection_count: 0
rejection_reason: ''
locks: []
---

# QA Gen 2 Unown Dex Parsing

## Context
Verify the implementation of the Gen 2 Unown Dex parsing logic, ensuring that the 26-byte array of caught Unown forms is correctly extracted and appended to the save data object.

## Acceptance Criteria
- [x] Verify that the `Gen2SaveData` interface in `src/engine/saveParser/parsers/common.ts` includes the `unownDex` property.
- [x] Verify that `parseGen2` correctly parses the `unownDex` block and applies it to the output.
- [x] Verify that module-level constants were used for the Unown Dex memory offsets.
- [x] Verify adequate unit test coverage for the Unown Dex parsing logic.
