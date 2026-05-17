---
id: adr-011-robust-session-completion
type: ADR
title: Robust Handling of Session Completion in Heartbeat
status: COMPLETED
owner_persona: architect
created_at: '2026-05-18'
updated_at: '2026-05-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - dag
  - orchestrator
  - heartbeat
rejection_count: 0
rejection_reason: ''
notes: ''
---

# ADR 011: Robust Handling of Session Completion in Heartbeat

## Date
2026-05-18

## Status
Accepted

## Context
Under the Foundry's "Empty PR" policy (ADR 009), agents submit an empty PR if the target artifact is already complete or no work is required. These PRs are auto-merged, and the DAG advances smoothly. However, sometimes agents simply finish their session (resulting in a Jules API state of `COMPLETED`) without opening an explicit Empty PR.

Currently, `foundry-heartbeat.ts` evaluates Jules sessions by checking the Jules API and attempting to find an associated PR. If the API returns `COMPLETED` but no PR exists, the script considers the session a zombie or crashed run and defaults to transitioning the task node to `FAILED`. This logic unjustly penalizes legitimate empty runs and forces nodes into the Resurrection Loop needlessly.

We need to differentiate between genuine crashes and correct but PR-less empty completions, and ensure these empty runs follow the exact same Acceptance Criteria validations introduced by ADR 007.

## Decision
1. **Graceful PR-less Completion**: If the Jules session API reports a state of `COMPLETED` but no PR is found, the heartbeat script MUST NOT automatically fail the node. Instead, it must initiate a graceful completion flow.
2. **Acceptance Criteria Verification (ADR 007 Alignment)**: Before marking the PR-less node as `COMPLETED`, the heartbeat MUST parse the node's markdown content to verify compliance with ADR 007.
   - If the node contains unchecked markdown tasks (`- [ ]`), the heartbeat must transition the node to `FAILED` with a `rejection_reason` indicating unfulfilled acceptance criteria.
   - If the node is a valid late-binding parent (has children or is of type `IDEA`, `PRD`, `EPIC`, `STORY`), unchecked tasks serve as a signal to keep the node in a `PENDING` state to await child generation. Note that leaf tasks (like `TASK` or `RESEARCH`) may also use late binding, so if they have children, they should also be treated as late-binding parents.
   - If all tasks are checked off (or if there are no tasks), the heartbeat transitions the node to `COMPLETED`.
3. **Journal Logging**: The heartbeat must explicitly log these PR-less `COMPLETED` state transitions in the TPM journal to ensure system state changes are auditable.

## Consequences
- **Positive**: Correctly honors agents that complete their tasks with zero file changes, reducing false failures.
- **Positive**: Prevents endless Resurrection Loops for successfully analyzed but unedited nodes.
- **Negative**: Increases the complexity of `foundry-heartbeat.ts` by requiring it to conditionally evaluate the PR existence and combine it with the markdown task validation logic.
