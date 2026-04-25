---
id: "task-015-033-oxlint-require-mock-type-parameters"
type: "TASK"
title: "Enable oxlint vitest/require-mock-type-parameters"
status: "PENDING"
owner_persona: "coder"
created_at: "2026-04-25"
updated_at: "2026-04-25"
depends_on: []
jules_session_id: null
parent: ".foundry/stories/story-010-015-enforce-strict-oxlint-rules.md"
---

# Enable oxlint vitest/require-mock-type-parameters

## Context
As part of story `story-010-015-enforce-strict-oxlint-rules`, we are re-enabling strict oxlint rules that were temporarily disabled. This task focuses on `vitest/require-mock-type-parameters`.

## Instructions
1. In `.oxlintrc.json`, change `"vitest/require-mock-type-parameters": "off"` to `"vitest/require-mock-type-parameters": "error"`.
2. Run `pnpm exec oxlint .` to identify violations.
3. Fix all violations by providing type parameters to `vi.fn()` calls, e.g., `vi.fn<() => void>()`.
