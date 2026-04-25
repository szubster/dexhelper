---
id: task-003-resurrection-loop
type: TASK
title: "Resurrection Loop & Rejection Handling"
status: COMPLETED
owner_persona: tech_lead
created_at: "2026-04-20"
updated_at: "2026-04-21"
depends_on:
  - .foundry/archive/tasks/task-002-create-heartbeat.md
jules_session_id: null
rejection_count: 0
parent: .foundry/archive/stories/story-001-matrix-runner.md
---

# Resurrection Loop & Rejection Handling

Extend the local orchestration scripts (e.g., `foundry-heartbeat.ts`) to manage failure recovery and PR rejections (manual CEO action) natively. This ensures a tight feedback loop without requiring new GitHub Action workflows.

## Acceptance Criteria
- [ ] Extend existing orchestration to identify `FAILED` nodes and `IN_REVIEW` nodes with assigned PRs.
- [ ] For `IN_REVIEW` tasks, poll GitHub (via API or `gh` CLI) to check the PR status. If the PR is **closed and unmerged** (e.g., rejected, or conflicts introduced), mark the node for resurrection.
- [ ] Increment a `rejection_count` frontmatter field on each resurrection.
- [ ] Capture the last failure reason (from PR comments or Jules termination logs) and inject it into the node's `notes` frontmatter.
- [ ] Transition the resurrected node directly back to `READY` (if dependencies are still met), clearing the outdated `jules_session_id` and `pr_number` to allow the Engine to assign a fresh Jules session.

## Technical Notes
- Do **not** create a new GitHub Action workflow. This logic should be self-contained within the scripts (like `foundry-heartbeat.ts` or `foundry-orchestrator.ts`) executed by the existing `foundry-engine.yml`.
- The "Resurrection Loop" is a key part of the autonomous factory's self-healing capabilities.
- Special care should be taken to avoid infinite loops on "unfixable" nodes (e.g., add logic to permanently `FAIL` or alert `agile_coach` after 3+ consecutive rejections).
