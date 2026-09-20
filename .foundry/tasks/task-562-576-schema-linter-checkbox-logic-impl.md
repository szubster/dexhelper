---
id: task-562-576-schema-linter-checkbox-logic-impl
type: TASK
title: Implement Markdown Checkbox Parsing Logic
status: READY
owner_persona: coder
created_at: '2026-09-12'
updated_at: '2026-09-20'
depends_on: []
jules_session_id: null
parent: story-552-562-schema-linter-core-logic
tags:
  - foundry
  - linting
rejection_count: 2
rejection_reason: ''
notes: ''
locks: []
---

# Implement Markdown Checkbox Parsing Logic

## Context
The goal is to update the schema validation script (`scripts/validate-foundry-schema.ts`) to strictly enforce that all markdown checkboxes in `.foundry` markdown files use exactly `- [ ] ` or `- [x] `.
Other formats like `* [ ]`, `-[]`, or `- [  ]` should trigger a validation error. This ensures strict compliance with ADR 007 regarding acceptance criteria formatting.

## Acceptance Criteria
- [ ] Parse each line of the markdown files inside `validateSchema` to check for any checkbox syntax (`[-*+] \[[ xX]?\]`).
- [ ] If a checkbox syntax is found, enforce that it strictly matches exactly `^\s*- \[( |x)\] `. If it does not, throw a validation error detailing the file and line.
