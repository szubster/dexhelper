---
id: task-363-441-update-parsers-qa
type: TASK
title: Update Parsers QA
status: ACTIVE
owner_persona: qa
created_at: '2026-08-20'
updated_at: '2026-08-22'
depends_on:
  - task-363-440-update-parsers-impl
jules_session_id: '13162076385703317573'
pr_number: null
parent: story-404-363-update-parsers
tags:
  - savedata
  - typescript
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update Parsers QA

## Description
Verify parser tests and type narrowing for the updated `gen1.ts`, `gen2.ts`, and `gen3.ts` parsers.

## Acceptance Criteria
- [ ] Verify that `gen1.ts`, `gen2.ts`, and `gen3.ts` return the correctly narrowed `SaveData` type.
- [ ] Verify that all parser tests pass without regressions.
