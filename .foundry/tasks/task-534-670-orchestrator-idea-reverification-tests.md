---
id: task-534-670-orchestrator-idea-reverification-tests
type: TASK
title: Orchestrator IDEA Re-Verification Stage Tests
status: PENDING
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-07'
depends_on:
  - task-534-668-orchestrator-idea-reverification-impl
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

# Orchestrator IDEA Re-Verification Stage Tests

## Summary
Write unit tests for the "IDEA Re-Verification Stage" implementation in `.github/scripts/foundry-orchestrator.ts`.

## Requirements
- Write unit tests in `.github/scripts/foundry-orchestrator.test.ts` covering the scenario where an IDEA node transitions into a "Re-Verification" loop state.
- Ensure tests verify that node spawning initiated by the `curator` correctly links these new nodes back to the source IDEA.
