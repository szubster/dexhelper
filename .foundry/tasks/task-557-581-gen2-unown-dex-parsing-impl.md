---
id: task-557-581-gen2-unown-dex-parsing-impl
type: TASK
title: Implement Gen 2 Unown Dex Parsing
status: ACTIVE
owner_persona: coder
created_at: '2026-09-19T20:04:53Z'
updated_at: '2026-09-20'
depends_on: []
jules_session_id: '13544502924622838168'
parent: story-338-557-gen2-unown-dex-parsing-retry
tags:
  - feature
  - gen2
  - unown
rejection_count: 0
rejection_reason: ''
locks: []
---

# Implement Gen 2 Unown Dex Parsing

## Context
As part of the Gen 2 Unown Dex Progress Tracker epic, we need to extract the caught Unown forms from the save file. The Unown Dex save block data contains 26 bytes representing the forms of the Unown the player has caught, where each byte is the form index (0-25).

Research confirms the following WRAM offsets for `wUnownDex`:
- Gold/Silver: `0x2A8C` (32 bytes after `POKEDEX_SEEN_OFFSET_GS`)
- Crystal: `0x2AA9` (32 bytes after `POKEDEX_SEEN_OFFSET_CRYSTAL`)

## Acceptance Criteria
- [ ] Add an `unownDex` property to the `Gen2SaveData` interface in `src/engine/saveParser/parsers/common.ts` (e.g., `unownDex?: number[]`).
- [ ] Implement parsing logic in `src/engine/saveParser/parsers/gen2.ts` to extract the 26-byte array for the caught Unown forms, using the correct offsets for GS and Crystal.
- [ ] Adhere to the Save File Parsing constraints (Schema Document Section 13), defining module-level constants for offsets and bounds.
