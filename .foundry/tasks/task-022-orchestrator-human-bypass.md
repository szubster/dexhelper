---
id: task-022-orchestrator-human-bypass
type: TASK
title: "Implement Human Task Bypass in Orchestrator"
status: "ACTIVE"
owner_persona: coder
created_at: "2026-04-23"
updated_at: "2026-04-23"
depends_on:
  - ".foundry/archive/stories/story-010-orchestrator-human-bypass.md"
jules_session_id: "13992972196049399213"
parent: ".foundry/archive/stories/story-010-orchestrator-human-bypass.md"
tags:
  - "human-in-the-loop"
  - "orchestrator"
---

# Task 022: Implement Human Task Bypass in Orchestrator

## 1. Context
The Foundry orchestrator dispatches `READY` tasks to Jules agents. However, tasks assigned to the `human` persona should bypass this automated dispatch. We need to update `.github/scripts/foundry-orchestrator.ts` to transition these tasks to `ACTIVE` instead of `READY`, ensuring they are omitted from the automated matrix runner while still reflecting their unblocked state in the DAG.

## 2. Technical Blueprint

### A. Refactor Promotion Logic
- In `.github/scripts/foundry-orchestrator.ts`, locate the `promoteNodeToReady` function.
- Refactor it into a generic `promoteNodeStatus` function that takes a `targetStatus: string` as an argument.
- Use a regex replacement strategy similar to the existing logic, but allow the replacement of the current status with the dynamically provided `targetStatus`. Make sure to safely match the exact current status of the node (e.g., `PENDING` or `READY`).

### B. Update Phase 5 (PROMOTE)
- In the `main` function under "Phase 5: PROMOTE", iterate over the `eligible` nodes.
- If `node.frontmatter.owner_persona === 'human'`, promote the node from `PENDING` to `ACTIVE` using the refactored `promoteNodeStatus`.
- Otherwise, promote the node from `PENDING` to `READY`.

### C. Handle Existing READY Human Tasks
- Since the orchestrator is idempotent and tasks might already be in a `READY` state (or manually forced, despite invariants), add logic after Phase 5 to find any node where `status === 'READY'` and `owner_persona === 'human'`.
- Promote these existing nodes from `READY` to `ACTIVE`.

### D. Update Phase 6 (COLLECT)
- Phase 6 currently filters nodes where `status === 'READY'`. Because human tasks will now be `ACTIVE`, they will naturally be excluded from the `readyNodes` JSON output array.
- Verify that this logic remains unchanged and works correctly with the new `ACTIVE` state for human tasks.

### E. Unit Tests
- In `.github/scripts/foundry-orchestrator.test.ts`, add unit tests covering the human bypass scenario.
- Test 1: Ensure a `PENDING` node with `owner_persona: human` is promoted directly to `ACTIVE` and is absent from the JSON output.
- Test 2: Ensure an already `READY` node with `owner_persona: human` is caught and promoted to `ACTIVE`, keeping it out of the JSON output.

## 3. Acceptance Criteria
- [ ] `promoteNodeToReady` is refactored to `promoteNodeStatus(node, currentStatus, targetStatus)`.
- [ ] Phase 5 iterates through eligible nodes and promotes `human` nodes to `ACTIVE` instead of `READY`.
- [ ] An additional check catches any existing `READY` `human` nodes and upgrades them to `ACTIVE`.
- [ ] Human nodes do not appear in the JSON output array from the orchestrator.
- [ ] Unit tests are added to verify the human bypass behavior in `foundry-orchestrator.test.ts`.
- [ ] `pnpm lint`, `pnpm test`, and `pnpm test:e2e` pass successfully.