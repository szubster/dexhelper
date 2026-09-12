---
id: task-558-567-flexsearch-tooling-coder
type: TASK
title: Implement Flexsearch Orchestrator Setup
status: READY
owner_persona: coder
created_at: '2025-02-14'
updated_at: '2025-02-14'
depends_on: []
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

# Implement Flexsearch Orchestrator Setup

## Context
As part of the RAG context hydration epic, we need to build an in-memory search index of our documentation when the orchestrator starts.
This task focuses on installing flexsearch and implementing the core indexing logic to scan `.foundry/docs/` and `.foundry/archive/docs/adrs/`.

## Acceptance Criteria
- [ ] Implement function to construct an in-memory flexsearch text index from loaded markdown documents.
- [ ] Ensure the implementation supports fast retrieval.
