---
id: task-644-651-context-and-ui-confidence
type: TASK
title: Update DagContext and DagNode for confidence metrics
status: COMPLETED
owner_persona: coder
created_at: '$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")'
updated_at: '2026-10-05'
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

# Update DagContext and DagNode for confidence metrics

## Context
The DAG UI needs to display confidence scores for nodes.

## Requirements
- Modify `src/components/dashboard/DagContext.tsx` to include `confidence_score?: number | null;` in `DagNodeData`, and ensure the mapping adds it from `dagGraph.nodes`.
- Modify `src/components/dag/DagNode.tsx` to render the confidence score visually using a color-coding logic:
  - Red for `< 70`
  - Yellow for `70 - 89`
  - Green for `90+`
- Ensure the aesthetic follows tactical/snooping guidelines (monospaced fonts, sharp edges).

## Acceptance Criteria
- [x] Implement the UI components for agent confidence metrics.
