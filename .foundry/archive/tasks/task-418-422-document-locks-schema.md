---
id: task-418-422-document-locks-schema
type: TASK
title: Document Schema Resource Locking
status: COMPLETED
owner_persona: coder
created_at: '2026-08-11'
updated_at: '2026-08-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-411-418-schema-resource-locking
tags:
  - orchestrator
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Document Schema Resource Locking

## Objective
Document the new `locks` array field in the Foundry DAG orchestrator schema to prevent execution data loss and git merge conflicts in concurrent multi-agent environments.

## Details
- Update `.foundry/docs/schema.md` to add the `locks` field.
- The `locks` field should be documented as an optional array of strings.
- It will be used to hold resource identifiers (like persona names or specific areas of the application) that a given node requires exclusive access to during execution.

## Acceptance Criteria
- [x] Coder updates `.foundry/docs/schema.md` to document the `locks` array field.
