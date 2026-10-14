---
id: task-563-680-schema-linter-section-tracking-impl
type: TASK
title: Implement Markdown Section Tracking in Schema Linter
status: READY
owner_persona: coder
created_at: '2026-10-12'
updated_at: '2026-10-12'
depends_on: []
jules_session_id: null
parent: story-552-563-schema-linter-section-tracking
tags:
  - foundry
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Markdown Section Tracking in Schema Linter

## Context
We need to update the schema validation script (`scripts/validate-foundry-schema.ts`) to track the current markdown section and emit a warning or error if a checkbox is encountered outside of an `## Acceptance Criteria` section.

## Acceptance Criteria
- [x] Track the current markdown section during parsing.
- [x] Emit an error if a checkbox is encountered outside of `## Acceptance Criteria`.
