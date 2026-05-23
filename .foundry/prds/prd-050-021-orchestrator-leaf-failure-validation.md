---
id: prd-050-021-orchestrator-leaf-failure-validation
type: PRD
title: Enforce Acceptance Criteria on Empty PRs
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-05-12'
updated_at: '2026-05-12'
depends_on: []
jules_session_id: null
parent: idea-050-orchestrator-leaf-failure-validation
tags:
  - foundry
  - dag
  - orchestrator
  - validation
notes: ''
rejection_reason: ''
---

# PRD: Enforce Acceptance Criteria on Empty PRs

## 1. Context and Problem Statement
According to the Foundry's Empty PR policy, if an agent determines that a target artifact already exists and is complete, it should submit an empty PR (0 files changed) which is auto-merged by GitHub Actions. However, a bug exists where agents submit empty PRs for leaf nodes (e.g., Tasks) that have unchecked acceptance criteria (`- [ ]`) in their markdown bodies. The `.github/workflows/auto-close-empty-pr.yml` currently merges these empty PRs unconditionally, falsely advancing incomplete tasks to `COMPLETED` and improperly unblocking downstream nodes.

Per ADR-007, leaf nodes with unchecked boxes must be marked `FAILED`, not `PENDING` or `COMPLETED`. We need to strictly enforce this validation before allowing an empty PR to be auto-merged.

## 2. Requirements

### Functional Requirements
1. **Validation Check**: Before auto-merging an empty PR, the system must validate the target node's markdown body.
2. **Acceptance Criteria Parsing**: The system must check for the presence of unchecked acceptance criteria boxes (e.g., `- [ ]`).
3. **Leaf Node Check**: The validation must determine if the target node is a leaf node (i.e., no other nodes reference it as a parent).
4. **Failure Condition**: If the target artifact is a leaf node AND has unchecked acceptance criteria, the system must:
   - Reject the empty PR.
   - Prevent the auto-merge.
   - Update the node's status to `FAILED`.
   - Add a `rejection_reason` explaining the failure.
5. **Success Condition**: If the target artifact has all boxes checked, or is not a leaf node (e.g., it is late-binding), the empty PR should be auto-merged as usual.

### Non-Functional Requirements
1. **Resilience**: The validation process must handle file reads and frontmatter parsing gracefully without crashing the pipeline.
2. **Performance**: The check should be lightweight and fast, adding minimal overhead to the `auto-close-empty-pr` workflow.

## 3. Scope
The scope of this feature is limited to the Empty PR auto-merge pipeline and orchestrator validation rules. It will primarily involve creating or modifying validation scripts (e.g., `validate-empty-pr.js`) and updating `.github/workflows/auto-close-empty-pr.yml`.

## 4. Next Steps
- [x] Architect: Review this PRD and create an Architecture Decision Record (ADR).
