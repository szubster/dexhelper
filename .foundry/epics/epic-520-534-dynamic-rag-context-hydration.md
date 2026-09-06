---
id: epic-520-534-dynamic-rag-context-hydration
type: EPIC
title: Implement Dynamic RAG-Based Context Hydration for Agent Prompts
status: READY
owner_persona: story_owner
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: null
parent: prd-423-520-dynamic-rag-context-hydration
tags:
  - foundry
  - orchestrator
  - optimization
  - AI
rejection_count: 0
rejection_reason: ''
locks: []
---

# Epic: Implement Dynamic RAG-Based Context Hydration for Agent Prompts

## Context & Vision
This Epic breaks down the requirements for integrating a lightweight Retrieval-Augmented Generation (RAG) system into the Foundry Orchestrator (`.github/scripts/foundry-orchestrator.ts`), based on `prd-423-520-dynamic-rag-context-hydration`.

Currently, all of `core_policies.md` and static layers are appended to agent prompts, leading to inefficiency and potential LLM attention degradation due to noise. We will use `flexsearch` to index documents within `.foundry/docs/` and `.foundry/archive/docs/adrs/` during dispatch, allowing for dynamic retrieval of relevant knowledge-base fragments based on node attributes. The retrieved information will then be injected into the prompt. Crucially, strict safety invariants (like No-Ask and Bash Timeouts) must remain statically appended.

## High-Level Breakdown
This Epic will be broken down into the following stories:
1. **Tooling & Indexing:** Integrate `flexsearch` to build an in-memory search index of documents in `.foundry/docs/` and `.foundry/archive/docs/adrs/` upon orchestrator startup.
2. **Dynamic Querying & Retrieval:** Implement logic to formulate search queries leveraging node frontmatter fields (`title`, `tags`) and markdown descriptions, and extract relevant chunks from the search index.
3. **Retrieval Injection & Invariants:** Inject retrieved chunks into the agent's base persona prompt while preserving critical safety invariants (e.g., No-Ask Policy, Empty PR Policy) statically.
4. **Integration & E2E Verification:** Verify that the RAG pipeline operates efficiently and safely without breaking existing orchestration pipelines.

## Acceptance Criteria
- [ ] Story Owner: Generate STORY nodes mapping to the high-level breakdown.
- [ ] Story Owner: Ensure a final STORY is dedicated exclusively to Integration and E2E Verification.
