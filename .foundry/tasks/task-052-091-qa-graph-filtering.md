---
id: task-052-091-qa-graph-filtering
type: TASK
title: QA Graph Filtering UI Controls
status: COMPLETED
owner_persona: qa
created_at: '2026-05-16'
updated_at: '2026-05-17'
depends_on:
  - .foundry/tasks/task-052-090-implement-graph-filtering.md
jules_session_id: null
pr_number: null
parent: .foundry/stories/story-029-052-implement-graph-filtering.md
tags:
  - dag
  - dashboard
  - ui
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Graph Filtering UI Controls

## Context & Requirements
This task is to verify the implementation of `task-052-090-implement-graph-filtering`, which introduces graph filtering UI controls for the DAG Dashboard based on node `type` and node `status`.

## Validation Steps

1. **Verify UI & Aesthetic Requirements:**
   - Confirm the new filter controls exist in the DAG dashboard.
   - Verify that the controls strictly follow ADR 008 ("tactical hardware/snooping" aesthetic).
   - Look for sharp edges (`rounded-none`), monospace fonts, and dashed borders (`border border-dashed`). Any rounded corners or soft shadows should result in rejecting the task.

2. **Verify Filter Functionality (`type`):**
   - Toggle filters for each node type: `IDEA`, `PRD`, `EPIC`, `STORY`, `TASK`.
   - Ensure the React Flow graph updates correctly and only nodes of the active types are shown.

3. **Verify Filter Functionality (`status`):**
   - Toggle filters for node statuses: `PENDING`, `READY`, `ACTIVE`, `COMPLETED`, `FAILED`, `BLOCKED`, `CANCELLED`.
   - Ensure the React Flow graph updates correctly and only nodes matching the active statuses are shown.

4. **Verify Edge Updates:**
   - Confirm that edges connected to hidden nodes are also hidden to prevent dangling connection lines.

5. **Code & Test Review:**
   - Run unit tests to verify any newly added tests for the filtering logic pass (`pnpm test`).
   - Run type checks and linting (`pnpm lint`).

## Acceptance Criteria
- [x] Verify the tactical hardware aesthetic of the filter controls.
- [x] Verify functionality of the `type` filters.
- [x] Verify functionality of the `status` filters.
- [x] Verify edges update correctly when nodes are hidden.
- [x] Ensure all relevant tests pass.
