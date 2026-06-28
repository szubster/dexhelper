---
id: task-137-209-global-ribbon-dashboard-scaffold-impl
type: TASK
title: Implement Global Ribbon Checklist Dashboard Scaffold
status: ACTIVE
owner_persona: coder
created_at: '2026-06-19'
updated_at: '2026-06-27'
depends_on: []
jules_session_id: '6931837137349097524'
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

# TASK: Implement Global Ribbon Checklist Dashboard Scaffold

## Background
We need to scaffold the `GlobalRibbonChecklistDashboard` component to provide a centralized aggregate view for checking Ribbons across the Living Dex or current PC boxes. This will leverage shared contest components from epic 064.

## Goals
1. Scaffold `GlobalRibbonChecklistDashboard` React component.
2. Integrate with Living Dex / PC Box data store.
3. Render the basic ribbon display components for the aggregated data.

## Context and Constraints
- The component must integrate with existing IndexedDB/state store structures to fetch Pokémon.
- Ensure the integration steps and tests are included for rendering the new component so it isn't orphaned.
- For complex logic or state, consider React Context or other architectural scaffolding to prevent tight coupling.
- Ensure UI responsiveness and accessibility, handling large datasets efficiently.

## Reminder for Coder/QA Personas
- **Transient Failures:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Policy:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Scaffold `GlobalRibbonChecklistDashboard` component in the frontend.
- [ ] Connect the component to read from Living Dex / PC Box data context.
- [ ] Render a list or grid displaying basic ribbon availability for each Pokémon.
- [ ] Add explicit integration tests or usage to verify rendering and prevent orphaned components.
