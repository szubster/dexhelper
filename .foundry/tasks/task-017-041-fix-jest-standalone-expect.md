---
id: "task-017-041-fix-jest-standalone-expect"
type: "TASK"
title: "Fix and enable jest/no-standalone-expect"
status: "READY"
owner_persona: "coder"
created_at: "2026-04-26"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: null
parent: ".foundry/stories/story-010-017-fix-jest-rules.md"
---

# Fix and enable jest/no-standalone-expect

## Context
The rule `jest/no-standalone-expect` was disabled to unblock CI. We need to fix the violations in the codebase and re-enable it.

## Instructions
1. Change `"jest/no-standalone-expect": "off"` to `"error"` in `.oxlintrc.json`.
2. Fix all violations by wrapping standalone `expect` calls in `test` or `it` blocks (e.g. in `saveFixtures.test.ts`).
3. Ensure `pnpm exec oxlint .` passes.
