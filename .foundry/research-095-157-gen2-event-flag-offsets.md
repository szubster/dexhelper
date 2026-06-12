---
id: research-095-157-gen2-event-flag-offsets
type: RESEARCH
title: Investigate Gen 2 Event Flag Offsets
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-12'
updated_at: '2026-06-12'
depends_on: []
jules_session_id: '15699941148486904611'
pr_number: null
parent: task-095-157-gen2-event-flag-impl
tags:
  - gen2
  - backend
  - save-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Gen 2 Event Flag Offsets

## Context
During the implementation of `task-095-157-gen2-event-flag-impl`, the exact memory offsets for event flags in Gen 2 (Gold/Silver and Crystal) save files could not be definitively confirmed. While the general structure suggests `0x283E` for GS and `0x281A` for Crystal, these offsets might be incorrect due to the "Shift Phenomenon" and differences in RAM architecture or localized builds.

## Goal
To successfully extract the correct event flag bytes using the `DataView` API, we need precise offset mapping and to ensure the extracted bounds match what is required by the `eventFlags` property in `SaveData`.

## Tasks
1. Investigate and document the exact start offset for event flags in both GS and Crystal saves.
2. Determine the exact length of the event flags block.
3. Confirm if any additional shifts occur depending on the specific locale version of the game or other variables.
4. Update `.foundry/docs/knowledge_base/engine/save_parsing/gen2_generic_structure.md` with the verified offsets.
