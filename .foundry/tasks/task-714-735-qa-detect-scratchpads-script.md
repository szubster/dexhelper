---
id: task-714-735-qa-detect-scratchpads-script
type: TASK
title: QA detect-scratchpads.js script
status: READY
owner_persona: qa
created_at: '2026-10-31T19:34:45.000Z'
updated_at: '2026-10-31T19:34:45.000Z'
depends_on:
  - task-714-734-implement-detect-scratchpads-script
jules_session_id: null
pr_number: null
parent: story-584-714-implement-detect-scratchpads-script
tags:
  - scripts
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# QA detect-scratchpads.js script

## Objectives
- QA the implementation of `.github/scripts/detect-scratchpads.js`.

## Acceptance Criteria
- [ ] Verify `.github/scripts/detect-scratchpads.js` successfully detects uncommitted `.sh`, `.cjs`, `.js`, and `.md` files in the repository root.
- [ ] Verify the script ignores tracked files that happen to have these extensions (e.g., `README.md`).
- [ ] Verify the script returns a non-zero exit code and logs file paths when scratchpad files are present.
- [ ] Verify the script returns a zero exit code when no uncommitted scratchpad files are present in the root.
