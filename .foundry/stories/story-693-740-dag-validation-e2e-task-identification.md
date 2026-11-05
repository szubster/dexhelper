---
id: story-693-740-dag-validation-e2e-task-identification
type: STORY
title: STORY - DAG Validation E2E Task Identification
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

# STORY: DAG Validation E2E Task Identification

## Objective
Implement logic in the DAG validation script to correctly identify E2E tasks by analyzing their tags or slug formats, enabling specialized validation rules for them.

## Acceptance Criteria
- [ ] Parse tasks and check their tags for `e2e` or `integration`.
- [ ] Fallback check to determine if the slug contains `-e2e` or similar indicating flags.
- [ ] Break down into Tasks.
