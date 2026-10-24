---
id: story-418-677-historical-stats-aggregation
type: STORY
title: Historical Stats Data Aggregation and Output
status: PENDING
owner_persona: tech_lead
created_at: '2026-10-18'
updated_at: '2026-10-20'
depends_on:
  - story-418-676-historical-stats-git-parser
jules_session_id: null
pr_number: null
parent: epic-146-418-historical-statistics-backfilling
tags:
  - data
  - statistics
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Historical Stats Data Aggregation and Output

## Context
With the ability to traverse git history and access the `.foundry/` tree at specific points in time, we need to extract the metrics for those points in time and compile them into a dataset.

## Objectives
- Implement logic to parse the Foundry nodes within a specific commit state.
- Aggregate historical `node_status_counts` and `node_type_counts` for each point in time.
- Generate a time-series dataset file (`foundry-historical-stats.json` or CSV) to facilitate trend analysis.

## Acceptance Criteria
- [ ] Break down this Story into modular Tasks for the Coder.
