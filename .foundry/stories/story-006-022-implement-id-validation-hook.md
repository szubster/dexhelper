---
id: story-006-022-implement-id-validation-hook
type: STORY
title: "Implement ID Validation Pre-commit Hook"
status: PENDING
owner_persona: tech_lead
created_at: "2026-04-25"
updated_at: "2026-04-25"
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
- [ ] Create a Node.js script to validate IDs globally.
- [ ] The hook must verify that every `id` field is unique globally within the `.foundry/` directory.
- [ ] The hook must verify that the `id` field matches the parent-linked format `<type>-<parent_NNN>-<NNN>-<slug>` (or `<type>-<NNN>-<slug>` for `IDEA` nodes).
- [ ] Integrate this script into `lefthook.yml` to run on pre-commit.
