---
id: task-010-025-qa-persona-permissions
type: TASK
title: "Verify Pre-Commit Hook for Node Creation Permissions"
status: PENDING
owner_persona: qa
created_at: "2026-04-23"
updated_at: "2026-04-23"
depends_on:
  - .foundry/tasks/task-010-024-enforce-persona-permissions.md
jules_session_id: null
parent: .foundry/stories/story-010-persona-permissions-matrix.md
tags:
  - foundry-v2
  - architecture
  - orchestration
rejection_count: 0
notes: ""
---

# Verify Pre-Commit Hook for Node Creation Permissions

## Goal
Verify that the pre-commit hook and logic implemented in `task-010-024` correctly enforce the node creation permissions per persona.

## Verification Requirements
As a QA persona, you need to verify the implementation. This involves reading the code and tests written by the `coder` and running your own checks if necessary.

1. **Verify Unit Tests:**
   - Ensure the `coder` wrote unit tests for `.github/scripts/foundry-permissions-check.ts` (e.g., `foundry-permissions-check.test.ts`).
   - Check that the unit tests cover the permissions matrix scenarios (e.g., `tech_lead` can create `TASK`, but not `STORY`).

2. **Verify `lefthook.yml` Integration:**
   - Ensure the hook is properly configured and runs on pre-commit.

3. **Manual Validation / Scripted Checks:**
   - Manually test (or script a test) that attempting to commit a dummy node with an unauthorized parent persona fails the pre-commit hook.

## Acceptance Criteria
- [ ] Code has been verified to enforce that `architect` can create `TASK`, `ADR`, and `IDEA` nodes.
- [ ] Code has been verified to enforce that `tech_lead` can create `TASK` and `ADR` nodes.
- [ ] Code has been verified to enforce that `story_owner` can create `STORY` and `EPIC` nodes.
- [ ] Code has been verified to enforce that `product_manager` can create `IDEA`, `PRD`, and `EPIC` nodes.
- [ ] The hook successfully blocks unauthorized node creations on git commit.
