---
id: task-520-529-statistics-pr-metrics-impl
type: TASK
title: Implement PR Metrics Extraction
status: PENDING
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-09-03'
depends_on:
  - task-520-528-statistics-node-aggregation-impl
jules_session_id: null
pr_number: null
parent: story-417-520-statistics-generation
tags:
  - metrics
  - orchestrator
  - bash
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement PR Metrics Extraction

## Objective
Implement the extraction of PR metrics using GitHub CLI.

## Requirements
1. In `.github/scripts/utils/statistics.ts` (or a related module), implement a function to fetch PR metrics.
2. Execute `gh pr list --state all --json` to retrieve PR data.
3. Parse the returned JSON to calculate metrics (e.g., total PRs, open PRs, merged PRs).
4. Handle cases where the `gh` CLI might fail or rate limit gracefully.

## Acceptance Criteria
- [ ] PR metrics extraction logic implemented.
- [ ] Successfully fetches and parses data using `gh pr list --state all --json`.
- [ ] Includes error handling for CLI execution.
