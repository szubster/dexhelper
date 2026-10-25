---
id: task-559-705-query-formulation-impl-v2
type: TASK
title: Implement Query Formulation Logic (Retry)
status: READY
owner_persona: coder
created_at: '2026-10-18'
updated_at: '2026-10-25'
depends_on:
  - research-559-704-investigate-query-formulation-failure
jules_session_id: null
parent: story-534-559-rag-dynamic-querying-retrieval
tags:
  - query
  - impl
rejection_count: 0
rejection_reason: ''
locks: []
---

# Task: Implement Query Formulation Logic (Retry)

## Context
The orchestrator must formulate search queries using the assigned node's frontmatter. This is a retry of `task-559-668` based on findings from `research-559-704`.

## Requirements
- Parse node frontmatter to extract relevant metadata.
- Implement a function to build a structured query string or object for flexsearch.
- Write unit tests.

## Acceptance Criteria
- [x] Implement query formulation function.
- [x] Write unit tests for query formulation.
