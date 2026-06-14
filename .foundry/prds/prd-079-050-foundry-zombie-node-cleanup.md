---
id: prd-079-050-foundry-zombie-node-cleanup
type: PRD
title: Foundry Zombie Node Garbage Collection
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: '12465921032678961216'
pr_number: null
parent: idea-079-foundry-zombie-node-cleanup
tags:
  - foundry
  - orchestrator
  - maintenance
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Foundry Zombie Node Garbage Collection

## 1. Context and Problem Statement
The Foundry DAG (Directed Acyclic Graph) orchestration relies on a heartbeat mechanism to detect silent session crashes and transition stranded nodes from `ACTIVE` back to `FAILED`. However, if the heartbeat workflow itself fails, or nodes end up in an invalid state (e.g. marked `ACTIVE` without a valid `jules_session_id`, or referencing a non-existent or long-dead GitHub action run), these "zombie" nodes can block the DAG indefinitely. Their dependencies remain `PENDING` because the parent node never resolves to `COMPLETED` or `FAILED`.

Manual intervention by the TPM persona is currently required to resolve these deadlocks, which reduces the system's autonomy and resilience.

## 2. Proposed Solution
Implement an automated Garbage Collection (GC) mechanism to identify and auto-remediate these zombie nodes. This could be integrated directly into the primary orchestrator script (`.github/scripts/foundry-orchestrator.ts`) or run as a standalone, scheduled script by the TPM persona.

The mechanism will:
1. **Sweep and Detect**: Iterate through all `.foundry` nodes. Identify any node in the `ACTIVE` state.
2. **Verify Liveliness**: Cross-reference the node's `jules_session_id` against the GitHub API to check if the corresponding workflow run is still active.
    * If `jules_session_id` is null or invalid.
    * If the GitHub Actions workflow has completed (success, failure, or cancelled).
3. **Remediate**: Automatically transition the identified zombie node's state from `ACTIVE` to `FAILED`.
4. **Trigger Recovery**: The existing Resurrection Loop will naturally pick up these `FAILED` nodes on the next orchestrator cycle, ensuring the task is re-queued, preventing DAG deadlock.

## 3. Value Proposition
* **Increased Autonomy**: Removes the need for human or manual TPM intervention to clear transient DAG blockages.
* **Improved Resilience**: Enhances the self-healing capability of the Foundry system.
* **Higher Throughput**: Unblocks downstream dependencies faster, improving overall execution speed.

## 4. Acceptance Criteria
- [ ] Determine implementation approach: direct orchestrator integration vs. standalone TPM script.
- [ ] Implement detection logic to find `ACTIVE` nodes with invalid or stale `jules_session_id`s.
- [ ] Implement remediation logic to transition identified nodes to `FAILED`.
- [ ] Ensure integration with GitHub API (if necessary) to verify workflow run status.
- [ ] Unit tests for the new GC logic.

## 5. Next Steps
- [x] Break down into Epics.
  - [ ] epic-050-089-zombie-node-detection-engine
  - [ ] epic-050-090-zombie-node-remediation-and-gc
