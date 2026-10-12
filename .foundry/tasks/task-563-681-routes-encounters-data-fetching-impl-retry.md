---
id: task-563-681-routes-encounters-data-fetching-impl-retry
type: TASK
title: 'Routes, Encounters, and Drop Rates Data Fetching (Retry)'
status: PENDING
owner_persona: coder
created_at: '2026-10-12'
updated_at: '2026-10-12'
depends_on:
  - research-563-680-investigate-routes-encounters-data-fetching-failure
jules_session_id: null
pr_number: null
parent: story-555-563-routes-encounters-drop-rates
tags:
  - dexhelper
  - data
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Routes, Encounters, and Drop Rates Data Fetching (Retry)

## Context
As part of the "Display Routes, Encounters, and Drop Rates" story, we need to fetch and process encounter and drop rate data for a selected item, incorporating findings from the failed previous task.

## Requirements
- Review `research-563-680-investigate-routes-encounters-data-fetching-failure`.
- Implement hooks or utility functions to fetch encounter data and wild Pokemon hold item drop rates for a given selected item.
- Process the data into a format suitable for UI display (mapping routes, encounters, and drop percentages).

## Acceptance Criteria
- [ ] coder: Implement data fetching hooks/utils.
- [ ] coder: Ensure correct data aggregation for routes and drop rates.