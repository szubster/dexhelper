---
id: task-022-039-implement-id-validation-hook
type: TASK
title: "Implement ID Validation Pre-commit Hook"
status: PENDING
owner_persona: coder
created_at: "2026-04-25"
updated_at: "2026-04-25"
depends_on: []
jules_session_id: null
parent: .foundry/stories/story-006-022-implement-id-validation-hook.md
---

# Implement ID Validation Pre-commit Hook

## Context
As specified in `story-006-022`, we need to implement a pre-commit hook that validates the `.foundry/**/*.md` file IDs according to the Parent-Linked schema. This ensures our autonomous multi-agent system doesn't generate corrupted nodes or ID collisions.

## Acceptance Criteria
- [ ] Create a Node.js script at `scripts/validate-foundry-ids.ts`.
- [ ] The script must read all `.md` files in `.foundry/` except those in `docs/` and `journals/`.
- [ ] Parse the YAML frontmatter of each file and extract the `id`.
- [ ] Validate that the `id` field matches the schema:
  - For `IDEA` nodes: `^idea-\d{3}-[a-z0-9-]+$`
  - For all other nodes: `^(prd|epic|story|task)-\d{3}-\d{3}-[a-z0-9-]+$` (Note: non-IDEA parentless nodes use `000` for the parent NNN segment).
- [ ] Verify that every extracted `id` is globally unique within the parsed files (throw an error if a duplicate is found).
- [ ] Add a `validate-foundry-ids` command to `lefthook.yml` under `pre-commit` to run this script. Ensure it runs unconditionally on pre-commit.
