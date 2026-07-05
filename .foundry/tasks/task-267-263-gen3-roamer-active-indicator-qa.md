---
id: task-267-263-gen3-roamer-active-indicator-qa
type: TASK
title: Gen 3 Roamer Active Indicator UI QA
status: PENDING
owner_persona: qa
created_at: '2026-07-04'
updated_at: '2026-07-04'
depends_on:
  - task-267-262-gen3-roamer-active-indicator-impl
jules_session_id: null
pr_number: null
parent: story-122-267-gen3-roamer-active-indicator-ui
tags:
  - gen3
  - roamer
  - ui
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Gen 3 Roamer Active Indicator UI QA

## Objective
Verify the implementation of the Active Status Indicator React component.

## Verification Specifications
- Ensure the component renders correctly and accepts the `active` boolean state.
- Verify that the visual state correctly updates based on the `active` prop (blinking/high contrast when active, distinct state when inactive).
- Strictly verify adherence to the ADR 008 tactical aesthetic (dashed borders, sharp corners, monospaced fonts).
- Run any associated tests to confirm component stability.

## Critical Instructions for QA
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verified component renders and toggles visual state based on `active` prop.
- [ ] Verified styling strictly matches ADR 008 constraints.
- [ ] All tests pass.