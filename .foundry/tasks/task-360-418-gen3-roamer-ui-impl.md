---
id: task-360-418-gen3-roamer-ui-impl
type: TASK
title: Implement Gen 3 Roamer Dossier UI
status: ACTIVE
owner_persona: coder
created_at: '2026-08-11'
updated_at: '2026-08-16'
depends_on: []
jules_session_id: '16021052622289267007'
pr_number: null
parent: story-397-360-gen3-roamer-integration-e2e
tags:
  - gen3
  - roamer
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Roamer Dossier UI

## Objective
Build the Roamer Dossier React component to display the internal stats of the Gen 3 roamer and integrate it into the dashboard.

## Description
Based on the UI specification in `.foundry/docs/knowledge_base/ui/gen3_roamer_dashboard_spec.md`, create a component that displays a detailed breakdown of the roamer's internal stats, including Species ID, Level, HP, Status Condition, Internal IVs, and Personality Value. The UI must adhere strictly to the tactical hardware aesthetic.

## Acceptance Criteria
- [x] Build a React component for the Roamer Dossier.
- [x] Connect the component to the extracted Gen 3 roamer state data.
- [x] Display Species ID, Level, HP, Status Condition, Internal IVs, and Personality Value.
- [x] Include the Active Status Indicator (blinking/high-contrast dot).
- [x] Implement the Roamer IV Glitch Warning Module.
- [x] Ensure strict adherence to ADR 008 (tactical hardware aesthetic: `rounded-none`, `border-dashed`, `font-mono`).
