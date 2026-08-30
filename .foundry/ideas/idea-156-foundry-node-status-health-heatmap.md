---
id: idea-156-foundry-node-status-health-heatmap
type: IDEA
title: Foundry DAG Node Health Heatmap Visualizer
status: READY
owner_persona: product_manager
created_at: '2026-08-18'
updated_at: '2026-08-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
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

## Context & Vision
While the existing `/dag` route successfully implements an interactive React Flow visualization of the Foundry DAG, it focuses primarily on topological relationships (dependencies). As the DAG continues to scale, maintaining pipeline velocity requires identifying chronic failure nodes, circular dependency risks, and orchestrator bottlenecks *before* they halt the pipeline.

We propose augmenting the existing `/dag` dashboard (or creating a dedicated sub-view) with a "Health Heatmap" overlay. This feature will use telemetry data (like `rejection_count`, time spent in `ACTIVE` state without a PR, or resurrect loop frequency) to color-code nodes dynamically.

## Value Proposition
- **Proactive Maintenance:** Allows the TPM and Agile Coach personas (or human maintainers) to instantly spot nodes that are "burning" (e.g., repeatedly rejected by the auditor or stuck in the resurrection loop) by rendering them in high-contrast heat colors (yellow/orange/red).
- **Velocity Tracking:** Identifies stale `READY` nodes that are being starved of orchestrator dispatch resources.
- **Enhanced Observability:** Leverages the existing `@xyflow/react` infrastructure in `src/components/dag` to add a data-dense analytical layer on top of the standard structural view.

## Acceptance Criteria
- [ ] Product Manager: Convert this IDEA into a PRD detailing the specific metrics that will drive the heatmap calculation and the UI controls required to toggle the heatmap overlay on the existing React Flow DAG.
