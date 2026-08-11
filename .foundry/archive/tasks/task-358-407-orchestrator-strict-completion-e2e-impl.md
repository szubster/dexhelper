---
id: task-358-407-orchestrator-strict-completion-e2e-impl
type: TASK
title: Orchestrator Hierarchical Completion Checks E2E Impl
status: COMPLETED
owner_persona: coder
created_at: '2026-08-08'
updated_at: '2026-08-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-070-358-orchestrator-strict-completion-e2e
tags:
  - orchestrator
  - architecture
  - e2e
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Orchestrator Hierarchical Completion Checks E2E Impl

## Objective
Implement E2E tests for the orchestrator to ensure strict hierarchical completion logic is correctly evaluated and blocks VERIFYING nodes appropriately.

## Description
The orchestrator's `isHierarchicallyIncomplete` function ensures that nodes cannot be considered complete if any of their descendants are incomplete. This needs to be thoroughly tested in `.github/scripts/foundry-orchestrator.test.ts`.

Specifically, add tests for the following scenarios:
1. `Hierarchical Completion: suspends VERIFYING parent to PENDING if it has incomplete children`
2. `Hierarchical Completion: suspends READY parent to PENDING if it has incomplete children`
3. `Hierarchical Completion: considers VERIFYING child as incomplete and suspends ACTIVE parent`

## Acceptance Criteria
- [x] Implement test: `Hierarchical Completion: suspends VERIFYING parent to PENDING if it has incomplete children`
- [x] Implement test: `Hierarchical Completion: suspends READY parent to PENDING if it has incomplete children`
- [x] Implement test: `Hierarchical Completion: considers VERIFYING child as incomplete and suspends ACTIVE parent`
- [x] Ensure all tests pass.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
