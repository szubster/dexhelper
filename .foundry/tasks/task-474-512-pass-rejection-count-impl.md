---
id: task-474-512-pass-rejection-count-impl
type: TASK
title: Update DagContext to Handle rejection_count
status: ACTIVE
owner_persona: coder
created_at: '2026-09-01'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: '3273462721145008476'
pr_number: null
parent: story-071-474-pass-rejection-count-context
tags:
  - data
  - dashboard
  - context
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Update DagContext to Handle rejection_count

## 1. Context & Objectives
This task implements `story-071-474-pass-rejection-count-context`. The `rejection_count` field is now being correctly extracted by the DAG parsing layer. We need to ensure that the `DagContext` React state passes this value correctly from the parsed data into the React Flow node data so it can be consumed by the dashboard components.

## 2. Requirements
- The `DagNodeData` interface in `src/components/dashboard/DagContext.tsx` should already contain `rejection_count: number;` (verify if present, add if missing).
- Ensure the `loadData` function in `src/components/dashboard/DagContext.tsx` maps `node.data.rejection_count` when creating `initialNodes` for React Flow. It should default to `0` if not present.

## 3. Acceptance Criteria
- [ ] `DagNodeData` interface in `DagContext.tsx` explicitly includes `rejection_count: number;`.
- [ ] The node mapping logic in `DagProvider` correctly sets `rejection_count: node.data.rejection_count ?? 0`.
