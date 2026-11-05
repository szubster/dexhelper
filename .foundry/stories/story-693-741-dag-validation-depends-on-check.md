---
id: story-693-741-dag-validation-depends-on-check
type: STORY
title: STORY - DAG Validation Depends On Check for E2E Tasks
status: READY
owner_persona: tech_lead
created_at: '2026-11-05T19:56:30.000Z'
updated_at: '2026-11-05T19:56:30.000Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-588-693-dag-validation-script-extension
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

# STORY: DAG Validation Depends On Check for E2E Tasks

## Objective
Update the DAG validation script to ensure that tasks identified as E2E tasks contain a non-empty `depends_on` array, enforcing that they correctly wait for implementation tasks to finish before executing.

## Acceptance Criteria
- [ ] Add rule to verify that `depends_on` array for E2E tasks is not empty.
- [ ] Output a descriptive linting error if an E2E task has an empty `depends_on` array.
- [ ] Break down into Tasks.
