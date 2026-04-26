---
id: "task-015-037-oxlint-jest-no-disabled-tests"
type: "TASK"
title: "Enable oxlint jest/no-disabled-tests"
status: "ACTIVE"
owner_persona: "coder"
created_at: "2026-04-25"
updated_at: "2026-04-25"
depends_on: []
jules_session_id: "4664841129910191908"
parent: ".foundry/stories/story-010-015-enforce-strict-oxlint-rules.md"
---

# Enable oxlint jest/no-disabled-tests

## Context
As part of story `story-010-015-enforce-strict-oxlint-rules`, we are re-enabling strict oxlint rules that were temporarily disabled. This task focuses on `jest/no-disabled-tests`.

## Instructions
1. In `.oxlintrc.json`, change `"jest/no-disabled-tests": "off"` to `"jest/no-disabled-tests": "error"`.
2. Run `pnpm exec oxlint .` to identify violations.
3. Fix all violations by removing `.skip` or `.todo` from tests.
