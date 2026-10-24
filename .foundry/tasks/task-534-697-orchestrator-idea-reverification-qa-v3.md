---
id: task-534-697-orchestrator-idea-reverification-qa-v3
type: TASK
title: Orchestrator IDEA Re-Verification Stage QA (v3)
status: PENDING
owner_persona: qa
created_at: '2026-10-17'
updated_at: '2026-10-22'
depends_on:
  - task-534-696-orchestrator-idea-reverification-tests-v3
jules_session_id: null
parent: story-531-534-idea-reverification-stage
tags:
  - orchestrator
  - curator
  - e2e
  - integration
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Orchestrator IDEA Re-Verification Stage QA (v3)

## Summary
Verify the implementation of the "IDEA Re-Verification Stage" logic in `.github/scripts/foundry-orchestrator.ts`, considering the findings from `research-534-694-investigate-idea-reverification-failure-v2`.

## Requirements
- Verify that the DAG Orchestrator correctly recognizes when an IDEA node is in a "Re-Verification" loop state.
- Verify that nodes spawned by the `curator` are seamlessly linked back up to the source IDEA.
- Run E2E/integration tests to ensure the system successfully runs through the full cycle: Idea -> Implementation -> Curator Trigger -> Curator Spawning Nodes -> Idea Re-Verification.
