---
id: research-533-601-investigate-curator-trigger-logic-failure
type: RESEARCH
title: Investigate Orchestrator Curator Trigger Logic Failure
status: ACTIVE
owner_persona: researcher
created_at: '2026-09-20'
updated_at: '2026-09-23'
depends_on: []
jules_session_id: '7863234815296103848'
parent: story-531-533-orchestrator-trigger-logic-updates
tags:
  - orchestrator
  - curator
  - research
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Orchestrator Curator Trigger Logic Failure

## Summary
The original implementation task `task-533-536-orchestrator-curator-trigger-logic-impl` has permanently failed after reaching its maximum rejection count. This research task is spawned to investigate the root cause of this failure and determine the correct approach for implementing the `curator` trigger logic in `.github/scripts/foundry-orchestrator.ts`.

## Requirements
- Review the history of `task-533-536-orchestrator-curator-trigger-logic-impl` to understand why it failed.
- Check previous coder and QA journals for any context regarding the orchestrator trigger logic.
- Identify the exact conditions for triggering the `curator` persona in `.github/scripts/foundry-orchestrator.ts`.
- Determine how the DAG should recognize a feature as fully "implemented" before final archival.
- Provide a clear recommendation on how to implement this logic successfully for the subsequent implementation task.

## Actionable Takeaways
The previous task failed due to an infinite recursion or skip condition in orchestrator logic for the Curator persona. To correctly trigger the curator before final archival verification:

1. In `.github/scripts/foundry-heartbeat.ts` inside `transitionNodeToCompleted`, intercept `nodeType === 'IDEA' && ownerPersona !== 'curator' && ownerPersona !== 'auditor'` right before the `VERIFYING` block. Transition it to `READY` and set `owner_persona = 'curator'`.
2. In `.github/scripts/foundry-orchestrator.ts`, update `promoteNodeStatus` to accept a 4th optional argument `newOwner?: string` and apply it to `node.frontmatter.owner_persona` if provided.
3. In Phase 4, Phase 4.1, and Phase 4.5 of `.github/scripts/foundry-orchestrator.ts`, intercept `node.frontmatter.type === 'IDEA' && node.frontmatter.owner_persona !== 'curator' && node.frontmatter.owner_persona !== 'auditor'`, and call `promoteNodeStatus(node, 'PENDING', 'READY', 'curator')` instead of transitioning straight to `COMPLETED`.
4. In Phase 4.8 of `.github/scripts/foundry-orchestrator.ts`, explicitly allow `curator` in the valid person bypass list to prevent mapping validation failures.
5. In `.github/scripts/foundry-heartbeat.test.ts`, update the existing `should transition an active IDEA node with owner_persona product_manager...` test to expect `READY` and `curator`.
6. In `.github/scripts/foundry-orchestrator.test.ts`, add a new test for `Late-Binding Parent promotes IDEA to READY for curator if children are completed`.

## Acceptance Criteria
- [ ] task-533-617-orchestrator-curator-trigger-logic-retry
