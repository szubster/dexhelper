---
id: "prd-004-human-in-the-loop"
type: "PRD"
title: "Human-in-the-Loop Handoff"
status: "ACTIVE"
owner_persona: "epic_planner"
created_at: "2026-04-21"
updated_at: "2026-04-22"
depends_on:
  - .foundry/ideas/idea-004-human-in-the-loop.md
jules_session_id: "13927079115328894118"
parent: ".foundry/ideas/idea-004-human-in-the-loop.md"
tags:
  - "human-in-the-loop"
---

# PRD-004: Human-in-the-Loop Handoff

## Executive Summary
The Foundry is currently designed for autonomous agents (Jules). However, there are scenarios where human intervention is required:
- **High-Risk Architectural Shifts**: Decisions that require long-term project foresight.
- **Hardware/Real-World Interaction**: Testing on physical devices or real GameBoy hardware.
- **Creative/Subjective Design**: UX/UI decisions that go beyond standard design tokens.
- **Unblocking Agents**: Resolving complex merge conflicts or DAG deadlocks that Jules cannot fix.

Currently, if a task is marked for completion, the orchestrator expects a `jules_session_id` and a specific heartbeat loop. There is no formal way to assign a node to a human and track its progress via standard PR flows. This PRD outlines the architecture and workflows for supporting "human" ownership of tasks within the DAG.

## Problem Statement
The Foundry DAG cannot properly orchestrate human intervention because it expects every active task to be claimed by a `jules_session_id` that is verifiable via the Jules API. When an agent cannot accomplish a task or subjective judgment is needed, we need a mechanism that:
1. Skips the GitHub Actions dispatch loop for that node.
2. Continues to track that node's progress.
3. Automatically advances the DAG when the human merges their PR or commits to `main`.

## Proposed Changes

### Schema Extensions
We need to update the Foundry Master Schema to support human ownership.

#### New Owner Persona
Add `human` to the `owner_persona` enum.
- **`human`**: A catch-all persona for task delegation to the repository owner or other human contributors.

#### New Tracking Field
Add `pr_number` to the global frontmatter schema.
- **`pr_number`**: `integer | null` (Optional). Defaults to `null`.
- When a human (or an agent acting on behalf of a human) opens a PR to satisfy a node, they may record the PR number here for system tracking. It is not required if work is committed directly to `main`.

### Orchestrator Logic
The `foundry-orchestrator.ts` and `foundry-heartbeat.ts` must be updated:
1. **Bypass Dispatch**: If `owner_persona` is `human`, the orchestrator marks the node as `ACTIVE` but does **not** attempt to spawn a Jules session. Humans can identify `READY` tasks to "pick up" and implement on their own schedule.
2. **PR Monitoring**: If a node is `ACTIVE` and has a `pr_number`, the heartbeat should poll the GitHub API for that PR's status.
3. **Completion States**:
    - **Merged**: The orchestrator/heartbeat should automatically transition the node to `COMPLETED`.
    - **Closed (Unmerged)**: Transition the node back to `READY` so it can be re-claimed or picked up again.
    - **Manual**: Humans may manually transition a node from `ACTIVE` to `COMPLETED` if they committed directly to `main`.

## Edge Cases & Considerations
- **Multiple PRs**: A task might require multiple PRs. `pr_number` will remain single (integer) for now to maintain task atomicity. Complex work must be decomposed into stories or epics.
- **Validation**: Human tasks still need a `qa` node to follow them in the DAG to ensure even human work is verified by the system's standards.
- **No Timeouts**: Human tasks do not expire or fail based on heartbeat loops. They remain `ACTIVE` until manually completed or their linked PR is merged.

## Next Steps
- **Epic Planner**: Break down this PRD into Epics mapping out the schema additions, orchestrator script modifications, and required testing.

## Generated Epics
- [.foundry/epics/epic-010-hitl-schema-extensions.md](../epics/epic-010-hitl-schema-extensions.md)
- [.foundry/epics/epic-011-hitl-orchestrator-bypass.md](../epics/epic-011-hitl-orchestrator-bypass.md)
- [.foundry/epics/epic-012-hitl-heartbeat-monitoring.md](../epics/epic-012-hitl-heartbeat-monitoring.md)
