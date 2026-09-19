---
id: story-554-572-lefthook-e2e
type: STORY
title: E2E Verification for Schema Validation in Lefthook
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-13'
updated_at: '2026-09-19'
depends_on:
  - story-554-571-lefthook-integration
jules_session_id: null
parent: epic-521-554-schema-linter-lefthook-integration
tags:
  - e2e
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# E2E Verification for Schema Validation in Lefthook

## Objective
Verify that the `validate-foundry-schema` script correctly runs during `pre-commit` via `lefthook.yml` and correctly aborts commits on malformed files.

## Acceptance Criteria
- [ ] task-572-593-lefthook-e2e-coder
- [ ] task-572-594-lefthook-e2e-qa
- [ ] Implement integration verification to test the `pre-commit` hook with malformed `.foundry` files.
