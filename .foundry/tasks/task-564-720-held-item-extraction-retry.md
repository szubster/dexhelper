---
id: task-564-720-held-item-extraction-retry
type: TASK
title: Pokemon Held Item Tracker Data Extraction Retry
status: READY
owner_persona: coder
created_at: '2026-10-23'
updated_at: '2026-10-23'
depends_on:
  - research-564-719-investigate-held-item-extraction-failure
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

# Pokemon Held Item Tracker Data Extraction Retry

## Description
Create src/engine/tracker/heldItemExtractor.ts that exports an extractHeldItems function which iterates over the item property of PokemonInstance in the party and PC boxes of SaveData to extract held items. Apply the findings from the research node to correctly handle duplicate items without using a `Set`. Write tests in src/engine/tracker/heldItemExtractor.test.ts.

## Acceptance Criteria
- [ ] Implement extractHeldItems function.
- [ ] Add unit tests.
