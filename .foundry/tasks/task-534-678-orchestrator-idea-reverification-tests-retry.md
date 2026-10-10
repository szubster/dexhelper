---
id: task-534-678-orchestrator-idea-reverification-tests-retry
type: TASK
title: Orchestrator IDEA Re-Verification Stage Tests Retry
status: READY
owner_persona: coder
created_at: '2026-10-10'
updated_at: '2026-10-10'
depends_on:
  - task-534-677-orchestrator-idea-reverification-impl-retry
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

# Orchestrator IDEA Re-Verification Stage Tests Retry

## Summary
Write unit tests for the "IDEA Re-Verification Stage" implementation in `.github/scripts/foundry-orchestrator.ts`, incorporating any lessons learned from the failed implementation attempts.

## Requirements
- Write unit tests in `.github/scripts/foundry-orchestrator.test.ts` covering the scenario where an IDEA node transitions into a "Re-Verification" loop state.
- Ensure tests verify that node spawning initiated by the `curator` correctly links these new nodes back to the source IDEA.
- Verify tests reflect findings from `research-534-676-investigate-idea-reverification-failure`.