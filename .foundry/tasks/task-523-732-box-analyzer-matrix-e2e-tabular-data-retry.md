---
id: task-523-732-box-analyzer-matrix-e2e-tabular-data-retry
type: TASK
title: Box Analyzer Matrix E2E - Tabular Data Verification Retry
status: READY
owner_persona: coder
created_at: '2026-10-29'
updated_at: '2026-10-29'
depends_on:
  - research-523-731-investigate-box-analyzer-matrix-e2e-failure
jules_session_id: null
pr_number: null
parent: story-109-523-box-analyzer-matrix-e2e
tags:
  - testing
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Box Analyzer Matrix E2E - Tabular Data Verification Retry

## Objective
Implement Playwright E2E tests to verify the tabular data rendering of the Box Analyzer Matrix, utilizing insights from the research task.

## Scope
- Read the findings from `research-523-731`.
- Write tests to load the Box Analyzer Comparison Matrix view.
- Verify the matrix renders the correct data and columns for a given save file or mocked state.

## Acceptance Criteria
- [ ] Write Playwright E2E test for tabular data rendering.
- [ ] Ensure all relevant columns (stats, species, etc.) are verified.
