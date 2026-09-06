---
id: task-520-551-gen2-constants-qa
type: TASK
title: QA - Gen 2 Constants Extraction
status: READY
owner_persona: qa
parent: story-522-520-gen2-constants-extraction
depends_on:
  - task-520-550-refactor-gen2-parser-impl
---
# TASK: QA - Gen 2 Constants Extraction

## Context
Verify compliance with ADR 028 for the Gen 2 parser.

## Acceptance Criteria
- [ ] Review `gen2.ts` and `gen2Constants.ts` to ensure no inline magic numbers exist.
- [ ] Verify that all unit tests for the Gen 2 parser are passing.