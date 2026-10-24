---
id: story-691-714-orchestrator-cycle-detection-e2e
type: STORY
title: STORY - Orchestrator Cycle Detection E2E Verification
status: READY
owner_persona: tech_lead
created_at: 2026-10-21T07:02:03.087Z
updated_at: 2026-10-21
depends_on:
  - story-691-713-orchestrator-pre-dispatch-integration
jules_session_id: null
pr_number: null
parent: epic-583-691-diagnostics-and-orchestrator-integration
tags:
  - orchestrator
  - e2e
  - integration
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
locks: []
priority: 50
---

# STORY: Orchestrator Cycle Detection E2E Verification

## Objective
Create dedicated E2E and integration tests to verify the complete functionality of the cycle detection and node demotion logic within the Foundry Orchestrator.

## Requirements
1. Verify the cycle detection logic correctly identifies cyclic dependencies (e.g., A -> B -> A).
2. Verify that diagnostic logs are correctly output with the exact path string.
3. Verify that the orchestrator's pre-dispatch correctly intercepts cyclical nodes, demotes them to `FAILED` or `BLOCKED`, and successfully skips dispatching them to avoid infinite loops.

## Acceptance Criteria
- [ ] Break down this Story into modular Tasks for the Coder.
