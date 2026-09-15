---
id: task-527-582-update-generators-wip-banner
type: TASK
title: Update documentation generators to include WIP/DRAFT banner
status: READY
owner_persona: coder
created_at: "2026-09-15T18:24:00Z"
updated_at: "2026-09-15T18:24:00Z"
depends_on:
  - task-527-581-define-markdown-banner
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
Update the node creation and serialization utilities (such as `createValidTestNode` in `.github/scripts/foundry-test-utils.ts`, `promote-frontmatter.ts` if applicable, and other Markdown generators) to dynamically prepend the `WIP_DRAFT_BANNER` when generating a node with a `WIP` or `DRAFT` status.

## Acceptance Criteria
- [ ] Import and use the `WIP_DRAFT_BANNER` constant when generating markdown content.
- [ ] Check if the node's `status` is `WIP` or `DRAFT`.
- [ ] If the status matches, prepend the banner with appropriate spacing to the markdown body.
- [ ] Write or update unit tests to verify that WIP/DRAFT nodes are generated with the banner and STABLE/READY ones are not.
