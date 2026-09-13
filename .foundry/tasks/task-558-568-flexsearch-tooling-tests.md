---
id: task-558-568-flexsearch-tooling-tests
type: TASK
title: Unit Test Flexsearch Orchestrator Setup
status: READY
owner_persona: coder
created_at: '2025-02-14'
updated_at: '2025-02-14'
depends_on:
  - task-558-567-flexsearch-tooling-coder
jules_session_id: null
parent: story-534-558-rag-tooling-and-indexing
tags:
  - foundry
  - orchestrator
  - optimization
  - flexsearch
rejection_count: 0
rejection_reason: ''
locks: []
---

# Unit Test Flexsearch Orchestrator Setup

## Context
As part of the RAG context hydration epic, we need to build an in-memory search index of our documentation when the orchestrator starts.
This task focuses on writing unit tests for the core indexing logic and flexsearch configuration.

## Acceptance Criteria
- [ ] Add unit tests for the indexing logic scanning `.foundry/docs/` and `.foundry/archive/docs/adrs/`.
- [ ] Add unit tests confirming the in-memory flexsearch index correctly loads markdown files and retrieves documents based on queries.
