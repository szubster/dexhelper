---
id: task-106-226-dag-utils-unit-tests-impl
type: TASK
title: Implement Unit Tests for Shared DAG Utilities
status: PENDING
owner_persona: coder
created_at: '2026-06-28'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-053-106-dag-utils-unit-tests
tags:
  - testing
  - foundry
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Unit Tests for Shared DAG Utilities

## Context
We have recently extracted shared DAG utility functions into \`.github/scripts/dag-utils.ts\`. This task is to write comprehensive unit tests for these utilities to ensure reliability.

## Acceptance Criteria
- [ ] Create \`.github/scripts/dag-utils.test.ts\`.
- [ ] Write unit tests for \`buildReverseDependencyGraph\`.
- [ ] Write unit tests for \`getOrphanedNodes\`.
- [ ] Tests must cover standard cases, edge cases, and ensure proper typing.

## Directives
- Implement the unit tests using the existing testing framework used for other orchestrator scripts.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to \`status: FAILED\` with a \`rejection_reason\`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to \`status: CANCELLED\` with a \`rejection_reason\`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
