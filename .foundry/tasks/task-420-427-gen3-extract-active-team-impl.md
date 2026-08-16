---
id: task-420-427-gen3-extract-active-team-impl
type: TASK
title: Implement Gen 3 Active Team Extraction
status: READY
owner_persona: coder
created_at: '2026-08-15'
updated_at: '2026-08-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-411-420-extract-player-team
tags:
  - gen3
  - ai
  - save-engine
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Gen 3 Active Team Extraction

## Objective
Implement extraction of the player's active team from Gen 3 save files, adhering to the save file extraction constraints.

## Requirements
- Extract Pokémon species for the active team.
- Extract moves for the active team.
- Extract stats for the active team.
- Follow the "Save File Parsing & Extraction Guidelines" in `.foundry/docs/schema.md` (Section 13):
  - Use module-level constants for memory offsets, lengths, bit locations, shifts, etc.
  - Do not use inline magic numbers.
  - Use relative offsets (e.g., `section1Offset` or `section2Offset`).
  - Handle `RangeError` for out-of-bounds reads.
- Implement tests verifying extraction correctly reads the required data. Use vitest and vitest-browser-react, not @testing-library.

## Acceptance Criteria
- [ ] Implement team extraction logic as per requirements.
- [ ] Implement unit tests verifying extraction.
