---
id: prd-156-518-node-health-heatmap
type: PRD
title: Foundry DAG Node Health Heatmap Visualizer
status: READY
owner_persona: epic_planner
created_at: '2026-09-03'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: null
parent: idea-156-foundry-node-status-health-heatmap
tags:
  - foundry
  - orchestrator
  - UI
  - tooling
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Foundry DAG Node Health Heatmap Visualizer

## Overview
As the Foundry DAG scales, we need to proactively identify chronic failure nodes, circular dependencies, and orchestrator bottlenecks. This PRD outlines the requirements for augmenting the existing React Flow visualization in the `/dag` route with a "Health Heatmap" overlay.

## Data & Telemetry Metrics
The heatmap color intensity will be driven by the following node telemetry fields:
- `rejection_count`: Nodes with higher rejection counts should appear "hotter".
- Time in `ACTIVE` state: Nodes that are currently active should indicate their activity duration, with longer durations indicating potential stalls.
- Time in `READY` state: Nodes waiting for orchestrator dispatch should show "hotter" colors the longer they wait, indicating starvation.
- Node state history: Frequent looping through FAILED -> READY -> ACTIVE (Resurrection loops).

## Functional Requirements
- **Heatmap Toggle:** Add a UI control (e.g., a toggle switch or button) to the `/dag` dashboard to enable/disable the Health Heatmap overlay.
- **Dynamic Node Styling:** When the heatmap is active, apply dynamic styling (colors, borders, gradients) to the React Flow nodes based on the telemetry metrics defined above.
  - Nodes with 0 rejections or short wait times remain in standard colors.
  - Nodes with 1-2 rejections turn yellow/orange.
  - Nodes with 3+ rejections or long stall times turn bright red.
- **Tooltip Augmentation:** When the heatmap is active, hovering over a node should reveal the specific metrics driving its heatmap color (e.g., "Rejections: 3", "Time in READY: 2.5 hrs").

## Technical Constraints
- Built on top of the existing `@xyflow/react` setup in `src/components/dag`.
- Use the existing global store or DAG fetch mechanisms to retrieve node metadata (ensuring fields like `rejection_count` are available in the payload).

## Acceptance Criteria
- [ ] Epic Planner: Break this PRD down into EPIC nodes covering the DAG data layer changes, React Flow UI components, and the telemetry calculations.
- [ ] Create an overarching E2E testing EPIC to verify the heatmap toggle and visualization logic.
