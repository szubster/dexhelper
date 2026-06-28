---
id: task-132-206-unown-dex-data-integration-impl
type: TASK
title: Unown Dex Panel Data Integration Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-06-19'
updated_at: '2026-06-27'
depends_on: []
jules_session_id: '793392214438386512'
pr_number: null
parent: story-059-132-unown-dex-data-integration
tags:
  - feature
  - gen2
  - tracking
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Unown Dex Panel Data Integration Implementation

## Objective
Implement the data integration logic for the Unown Dex Panel UI component as described in `story-059-132-unown-dex-data-integration`.

## Logic
Determine which of the 26 Unown forms (A-Z) the player possesses in their active party or PC boxes by aggregating the `unownForm` properties from the save file data instances. Surface the missing/owned states to the Unown Dex Panel UI component.

## Constraints and Scaffolding
- You must map the `unownForm` property from the save file data instances to the UI component.
- Ensure the Unown Dex Panel UI component properly reflects the owned/missing states for the 26 Unown forms based on the save file data.
- Integrate the newly built UI panel with the parsed `unownForm` data.

## Important Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Data integration logic mapping the `unownForm` property to the Unown Dex Panel UI component is implemented.
- [ ] The UI component correctly displays the owned/missing states for the 26 Unown forms.
- [ ] Appropriate tests are added to verify the integration.
