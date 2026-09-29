---
id: task-520-550-refactor-gen2-parser-impl
type: TASK
title: Refactor Gen 2 Parser to use Constants
status: ACTIVE
owner_persona: coder
created_at: '2026-09-06'
updated_at: '2026-09-29'
depends_on:
  - task-520-549-define-gen2-constants-impl
jules_session_id: '10546326888500033500'
parent: story-522-520-gen2-constants-extraction
rejection_reason: ''
locks: []
---
# TASK: Refactor Gen 2 Parser to use Constants

## Context
Update gen2.ts to use the new constants module.

## Acceptance Criteria
- [x] Update `src/engine/saveParser/parsers/gen2.ts` to import constants from `gen2Constants.ts`.
- [x] Replace any remaining inline magic numbers within the parser logic with named constants.
- [x] Ensure the existing Gen 2 test suite passes without regressions.
