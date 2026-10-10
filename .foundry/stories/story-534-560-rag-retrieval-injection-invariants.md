---
id: story-534-560-rag-retrieval-injection-invariants
type: STORY
title: Inject Retrieved Chunks and Preserve Prompt Safety Invariants
status: CANCELLED
owner_persona: tech_lead
created_at: '2026-09-07'
updated_at: '2026-10-10'
depends_on:
  - story-534-559-rag-dynamic-querying-retrieval
jules_session_id: null
parent: epic-520-534-dynamic-rag-context-hydration
tags:
  - foundry
  - orchestrator
  - prompt
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  story-534-559-rag-dynamic-querying-retrieval
locks: []
---

# Story: Inject Retrieved Chunks and Preserve Prompt Safety Invariants

## Context
The retrieved knowledge base chunks must be correctly injected into the agent's base persona prompt, while critical safety invariants must remain statically appended.

## High-Level Breakdown
1. Update prompt compilation logic in `.github/scripts/foundry-orchestrator.ts` to include dynamic RAG context.
2. Ensure `core_policies.md` segments regarding safety invariants are strictly retained and appended.
3. Format the injected chunks with clear boundaries.

## Acceptance Criteria
- [ ] Tech Lead: Decompose this story into TASK nodes.
- [ ] Tech Lead: Ensure a final TASK is dedicated to Integration and E2E Verification.
