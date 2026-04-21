---
id: idea-004-human-in-the-loop
type: IDEA
title: "Human-in-the-Loop Handoff"
status: PENDING
owner_persona: product_manager
created_at: "2026-04-21"
updated_at: "2026-04-21"
depends_on: [".foundry/ideas/idea-003-atomic-handoff-foundation.md"]
jules_session_id: null
---

# IDEA-004: Human-in-the-Loop Handoff

## 1. Problem Statement
The Foundry is currently designed for autonomous agents (Jules). However, there are scenarios where human intervention is required:
- **High-Risk Architectural Shifts**: Decisions that require long-term project foresight.
- **Hardware/Real-World Interaction**: Testing on physical devices or real GameBoy hardware.
- **Creative/Subjective Design**: UX/UI decisions that go beyond standard design tokens.
- **Unblocking Agents**: Resolving complex merge conflicts or DAG deadlocks that Jules cannot fix.

Currently, if a task is marked for completion, the orchestrator expects a `jules_session_id` and a specific heartbeat loop. There is no formal way to assign a node to a human and track its progress via standard PR flows.

## 2. Proposed Changes

### 2.1 Schema Extensions
We need to update the Foundry Master Schema to support human ownership.

#### New Owner Persona
Add `human` to the `owner_persona` enum.
- **`human`**: A catch-all persona for task delegation to the repository owner or other human contributors.

#### New Tracking Field
Add `pr_number` to the global frontmatter schema.
- **`pr_number`**: `integer | null` (Optional). Defaults to `null`. 
- When a human (or an agent acting on behalf of a human) opens a PR to satisfy a node, they may record the PR number here for system tracking. It is not required if work is committed directly to `main`.

### 2.2 Orchestrator Logic
The `foundry-orchestrator.ts` and `foundry-heartbeat.ts` should be updated:
1. **Bypass Dispatch**: If `owner_persona` is `human`, the orchestrator marks the node as `ACTIVE` but does **not** attempt to spawn a Jules session. Humans can identify `READY` tasks to "pick up" and implement on their own schedule (either via PR or direct commit to `main`).
2. **PR Monitoring**: If a node is `ACTIVE` and has a `pr_number`, the heartbeat should poll the GitHub API for that PR's status.
3. **Completion States**:
    - **Merged**: The orchestrator/heartbeat should automatically transition the node to `COMPLETED`.
    - **Closed (Unmerged)**: Transition the node back to `READY` so it can be re-claimed or picked up again.
    - **Manual**: Humans may manually transition a node from `ACTIVE` to `COMPLETED` if they committed directly to `main`.

## 3. Edge Cases & Considerations
- **Multiple PRs**: A task might require multiple PRs. Should `pr_number` be an array? (Recommendation: Keep it single for now to maintain task atomicity. If it needs many PRs, it should be a Story or Epic).
- **Validation**: Human tasks still need a `qa` node to follow them in the DAG to ensure even human work is verified by the system's standards.
- **No Timeouts**: Human tasks do not expire or fail based on heartbeat loops. They remain `ACTIVE` until manually completed or their linked PR is merged.

## 4. Next Steps
1. **Architect**: Update `schema.md` to include the new persona and field.
2. **Tech Lead**: Update the orchestrator and heartbeat scripts to handle `owner_persona: human`.
3. **CEO**: Approve the first human-assigned Task to test the flow.
