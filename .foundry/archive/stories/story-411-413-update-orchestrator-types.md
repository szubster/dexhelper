---
id: story-411-413-update-orchestrator-types
type: STORY
title: Update Orchestrator Types for Experiment Schema
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
  - orchestrator
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update Orchestrator Types for Experiment Schema

## Objective
Update the TypeScript interfaces and Zod validators in `.github/scripts/schema.ts` to support the new `EXPERIMENT` node type and `experiment_variants` frontmatter field.

## Scope
1. Update `NodeTypeEnum` in `.github/scripts/schema.ts` to include `'EXPERIMENT'`.
2. Add `experiment_variants` to the `NodeFrontmatterSchema` in `.github/scripts/schema.ts` as an optional array of strings (e.g. `z.array(z.string()).optional()`).

## Acceptance Criteria
- [x] Tech Lead: Break down into Tasks.
- [x] task-413-422-update-orchestrator-types
