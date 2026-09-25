---
id: prd-527-585-macro-node-subtree-completeness-validator
type: PRD
title: Macro Node Subtree Completeness Validator Tool
status: READY
owner_persona: epic_planner
created_at: '2026-09-25'
updated_at: '2026-09-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-527-macro-node-subtree-completeness-validator
tags:
  - foundry
  - orchestrator
  - validation
research_references: []
notes: ''
locks: []
priority: 50
rejection_reason: ''
---

# Macro Node Subtree Completeness Validator Tool

## Problem Statement
In past execution cycles, Auditor persona verification runs have rejected macro node completions (such as PRDs or Epics) because descendant nodes in their sub-trees remained in non-terminal states (`PENDING`, `ACTIVE`, or `FAILED`). While system invariants in `.foundry/docs/schema.md` explicitly mandate that macro nodes (`IDEA`, `PRD`, `EPIC`, `STORY`) cannot transition to `VERIFYING` or `COMPLETED` until all descendant nodes in their sub-tree have fully transitioned to `COMPLETED`, agents sometimes prematurely update checkboxes or attempt empty PR transitions due to manual oversight.

## Proposed Solution
Develop an automated validator utility within `.github/scripts/` (and integrated into the `foundry-orchestrator.ts` evaluation cycle) that recursively traverses the DAG sub-tree for any target macro node. The tool will:
1. Identify all direct and transitive child nodes linked via `parent` or markdown checkboxes (`- [ ]`).
2. Assert that every descendant node is in the `COMPLETED` state before allowing the parent node's status to transition to `VERIFYING` or `READY`.
3. Provide descriptive CLI diagnostics and GitHub workflow warnings if any child node in the sub-tree is still `PENDING`, `ACTIVE`, `FAILED`, or `BLOCKED`.

## Expected Impact
- Eliminates premature Auditor rejections caused by incomplete child task sub-trees.
- Enforces strict compliance with System Invariant 15 in `.foundry/docs/schema.md`.
- Prevents DAG state corruptions and reduces redundant Jules session dispatch cycles.

## Acceptance Criteria
- [ ] Decompose into Epic
