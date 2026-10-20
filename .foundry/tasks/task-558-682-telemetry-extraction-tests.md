---
id: task-558-682-telemetry-extraction-tests
type: TASK
title: Write Tests for Telemetry Extraction
status: COMPLETED
owner_persona: coder
created_at: '2026-10-11'
updated_at: '2026-10-20'
depends_on:
  - task-558-680-telemetry-extraction-logic
jules_session_id: null
pr_number: null
parent: story-534-558-telemetry-data-extraction-impl
tags:
  - typescript
  - tests
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Write Tests for Telemetry Extraction

## Description
Write comprehensive unit tests in `packages/foundry/utils/statistics.test.ts` to verify that `aggregateNodeStatistics` correctly parses and calculates `rejection_count` and wait times.

## Acceptance Criteria
- [x] Coder: Add vitest unit tests for telemetry logic.
