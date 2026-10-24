---
id: task-537-680-remove-xyflow-deps
type: TASK
title: 'Remove xyflow dependencies, code, and update Vite config'
status: ACTIVE
owner_persona: coder
created_at: '2026-10-01'
updated_at: '2026-10-24'
depends_on: []
jules_session_id: '15286792723215629169'
pr_number: null
parent: story-530-537-xyflow-cleanup
tags:
  - performance
  - bundle-size
  - refactor
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
locks: []
---

# Task: Remove xyflow dependencies, code, and update Vite config

## Objective
Remove the `@xyflow/react` and `dagre` dependencies from `package.json`, clean up `vite.config.ts`, delete unused code, and remove stale data logic from the DAG store.

## Scope
1. Remove `dagre` and `@xyflow/react` usage from `src/components/dashboard/DagContext.tsx` (the DAG store) and clean up any stale data logic.
2. Delete unused files related to the previous graph layout:
   - `src/components/dag/DagDashboard.tsx`
   - `src/components/dag/DagNode.tsx`
   - `src/components/dag/__tests__/DagDashboard.test.tsx`
   - `src/components/dag/__tests__/DagNode.test.tsx`
   - `src/utils/dag/highlighting.ts`
   - `src/utils/dag/__tests__/highlighting.test.ts`
3. Update `src/components/dag/DagWrapper.tsx` and `src/components/dag/index.ts` to reflect the removal of `DagDashboard`.
4. Uninstall `@xyflow/react`, `dagre`, and `@types/dagre` from `package.json`.
5. Remove chunking configurations for `@xyflow/react` and `dagre` in `vite.config.ts`.

## Acceptance Criteria
- [ ] Usage of `@xyflow/react` and `dagre` is removed from `DagContext.tsx` and stale logic is cleared.
- [ ] Redundant UI components and utils (`DagDashboard`, `DagNode`, `highlighting`) and their test files are deleted.
- [ ] `DagWrapper.tsx` is updated.
- [ ] `index.ts` no longer exports deleted components.
- [ ] `@xyflow/react`, `dagre`, and `@types/dagre` are removed from dependencies.
- [ ] `vite.config.ts` no longer references `@xyflow/`.
