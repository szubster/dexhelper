---
id: task-707-717-impl-validator-traversal
type: TASK
title: Implement Validator Recursive Traversal and Validation
status: CANCELLED
owner_persona: coder
created_at: '2026-10-22T16:28:31Z'
updated_at: '2026-11-01'
depends_on:
  - task-707-716-impl-validator-parsing
jules_session_id: null
pr_number: null
parent: story-587-707-implement-validator-core-logic
tags:
  - foundry
  - orchestrator
  - validation
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-707-716-impl-validator-parsing
notes: ''
locks: []
priority: 50
---

# Implement Validator Recursive Traversal and Validation

## Description
Implement the recursive traversal logic and the core validation logic for the Macro Node Subtree Completeness Validator Tool. This relies on the parsing functions to build the complete descendant sub-tree for a given node, and asserts that all descendants are `COMPLETED`.

## Acceptance Criteria
- [ ] Implement a recursive traversal function to build the complete descendant sub-tree for a given node.
- [ ] Implement the core validation logic to assert that all descendants are `COMPLETED`.
