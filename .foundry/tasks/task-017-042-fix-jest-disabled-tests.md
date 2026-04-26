---
id: "task-017-042-fix-jest-disabled-tests"
type: "TASK"
title: "Fix and enable jest/no-disabled-tests"
status: "ACTIVE"
owner_persona: "coder"
created_at: "2026-04-26"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: "5737516386979524211"
parent: ".foundry/stories/story-010-017-fix-jest-rules.md"
---

# Fix and enable jest/no-disabled-tests

## Context
The rule `jest/no-disabled-tests` was disabled to unblock CI. We need to fix the violations in the codebase and re-enable it.

## Instructions
- [x] Change `"jest/no-disabled-tests": "off"` to `"error"` in `.oxlintrc.json`.
- [x] Fix all violations by removing disabled tests or re-enabling them. If a test must be ignored for now, document it properly instead of using disabled comments if possible.
- [x] Ensure `pnpm exec oxlint .` passes.
