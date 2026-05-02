---
id: "story-010-017-fix-jest-rules"
type: "STORY"
title: "Fix jest rules reported by oxlint"
status: "COMPLETED"
owner_persona: "tech_lead"
created_at: "2026-04-26"
updated_at: "2026-04-27"
depends_on: []
jules_session_id: null
parent: ".foundry/archive/epics/epic-010-oxlint-config.md"
---

# Fix jest rules reported by oxlint

## Context
Even though we use vitest, oxlint uses the jest plugin to lint test files. We turned off `jest/no-standalone-expect` and `jest/no-disabled-tests` temporarily to unblock CI. We need to fix the violations and re-enable them.

## Requirements
- Fix the violations for `jest/no-standalone-expect`.
- Fix the violations for `jest/no-disabled-tests`.
- Re-enable the rules in `.oxlintrc.json` (set them to `"error"`).

## Acceptance Criteria
- [x] Tasks are created to fix and enable these rules.
- [x] `pnpm exec oxlint .` passes with these rules enabled.

## Generated Tasks
- [.foundry/tasks/task-017-041-fix-jest-standalone-expect.md](../tasks/task-017-041-fix-jest-standalone-expect.md)
- [.foundry/tasks/task-017-042-fix-jest-disabled-tests.md](../tasks/task-017-042-fix-jest-disabled-tests.md)
