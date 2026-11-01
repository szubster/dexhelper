---
id: epic-588-693-dag-validation-script-extension
type: EPIC
title: EPIC - DAG Script Extension for E2E Dependency Validation
status: READY
owner_persona: story_owner
created_at: '2026-10-22T11:11:37.000Z'
updated_at: '2026-10-22T11:11:37.000Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-532-588-e2e-dependency-validator-lint
tags:
  - foundry
  - process
  - dag
  - lint
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# EPIC: DAG Script Extension for E2E Dependency Validation

## Objective
Extend the DAG validation script to identify E2E tasks and verify that they have an explicit `depends_on` requirement targeting at least one valid implementation task.

## Acceptance Criteria
- [ ] Ensure the validation script correctly identifies E2E tasks by tag or slug.
- [ ] Validate that E2E tasks contain a non-empty `depends_on` array.
- [ ] Generate an exclusive STORY dedicated to Integration and E2E Verification.
