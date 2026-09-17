---
id: story-554-571-lefthook-integration
type: STORY
title: Integrate Schema Validation into Lefthook
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-13'
updated_at: '2026-09-17'
depends_on: []
jules_session_id: null
parent: epic-521-554-schema-linter-lefthook-integration
tags:
  - foundry
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Integrate Schema Validation into Lefthook

## Objective
Update `lefthook.yml` to include the `validate-foundry-schema` script under the `pre-commit` hook.

## Acceptance Criteria
- [x] Create a TASK node to implement the `lefthook.yml` updates and verify it aborts correctly on malformed files.
- [ ] task-571-589-implement-lefthook-schema-validation
