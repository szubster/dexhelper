---
id: story-587-707-implement-validator-core-logic
type: STORY
title: Implement Validator Core Logic
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-10-18T18:43:00Z'
updated_at: '2026-11-04'
depends_on: []
jules_session_id: '18380376917374609134'
pr_number: null
parent: epic-585-587-implement-macro-node-subtree-completeness-validator
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

# Implement Validator Core Logic

## Description
This story covers the implementation of the core logic for the Macro Node Subtree Completeness Validator Tool. The tool must recursively traverse the DAG sub-tree for any target macro node, identifying all direct and transitive child nodes linked via `parent` or markdown checkboxes (`- [ ]`), and asserting that every descendant node is in the `COMPLETED` state.

## Acceptance Criteria
- [x] task-707-716-impl-validator-parsing
- [x] task-707-717-impl-validator-traversal
- [x] task-707-718-qa-validator-core
- [ ] Implement a function to parse a node's markdown checkboxes and identify direct child nodes.
- [ ] Implement a function to identify direct child nodes based on their `parent` field in the frontmatter.
- [ ] Implement a recursive traversal function to build the complete descendant sub-tree for a given node.
- [ ] Implement the core validation logic to assert that all descendants are `COMPLETED`.

- [ ] research-707-740-investigate-validator-parsing-failure
- [ ] task-707-741-impl-validator-parsing-retry
- [ ] task-707-742-impl-validator-traversal-retry
- [ ] task-707-743-qa-validator-core-retry
