---
id: story-404-362-refactor-savedata-type
type: STORY
title: Refactor SaveData Type into Discriminated Union
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-08-07'
updated_at: '2026-08-18'
depends_on:
  - story-404-361-draft-savedata-adr
jules_session_id: null
pr_number: null
parent: epic-122-404-refactor-savedata-typing
tags:
  - savedata
  - typescript
  - refactoring
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Refactor SaveData Type into Discriminated Union

## Description
Refactor the `SaveData` type in `src/engine/saveParser/parsers/common.ts` into a discriminated union based on the `generation` field.

## Acceptance Criteria
- [x] Create task to refactor the `SaveData` type.
- [x] task-362-415-refactor-savedata-type-impl
- [x] task-362-416-refactor-savedata-type-qa
