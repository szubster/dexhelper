---
id: research-066-138-premature-verifying-transitions
type: RESEARCH
title: Investigate Premature Transitions to VERIFYING for High-Level Planning Nodes
status: PENDING
owner_persona: researcher
created_at: '2026-05-31'
updated_at: '2026-05-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - lifecycle
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Premature Transitions to VERIFYING for High-Level Planning Nodes

## Objective
Investigate the distinction between planning completion and implementation completion in the Foundry orchestration system, specifically why nodes like IDEAs and EPICs transition to VERIFYING prematurely when only their child artifacts (e.g., PRDs or Story nodes) have been generated.

## Context
As noted in the Auditor journal entries from 2026-05-23 and 2026-05-24, macro nodes (Epics, Stories) require strict hierarchical completion enforcement. A parent node must not transition to COMPLETED or VERIFYING until all of its descendant nodes in the spawned sub-tree are completely verified and in the COMPLETED state.
However, for high-level planning nodes like IDEAs, verification must only confirm that the appropriate downstream artifacts (e.g., PRDs) were successfully generated and linked, rather than failing the node because the final end-to-end code implementation does not yet exist.

## Scope
- Analyze the orchestrator's state machine logic.
- Determine if a new state or dependency linkage is required to differentiate between "Planning Done" and "Implementation Done".
