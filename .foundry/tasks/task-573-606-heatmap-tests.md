---
id: task-573-606-heatmap-tests
type: TASK
title: Write Heatmap Logic Unit Tests
status: PENDING
owner_persona: coder
created_at: '2026-09-21T06:50:00Z'
updated_at: '2026-09-22'
depends_on:
  - task-573-605-heatmap-logic
jules_session_id: null
pr_number: null
parent: story-049-573-heatmap-data-processing-layer
tags:
  - data
  - processing
  - heatmap
  - testing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Write Heatmap Logic Unit Tests

## Context
We need to ensure the heatmap aggregation logic works correctly and handles all edge cases before UI integration.

## Scope
Write unit tests for the calculateHeatmap method in RouteRadarController using Vitest.

## Acceptance Criteria
- [ ] Write unit tests to validate the aggregation logic using mock suggestionEngine outputs.
- [ ] Ensure tests cover edge cases and accurate density calculations.
