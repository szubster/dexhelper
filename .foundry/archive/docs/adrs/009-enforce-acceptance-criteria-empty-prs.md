---
id: adr-009-enforce-acceptance-criteria-empty-prs
type: ADR
title: 'ADR 009: Enforce Acceptance Criteria Checkboxes Before Empty PR Auto-Merge'
status: COMPLETED
owner_persona: architect
created_at: '2026-05-12'
updated_at: '2026-05-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# ADR 009: Enforce Acceptance Criteria Checkboxes Before Empty PR Auto-Merge

## Date
2026-05-12

## Status
Accepted

## Context
According to the Foundry's Empty PR policy, if an agent determines that a target artifact already exists and is complete, it submits an empty PR (0 files changed) which is auto-merged by GitHub Actions. However, agents were submitting empty PRs for leaf nodes (e.g., Tasks) that still had unchecked acceptance criteria (`- [ ]`) in their markdown bodies. The `.github/workflows/auto-close-empty-pr.yml` merged these empty PRs unconditionally, falsely advancing incomplete tasks to `COMPLETED` and improperly unblocking downstream nodes.

This violates ADR 007, which mandates that leaf nodes with unchecked boxes must be marked `FAILED`, rather than `PENDING` or `COMPLETED`. We need to strictly enforce this validation during the empty PR / preflight checks in the orchestrator and heartbeat.

## Decision
1. **Preflight Failure for Leaf Tasks**: During the orchestrator's preflight check (`foundry-orchestrator.ts`), if a leaf task (a node without children) is evaluated for bypass because its target artifacts already exist, it MUST NOT be bypassed if it contains unchecked acceptance criteria (`- [ ]`). Instead, the preflight check must transition the node to `FAILED` and assign a `rejection_reason`.
2. **Heartbeat Failure for Empty PRs**: The `foundry-heartbeat.ts` script, which processes PR merges, must properly record the `rejection_reason` in the YAML frontmatter when transitioning a leaf node to `FAILED` due to unfulfilled acceptance criteria.
3. **Late-Binding Parents Excluded**: If a node is a late-binding parent (e.g., it has children or is a generation node like `IDEA`, `PRD`, `EPIC`, `STORY`), unchecked boxes continue to act as an intentional signal to keep the node in `READY` or `PENDING` states so new child nodes can be generated.

## Consequences
- **Positive**: Strict adherence to the `COMPLETED` contract ensures that leaf tasks are fully implemented and validated before progressing in the DAG.
- **Positive**: Eradicates false-positive auto-merges for tasks that have not fully met their acceptance criteria, reducing technical debt.
- **Negative**: Adds conditional logic to the orchestrator preflight to accurately distinguish between valid late-binding parent nodes and invalid leaf tasks.
