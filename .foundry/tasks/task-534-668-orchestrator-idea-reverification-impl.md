---
id: task-534-668-orchestrator-idea-reverification-impl
type: TASK
title: Orchestrator IDEA Re-Verification Stage Implementation
status: FAILED
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-10'
depends_on: []
jules_session_id: null
parent: story-531-534-idea-reverification-stage
tags:
  - orchestrator
  - curator
rejection_count: 2
rejection_reason: '[ACKNOWLEDGED] Session terminated with state: FAILED'
notes: ''
locks: []
---

# Orchestrator IDEA Re-Verification Stage Implementation

## Summary
Implement the logic in `.github/scripts/foundry-orchestrator.ts` to support an "IDEA Re-Verification Stage" where control loops back to the originating IDEA node after curator spawning.

## Requirements
- Update the DAG processing logic in `.github/scripts/foundry-orchestrator.ts` to recognize when an IDEA node is in a "Re-Verification" loop state after downstream features have been curated.
- Handle node spawning initiated by the `curator` and link these back up to the source IDEA.
- Write unit tests for this new logic in `.github/scripts/foundry-orchestrator.test.ts`.
