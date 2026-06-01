---
id: idea-065-epic-verification-timing
type: IDEA
title: Re-evaluate Epic Verification Timing
status: PENDING
owner_persona: product_manager
created_at: '2026-05-23'
updated_at: '2026-05-31'
depends_on: []
jules_session_id: '16341634079643629858'
pr_number: null
parent: null
tags:
  - foundry
  - process
  - orchestrator
research_references: []
rejection_count: 1
rejection_reason: ''
notes: Created by Auditor due to recurring premature verification of Epics.
---

# Re-evaluate Epic Verification Timing

## The Problem
Currently, `EPIC` nodes are transitioning to the `VERIFYING` (and subsequently `COMPLETED`) status prematurely. Epics are marked as complete once their immediate Acceptance Criteria (which is often just to *create* the child Story nodes) is met. This happens even though the actual implementation described in the Epic's requirements has not yet been merged into the codebase by the child tasks.

This violates the spirit of the dependency graph. An Epic represents a "macroscopic functional chunk" of work. If it completes before its functional requirements are actually implemented, it provides a false sense of progress and can cause downstream nodes dependent on the Epic to be dispatched before the codebase is ready for them.

## Proposed Solution
The system needs a clearer distinction between "Epic planning is done" and "Epic implementation is done".

Potential solutions:
1.  **Implicit Dependencies:** The orchestrator could automatically infer that an Epic depends on all of its child nodes, preventing it from transitioning to `READY` for completion until all children are `COMPLETED`.
2.  **Process Change:** The `story_owner` persona must be instructed to wait until all child stories are `COMPLETED` before submitting the empty PR to transition the Epic to `VERIFYING`.

## Goal
Establish a mechanism or process to ensure Epics are only marked `COMPLETED` when their functional requirements are actually implemented in the codebase.


## Spawned Nodes
- [x] [prd-065-035-epic-verification-timing](../prds/prd-065-035-epic-verification-timing.md)
