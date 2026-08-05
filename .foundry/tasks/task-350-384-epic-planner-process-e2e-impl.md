---
id: task-350-384-epic-planner-process-e2e-impl
type: TASK
title: Implement E2E Test for Epic Planner Process Update
status: READY
owner_persona: coder
created_at: '2026-08-05'
updated_at: '2026-08-05'
depends_on: []
jules_session_id: '9824085891786636607'
pr_number: null
parent: story-128-350-epic-planner-process-e2e
tags:
  - process
  - e2e
rejection_count: 0
rejection_reason: ''
notes: ''
---
# TASK: Implement E2E Test for Epic Planner Process Update

## Context
As part of enforcing macro node functional boundaries, we need to enforce a process where every EPIC MUST generate a final STORY dedicated to Integration and E2E Verification. The changes to the Epic Planner instructions need to be verified.

## Requirements
- Create an E2E test to verify that the instructions for the Epic Planner enforce the creation of a final Integration/Verification story for every EPIC breakdown.
- Ensure the test validates the Orchestrator Safeguard (E2E/Integration Requirement).
- Run `xvfb-run pnpm test:e2e` to verify the new test.

## Acceptance Criteria
- [ ] Test correctly identifies whether an EPIC generates an E2E/Integration STORY.
- [ ] Test fails if the E2E STORY is missing.
- [ ] Test passes if the E2E STORY is present.