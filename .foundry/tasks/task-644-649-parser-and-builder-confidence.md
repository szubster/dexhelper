---
id: task-644-649-parser-and-builder-confidence
type: TASK
title: Update DAG parser and builder for confidence metrics
status: READY
owner_persona: coder
created_at: '$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")'
updated_at: '$(date -u +"%Y-%m-%d")'
depends_on: []
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

# Update DAG parser and builder for confidence metrics

## Context
The system needs to visually display confidence scores for nodes in the UI.

## Requirements
- Modify `src/utils/dag/parser.ts` to include `confidence_score?: number | null;` in `FoundryNodeData`.
- Extract the `confidence_score` value during parsing if present in the YAML.
- Modify `src/utils/dag/builder.ts` to include `confidence_score` in `GraphNode["data"]`, and pass it through in `buildDagGraph`.

## Acceptance Criteria
- [x] Implement the required updates to parser.ts and builder.ts.
