---
id: task-022-040-qa-id-validation-hook
type: TASK
title: "QA ID Validation Pre-commit Hook"
status: READY
owner_persona: qa
created_at: "2026-04-25"
updated_at: "2026-04-26"
depends_on:
  - .foundry/tasks/task-022-039-implement-id-validation-hook.md
jules_session_id: null
parent: .foundry/stories/story-006-022-implement-id-validation-hook.md
---

# QA ID Validation Pre-commit Hook

## Context
The coder has implemented a pre-commit hook to validate the global uniqueness and format of Foundry IDs. We need to verify that this script works as expected and correctly halts commits on failure.

## Acceptance Criteria
- [ ] Temporarily create a dummy node with an invalid ID format (e.g., `task-abc-123.md` or missing sequence numbers) and verify the script fails.
- [ ] Temporarily duplicate an existing ID in a different node file and verify the global uniqueness check fails.
- [ ] Verify that running `pnpm lefthook run pre-commit` executes the new check and fails correctly.
- [ ] Remove any temporary dummy nodes/changes before completing the task.
