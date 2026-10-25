---
id: story-576-618-multi-box-search-visual-highlighting
type: STORY
title: Multi-Box Search Visual Highlighting
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-23'
updated_at: '2026-10-25'
depends_on:
  - story-576-617-multi-box-search-ui-components
jules_session_id: '10313516529497987559'
pr_number: null
parent: epic-566-576-multi-box-search-ui
tags:
  - dexhelper
  - feature
  - search
  - pc-box
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Story: Multi-Box Search Visual Highlighting

## Context
When searching or filtering through boxes, non-matching Pokémon should be visually dimmed out, while matching Pokémon should remain fully visible. This functionality should preserve the original spatial positioning within the box.

## Objectives
- Implement visual highlighting/dimming logic based on search and filter results.
- Ensure that the spatial organization of Pokémon within their boxes is preserved (empty slots and dimmed Pokémon remain in their correct position on the grid).

## Acceptance Criteria
- [x] Tech Lead: Break down into implementation tasks for the visual highlighting logic.
- [x] task-618-703-multi-box-search-highlight-impl
- [x] task-618-704-multi-box-search-highlight-tests
- [x] task-618-705-multi-box-search-highlight-qa
- [ ] research-618-721-highlight-failure-root-cause
- [ ] task-618-722-highlight-state-layer
- [ ] task-618-723-highlight-ui-presentation
- [ ] task-618-724-highlight-tests
- [ ] task-618-725-highlight-qa
