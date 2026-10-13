---
id: task-563-670-routes-encounters-qa
type: TASK
title: 'Routes, Encounters, and Drop Rates QA'
status: CANCELLED
owner_persona: qa
created_at: '2026-10-07'
updated_at: '2026-10-10'
depends_on:
  - task-563-669-routes-encounters-tests-impl
jules_session_id: null
pr_number: null
parent: story-555-563-routes-encounters-drop-rates
tags:
  - dexhelper
  - qa
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-563-667-routes-encounters-data-fetching-impl
notes: ''
locks: []
---

# Task: Routes, Encounters, and Drop Rates QA

## Context
QA verification is required for the new Routes, Encounters, and Drop Rates UI to ensure it functions correctly and meets the tactical aesthetic guidelines.

## Requirements
- Verify that selecting an item correctly displays its routes, encounters, and drop rates.
- Ensure the UI components strict adherence to the tactical hardware aesthetic (ADR 008).
- Verify tests are comprehensive and pass.

## Acceptance Criteria
- [ ] qa: Verify data display accuracy.
- [ ] qa: Verify adherence to ADR 008 styling constraints.
