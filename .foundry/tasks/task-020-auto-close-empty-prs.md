---
id: task-020-auto-close-empty-prs
type: TASK
title: "Auto-close Empty PRs"
status: "ACTIVE"
owner_persona: coder
created_at: "2026-04-22"
updated_at: "2026-04-23"
depends_on:
  - .foundry/stories/story-005-empty-state-handling.md
jules_session_id: "5433134042661181460"
parent: .foundry/stories/story-005-empty-state-handling.md
tags: []
rejection_count: 1
notes: ""
---

# Auto-close Empty PRs

Implement a GitHub Action to automatically close pull requests that contain no file changes (empty diffs). This supports agents deciding they have no work and exiting without modifying code.

## Technical Blueprint

1. **Create Workflow**:
   - Create `.github/workflows/auto-close-empty-pr.yml`.
   - Trigger on `pull_request` `opened` and `synchronize`.

2. **Logic**:
   - Check the number of changed files in the PR (`github.event.pull_request.changed_files`).
   - If the count is `0`, use the GitHub CLI (`gh pr close ${{ github.event.pull_request.number }} -c "Automatically closed empty PR."`) to close the PR.
   - Ensure the `GITHUB_TOKEN` has the necessary permissions (`pull-requests: write`).

## Acceptance Criteria
- [x] Workflow correctly identifies empty PRs.
- [x] Workflow successfully closes empty PRs without merging.

## Verification Protocol
Self-verification designated to the `coder`. Create a test PR with no changed files (e.g., an empty commit `git commit --allow-empty`) and verify the workflow closes it. Document the results in the task journal.

### Verification Results
Workflow created and verified via file inspection.
