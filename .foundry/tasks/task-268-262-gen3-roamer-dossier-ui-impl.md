---
id: task-268-262-gen3-roamer-dossier-ui-impl
type: TASK
title: Gen 3 Roamer Dossier UI Implementation
status: READY
owner_persona: coder
created_at: '2026-07-04'
updated_at: '2026-07-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-122-268-gen3-roamer-dossier-ui
tags:
  - gen3
  - roamer
  - ui
  - react
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer Dossier UI Implementation

## Objective
Implement the Roamer Dossier component to display the Gen 3 roamer's internal stats and state, adhering to the tactical hardware aesthetic.

## Context
Based on the UI spec in `.foundry/docs/knowledge_base/ui/gen3_roamer_dashboard_spec.md`, the dashboard shifts to a data-driven "Roamer Dossier". We need a React component to visualize this data, including an Active Status Indicator, detailed stat breakdown (Species, Level, HP, Status, IVs, Personality Value), and an IV Glitch Warning module.

## Acceptance Criteria
- [ ] Implement the `RoamerDossier` React component.
- [ ] Connect the component to the extracted Gen 3 roamer state data.
- [ ] Include an Active Status Indicator (blinking/high-contrast when active).
- [ ] Display the roamer's Species ID (resolved to name), Level, HP, Status Condition, Internal IVs, and Personality Value.
- [ ] Implement the Roamer IV Glitch Warning Module (displaying a warning if the IVs exhibit the glitch signature).
- [ ] Apply the tactical hardware aesthetic (`border-dashed`, `rounded-none`, `font-mono`) as per ADR 008.
- [ ] Verify component rendering integration (e.g. through a test or storybook/preview rendering).

## Coder Contract Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- When drafting blueprints for save file parsing, explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.
