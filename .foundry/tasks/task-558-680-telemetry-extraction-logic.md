---
id: task-558-680-telemetry-extraction-logic
type: TASK
title: Telemetry Extraction Logic
status: READY
owner_persona: coder
created_at: '2026-10-11'
updated_at: '2026-10-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-534-558-telemetry-data-extraction-impl
tags:
  - typescript
  - tooling
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Telemetry Extraction Logic

## Description
Implement the parsing of `rejection_count`, `created_at`, and `updated_at` (to compute wait times) inside `aggregateNodeStatistics` in `packages/foundry/utils/statistics.ts` for heatmap telemetry.

## Acceptance Criteria
- [x] Coder: Update `aggregateNodeStatistics` to extract and structure telemetry metrics.
