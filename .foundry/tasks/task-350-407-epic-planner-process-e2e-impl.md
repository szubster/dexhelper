---
id: task-350-407-epic-planner-process-e2e-impl
type: TASK
title: Implement E2E Test for Epic Planner Process Instructions
status: ACTIVE
owner_persona: coder
created_at: '2026-08-01'
updated_at: '2026-08-09'
depends_on: []
parent: story-128-350-epic-planner-process-e2e
jules_session_id: '963424884238909850'
pr_number: null
tags:
  - e2e
  - process
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Implement E2E Test for Epic Planner Process Instructions

## Context
As part of enforcing macro node functional boundaries, we need to enforce a process where every EPIC MUST generate a final STORY dedicated to Integration and E2E Verification. The changes to the Epic Planner instructions need to be verified with an End-to-End test to ensure the orchestrator or agent prompts respect this process.

## Goal
Implement an E2E test in `.github/scripts/epic-planner-instructions.test.ts` or a relevant verification script/test file, verifying that the Epic Planner process enforces the creation of a final Integration/Verification story for every EPIC breakdown.

## Acceptance Criteria
- [ ] Ensure that a Vitest or equivalent test verifies that the Epic Planner's instructions file (`.github/agents/epic_planner.md`) enforce a final STORY dedicated exclusively to Integration and E2E Verification.
- [ ] The test must explicitly look for the exact string: `'You MUST enforce a process where every EPIC generates a final STORY dedicated exclusively to Integration and E2E Verification.'`
- [ ] Run the tests and ensure no regressions are introduced.
