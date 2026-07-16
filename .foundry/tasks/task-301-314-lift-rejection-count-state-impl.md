---
id: task-301-314-lift-rejection-count-state-impl
type: TASK
title: Implement Lift MAX_REJECTION_THRESHOLD Constant to Context
status: FAILED
owner_persona: coder
created_at: '2026-07-14'
updated_at: '2026-07-15'
depends_on: []
jules_session_id: '3667896676804649688'
pr_number: null
parent: story-301-314-lift-rejection-count-state
tags:
  - refactor
  - dashboard
research_references: []
rejection_count: 0
rejection_reason: >-
  Zombie node detected: Session 3667896676804649688 is TERMINATED without
  resolving the node
notes: ''
---

# Implement Lift MAX_REJECTION_THRESHOLD Constant to Context

## Objective
Extract the `MAX_REJECTION_THRESHOLD` constant (value: 3) from local file scopes into `DagContext.tsx` or a dedicated shared constants utility, and expose it through the React context layer. This enables dynamic adjustment without refactoring across multiple files.

## Technical Contract
1. Add `MAX_REJECTION_THRESHOLD` to `src/components/dashboard/DagContext.tsx` and export it if necessary or add to the context state if appropriate, OR simply define it as an exported constant in a shared utility (or within `DagContext.tsx`). The objective specifies "Define MAX_REJECTION_THRESHOLD = 3 in DagContext.tsx. Expose this value through the DagContextState interface. Provide the value in the DagProvider."
2. **Context Update**:
   - Define `export const MAX_REJECTION_THRESHOLD = 3;` in `DagContext.tsx`. (Wait, objective says "Expose this value through the DagContextState interface").
   - Add `maxRejectionThreshold: number;` to the `DagContextState` interface in `src/components/dashboard/DagContext.tsx`.
   - In `DagProvider`, provide `maxRejectionThreshold: 3` (or the constant) in the `value` object.
3. **Usage Updates**:
   - Update `src/components/dag/DagDashboard.tsx` to use the `maxRejectionThreshold` from `useDagContext()` instead of the hardcoded `>= 3`.
   - Update `src/components/dag/DagNode.tsx` to use the `maxRejectionThreshold` from `useDagContext()` instead of the hardcoded `>= 3`.
   - Update tests in `src/components/dag/__tests__/DagNode.test.tsx` if necessary, though it might mock the context. Ensure tests still pass.

## Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Define `MAX_REJECTION_THRESHOLD = 3` in `DagContext.tsx`.
- [ ] Expose `maxRejectionThreshold` through `DagContextState` and `DagProvider`.
- [ ] Refactor `DagDashboard.tsx` to use `maxRejectionThreshold` from context.
- [ ] Refactor `DagNode.tsx` to use `maxRejectionThreshold` from context.
- [ ] Ensure `DagNode.test.tsx` passes.
- [ ] Self-verify the changes (low risk logic).
