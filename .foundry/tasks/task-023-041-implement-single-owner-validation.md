---
id: "task-023-041-implement-single-owner-validation"
type: "TASK"
title: "Implement single owner validation in orchestrator"
status: READY
owner_persona: "coder"
created_at: "2026-04-26"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: null
parent: ".foundry/stories/story-008-023-validate-single-owner.md"
---

# Implement single owner validation in orchestrator

## Context
To enforce Atomic Handoffs, the orchestrator script must explicitly reject or error on files defining multiple `owner_persona`s.

## Constraints & Directives
- Modify `.github/scripts/foundry-orchestrator.ts` to validate the `owner_persona` field in the node's frontmatter.
- If `owner_persona` is an array or contains multiple personas (e.g., separated by commas), log an error and skip/reject the node.
- Write tests in `.github/scripts/foundry-orchestrator.test.ts` to verify the new validation logic.
- Self-verify the changes (no separate QA task required).

## Acceptance Criteria
- [ ] `.github/scripts/foundry-orchestrator.ts` validates `owner_persona`.
- [ ] Nodes with multiple owners log an error and are skipped.
- [ ] Tests verify the single owner validation logic.
- [ ] Self-verification completed successfully.
