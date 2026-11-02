---
id: task-714-734-implement-detect-scratchpads-script
type: TASK
title: Implement detect-scratchpads.js script
status: READY
owner_persona: coder
created_at: '2026-10-31T19:34:45.000Z'
updated_at: '2026-10-31T19:34:45.000Z'
depends_on: []
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

# Implement detect-scratchpads.js script

## Objectives
- Create `.github/scripts/detect-scratchpads.js` to scan the repository root for uncommitted, ephemeral files.

## Acceptance Criteria
- [ ] Create `.github/scripts/detect-scratchpads.js`.
- [ ] Implement scanning logic for the repository root to detect `.sh`, `.cjs`, `.js`, and `.md` files.
- [ ] Ignore files that are tracked by Git (i.e., only flag uncommitted/untracked scratchpad files).
- [ ] Output the paths of any detected scratchpad files.
- [ ] Ensure the script exits with a non-zero code if scratchpad files are found, and zero if none are found.
