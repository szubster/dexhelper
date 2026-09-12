---
id: story-555-565-lint-schema-e2e-integration
type: STORY
title: Schema Linter Integration & E2E Verification
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-12'
updated_at: '2026-09-12'
depends_on:
  - story-555-564-lint-schema-frontmatter-validation
jules_session_id: null
parent: epic-521-555-schema-linter-frontmatter-logic
tags:
  - foundry
  - linting
  - e2e
  - integration
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Schema Linter Integration & E2E Verification

## Objectives
- Integrate `.foundry/scripts/lint-schema.ts` into a verification workflow.
- Ensure the script accurately reports errors on malformed schemas.
- Ensure the script passes on valid schemas.

## Acceptance Criteria
- [ ] Create E2E test verifying schema linter functionality.
