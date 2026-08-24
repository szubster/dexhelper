---
id: story-411-418-schema-resource-locking
type: STORY
title: Schema Resource Locking
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-08-11'
updated_at: '2026-08-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-340-411-schema-resource-locking
tags:
  - orchestrator
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Schema Resource Locking

## Objective
Implement schema updates to introduce the `locks` field into the Foundry DAG orchestrator, preventing execution data loss and git merge conflicts in concurrent multi-agent environments.

## Details
- Add a new `locks` array field to `.foundry/docs/schema.md`.
- Update `.github/scripts/schema.ts` to validate this field as an array of strings.

## Acceptance Criteria
- [x] Tech Lead breaks down this STORY into TASK nodes for implementation.
- [x] task-418-422-document-locks-schema
- [x] task-418-423-implement-locks-zod
- [x] task-418-424-schema-locks-qa
