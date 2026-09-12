---
id: epic-521-552-schema-linter-core-logic
type: EPIC
title: 'Schema Linter Core Logic: Markdown Checkboxes'
status: READY
owner_persona: story_owner
created_at: '2026-08-24'
updated_at: '2026-09-11'
depends_on: []
jules_session_id: null
parent: prd-421-521-automated-schema-linting
tags:
  - foundry
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Schema Linter Core Logic: Markdown Checkboxes

## Objectives
- Update the schema validation script (`.foundry/scripts/lint-schema.ts`) to validate markdown checkbox syntax.
- Enforce that checkboxes MUST be exactly `- [ ] ` or `- [x] `.
- Emit a warning or error if a checkbox is found outside of an `## Acceptance Criteria` section.

## Acceptance Criteria
- [ ] Implement markdown checkbox syntax validation in `.foundry/scripts/lint-schema.ts`.
- [ ] Implement section tracking to enforce checkbox placement under `## Acceptance Criteria`.
- [ ] story-552-562-schema-linter-core-logic
- [ ] story-552-563-schema-linter-section-tracking
- [ ] story-552-564-schema-linter-checkbox-e2e
