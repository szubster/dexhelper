---
id: task-520-550-refactor-gen2-parser-impl
type: TASK
title: Refactor Gen 2 Parser to use Constants
status: READY
owner_persona: coder
parent: story-522-520-gen2-constants-extraction
depends_on:
  - task-520-549-define-gen2-constants-impl
created_at: '2026-09-06'
updated_at: '2026-09-06'
jules_session_id: null
rejection_reason: ''
---
# TASK: Refactor Gen 2 Parser to use Constants

## Context
Update gen2.ts to use the new constants module.

## Acceptance Criteria
- [ ] Update `src/engine/saveParser/parsers/gen2.ts` to import constants from `gen2Constants.ts`.
- [ ] Replace any remaining inline magic numbers within the parser logic with named constants.
- [ ] Ensure the existing Gen 2 test suite passes without regressions.