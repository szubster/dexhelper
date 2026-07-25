---
id: task-269-334-e2e-safeguard-impl
type: TASK
title: Implement E2E Safeguards on Epics
status: ACTIVE
owner_persona: coder
created_at: '2026-07-18'
updated_at: '2026-07-20'
depends_on: []
jules_session_id: '3477028800638620080'
pr_number: null
parent: story-127-269-epic-e2e-safeguard
tags:
  - process
  - orchestrator
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Implement E2E Safeguards on Epics

## Context
As part of enforcing macro node functional boundaries, we need to ensure that an EPIC cannot be marked `COMPLETED` until its functional requirements are verifiably integrated and tested.

## Goal
Implement logic in `.github/scripts/foundry-orchestrator.ts` and `.github/scripts/foundry-heartbeat.ts` to ensure that an EPIC node cannot be promoted to `VERIFYING` or `COMPLETED` unless it contains at least one child STORY that explicitly represents integration or E2E testing (e.g., tags contain `e2e` or `integration`).

## Technical Blueprint

1. **Modify `foundry-orchestrator.ts`:**
   - In **Phase 4.1: Late-Binding Completion**, before transitioning a late-binding parent to `COMPLETED` when all children are completed, check if the node `type` is `EPIC`.
   - If it is an `EPIC`, iterate over its children and ensure at least one child node has `type` equal to `STORY` and its `tags` array contains either `'e2e'` or `'integration'` (case-insensitive).
   - If the E2E requirement is not met, do NOT transition the EPIC to `COMPLETED`. Instead, transition it to `FAILED` with a `rejection_reason` indicating that an E2E/integration story is missing (e.g., `'Merged with unfulfilled acceptance criteria: Missing E2E/integration story'`).
   - In **Phase 4.5: Idempotent Generation Check**, ensure similar logic applies if an EPIC is being bypassed to `COMPLETED`. However, if the EPIC does not generate children, the check might fail it. Make sure the logic appropriately flags EPICs that lack E2E stories.

2. **Modify `foundry-heartbeat.ts`:**
   - In the `transitionNodeToCompleted` function, before transitioning an `EPIC` to `VERIFYING`, perform the same check.
   - Fetch the child nodes for the `EPIC`. If none of its children are a `STORY` with an `e2e` or `integration` tag, transition the node to `FAILED` with a similar `rejection_reason`.

3. **Add Unit Tests:**
   - In `foundry-orchestrator.test.ts`, add test cases demonstrating that an `EPIC` fails Late-Binding Completion if it lacks an E2E/integration child story, and succeeds when it has one.
   - In `foundry-heartbeat.test.ts`, add test cases demonstrating that `transitionNodeToCompleted` transitions an `EPIC` to `FAILED` instead of `VERIFYING` if it lacks an E2E/integration child story, and succeeds when it has one.

## Workflow Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement E2E enforcement logic in `foundry-orchestrator.ts` (Phase 4.1 / 4.5).
- [ ] Implement E2E enforcement logic in `foundry-heartbeat.ts` (`transitionNodeToCompleted`).
- [ ] Add unit tests in `foundry-orchestrator.test.ts` covering the new rules for EPICs.
- [ ] Add unit tests in `foundry-heartbeat.test.ts` covering the new rules for EPICs.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
