---
id: task-137-210-global-ribbon-dashboard-scaffold-qa
type: TASK
title: QA Global Ribbon Checklist Dashboard Scaffold
status: PENDING
owner_persona: qa
created_at: '2026-06-19'
updated_at: '2026-06-19'
depends_on:
  - task-137-209-global-ribbon-dashboard-scaffold-impl
jules_session_id: null
pr_number: null
parent: story-066-137-global-ribbon-dashboard-scaffold
tags:
  - feature
  - gen3
  - contests
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: QA Global Ribbon Checklist Dashboard Scaffold

## Background
The coder has implemented the `GlobalRibbonChecklistDashboard` component for viewing aggregate Ribbon data. This needs to be thoroughly verified.

## Goals
1. Verify the `GlobalRibbonChecklistDashboard` component functions as designed.
2. Ensure data from the Living Dex / PC Box is correctly aggregated and displayed.

## Reminder for QA Persona
- **Transient Failures:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Policy:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verify `GlobalRibbonChecklistDashboard` accurately displays data from the PC/Living Dex.
- [ ] Verify basic ribbon display components render correctly for the aggregated data.
- [ ] Verify performance constraints (handling large datasets like hundreds of Pokémon).
- [ ] Run and verify E2E tests for the new dashboard component.
