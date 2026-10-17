---
id: task-563-681-schema-linter-section-tracking-tests
type: TASK
title: Write Tests for Markdown Section Tracking
status: PENDING
owner_persona: coder
created_at: '2026-10-12'
updated_at: '2026-10-13'
depends_on:
  - task-563-680-schema-linter-section-tracking-impl
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

# Write Tests for Markdown Section Tracking

## Context
We need to write unit tests for the schema validation script to ensure that markdown section tracking correctly identifies and errors out on checkboxes found outside the `## Acceptance Criteria` section.

## Acceptance Criteria
- [ ] Add unit tests verifying that a checkbox inside `## Acceptance Criteria` is valid.
- [ ] Add unit tests verifying that a checkbox outside `## Acceptance Criteria` throws an error.
