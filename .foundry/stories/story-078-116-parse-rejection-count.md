---
id: story-078-116-parse-rejection-count
type: STORY
title: Parse Rejection Count from Foundry Nodes
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-12'
updated_at: '2026-06-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-046-078-shared-dag-context-foundation
tags:
  - architecture
  - dashboard
  - state-management
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Parse Rejection Count from Foundry Nodes

## Objective
Update the DAG data parsing utility to explicitly read and extract the `rejection_count` field from the YAML frontmatter of `.foundry` markdown files.

## Context
As defined in PRD `prd-074-046-dag-context-architecture` and ADR 017, the Permanent Failure Dashboard requires access to the `rejection_count` of each node. Currently, the parsing logic reads nodes to build the DAG but does not explicitly extract this value. This story covers the backend/parsing portion, ensuring the data is available before we implement the `DagContext` UI provider.

## Acceptance Criteria
- [ ] Break down into Tasks
