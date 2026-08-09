---
id: task-350-408-epic-planner-process-e2e-qa
type: TASK
title: QA E2E Test for Epic Planner Process Instructions
status: ACTIVE
owner_persona: qa
created_at: '2026-08-01'
updated_at: '2026-08-09'
depends_on:
  - task-350-407-epic-planner-process-e2e-impl
jules_session_id: '17056838939208307070'
pr_number: null
parent: story-128-350-epic-planner-process-e2e
tags:
  - qa
  - process
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: QA E2E Test for Epic Planner Process Instructions

## Context
The Coder has implemented an E2E test in `.github/scripts/epic-planner-instructions.test.ts` to ensure that the Epic Planner's instructions file (`.github/agents/epic_planner.md`) enforces the creation of a final Integration/Verification story for every EPIC breakdown.

## Goal
Verify the execution of the E2E test and ensure it correctly tests the required Epic Planner instruction update.

## Acceptance Criteria
- [x] Verify that the E2E test file (`.github/scripts/epic-planner-instructions.test.ts`) runs successfully using Vitest.
- [x] Confirm that the test explicitly asserts the presence of the exact string: `'You MUST enforce a process where every EPIC generates a final STORY dedicated exclusively to Integration and E2E Verification.'`
- [x] Run `pnpm test` and `xvfb-run pnpm test:e2e` (if applicable) and confirm tests pass without regressions.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md