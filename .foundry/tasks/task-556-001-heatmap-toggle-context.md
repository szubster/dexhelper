---
id: task-556-001-heatmap-toggle-context
type: TASK
title: Update DagContext for Heatmap Toggle State
status: READY
owner_persona: coder
created_at: '2026-09-11'
updated_at: '2026-09-11'
jules_session_id: null
depends_on: []
parent: story-535-556-heatmap-toggle-ui
tags:
  - ui
  - context
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Update DagContext for Heatmap Toggle State

## Description
To support toggling the Health Heatmap overlay on the DAG dashboard, we need to introduce a boolean state `showHeatmap` and a setter `setShowHeatmap` within `DagContext.tsx`. This allows the filter panel to toggle the state and the dashboard to consume it.

## Implementation Blueprint
1. Open `src/components/dashboard/DagContext.tsx`.
2. Add `showHeatmap: boolean;` and `setShowHeatmap: (show: boolean) => void;` to the `DagContextState` interface.
3. In the `DagProvider` component, define the `showHeatmap` state using `useState<boolean>(false)`.
4. Include `showHeatmap` and `setShowHeatmap` in the `value` object passed to the `DagContext.Provider`.

## Acceptance Criteria
- [ ] DagContext includes `showHeatmap` and `setShowHeatmap`.
- [ ] DagProvider initializes and provides these values.
