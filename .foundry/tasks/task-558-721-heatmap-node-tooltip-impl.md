---
id: task-558-721-heatmap-node-tooltip-impl
type: TASK
title: Implement Heatmap Node Hover Tooltip
status: READY
owner_persona: coder
created_at: '2026-10-24'
updated_at: '2026-10-24'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-535-558-heatmap-node-tooltip
tags:
  - ui
  - tooltip
  - heatmap
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Implement Heatmap Node Hover Tooltip

## Objective
Update the `DagNode` component to display a tooltip showing the metric value that drives its heatmap color, but only when the heatmap is active.

## Context
Currently, the nodes are colored based on the heatmap severity, but users cannot see the exact metric value (e.g., number of rejections or wait time). By using the native `title` attribute, we can provide a simple hover tooltip.

## Requirements
*   In `src/components/dag/DagNode.tsx`, construct a tooltip string if `showHeatmap` is true and `data.heatmapMetric` is available.
*   The tooltip string should describe the metric value (e.g., `Metric: ${data.heatmapMetric.value}`).
*   Attach this constructed string to the root `div`'s `title` attribute. If the tooltip string is empty (heatmap off or no metric), omit the `title` attribute or set it to undefined to prevent empty tooltips.

## Acceptance Criteria
- [ ] DagNode displays a `title` attribute on hover containing the metric value when `showHeatmap` is active.
- [ ] No tooltip is displayed regarding the heatmap metric when the heatmap is disabled.
