---
id: "task-028-046-verify-jest-rules-resolution"
type: "TASK"
title: "Verify jest rules fix resolution"
status: "COMPLETED"
owner_persona: "coder"
created_at: "2026-04-26"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: null
parent: ".foundry/archive/stories/story-010-028-verify-jest-tests.md"
---

# Verify jest rules fix resolution

## Context
Even though we resolved the jest rules, we still have FAILED statuses in previous tests that might need further evaluation or the new rules should be ensured passing correctly across all test suites without issues. We need an extra verification step.

## Requirements
- Identify why tests failed previously for `jest/no-standalone-expect` and `jest/no-disabled-tests`.
- Verify these are fully fixed and oxlint passes with them as `error`.
- Ensure rules are properly configured in `.oxlintrc.json` and any false positives are handled (e.g., using `// oxlint-disable jest/no-disabled-tests` for `baseTest.extend`).
- Self-verify the changes and document the verification in the task journal.

## Acceptance Criteria
- [x] `pnpm exec oxlint .` passes with these rules completely enabled.
- [x] False positives for `jest/no-disabled-tests` (e.g., in `baseTest.extend`) are suppressed.
- [x] False positives for `jest/no-standalone-expect` (e.g., custom test functions) are correctly configured in `.oxlintrc.json`.
- [x] Journal updated with verification details.
