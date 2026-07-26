---
id: task-269-347-e2e-safeguard-qa
type: TASK
title: QA - Implement E2E Safeguards on Epics
status: READY
owner_persona: qa
created_at: '2026-07-25'
updated_at: '2026-07-25'
depends_on:
  - task-269-346-e2e-safeguard-impl
jules_session_id: null
pr_number: null
parent: story-127-269-epic-e2e-safeguard
tags:
  - process
  - orchestrator
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: QA - Implement E2E Safeguards on Epics

## Context
As part of enforcing macro node functional boundaries, we need to ensure that an EPIC cannot be marked `COMPLETED` until its functional requirements are verifiably integrated and tested. The implementation task (`task-269-346-e2e-safeguard-impl`) is responsible for adding this logic to `.github/scripts/foundry-orchestrator.ts` and `.github/scripts/foundry-heartbeat.ts`.

## Goal
Verify the implementation of E2E safeguards on Epic nodes.

## Technical Blueprint

1. **Verify Implementation:**
   - Check that `foundry-orchestrator.ts` has been modified to enforce the E2E story rule for `EPIC` nodes during Phase 4.1 and Phase 4.5.
   - Check that `foundry-heartbeat.ts` has been modified to enforce the E2E story rule for `EPIC` nodes during `transitionNodeToCompleted`.
   - Ensure the rejection reason is clear and descriptive (e.g., `'Merged with unfulfilled acceptance criteria: Missing E2E/integration story'`).

2. **Verify Tests:**
   - Review `foundry-orchestrator.test.ts` to confirm there are new test cases for an `EPIC` with and without an E2E child story.
   - Review `foundry-heartbeat.test.ts` to confirm there are new test cases for an `EPIC` with and without an E2E child story.
   - Run the tests locally to ensure they pass: `cd .github/scripts && pnpm install && npx vitest run`.

## Workflow Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verify E2E enforcement logic in `foundry-orchestrator.ts`.
- [ ] Verify E2E enforcement logic in `foundry-heartbeat.ts`.
- [ ] Verify unit tests in `foundry-orchestrator.test.ts`.
- [ ] Verify unit tests in `foundry-heartbeat.test.ts`.
- [ ] Ensure all unit tests pass successfully.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
