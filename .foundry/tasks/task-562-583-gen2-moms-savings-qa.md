---
id: task-562-583-gen2-moms-savings-qa
type: TASK
title: QA Verification for Gen 2 Mom's Savings UI
status: PENDING
owner_persona: qa
created_at: '2026-09-15T11:52:50Z'
updated_at: '2026-09-15T11:52:50Z'
depends_on:
  - task-562-582-gen2-moms-savings-ui
jules_session_id: null
pr_number: null
parent: story-312-562-gen2-mom-savings-tracker-ui-core
tags:
  - qa
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: QA Verification for Gen 2 Mom's Savings UI

## Overview
Perform Quality Assurance verification on the newly implemented Gen 2 Mom's Savings progression logic and UI component.

## Requirements
- Verify that the constants for room decorations match the specifications.
- Verify that the `Gen2SavingsDashboard` component integrates correctly into the view hierarchy and handles real-time updates via `useParsedSaveData`.
- Check that the UI correctly displays progression when current money is below, between, or above various thresholds.
- Verify that the "all thresholds reached" state renders correctly.
- Enforce strict adherence to ADR 008 UI aesthetic constraints (tactical hardware, sharp edges, no rounded corners except full, dashed borders).
- Ensure no prohibited testing libraries (`@testing-library/*`) are used.

## Acceptance Criteria
- [ ] Progression logic is accurate according to Gen 2 specifications.
- [ ] UI correctly renders progression states and the maximum threshold state.
- [ ] Component aesthetics comply with ADR 008.
- [ ] Code has been tested with `vitest-browser-react` and all tests pass.
