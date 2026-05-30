---
id: story-040-075-heartbeat-verifying-logic
type: STORY
title: Heartbeat State Transition and Zombie Recovery
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-05-21'
updated_at: '2026-05-22'
depends_on:
jules_session_id: null
pr_number: null
parent: epic-029-040-auditor-implementation
tags:
  - process
  - orchestrator
rejection_count: 0
rejection_reason: ''
---

# Story: Heartbeat State Transition and Zombie Recovery

## Objective
Update `foundry-heartbeat.ts` PR merge state transition logic and zombie timeout recovery for the VERIFYING state.

## Implementation Details
- The `transitionNodeToCompleted` function (or a new equivalent function) must be updated. When a PR is merged (and doesn't have unfulfilled late-binding tasks), instead of mutating the node state to `COMPLETED`, it should mutate the status to `VERIFYING` and clear the `jules_session_id`.
- The Heartbeat script must monitor `VERIFYING` nodes in its "Pass 1" check exactly as it monitors `ACTIVE` nodes. If an auditor session crashes or times out, it should transition back to `VERIFYING` (ready for another auditor pickup) or `FAILED`, ensuring the auditor step isn't permanently blocked.

## Acceptance Criteria
- [x] PR merge transitions node to VERIFYING instead of COMPLETED.
- [x] Zombie detection extended to VERIFYING nodes.


## Derived Tasks
- .foundry/tasks/task-075-132-implement-heartbeat-verifying-logic.md
- .foundry/archive/.foundry/archive/tasks/task-075-133-qa-heartbeat-verifying-logic.md
