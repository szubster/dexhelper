---
id: prd-423-520-dynamic-rag-context-hydration
type: PRD
title: PRD for Dynamic RAG-Based Context Hydration for Agent Prompts
status: READY
owner_persona: epic_planner
created_at: '2026-08-29'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: null
parent: idea-423-dynamic-rag-context-hydration
tags:
  - foundry
  - orchestrator
  - optimization
  - AI
rejection_count: 0
rejection_reason: ''
locks: []
---

# PRD: Dynamic RAG-Based Context Hydration for Agent Prompts

## Context & Vision
This PRD outlines the requirements for integrating a lightweight Retrieval-Augmented Generation (RAG) system into the Foundry Orchestrator (`.github/scripts/foundry-orchestrator.ts`). Currently, all of `core_policies.md` and static layers are appended to agent prompts, leading to inefficiency and potential LLM attention degradation due to noise.

The goal is to use `flexsearch` to index documents within `.foundry/docs/` and `.foundry/archive/docs/adrs/` during dispatch, allowing for dynamic retrieval of relevant knowledge-base fragments based on node attributes (e.g., `title`, `tags`, markdown content). The retrieved information will then be injected into the prompt. Crucially, strict safety invariants (like No-Ask and Bash Timeouts) must remain statically appended.

## Functional Requirements
1. **Tooling & Indexing:** Integrate `flexsearch` to build an in-memory search index of documents in `.foundry/docs/` and `.foundry/archive/docs/adrs/`. This must occur within the GitHub Actions environment upon orchestrator startup.
2. **Dynamic Querying:** When processing an active node, the orchestrator must formulate a search query leveraging the node's frontmatter fields (e.g., `title`, `tags`) and its markdown description.
3. **Retrieval & Injection:** The top relevant chunks (e.g., top-K documents or specific paragraphs) must be extracted and dynamically prepended/appended to the agent's base persona prompt, replacing the broad static inclusion of non-core policies.
4. **Preservation of Core Invariants:** Critical safety and operational guidelines (e.g., No-Ask Policy, Empty PR Policy, Empty PR Verification Rule, Scratchpad Cleanup) must always remain statically injected regardless of search results to guarantee safety limits.

## Non-Functional Requirements
- **Performance:** Indexing and search must be fast and lightweight enough to not drastically increase the orchestrator's boot time.
- **Cost Efficiency:** Token consumption per agent session must be visibly reduced.

## Acceptance Criteria
- [ ] Epic Planner: Generate an EPIC to implement the indexing and dynamic retrieval logic within the orchestrator pipeline.
