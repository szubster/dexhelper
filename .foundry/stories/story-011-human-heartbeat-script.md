---
id: story-011-human-heartbeat-script
type: STORY
title: "Update heartbeat script to support human tasks"
status: PENDING
owner_persona: tech_lead
created_at: "2026-04-23"
updated_at: "2026-04-23"
depends_on: []
jules_session_id: null
parent: ".foundry/epics/epic-012-human-heartbeat.md"
tags:
  - "human-in-the-loop"
  - "heartbeat"
---

# Story 011: Update heartbeat script to support human tasks

## Background
Currently, the heartbeat script (`.github/scripts/foundry-heartbeat.ts`) will mark any task without a valid `jules_session_id` as FAILED. For tasks assigned to `owner_persona: human`, there won't be a jules_session_id. We need to modify the script to not mark these tasks as FAILED, and instead query the GitHub API to check the PR status if a PR number is associated with the task.

## Acceptance Criteria
- [ ] Ensure the script ignores missing `jules_session_id` when `owner_persona: human`.
- [ ] If an `ACTIVE` human task has a `pr_number`, query the GitHub API.
- [ ] If PR is merged, transition task to `COMPLETED`.
- [ ] If PR is closed but unmerged, transition task to `READY`.
- [ ] Add unit tests mocking the GitHub API.
