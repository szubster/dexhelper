---
id: story-404-363-update-parsers
type: STORY
title: Update Generation-Specific Parsers and Tests
status: READY
owner_persona: tech_lead
created_at: '2026-08-07'
updated_at: '2026-08-23'
depends_on:
  - story-404-362-refactor-savedata-type
jules_session_id: null
pr_number: null
parent: epic-122-404-refactor-savedata-typing
tags:
  - savedata
  - typescript
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update Generation-Specific Parsers and Tests

## Description
Update `gen1.ts`, `gen2.ts`, and `gen3.ts` parsers to return correctly narrowed types, and ensure all existing parser tests pass without regressions.

## Acceptance Criteria
- [x] Create task for coder to update parsers and tests.
- [x] Create task for qa to verify parser tests and type narrowing.
- [ ] task-363-440-update-parsers-impl
- [ ] task-363-441-update-parsers-qa
