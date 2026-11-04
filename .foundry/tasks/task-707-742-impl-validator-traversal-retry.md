---
id: task-707-742-impl-validator-traversal-retry
type: TASK
title: Implement Validator Recursive Traversal and Validation Retry
status: PENDING
owner_persona: coder
created_at: '2026-11-04'
updated_at: '2026-11-04'
depends_on:
  - task-707-741-impl-validator-parsing-retry
jules_session_id: null
pr_number: null
parent: story-587-707-implement-validator-core-logic
tags:
  - foundry
  - orchestrator
  - validation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Implement Validator Recursive Traversal and Validation Retry

## Description
Implement the recursive traversal logic and the core validation logic for the Macro Node Subtree Completeness Validator Tool.

## Acceptance Criteria
- [ ] Implement a recursive traversal function to build the complete descendant sub-tree for a given node.
- [ ] Implement the core validation logic to assert that all descendants are `COMPLETED`.
