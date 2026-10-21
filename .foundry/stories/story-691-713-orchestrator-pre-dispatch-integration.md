---
id: story-691-713-orchestrator-pre-dispatch-integration
type: STORY
title: STORY - Orchestrator Pre-Dispatch Cycle Verification and Node Demotion
status: READY
owner_persona: tech_lead
created_at: 2026-10-21T07:02:03.087Z
updated_at: 2026-10-21
depends_on:
  - story-691-712-cycle-detection-diagnostics-logger
jules_session_id: null
pr_number: null
parent: epic-583-691-diagnostics-and-orchestrator-integration
tags:
  - orchestrator
  - integration
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
locks: []
priority: 50
---

# STORY: Orchestrator Pre-Dispatch Cycle Verification and Node Demotion

## Objective
Integrate the cycle detection engine seamlessly into the Foundry Orchestrator's pre-dispatch checks to safely skip or demote nodes involved in infinite cyclic loops.

## Requirements
1. Execute the cycle detection routine before dispatching any nodes to new agent sessions.
2. If a node is identified as part of a deadlock cycle, prevent it from being dispatched.
3. Safely transition the affected nodes to a skipped or demoted state (e.g., `FAILED` or `BLOCKED`) with an appropriate `rejection_reason` explaining the cycle.

## Acceptance Criteria
- [ ] Break down this Story into modular Tasks for the Coder.
