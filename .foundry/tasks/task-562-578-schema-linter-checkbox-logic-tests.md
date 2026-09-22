---
id: task-562-578-schema-linter-checkbox-logic-tests
type: TASK
title: Write Tests for Markdown Checkbox Parsing Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-09-12'
updated_at: '2026-09-22'
depends_on:
  - task-562-576-schema-linter-checkbox-logic-impl
jules_session_id: '3551937715547541387'
parent: story-552-562-schema-linter-core-logic
tags:
  - foundry
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Write Tests for Markdown Checkbox Parsing Logic

## Context
Write unit tests for the markdown checkbox linting logic added to `scripts/validate-foundry-schema.ts`. Verify that valid checkbox syntaxes pass and invalid ones trigger the correct errors.

## Acceptance Criteria
- [x] Add testing logic to cover all edge cases around markdown checkbox formatting in `scripts/validate-foundry-schema.ts`.
