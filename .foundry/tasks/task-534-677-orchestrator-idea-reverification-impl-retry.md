---
id: task-534-677-orchestrator-idea-reverification-impl-retry
type: TASK
title: Orchestrator IDEA Re-Verification Stage Implementation Retry
status: READY
owner_persona: coder
created_at: '2026-10-10'
updated_at: '2026-10-10'
depends_on:
  - research-534-676-investigate-idea-reverification-failure
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

# Orchestrator IDEA Re-Verification Stage Implementation Retry

## Summary
Implement the logic in `.github/scripts/foundry-orchestrator.ts` to support an "IDEA Re-Verification Stage" where control loops back to the originating IDEA node after curator spawning, applying lessons learned from the `research-534-676-investigate-idea-reverification-failure` node.

## Requirements
- Update the DAG processing logic in `.github/scripts/foundry-orchestrator.ts` to recognize when an IDEA node is in a "Re-Verification" loop state after downstream features have been curated.
- Handle node spawning initiated by the `curator` and link these back up to the source IDEA.
- Implement according to the findings documented in the associated research node.
