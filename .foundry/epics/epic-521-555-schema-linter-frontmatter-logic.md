---
id: epic-521-555-schema-linter-frontmatter-logic
type: EPIC
title: 'Schema Linter: Frontmatter & Directory Iteration'
status: ACTIVE
owner_persona: story_owner
created_at: '2026-08-24'
updated_at: '2026-09-12'
depends_on: []
jules_session_id: '2092185074069160019'
parent: prd-421-521-automated-schema-linting
tags:
  - foundry
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Schema Linter: Frontmatter & Directory Iteration

## Objectives
- Create or update the schema linter script at `.foundry/scripts/lint-schema.ts`.
- Ensure it iterates over `.md` files in `.foundry/ideas/`, `.foundry/prds/`, `.foundry/epics/`, `.foundry/stories/`, and `.foundry/tasks/` while ignoring `docs/` and `journals/`.
- Validate that all required frontmatter keys are present (`id`, `type`, `title`, `status`, `owner_persona`, `created_at`, `updated_at`, `depends_on`, `jules_session_id`).
- Enforce enum strictness for `status`, `owner_persona`, and `type` according to `schema.md`.

## Acceptance Criteria
- [ ] Implement `.foundry/scripts/lint-schema.ts` to iterate over target Foundry directories.
- [ ] Implement validation for required frontmatter fields.
- [ ] Implement enum strictness validation for `status`, `owner_persona`, and `type`.
- [ ] story-555-563-lint-schema-file-iteration
- [ ] story-555-564-lint-schema-frontmatter-validation
- [ ] story-555-565-lint-schema-e2e-integration
