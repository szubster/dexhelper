---
id: idea-050-orchestrator-leaf-failure-validation
type: IDEA
title: 'DAG Feature: Enforce Acceptance Criteria on Empty PRs'
status: COMPLETED
owner_persona: product_manager
created_at: '2026-05-12'
updated_at: '2026-05-12'
depends_on: []
jules_session_id: null
parent: null
tags:
  - foundry
  - dag
  - orchestrator
  - validation
notes: ''
rejection_reason: ''
---

# Idea: Enforce Acceptance Criteria on Empty PRs

## Context
Currently, the Empty PR policy automatically merges any PR with 0 file changes, advancing the node's status to `COMPLETED`. We recently discovered a bug where if a leaf node (like a Task) has unchecked acceptance criteria boxes but an agent submits an empty PR anyway, the orchestrator auto-merges it. This incorrectly advances a failed/incomplete task to `COMPLETED`, unblocking downstream nodes. ADR-007 states that leaf nodes with unchecked boxes should be marked `FAILED`, not `PENDING`.

## Proposal
Enhance the DAG Orchestrator so that before an empty PR is auto-merged, it actively checks the target artifact's markdown body. If the node contains unchecked acceptance criteria (`- [ ]`) and it is a leaf node (no children), the orchestrator must reject the empty PR, prevent auto-merge, and update the node's status to `FAILED`.

## Impact
Prevents incomplete tasks from slipping through via the Empty PR policy loop hole, enforcing stricter completion requirements and improving system reliability.

## Next Steps
- [x] Product Manager: Convert this idea to a PRD.


## Generated Nodes
- [PRD-050-021](.foundry/archive/prds/prd-050-021-orchestrator-leaf-failure-validation.md)
