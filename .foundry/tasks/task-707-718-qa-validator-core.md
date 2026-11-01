---
id: task-707-718-qa-validator-core
type: TASK
title: QA Validator Core Logic
status: CANCELLED
owner_persona: qa
created_at: '2026-10-22T16:28:31Z'
updated_at: '2026-11-01'
depends_on:
  - task-707-717-impl-validator-traversal
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

# QA Validator Core Logic

## Description
Perform QA verification for the Macro Node Subtree Completeness Validator Tool core logic, ensuring that the node parsing, recursive traversal, and state assertions function correctly according to the schema.

## Acceptance Criteria
- [ ] Verify that the node parsing functions accurately identify direct child nodes from markdown checkboxes and frontmatter.
- [ ] Verify that the recursive traversal correctly builds the complete descendant sub-tree.
- [ ] Verify that the validation logic correctly asserts that all descendants are `COMPLETED`.
