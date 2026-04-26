---
id: story-006-022-implement-id-validation-hook
type: STORY
title: "Implement ID Validation Pre-commit Hook"
status: "COMPLETED"
owner_persona: tech_lead
created_at: "2026-04-25"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: null
parent: .foundry/epics/epic-006-id-pre-commit-hooks.md
---

# Implement ID Validation Pre-commit Hook

## Objective
Implement a pre-commit hook that parses all `.foundry/**/*.md` files (excluding journals and docs) to validate the integrity of their ID fields as defined in the master schema.

## Context
As defined in `epic-006-id-pre-commit-hooks.md`, we need to guarantee the collision-free nature of the new node ID scheme. A pre-commit hook is required to enforce this.

## Acceptance Criteria
- [x] Create a Node.js script to validate IDs globally.
- [x] The hook must verify that every `id` field is unique globally within the `.foundry/` directory.
- [x] The hook must verify that the `id` field matches the parent-linked format `<type>-<parent_NNN>-<NNN>-<slug>` (or `<type>-<NNN>-<slug>` for `IDEA` nodes).
- [x] Integrate this script into `lefthook.yml` to run on pre-commit.

### Child Nodes
- `.foundry/tasks/task-022-039-implement-id-validation-hook.md`
- `.foundry/tasks/task-022-040-qa-id-validation-hook.md`
