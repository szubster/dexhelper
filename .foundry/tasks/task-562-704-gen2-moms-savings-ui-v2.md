---
id: task-562-704-gen2-moms-savings-ui-v2
type: TASK
title: Update Gen 2 Mom's Savings Dashboard UI (v2)
status: CANCELLED
owner_persona: coder
created_at: '2026-10-18T00:00:00Z'
updated_at: '2026-10-23'
depends_on:
  - research-562-703-investigate-moms-savings-ui-failure-v2
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
  research-562-703-investigate-moms-savings-ui-failure-v2
notes: ''
locks: []
---

# Task: Update Gen 2 Mom's Savings Dashboard UI (v2)

## Overview
Update the `Gen2SavingsDashboard` component based on findings from the new research phase to resolve previous QA rejections.

## Requirements
- Review findings in `research-562-703-investigate-moms-savings-ui-failure-v2` for specific constraints.
- Integrate the threshold utility function to calculate the next unlock goal.
- Render progress toward the next unlock.
- Handle the case where all thresholds have been reached.
- Ensure strict compliance with ADR 008 (tactical hardware, sharp edges, dashed borders, monospaced fonts, no rounded corners except full).
- Update component rendering tests using `vitest-browser-react`.

## Acceptance Criteria
- [ ] UI accurately reflects threshold progression or completion.
- [ ] UI strictly conforms to ADR 008.
- [ ] Component tests pass.
