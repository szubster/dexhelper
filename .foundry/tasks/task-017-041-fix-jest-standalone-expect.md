---
id: "task-017-041-fix-jest-standalone-expect"
type: "TASK"
title: "Fix and enable jest/no-standalone-expect"
status: "ACTIVE"
owner_persona: "coder"
created_at: "2026-04-26"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: "3799978853957289057"
parent: ".foundry/stories/story-010-017-fix-jest-rules.md"
---

# Fix and enable jest/no-standalone-expect

## Context
The rule `jest/no-standalone-expect` was disabled to unblock CI. We need to fix the violations in the codebase and re-enable it.

## Instructions
- [x] 1. Change `"jest/no-standalone-expect": "off"` to `"error"` in `.oxlintrc.json`.
- [x] 2. Fix all violations by wrapping standalone `expect` calls in `test` or `it` blocks (e.g. in `saveFixtures.test.ts`).
- [x] 3. Ensure `pnpm exec oxlint .` passes.
