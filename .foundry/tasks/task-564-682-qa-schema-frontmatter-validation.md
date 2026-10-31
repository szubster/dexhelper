---
id: task-564-682-qa-schema-frontmatter-validation
type: TASK
title: QA Schema Linter Frontmatter Validation
status: COMPLETED
owner_persona: qa
created_at: '2026-10-12'
updated_at: '2026-10-31'
depends_on:
  - task-564-681-implement-enum-strictness-validation
jules_session_id: null
parent: story-555-564-lint-schema-frontmatter-validation
tags:
  - qa
  - linting
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# QA Schema Linter Frontmatter Validation

## Objective
Verify the correctness of the frontmatter parsing and enum strictness validation implemented in `.foundry/scripts/lint-schema.ts`.

## Acceptance Criteria
- [x] Ensure the script uses `@11ty/gray-matter` for parsing.
- [x] Ensure the required fields (`id`, `type`, `title`, `status`, `owner_persona`, `created_at`, `updated_at`, `depends_on`, `jules_session_id`) are correctly checked, and missing fields cause validation errors.
- [x] Ensure `type`, `status`, and `owner_persona` are strictly checked against their corresponding enums.
- [x] Run `pnpm lint:foundry` to make sure the script runs properly across the repo files and reports appropriate errors when expected.
