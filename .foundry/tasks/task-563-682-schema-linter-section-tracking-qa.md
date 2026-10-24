---
id: task-563-682-schema-linter-section-tracking-qa
type: TASK
title: QA Markdown Section Tracking in Schema Linter
status: ACTIVE
owner_persona: qa
created_at: '2026-10-12'
updated_at: '2026-10-24'
depends_on:
  - task-563-681-schema-linter-section-tracking-tests
jules_session_id: '14683292409629499235'
parent: story-552-563-schema-linter-section-tracking
tags:
  - foundry
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Markdown Section Tracking in Schema Linter

## Context
QA needs to verify the functionality of the schema linter to ensure that markdown section tracking correctly flags checkboxes outside of the `## Acceptance Criteria` section.

## Acceptance Criteria
- [x] Verify that running the linter correctly identifies valid and invalid markdown checkboxes with section tracking.
- [x] Verify unit tests pass and test cases cover the expected behavior.
