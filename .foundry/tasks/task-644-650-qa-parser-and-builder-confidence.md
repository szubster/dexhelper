---
id: task-644-650-qa-parser-and-builder-confidence
type: TASK
title: QA DAG parser and builder for confidence metrics
status: COMPLETED
owner_persona: qa
created_at: '$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")'
updated_at: '2026-10-04'
depends_on:
  - task-644-649-parser-and-builder-confidence
jules_session_id: null
pr_number: null
parent: story-571-644-dashboard-metrics-ui-components
tags:
  - ui
  - dashboard
  - metrics
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 60
---

# QA DAG parser and builder for confidence metrics

## Context
QA verification for the `task-644-649-parser-and-builder-confidence` task.

## Requirements
- Verify that `src/utils/dag/parser.ts` extracts `confidence_score` correctly.
- Verify that `src/utils/dag/builder.ts` passes `confidence_score` to `GraphNode["data"]`.
- Run unit tests to verify the changes.

## Acceptance Criteria
- [x] QA verification passed.
