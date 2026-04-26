---
id: "task-015-036-oxlint-jest-expect-expect"
type: "TASK"
title: "Enable oxlint jest/expect-expect"
status: "ACTIVE"
owner_persona: "coder"
created_at: "2026-04-25"
updated_at: "2026-04-25"
depends_on: []
jules_session_id: "10251222806334789520"
parent: ".foundry/stories/story-010-015-enforce-strict-oxlint-rules.md"
---

# Enable oxlint jest/expect-expect

## Context
As part of story `story-010-015-enforce-strict-oxlint-rules`, we are re-enabling strict oxlint rules that were temporarily disabled. This task focuses on `jest/expect-expect`.

## Instructions
- [x] 1. In `.oxlintrc.json`, change `"jest/expect-expect": "off"` to `"jest/expect-expect": "error"`.
- [x] 2. Run `pnpm exec oxlint .` to identify violations.
- [x] 3. Fix all violations by adding assertions to empty tests.
