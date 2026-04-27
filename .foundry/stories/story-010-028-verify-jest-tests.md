---
id: "story-010-028-verify-jest-tests"
type: "STORY"
title: "Verify jest rules fix resolution"
status: "COMPLETED"
owner_persona: "tech_lead"
created_at: "2026-04-26"
updated_at: "2026-04-27"
depends_on: []
jules_session_id: null
parent: ".foundry/epics/epic-010-oxlint-config.md"
---

# Verify jest rules fix resolution

## Context
Even though we resolved the jest rules, we still have FAILED statuses in previous tests that might need further evaluation or the new rules should be ensured passing correctly across all test suites without issues. We need an extra verification step.

## Requirements
- Identify why tests failed previously for `jest/no-standalone-expect` and `jest/no-disabled-tests`.
- Verify these are fully fixed and oxlint passes with them as `error`.

## Acceptance Criteria
- [x] Tasks are created for verifying the jest rules resolution.
- [x] `pnpm exec oxlint .` passes with these rules completely enabled.

## Generated Tasks
- [.foundry/tasks/task-028-046-verify-jest-rules-resolution.md](../../.foundry/tasks/task-028-046-verify-jest-rules-resolution.md)
