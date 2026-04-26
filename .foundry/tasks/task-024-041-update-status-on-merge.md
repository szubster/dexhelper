---
id: "task-024-041-update-status-on-merge"
type: "TASK"
title: "Update Node Status on PR Merge"
status: "ACTIVE"
owner_persona: "coder"
created_at: "2026-04-26"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: "8222136041464651265"
pr_number: null
parent: ".foundry/stories/story-008-024-update-status-on-merge.md"
tags: ["foundry-engine", "orchestrator", "pr-merge"]
---

# Update Node Status on PR Merge

## Context
As defined in Story 008-024, the orchestrator/heartbeat must correctly identify when a GitHub PR is merged and transition the corresponding task node to `COMPLETED`.

While looking at `.github/scripts/foundry-heartbeat.ts` and its test, there is already an implementation for checking if a PR is merged (`pr.merged` and fetching from GitHub API if undefined) and it invokes `transitionNodeToCompleted`. Your task is to verify if there is any bug in the implementation preventing nodes from being transitioned to `COMPLETED` upon PR merge. Review `foundry-heartbeat.ts` and `foundry-heartbeat.test.ts`. If there are any bugs, fix them. If the implementation is already fully working, verify the tests cover this feature, run the tests to confirm, and check off the acceptance criteria.

## Acceptance Criteria
- [ ] The GitHub Action workflow or orchestrator script correctly identifies when a PR is merged.
- [ ] The node associated with the merged PR is transitioned to `COMPLETED` status.
- [ ] Tests verify that the node status updates correctly upon PR merge.
