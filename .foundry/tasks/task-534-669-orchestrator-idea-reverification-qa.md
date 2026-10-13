---
id: task-534-669-orchestrator-idea-reverification-qa
type: TASK
title: Orchestrator IDEA Re-Verification Stage QA
status: CANCELLED
owner_persona: qa
created_at: '2026-10-07'
updated_at: '2026-10-10'
depends_on:
  - task-534-670-orchestrator-idea-reverification-tests
jules_session_id: null
parent: story-531-534-idea-reverification-stage
tags:
  - orchestrator
  - curator
  - e2e
  - integration
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-534-668-orchestrator-idea-reverification-impl
notes: ''
locks: []
---

# Orchestrator IDEA Re-Verification Stage QA

## Summary
Verify the implementation of the "IDEA Re-Verification Stage" logic in `.github/scripts/foundry-orchestrator.ts`.

## Requirements
- Verify that the DAG Orchestrator correctly recognizes when an IDEA node is in a "Re-Verification" loop state.
- Verify that nodes spawned by the `curator` are seamlessly linked back up to the source IDEA.
- Run E2E/integration tests to ensure the system successfully runs through the full cycle: Idea -> Implementation -> Curator Trigger -> Curator Spawning Nodes -> Idea Re-Verification.
