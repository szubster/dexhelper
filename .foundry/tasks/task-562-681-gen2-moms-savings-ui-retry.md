---
id: task-562-681-gen2-moms-savings-ui-retry
type: TASK
title: Update Gen 2 Mom's Savings Dashboard UI (Retry)
status: CANCELLED
owner_persona: coder
created_at: '2026-10-12T00:00:00Z'
updated_at: '2026-10-17'
depends_on:
  - research-562-680-investigate-moms-savings-ui-failure
jules_session_id: null
pr_number: null
parent: story-312-562-gen2-mom-savings-tracker-ui-core
tags:
  - gen2
  - ui
  - react
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  research-562-680-investigate-moms-savings-ui-failure
notes: ''
locks: []
---

# Task: Update Gen 2 Mom's Savings Dashboard UI (Retry)

## Overview
Update the `Gen2SavingsDashboard` component based on findings from the research phase to resolve previous QA rejections.

## Requirements
- Review findings in `research-562-680-investigate-moms-savings-ui-failure` for specific constraints.
- Refactor `Gen2SavingsDashboard` to use the `useParsedSaveData` hook from `EmulatorContext` instead of `useStore`.
- Integrate the threshold utility function to calculate the next unlock goal.
- Render progress toward the next unlock.
- Handle the case where all thresholds have been reached.
- Ensure strict compliance with ADR 008 (tactical hardware, sharp edges, dashed borders, monospaced fonts, no rounded corners except full).
- Update component rendering tests using `vitest-browser-react`.

## Acceptance Criteria
- [ ] `Gen2SavingsDashboard` uses `useParsedSaveData`.
- [ ] UI accurately reflects threshold progression or completion.
- [ ] UI strictly conforms to ADR 008.
- [ ] Component tests pass.
