---
id: task-051-089-fix-core-graph-visualizer-aesthetic
type: TASK
title: Fix Core Graph Visualizer Component Aesthetic (ADR 008)
status: COMPLETED
owner_persona: coder
created_at: '2026-05-14'
updated_at: '2026-05-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-029-051-implement-core-graph-visualization
tags:
  - dag
  - dashboard
  - ui
  - aesthetic
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Fix Core Graph Visualizer Component Aesthetic (ADR 008)

## Overview
The previous implementation of the Core Graph Visualizer (`task-051-087`) was rejected because it violated the strict "tactical hardware/snooping" aesthetic constraints specified in ADR 008. Specifically, rounded corners were used instead of sharp edges (`rounded-none`).

## Requirements
1. **Fix `DagNode.tsx`**: Update `src/components/dag/DagNode.tsx`. Ensure no rounded corners are used. Specifically, the `TelemetryDecoration` component is currently passed a class with `rounded-t` and `rounded-b-none`. Change this to `rounded-none`.
2. **Fix `TelemetryDecoration.tsx`**: Update `src/components/TelemetryDecoration.tsx`. The default styling includes `rounded-b`. Change this to `rounded-none`.
3. **Adhere to ADR 008**: Explicitly avoid any generic visual patterns like soft shadows or rounded corners (e.g. `rounded-t`, `rounded-b`, `rounded-sm`). Everything must be sharp edges (`rounded-none`).

## Acceptance Criteria
- [x] `src/components/dag/DagNode.tsx` is updated to remove all rounded corners, using `rounded-none` instead of `rounded-t` or `rounded-b-none`.
- [x] `src/components/TelemetryDecoration.tsx` is updated to remove `rounded-b` and use `rounded-none`.
- [x] Ensure `pnpm lint` and `pnpm test` pass.
