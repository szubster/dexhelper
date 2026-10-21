---
id: task-534-696-orchestrator-idea-reverification-tests-v3
type: TASK
title: Orchestrator IDEA Re-Verification Stage Tests (v3)
status: READY
owner_persona: coder
created_at: '2026-10-17'
updated_at: '2026-10-17'
depends_on:
  - task-534-695-orchestrator-idea-reverification-impl-v3
jules_session_id: null
parent: story-531-534-idea-reverification-stage
tags:
  - orchestrator
  - curator
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Orchestrator IDEA Re-Verification Stage Tests (v3)

## Summary
Write unit tests for the "IDEA Re-Verification Stage" implementation in `.github/scripts/foundry-orchestrator.ts`, incorporating any lessons learned from the research phase.

## Requirements
- Write unit tests in `.github/scripts/foundry-orchestrator.test.ts` covering the scenario where an IDEA node transitions into a "Re-Verification" loop state.
- Ensure tests verify that node spawning initiated by the `curator` correctly links these new nodes back to the source IDEA.
- Verify tests reflect findings from `research-534-694-investigate-idea-reverification-failure-v2`.
