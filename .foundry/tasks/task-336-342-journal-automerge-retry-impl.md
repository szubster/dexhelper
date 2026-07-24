---
id: task-336-342-journal-automerge-retry-impl
type: TASK
title: Enable Automerge for Journal Entries
status: ACTIVE
owner_persona: coder
created_at: '2026-07-23'
updated_at: '2026-07-24'
depends_on: []
jules_session_id: '9955088546035772120'
pr_number: null
parent: story-338-336-implement-session-unique-journals
tags:
  - foundry
  - journals
  - workflow
  - automerge
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# TASK: Enable Automerge for Journal Entries

## Objective
Update the continuous integration/GitHub Actions configuration to automatically merge pull requests that exclusively contain updates to journal files. (Note: Checkbox-only auto-merge is already implemented in `.github/scripts/analyze-diff.js`).

## Technical Contract
- Locate the GitHub Actions workflow responsible for automerging PRs: `.github/workflows/auto-close-empty-pr.yml`.
- Update the workflow conditions to allow automerge for PRs where the only modified files are located within the `.foundry/journals/` directory.
- Ensure this new condition works alongside the existing empty PR and checkbox-only PR checks.
- Ensure that PRs containing a combination of BOTH journal modifications AND checkbox updates are successfully auto-merged.
- You may use tools like `gh pr diff` or `git diff` within the script block, or create an additional analyzer script (similar to `analyze-diff.js`) to verify the paths of changed files.
- Ensure these new conditions do not inadvertently automerge PRs that contain changes outside of the journals directory.

## Acceptance Criteria
- [ ] `.github/workflows/auto-close-empty-pr.yml` (or an associated script) is updated to automerge PRs modifying only `.foundry/journals/*`.
- [ ] The workflow successfully auto-merges PRs containing a combination of both journal modifications and checkbox updates.
