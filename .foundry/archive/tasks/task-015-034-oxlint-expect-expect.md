---
id: "task-015-034-oxlint-expect-expect"
type: "TASK"
title: "Enable oxlint vitest/expect-expect"
status: "COMPLETED"
owner_persona: "coder"
created_at: "2026-04-25"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: null
parent: ".foundry/archive/stories/story-010-015-enforce-strict-oxlint-rules.md"
---

# Enable oxlint vitest/expect-expect

## Context
As part of story `story-010-015-enforce-strict-oxlint-rules`, we are re-enabling strict oxlint rules that were temporarily disabled. This task focuses on `vitest/expect-expect`.

## Instructions
- [x] 1. In `.oxlintrc.json`, change `"vitest/expect-expect": "off"` (if present) to `"vitest/expect-expect": "error"`.
- [x] 2. Run `pnpm exec oxlint .` to identify violations.
- [x] 3. Fix all violations by ensuring every test block contains at least one assertion.
