---
id: task-556-002-heatmap-toggle-ui
type: TASK
title: Add Heatmap Toggle UI to DagFilterPanel
status: READY
owner_persona: coder
created_at: '2026-09-11'
updated_at: '2026-09-11'
jules_session_id: null
depends_on:
  - task-556-001-heatmap-toggle-context
parent: story-535-556-heatmap-toggle-ui
tags:
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Add Heatmap Toggle UI to DagFilterPanel

## Description
We need to add a UI control button to `DagFilterPanel.tsx` that will toggle the Health Heatmap overlay. It should consume the `onToggleHeatmap` callback and display the current state (`showHeatmap`). Ensure it aligns with the tactical hardware aesthetic.

## Implementation Blueprint
1. Open `src/components/dag/DagFilterPanel.tsx`.
2. Add `showHeatmap: boolean;` and `onToggleHeatmap: () => void;` to `DagFilterPanelProps`.
3. Inside the `DagFilterPanel` component, add a new button next to the "PERMANENT_FAILURES_ONLY" button.
4. The button should look similar, displaying `[ HEATMAP_OVERLAY ]`.
5. When `showHeatmap` is true, the button should have an active styling (e.g., `border-amber-500 text-amber-500 bg-amber-950/20`), and when false, it should match the inactive styling of the others (`border-zinc-800 text-zinc-500`).
6. Attach `onClick={onToggleHeatmap}` to this new button.
7. Open `src/components/dag/DagDashboard.tsx`.
8. Consume `showHeatmap` and `setShowHeatmap` from `useDagContext()`.
9. Pass `showHeatmap` and an `onToggleHeatmap` function (that calls `setShowHeatmap(!showHeatmap)`) down to the `<DagFilterPanel>` component.

## Acceptance Criteria
- [ ] DagFilterPanel accepts `showHeatmap` and `onToggleHeatmap` props.
- [ ] A tactical button `[ HEATMAP_OVERLAY ]` is rendered in DagFilterPanel to toggle the state.
- [ ] DagDashboard retrieves the heatmap state from context and passes it to the panel.
