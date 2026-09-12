---
id: task-558-568-rs-battle-tower-data-parsing-impl
type: TASK
title: Implement Ruby/Sapphire Battle Tower Data Extraction
status: READY
owner_persona: coder
created_at: '2026-09-12'
updated_at: '2026-09-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-078-558-rs-battle-tower-data-parsing
tags:
  - feature
  - gen3
  - endgame
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Ruby/Sapphire Battle Tower Data Extraction

## Description
Implement the extraction of Battle Tower win streaks and records for Ruby/Sapphire save files using `DataView`.

## Acceptance Criteria
- [ ] Parse Level 50 max win streak (record) from SaveBlock2 offset `0x0560`.
- [ ] Parse Level 100 max win streak (record) from SaveBlock2 offset `0x0562`.
- [ ] Parse Level 50 current win streak from SaveBlock2 offset `0x0574`.
- [ ] Parse Level 100 current win streak from SaveBlock2 offset `0x0576`.
- [ ] Integrate this parsing logic into the existing Gen 3 parser.
- [ ] Write unit tests verifying the extraction logic using mocked `DataView` buffers.
