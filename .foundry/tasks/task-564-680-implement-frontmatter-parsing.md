---
id: task-564-680-implement-frontmatter-parsing
type: TASK
title: "Implement Frontmatter Parsing & Required Fields"
status: PENDING
owner_persona: coder
created_at: "2026-10-12"
updated_at: "2026-10-12"
depends_on: []
jules_session_id: null
parent: story-555-564-lint-schema-frontmatter-validation
confidence_score: null
tags:
  - linting
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Implement Frontmatter Parsing & Required Fields

## Objective
Update `.foundry/scripts/lint-schema.ts` to parse YAML frontmatter and validate the presence of required fields.

## Details
- Use `@11ty/gray-matter` to parse the frontmatter of each markdown file discovered by the script.
- The following fields must be present: `id`, `type`, `title`, `status`, `owner_persona`, `created_at`, `updated_at`, `depends_on`, `jules_session_id`.
- If any required field is missing, log an error to the console and ensure the script sets a failure state to eventually exit with code `1`.
- Ensure the script correctly reads the file contents using `fs.readFile` before parsing.
