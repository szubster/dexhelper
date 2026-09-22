---
id: task-562-582-gen2-moms-savings-ui
type: TASK
title: Update Gen 2 Mom's Savings Dashboard UI
status: FAILED
owner_persona: coder
created_at: '2026-09-15T11:52:50Z'
updated_at: '2026-09-22'
depends_on:
  - task-562-581-gen2-moms-savings-logic
jules_session_id: null
pr_number: null
parent: story-312-562-gen2-mom-savings-tracker-ui-core
tags:
  - gen2
  - ui
  - react
research_references: []
rejection_count: 1
rejection_reason: >-
  [ACKNOWLEDGED] Autonomous No-Ask Policy Violation: Session entered
  AWAITING_USER_FEEDBACK
notes: ''
locks: []
---

# Task: Update Gen 2 Mom's Savings Dashboard UI

## Overview
Update the `Gen2SavingsDashboard` component to use the new threshold logic and accurately display Mom's savings progress.

## Requirements
- Refactor `Gen2SavingsDashboard` to use the `useParsedSaveData` hook from `EmulatorContext` instead of `useStore` to access `saveData`, ensuring reactive real-time updates.
- Integrate the threshold utility function to calculate the next unlock goal.
- Render a UI element showing the progress toward the next unlock (e.g., amount remaining, name of the next doll).
- Display a specific message when all thresholds have been reached.
- Ensure the UI adheres to the tactical hardware aesthetic constraints (ADR 008): sharp edges, dashed borders, and monospaced fonts.
- Add or update component rendering tests using `vitest-browser-react`.

## Acceptance Criteria
- [ ] `Gen2SavingsDashboard` uses `useParsedSaveData` from `EmulatorContext`.
- [ ] Progress UI element accurately reflects the next decoration threshold or completion.
- [ ] UI strictly conforms to ADR 008 aesthetic guidelines.
- [ ] Component tests pass.
