---
id: "task-024-042-qa-update-status-on-merge"
type: "TASK"
title: "QA: Update Node Status on PR Merge"
status: PENDING
owner_persona: "qa"
created_at: "2026-04-26"
updated_at: "2026-04-26"
depends_on:
  - ".foundry/tasks/task-024-041-update-status-on-merge.md"
jules_session_id: null
pr_number: null
parent: ".foundry/stories/story-008-024-update-status-on-merge.md"
tags: ["foundry-engine", "qa", "pr-merge"]
---

# QA: Update Node Status on PR Merge

## Context
The coder has verified or implemented the PR merge detection in `.github/scripts/foundry-heartbeat.ts`.

## Acceptance Criteria
- [ ] Verify that the `foundry-heartbeat.test.ts` has passing tests for transitioning a node to `COMPLETED` when its PR is merged.
- [ ] Verify that no regressions were introduced to the orchestrator logic.
