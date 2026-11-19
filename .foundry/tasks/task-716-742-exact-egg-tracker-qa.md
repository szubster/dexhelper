---
id: task-716-742-exact-egg-tracker-qa
type: TASK
title: Exact Egg Tracker QA
status: PENDING
owner_persona: qa
created_at: '2026-10-21'
updated_at: '2026-10-21'
depends_on:
  - task-716-741-exact-egg-tracker-ui-impl
jules_session_id: null
pr_number: null
parent: story-107-716-exact-egg-tracker-component
priority: 50
confidence_score: null
tags:
  - gen2
  - gen3
  - breeding
  - ui
research_references: []
rejection_count: 0
system_failure_count: 0
rejection_reason: ""
notes: ""
---

# Task: Exact Egg Tracker QA

## Context
The coder has implemented the logic and UI components for the Exact Egg Tracker to calculate and display the exact numerical step count remaining until an Egg hatches.

## Objective
Verify the correctness of the exact egg step calculations across supported generations and ensure the UI adheres to tactical hardware aesthetics.

## Scope
- Verify calculation logic tests exist and cover edge cases.
- If save parsing was modified, explicitly verify adherence to Section 13 schema guidelines (no magic numbers, module-level constants used).
- Verify the React component `ExactEggTracker` is integrated correctly.
- Verify UI strict compliance with ADR 008 & 024 (e.g., usage of `tactical-panel` and other `@utility` classes instead of repeated inline raw tailwind).

## Acceptance Criteria
- [ ] Verify logic and step calculation is correct and tested.
- [ ] Verify save parsing rules were respected if applicable.
- [ ] Verify UI aesthetics comply with ADR 008/024 and components are properly linked.
