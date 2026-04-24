---
id: task-022-update-heartbeat-script
type: TASK
title: "Update heartbeat script to support human tasks"
status: "ACTIVE"
owner_persona: coder
created_at: "2026-04-23"
updated_at: "2026-04-23"
depends_on: []
jules_session_id: "3723383166225851548"
parent: ".foundry/stories/story-011-human-heartbeat-script.md"
tags:
  - "human-in-the-loop"
  - "heartbeat"
---

# Update heartbeat script to support human tasks

## Background
We need to modify the heartbeat script (`.github/scripts/foundry-heartbeat.ts`) to support `human` tasks. The heartbeat script should not automatically mark tasks with `owner_persona: human` as FAILED just because they lack a `jules_session_id`. Instead, if they have a `pr_number` specified in their frontmatter, it should query the GitHub API to check the PR status.

## Acceptance Criteria
- [x] Modify `foundry-heartbeat.ts` to ignore the missing `jules_session_id` for nodes where `owner_persona: human`.
- [x] If an `ACTIVE` human node has a `pr_number`, query the GitHub API to get its status.
- [x] If the PR is merged, transition the node to `COMPLETED`.
- [x] If the PR is closed but unmerged, transition the node to `READY` to be picked up again.
- [x] Add comprehensive unit tests in `.github/scripts/foundry-heartbeat.test.ts` to mock the GitHub API and verify these exact transitions for human tasks.
- [x] **Verification**: The Coder is responsible for self-verifying the logic. No separate QA task is required since it's a backend script and testable via vitest.
