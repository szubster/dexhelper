---
id: epic-340-411-schema-resource-locking
type: EPIC
title: Schema Update for Orchestrator Resource Locking
status: COMPLETED
owner_persona: story_owner
created_at: '2026-08-11'
updated_at: '2026-08-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-131-340-orchestrator-resource-locking-mutex
tags:
  - orchestrator
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Schema Update for Orchestrator Resource Locking

## Overview
This EPIC covers the schema updates required to introduce the new `locks` field into the Foundry DAG orchestrator, allowing nodes to specify the file paths they intend to modify exclusively. This is necessary to prevent git merge conflicts and execution data loss in concurrent multi-agent environments.

## Objectives
- Add a new `locks` field to the `.foundry/docs/schema.md` template for nodes.
- Update any necessary schema validators to ensure the `locks` field is correctly parsed as an array of string file paths.

## Acceptance Criteria
- [x] Story Owner completes EPIC decomposition.
- [x] Story Owner generates a final STORY dedicated exclusively to Integration and E2E Verification.
- [x] story-411-418-schema-resource-locking
- [x] story-411-419-schema-resource-locking-e2e
