---
id: task-563-740-routes-encounters-data-fetching-v4
type: TASK
title: 'Routes, Encounters, and Drop Rates Data Fetching (v4)'
status: READY
owner_persona: coder
created_at: '2026-11-04'
updated_at: '2026-11-04'
depends_on:
  - research-563-744-investigate-routes-encounters-failure-v3
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

# Task: Routes, Encounters, and Drop Rates Data Fetching (v4)

## Context
As part of the "Display Routes, Encounters, and Drop Rates" story, we need to fetch and process encounter and drop rate data for a selected item.

## Requirements
- Read the findings from `research-563-744-investigate-routes-encounters-failure-v3`.
- Implement hooks or utility functions to fetch encounter data and wild Pokemon hold item drop rates for a given selected item based on the research findings.
- Process the data into a format suitable for UI display (mapping routes, encounters, and drop percentages).

## Acceptance Criteria
- [ ] Implement data fetching hooks/utils based on research.
- [ ] Ensure correct data aggregation for routes and drop rates.