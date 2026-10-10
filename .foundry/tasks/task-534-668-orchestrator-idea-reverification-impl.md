---
id: task-534-668-orchestrator-idea-reverification-impl
type: TASK
title: Orchestrator IDEA Re-Verification Stage Implementation
status: READY
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-10'
depends_on: []
jules_session_id: null
parent: story-531-534-idea-reverification-stage
tags:
  - orchestrator
  - curator
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
confidence_score: 100
---

# Orchestrator IDEA Re-Verification Stage Implementation

## Summary
Implement the logic in `.github/scripts/foundry-orchestrator.ts` to support an "IDEA Re-Verification Stage" where control loops back to the originating IDEA node after curator spawning.

## Requirements
- [x] Update the DAG processing logic in `.github/scripts/foundry-orchestrator.ts` to recognize when an IDEA node is in a "Re-Verification" loop state after downstream features have been curated.
- [x] Handle node spawning initiated by the `curator` and link these back up to the source IDEA.
- [x] Write unit tests for this new logic in `.github/scripts/foundry-orchestrator.test.ts`.
