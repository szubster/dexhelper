---
id: task-520-551-gen2-constants-qa
type: TASK
title: QA - Gen 2 Constants Extraction
status: PENDING
owner_persona: qa
created_at: '2026-09-06'
updated_at: '2026-09-09'
depends_on:
  - task-520-550-refactor-gen2-parser-impl
jules_session_id: null
parent: story-522-520-gen2-constants-extraction
rejection_reason: ''
locks: []
---
# TASK: QA - Gen 2 Constants Extraction

## Context
Verify compliance with ADR 028 for the Gen 2 parser.

## Acceptance Criteria
- [ ] Review `gen2.ts` and `gen2Constants.ts` to ensure no inline magic numbers exist.
- [ ] Verify that all unit tests for the Gen 2 parser are passing.
