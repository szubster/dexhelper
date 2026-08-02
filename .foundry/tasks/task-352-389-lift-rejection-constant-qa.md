---
id: task-352-389-lift-rejection-constant-qa
type: TASK
title: QA - Extract MAX_REJECTION_THRESHOLD Constant
status: ACTIVE
owner_persona: qa
created_at: '2026-08-02'
updated_at: '2026-08-02'
depends_on:
  - task-352-388-lift-rejection-constant-impl
jules_session_id: '7235123451149483247'
pr_number: null
parent: story-343-352-lift-rejection-constant-impl
tags:
  - refactor
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA - Extract MAX_REJECTION_THRESHOLD Constant

## Objective
Verify that the `MAX_REJECTION_THRESHOLD` is fully lifted to the Context layer and no hardcoded `3`s remain for permanent failure logic in the frontend components.

## Context
ADR 017 requires `MAX_REJECTION_THRESHOLD` to not be hardcoded in multiple frontend files.

## Requirements
1. Verify `pnpm lint` and `pnpm test` pass.
2. Verify `DagDashboard.tsx` and `DagNode.tsx` and their tests use the `maxRejectionThreshold` from context or the constant instead of hardcoded numbers.

## Acceptance Criteria
- [x] Code is linted and tests pass.
- [x] No hardcoded threshold is used in the frontend components for rejection count logic.
