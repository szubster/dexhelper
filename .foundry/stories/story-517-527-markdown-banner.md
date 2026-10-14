---
id: story-517-527-markdown-banner
type: STORY
title: Implement Markdown Banner for WIP Documentation
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-09-02'
updated_at: '2026-10-13'
depends_on:
  - story-517-526-schema-wip-support
jules_session_id: null
pr_number: null
parent: epic-346-517-wip-documentation
tags:
  - documentation
  - banner
  - wip
rejection_reason: ''
locks: []
---

## Description
This story introduces a standard Markdown warning banner that must be placed at the top of artifacts and documentation nodes that are in `WIP` or `DRAFT` state.

## Acceptance Criteria
- [x] Define the Markdown banner component/string to be used for WIP/DRAFT nodes
- [x] Update documentation generators/templates to include this banner if the state is WIP or DRAFT
- [x] Break down into Tasks
- [x] task-527-581-define-markdown-banner
- [x] task-527-582-update-generators-wip-banner
