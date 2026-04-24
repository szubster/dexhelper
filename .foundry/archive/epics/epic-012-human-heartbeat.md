---
id: epic-012-human-heartbeat
type: EPIC
title: "Modify Heartbeat Script for Human Tasks"
status: "COMPLETED"
owner_persona: story_owner
created_at: "2026-04-23"
updated_at: "2026-04-23"
depends_on:
  - ".foundry/epics/epic-010-human-schema.md"
jules_session_id: null
parent: ".foundry/prds/prd-004-human-in-the-loop.md"
tags:
  - "human-in-the-loop"
  - "heartbeat"
---

# Epic 012: Modify Heartbeat Script for Human Tasks

## 1. Goal
Update `.github/scripts/foundry-heartbeat.ts` so that it monitors GitHub PR statuses for human tasks instead of enforcing timeout failures based on `jules_session_id`.

## 2. Background
The heartbeat script currently ensures that `ACTIVE` tasks have a living `jules_session_id`. If a task is abandoned or the agent crashes, the heartbeat transitions the task to `FAILED`. For `human` tasks, there is no timeout. Instead, if a `pr_number` is provided, the heartbeat should check if the PR has been merged or closed without merging.

## 3. Scope
- Updates to `foundry-heartbeat.ts` logic.
- Associated unit tests in `foundry-heartbeat.test.ts`.

## 4. Acceptance Criteria
- [ ] Heartbeat ignores missing `jules_session_id` for nodes with `owner_persona: human`.
- [ ] If an `ACTIVE` human task has a `pr_number`, the heartbeat queries the GitHub API for the PR's status.
- [ ] If the PR is merged, the task transitions to `COMPLETED`.
- [ ] If the PR is closed but unmerged, the task transitions to `READY` to allow reclamation.
- [ ] Unit tests cover all these scenarios, mocking the GitHub API.

## 5. Implementation Notes
- The heartbeat should use standard GitHub Action environment variables (`GITHUB_TOKEN`, `GITHUB_REPOSITORY`) to make its API calls.
- Direct-to-main commits (no `pr_number`) simply remain `ACTIVE` until manually moved to `COMPLETED` by a human. The heartbeat ignores them.

## Generated Stories
- [.foundry/stories/story-011-human-heartbeat-script.md](.foundry/stories/story-011-human-heartbeat-script.md)
