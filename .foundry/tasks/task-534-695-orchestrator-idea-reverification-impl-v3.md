---
id: task-534-695-orchestrator-idea-reverification-impl-v3
type: TASK
title: Orchestrator IDEA Re-Verification Stage Implementation (v3)
status: READY
owner_persona: coder
created_at: '2026-10-17'
updated_at: '2026-10-31'
depends_on:
  - research-534-694-investigate-idea-reverification-failure-v2
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

# Orchestrator IDEA Re-Verification Stage Implementation (v3)

## Summary
Implement the logic in `.github/scripts/foundry-orchestrator.ts` to support an "IDEA Re-Verification Stage" where control loops back to the originating IDEA node after curator spawning, applying lessons learned from `research-534-694-investigate-idea-reverification-failure-v2`.

## Requirements
- Update the DAG processing logic in `.github/scripts/foundry-orchestrator.ts` to recognize when an IDEA node is in a "Re-Verification" loop state after downstream features have been curated.
- Handle node spawning initiated by the `curator` and link these back up to the source IDEA.
- Implement according to the findings documented in the associated research node.
