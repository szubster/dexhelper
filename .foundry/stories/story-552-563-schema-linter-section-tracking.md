---
id: story-552-563-schema-linter-section-tracking
type: STORY
title: Implement Acceptance Criteria Section Tracking
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-12'
updated_at: '2026-10-12'
depends_on:
  - story-552-562-schema-linter-core-logic
jules_session_id: '11302170007613307225'
parent: epic-521-552-schema-linter-core-logic
tags:
  - foundry
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Acceptance Criteria Section Tracking

## Objectives
- Emit a warning or error if a checkbox is found outside of an `## Acceptance Criteria` section in the markdown file.

## Acceptance Criteria
- [ ] Track the current markdown section during parsing.
- [ ] Error if a checkbox is encountered outside of `## Acceptance Criteria`.
- [ ] task-563-680-schema-linter-section-tracking-impl
- [ ] task-563-681-schema-linter-section-tracking-tests
- [ ] task-563-682-schema-linter-section-tracking-qa
