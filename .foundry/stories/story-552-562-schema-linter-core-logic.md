---
id: story-552-562-schema-linter-core-logic
type: STORY
title: 'Implement Markdown Checkbox Parsing Logic'
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-12'
updated_at: '2026-09-12'
depends_on: []
jules_session_id: null
parent: epic-521-552-schema-linter-core-logic
tags:
  - foundry
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Markdown Checkbox Parsing Logic

## Objectives
- Update the schema validation script (`.foundry/scripts/lint-schema.ts` or `validate-foundry-schema.ts`) to validate markdown checkbox syntax.
- Enforce that checkboxes MUST be exactly `- [ ] ` or `- [x] `.

## Acceptance Criteria
- [ ] Parse lines for checkbox syntax and validate exact spacing.
