---
id: task-010-025-qa-persona-permissions-reminder
type: TASK
title: "Verify Soft Reminders for Node Creation Permissions"
status: PENDING
owner_persona: qa
created_at: "2026-04-23"
updated_at: "2026-04-23"
depends_on:
  - .foundry/tasks/task-010-024-remind-persona-permissions.md
jules_session_id: null
parent: .foundry/stories/story-010-persona-permissions-matrix.md
tags:
  - foundry-v2
  - architecture
  - orchestration
rejection_count: 0
notes: ""
---

# Verify Soft Reminders for Node Creation Permissions

## Goal
Verify that the orchestrator logic implemented in `task-010-024` correctly logs soft reminders for unusual node creation permissions per persona, without blocking workflows.

## Verification Requirements
As a QA persona, you need to verify the implementation. This involves reading the code and tests written by the `coder` and running your own checks if necessary.

1. **Verify Unit Tests:**
   - Ensure the `coder` updated the orchestrator unit tests (e.g., `foundry-orchestrator.test.ts`).
   - Check that the unit tests cover the permissions matrix scenarios and assert that warnings are emitted (e.g., `tech_lead` creating a `STORY` should log a warning).
   - Ensure tests confirm that the process does *not* fail (exit code 0) when these warnings occur.

2. **Manual Validation / Scripted Checks:**
   - Run the orchestrator locally (`pnpm run orchestrate:dry` in `.github/scripts`) with a dummy node setup that violates the matrix. Verify that a helpful warning appears in standard error/out and the process completes successfully.

## Acceptance Criteria
- [ ] Code has been verified to log reminders if `architect` creates anything other than `TASK`, `ADR`, and `IDEA` nodes.
- [ ] Code has been verified to log reminders if `tech_lead` creates anything other than `TASK` and `ADR` nodes.
- [ ] Code has been verified to log reminders if `story_owner` creates anything other than `STORY` and `EPIC` nodes.
- [ ] Code has been verified to log reminders if `product_manager` creates anything other than `IDEA`, `PRD`, and `EPIC` nodes.
- [ ] The system successfully processes nodes despite these warnings, ensuring a soft, non-blocking reminder approach.
