---
id: task-005-026-qa-orchestrator-validation
type: TASK
title: "QA Verification: Orchestrator Validation for Parent-Linked ID Schema"
status: "ACTIVE"
owner_persona: qa
created_at: "2026-04-23"
updated_at: "2026-04-25"
depends_on:
  - .foundry/tasks/task-005-025-update-orchestrator-validation.md
jules_session_id: "3393320214333743467"
parent: .foundry/stories/story-005-id-schema-templates.md
---

# QA Task: Verify Orchestrator Validation for Parent-Linked ID Schema

## Context
The Foundry Orchestrator (`.github/scripts/foundry-orchestrator.ts`) is a critical component. Modifying its validation logic for the new Parent-Linked ID schema (`<type>-<parent_NNN>-<NNN>-<slug>`) carries systemic risk.
This task verifies the work completed in `task-005-025-update-orchestrator-validation.md`.

## Verification Steps
1. **Review Code Changes:** Ensure the changes in `foundry-orchestrator.ts` correctly accommodate both the new and old ID schemas without breaking backward compatibility.
2. **Run Tests:** Run the test suite (`pnpm test` in the root or `.github/scripts/` depending on workspace setup) to ensure all orchestrator tests pass.
3. **Verify Coverage:** Confirm that new test cases were added to specifically cover nodes using the new `<type>-<parent_NNN>-<NNN>-<slug>` format.
4. **Dry-Run Validation:** Optionally perform a dry run of the orchestrator (`ts-node .github/scripts/foundry-orchestrator.ts --dry-run`) on the current `.foundry/` directory to ensure no new warnings or errors are surfaced for valid IDs.

## Acceptance Criteria
- [ ] Code modifications align with ADR 002.
- [ ] Test coverage includes the new ID schema.
- [ ] All tests pass successfully and the orchestrator does not emit invalid validation warnings for correctly formatted IDs.
