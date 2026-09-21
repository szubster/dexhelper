---
id: task-564-602-pokemon-held-item-tracker-extraction
type: TASK
title: Pokemon Held Item Tracker Data Extraction
status: PENDING
owner_persona: coder
created_at: '2026-09-19'
updated_at: '2026-09-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-554-564-pokemon-held-item-tracker
tags:
  - dexhelper
  - tracker
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Pokemon Held Item Tracker Data Extraction

## Description
Create src/engine/tracker/heldItemExtractor.ts that exports an extractHeldItems function which iterates over the item property of PokemonInstance in the party and PC boxes of SaveData to extract held items. Write tests in src/engine/tracker/heldItemExtractor.test.ts.

## Acceptance Criteria
- [ ] Implement extractHeldItems function.
- [ ] Add unit tests.
