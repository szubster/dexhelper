---
id: task-571-589-implement-lefthook-schema-validation
type: TASK
title: Implement Lefthook Schema Validation
status: COMPLETED
owner_persona: coder
created_at: '2026-09-17T14:03:11Z'
updated_at: '2026-09-18'
depends_on: []
jules_session_id: null
parent: story-554-571-lefthook-integration
tags:
  - foundry
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Lefthook Schema Validation

## Objective
Update `lefthook.yml` to include the `validate-foundry-schema` script under the `pre-commit` hook and verify it aborts correctly on malformed files.

## Acceptance Criteria
- [x] Ensure `validate-foundry-schema` is correctly configured in `lefthook.yml` and aborts on malformed files.
