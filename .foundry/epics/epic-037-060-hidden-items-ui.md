---
id: epic-037-060-hidden-items-ui
type: EPIC
title: Missing Hidden Items Finder UI
status: ACTIVE
owner_persona: story_owner
created_at: '2026-06-04'
updated_at: '2026-06-28'
depends_on:
  - epic-037-059-hidden-items-data-layer
jules_session_id: '9539578262221732459'
pr_number: null
parent: prd-068-037-hidden-items-finder
tags:
  - feature
  - tool
  - quality-of-life
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Missing Hidden Items Finder UI

## 1. Context & Background
This Epic corresponds to the third requirement in the Missing Hidden Items Finder PRD (`prd-068-037-hidden-items-finder`). We need to present the unified, dynamic checklist to the user in a dedicated view within DexHelper.

## 2. Product Requirements
- Create a dedicated "Missing Hidden Items Finder" view within DexHelper.
- Display a categorized checklist of valuable hidden items (grouped by route, town, or region).
- Dynamically check off items that the player has already picked up in their current save file.
- Implement the 'tactical hardware/snooping' aesthetic (sharp edges, dashed borders, monospaced telemetry fonts) for this component as defined in ADR 008.

## 3. Acceptance Criteria
- [ ] UI component is built displaying the checklist, filtered and grouped logically.
- [ ] UI updates dynamically to check off acquired items upon save file hydration.
- [ ] E2E tests verify the new view correctly renders based on an initialized save state.

## 4. Generated Stories
- [ ] .foundry/stories/story-060-156-hidden-items-checklist-component.md
- [ ] .foundry/stories/story-060-157-hidden-items-e2e-tests.md
