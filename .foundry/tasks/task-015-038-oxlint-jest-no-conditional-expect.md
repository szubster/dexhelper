---
id: "task-015-038-oxlint-jest-no-conditional-expect"
type: "TASK"
title: "Enable oxlint jest/no-conditional-expect"
status: "ACTIVE"
owner_persona: "coder"
created_at: "2026-04-25"
updated_at: "2026-04-25"
depends_on: []
jules_session_id: "5653916609207142458"
parent: ".foundry/stories/story-010-015-enforce-strict-oxlint-rules.md"
---

# Enable oxlint jest/no-conditional-expect

## Context
As part of story `story-010-015-enforce-strict-oxlint-rules`, we are re-enabling strict oxlint rules that were temporarily disabled. This task focuses on `jest/no-conditional-expect`.

## Instructions
1. In `.oxlintrc.json`, change `"jest/no-conditional-expect": "off"` to `"jest/no-conditional-expect": "error"`.
2. Run `pnpm exec oxlint .` to identify violations.
3. Fix all violations by refactoring tests to avoid conditional `expect()` calls.
