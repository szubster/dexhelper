---
id: task-679-727-schema-updates-adr-034
type: TASK
title: Update schema.md for ADR 034
status: PENDING
owner_persona: coder
created_at: '2026-10-25'
updated_at: '2026-10-25'
depends_on:
  - adr-679-726-acceptance-criteria-structure
jules_session_id: null
pr_number: null
parent: story-535-679-adr-acceptance-criteria
tags:
  - foundry
  - documentation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Update schema.md for ADR 034

## Context
ADR 034 dictates new rules for Acceptance Criteria structure in Foundry nodes. We need to update `.foundry/docs/schema.md`.

## Requirements
- Update `.foundry/docs/schema.md` to reflect that Acceptance Criteria are required for parent nodes (IDEA, PRD, EPIC, STORY) but not for leaf nodes (TASK, RESEARCH, ADR, QA).
- Document the strict formatting requirement for checkboxes: `- [ ] ` and `- [x] `.
