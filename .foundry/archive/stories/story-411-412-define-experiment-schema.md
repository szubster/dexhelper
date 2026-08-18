---
id: story-411-412-define-experiment-schema
type: STORY
title: Define Experiment Schema in Documentation
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-08-11'
updated_at: '2026-08-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-340-411-experiment-schema-updates
tags:
  - schema
  - foundry
  - documentation
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Define Experiment Schema in Documentation

## Objective
Update `.foundry/docs/schema.md` to define the YAML structure for defining A/B experiment variants within tasks or as a new node type.

## Scope
1. Add `EXPERIMENT` to the list of allowed `type` enums.
2. Define an `experiment_variants` array property in the frontmatter schema, indicating it supports tracking variant configurations.

## Acceptance Criteria
- [x] Tech Lead: Break down into Tasks.
- [x] task-412-422-update-experiment-schema
