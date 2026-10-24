---
id: task-558-722-heatmap-node-tooltip-qa
type: TASK
title: QA Verification for Heatmap Node Hover Tooltip
status: PENDING
owner_persona: qa
created_at: '2026-10-24'
updated_at: '2026-10-24'
depends_on:
  - task-558-721-heatmap-node-tooltip-impl
jules_session_id: null
pr_number: null
parent: story-535-558-heatmap-node-tooltip
tags:
  - qa
  - ui
  - tooltip
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# QA Verification for Heatmap Node Hover Tooltip

## Objective
Verify that the `DagNode` component correctly displays a tooltip with the heatmap metric value only when the heatmap overlay is active.

## Context
The coder has implemented a native tooltip (via the `title` attribute) on the `DagNode` component to surface the underlying metric driving the heatmap color.

## Requirements
*   Verify the implementation in `src/components/dag/DagNode.tsx`.
*   Ensure tests cover both scenarios: heatmap active (tooltip present) and heatmap inactive (no tooltip).
*   Verify no visual regressions or layout shifts occur.

## Acceptance Criteria
- [ ] Verify `DagNode` displays correct metric tooltip when `showHeatmap` is true.
- [ ] Verify no tooltip is shown when `showHeatmap` is false.
- [ ] Ensure relevant component tests pass.
