---
id: task-527-581-define-markdown-banner
type: TASK
title: Define Markdown Banner Constant
status: READY
owner_persona: coder
created_at: "2026-09-15T18:23:20Z"
updated_at: "2026-09-15T18:23:20Z"
depends_on: []
jules_session_id: null
pr_number: null
parent: story-517-527-markdown-banner
tags:
  - documentation
  - banner
  - wip
rejection_reason: ""
locks: []
---

## Description
Define the standard Markdown banner string constant `WIP_DRAFT_BANNER` in `.github/scripts/utils/banner.ts` (or a similar location) to be used when a node's status is WIP or DRAFT. The banner string should match the existing expected format: `> ⚠️ **WORK IN PROGRESS / DRAFT**`.

## Acceptance Criteria
- [ ] Add the `WIP_DRAFT_BANNER` constant to `.github/scripts/utils/banner.ts`.
- [ ] Export the constant so it can be used by other modules.
- [ ] Ensure unit tests are updated or added to verify the constant exists and is correct.
