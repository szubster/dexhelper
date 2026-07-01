---
id: story-078-122-gen3-parse-battle-frontier-symbols
type: STORY
title: Gen 3 Parse Battle Frontier Symbols
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-06-12'
updated_at: '2026-06-29'
depends_on:
  - story-078-121-gen3-parse-battle-frontier-win-streaks
jules_session_id: null
pr_number: null
parent: epic-046-078-gen3-battle-frontier-data-extraction
tags:
  - feature
  - gen3
  - endgame
research_references:
  - research-046-140-gen3-battle-frontier
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Parse Battle Frontier Symbols

## Description
Extract the Gold and Silver symbol status flags for the 7 Battle Frontier facilities from the SaveBlock1 flags array, using `DataView` for bit manipulation, as discovered in `research-046-140-gen3-battle-frontier`.

## Acceptance Criteria
- [x] Parse Silver and Gold symbol flags for all 7 facilities.
- [x] Read correctly using byte offsets and bit indices within the flags array.
- [x] Fail gracefully if out of bounds.

### Tasks
- [x] task-122-234-parse-battle-frontier-symbols-impl
- [x] task-122-235-parse-battle-frontier-symbols-qa
