---
id: task-287-417-highlight-high-value-calls-ui-qa
type: TASK
title: QA - Highlight High Value Calls UI
status: READY
owner_persona: qa
created_at: '2026-08-10'
updated_at: '2026-08-18'
depends_on:
  - task-287-416-active-callers-dashboard-integration
jules_session_id: null
pr_number: null
parent: story-118-287-highlight-high-value-calls-ui
tags:
  - feature
  - gen2
  - ui
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA - Highlight High Value Calls UI

## Objective
Verify that the `TacticalCallerCard` component correctly renders high-value Pokegear callers (SWARM and ITEM) with distinct styling in the `ActiveCallersDashboard`, adhering to tactical aesthetics.

## Context
The Coder has implemented a new `TacticalCallerCard` and integrated it into the `ActiveCallersDashboard`. We need to verify that this implementation satisfies the visual requirements and correctly identifies SWARM and ITEM callers using the `GEN2_PHONE_CALLER_REGISTRY`.

## Acceptance Criteria
- [x] Review `src/components/dashboard/pokegear/TacticalCallerCard.tsx` to ensure it applies distinct styles for `SWARM` and `ITEM` callers, falling back to a standard style for others.
- [x] Verify that `TacticalCallerCard` strictly adheres to ADR 008 (tactical hardware aesthetic), specifically checking for `rounded-none`, `border-dashed`, and monospaced font usage.
- [x] Review `src/components/dashboard/pokegear/ActiveCallersDashboard.tsx` to ensure it correctly maps contacts against `GEN2_PHONE_CALLER_REGISTRY` and passes the required props to the `TacticalCallerCard`.
- [x] Run the test suite (`pnpm test`) and verify that `ActiveCallersDashboard.test.tsx` and `TacticalCallerCard.test.tsx` accurately assert the presence of high-value styling and badges.
- [x] Ensure no regressions were introduced to the dashboard's empty state or cooldown visualizations.
