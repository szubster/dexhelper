---
id: prd-014-013-cascade-cancellation
type: PRD
title: 'PRD: Cascade CANCELLED Statuses'
status: READY
owner_persona: epic_planner
created_at: '2026-05-03'
updated_at: '2026-05-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: .foundry/ideas/idea-014-cascade-cancellation.md
tags:
  - foundry
  - dag
  - orchestrator
  - cancellation
notes: ''
---

# Product Requirements Document: Cascade CANCELLED Statuses

## Objective
Enhance the Foundry DAG Orchestrator to automatically cascade a `CANCELLED` status from a parent node down to all its hierarchical children. This will prevent agents from working on orphaned tasks when the parent initiative is aborted, thus stopping failures masked as completions via the Empty PR policy loophole.

## Background
The Empty PR policy is a core Foundry mechanism. When agents determine a task requires no changes or the artifact already matches the required state, they submit a PR with 0 file changes, which is auto-merged, setting the task to `COMPLETED`. However, when agents encountered cancelled features or tasks that failed validation but couldn't be implemented, they mistakenly submitted empty PRs. This advanced the node status to `COMPLETED`, unblocking downstream tasks incorrectly.

While agents have been explicitly instructed to use the `FAILED` or `CANCELLED` status in the YAML frontmatter, a system-level fail-safe is needed in the orchestrator.

## Requirements

1. **Detect CANCELLED Nodes:** The orchestrator (`.github/scripts/foundry-orchestrator.ts`) must identify nodes explicitly marked as `status: "CANCELLED"`.
2. **Determine Child Nodes:** For any `CANCELLED` node, the orchestrator must identify all nodes that list it as a `parent`.
3. **Recursive Cascading:** The cascading of `CANCELLED` must be recursive. If an Epic is cancelled, its Stories must be cancelled, and consequently, the Tasks under those Stories must also be cancelled.
4. **Transition to CANCELLED:** The script must modify the YAML frontmatter of the identified child nodes, updating their `status` to `CANCELLED`. This should utilize `gray-matter` parsing to safely update the frontmatter and update `updated_at` timestamps.
5. **Idempotency:** Re-running the orchestrator on already `CANCELLED` subtrees must be safe and not cause unnecessary file writes or endless loops.
6. **No Pre-emption of In-Flight Work:** If a child node is already `COMPLETED`, its status should *not* be changed to `CANCELLED`. Only nodes that are `PENDING`, `READY`, `FAILED`, or `BLOCKED` (and potentially `ACTIVE` with careful consideration of the heartbeat) should be cancelled. The most conservative approach is to cancel anything not `COMPLETED`.

## Technical Considerations

*   **File Modification:** Use `matter.stringify()` as defined in ADR-006 to ensure robust writing of updated YAML frontmatter.
*   **Orchestrator Execution Phase:** This logic should likely run *before* the main dependency resolution loop to clear out the DAG quickly.
*   **Active Sessions:** If an `ACTIVE` node is cancelled, what happens to the running Jules session? The heartbeat script (`foundry-heartbeat.ts`) might need to be aware, or the GitHub Actions workflow should handle cancellation of runs if the orchestrator detects an in-flight cancellation. For V1, simply updating the node file and letting the PR close out naturally (or letting the agent fail) is acceptable.

## Acceptance Criteria

- [x] Epic Planner: Break this PRD down into actionable Epics.
  - >> .foundry/epics/epic-013-023-orchestrator-cascade-cancellation.md
