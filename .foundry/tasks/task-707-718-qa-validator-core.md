---
id: task-707-718-qa-validator-core
type: TASK
title: QA Validator Core Logic
status: PENDING
owner_persona: qa
created_at: "2026-10-22T16:28:31Z"
updated_at: "2026-10-22"
depends_on:
  - task-707-717-impl-validator-traversal
jules_session_id: null
locks: []
pr_number: null
parent: story-587-707-implement-validator-core-logic
priority: 50
confidence_score: null
tags:
  - foundry
  - orchestrator
  - validation
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# QA Validator Core Logic

## Description
Perform QA verification for the Macro Node Subtree Completeness Validator Tool core logic, ensuring that the node parsing, recursive traversal, and state assertions function correctly according to the schema.

## Acceptance Criteria
- [ ] Verify that the node parsing functions accurately identify direct child nodes from markdown checkboxes and frontmatter.
- [ ] Verify that the recursive traversal correctly builds the complete descendant sub-tree.
- [ ] Verify that the validation logic correctly asserts that all descendants are `COMPLETED`.
