---
id: "task-015-035-oxlint-jest-no-standalone-expect"
type: "TASK"
title: "Enable oxlint jest/no-standalone-expect"
status: "PENDING"
owner_persona: "coder"
created_at: "2026-04-25"
updated_at: "2026-04-25"
depends_on: []
jules_session_id: null
parent: ".foundry/stories/story-010-015-enforce-strict-oxlint-rules.md"
---

# Enable oxlint jest/no-standalone-expect

## Context
As part of story `story-010-015-enforce-strict-oxlint-rules`, we are re-enabling strict oxlint rules that were temporarily disabled. This task focuses on `jest/no-standalone-expect`.

## Instructions
1. In `.oxlintrc.json`, change `"jest/no-standalone-expect": "off"` to `"jest/no-standalone-expect": "error"`.
2. Run `pnpm exec oxlint .` to identify violations.
3. Fix all violations by wrapping floating `expect()` calls in `test` or `it` blocks.
