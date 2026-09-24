---
id: epic-566-576-multi-box-search-ui
type: EPIC
title: Multi-Box Search UI
status: ACTIVE
owner_persona: story_owner
created_at: '2026-09-18'
updated_at: '2026-09-23'
depends_on: []
jules_session_id: '1738735071442386008'
pr_number: null
parent: prd-524-566-multi-box-search-filtering
tags:
  - dexhelper
  - feature
  - ui
  - pc-box
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Epic: Multi-Box Search UI

## Objective
Implement the UI components for the Multi-Box Search and Filtering system, ensuring it meets visual highlighting constraints.

## Scope
- Implement a text input field for global search.
- Implement dropdowns/toggles for attribute filters (Nature, Ability, Gender, Held Item).
- Implement visual highlighting logic: dim non-matching Pokémon and keep matches fully visible.
- Ensure spatial organization of the boxes does not break (empty slots and non-matching Pokémon still occupy their normal grid positions).

## Acceptance Criteria
- [x] Story Owner: Break down this Epic into implementation stories for the search UI components.
- [ ] story-576-617-multi-box-search-ui-components
- [ ] story-576-618-multi-box-search-visual-highlighting
- [ ] story-576-619-multi-box-search-ui-e2e
