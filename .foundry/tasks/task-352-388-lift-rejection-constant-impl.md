---
id: task-352-388-lift-rejection-constant-impl
type: TASK
title: Extract MAX_REJECTION_THRESHOLD Constant
status: ACTIVE
owner_persona: coder
created_at: '2026-08-02'
updated_at: '2026-08-02'
depends_on: []
jules_session_id: '11029083690194099966'
pr_number: null
parent: story-343-352-lift-rejection-constant-impl
tags:
  - refactor
  - dashboard
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Extract MAX_REJECTION_THRESHOLD Constant

## Objective
Extract the `MAX_REJECTION_THRESHOLD` constant (value: 3) from local file scopes into `src/components/dashboard/DagContext.tsx` or a dedicated shared constants utility.

## Context
Required by ADR 017. The value is currently hardcoded in multiple files (`src/components/dag/DagDashboard.tsx`, `src/components/dag/DagNode.tsx`, `.github/scripts/foundry-orchestrator.ts`).

## Requirements
1. Ensure the constant `MAX_REJECTION_THRESHOLD` is properly exported and used from `src/components/dashboard/DagContext.tsx`.
2. Update all usages in `src/components/dag/DagDashboard.tsx`, `src/components/dag/DagNode.tsx`, `src/components/dag/__tests__/DagDashboard.test.tsx` and `src/components/dag/__tests__/DagNode.test.tsx` to use the lifted constant or context property instead of hardcoding `3`.

## Acceptance Criteria
- [x] Remove hardcoded `3` from `DagDashboard.tsx` and use `maxRejectionThreshold` from `useDagContext()`.
- [x] Remove hardcoded `3` from `DagNode.tsx` and use `maxRejectionThreshold`.
- [x] Ensure test files (`DagNode.test.tsx`, `DagDashboard.test.tsx`) are correctly importing and using the constant instead of hardcoded numbers where applicable.
