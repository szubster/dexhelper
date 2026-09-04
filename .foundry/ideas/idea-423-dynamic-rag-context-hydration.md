---
id: idea-423-dynamic-rag-context-hydration
type: IDEA
title: Dynamic RAG-Based Context Hydration for Agent Prompts
status: ACTIVE
owner_persona: product_manager
created_at: '2026-08-29'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: '5278748493009735198'
parent: null
tags:
  - foundry
  - orchestrator
  - optimization
  - AI
rejection_count: 0
rejection_reason: ''
---

# Dynamic RAG-Based Context Hydration for Agent Prompts

## Description
This idea proposes overhauling the static prompt compilation architecture in the Foundry Orchestrator by introducing a lightweight Retrieval-Augmented Generation (RAG) system for context hydration.

Currently, the orchestrator appends the entirety of `core_policies.md` and all static layer fragments to every agent prompt. As the project expands, passing irrelevant rules (e.g., injecting Gen 3 bitwise parsing constraints into a purely CSS/Tailwind layout task) degrades the LLM's attention mechanism, increases token latency, and skyrockets API costs.

By implementing a local semantic search or fast keyword-matching system (e.g., TF-IDF) during dispatch, the orchestrator will dynamically construct the agent's context window. It will inject only the most relevant ADRs, architectural guidelines, and policy snippets based on the assigned node's scope.

## Rationale & Benefits
- **Token Efficiency:** Drastically reduces the input token count per session, yielding significant API cost savings.
- **Improved Attention Structure:** By minimizing "noise" (irrelevant policies), the LLM can focus entirely on the high-signal constraints that matter for the specific task, reducing hallucinations and false negatives during task execution.
- **Scalability:** Allows the `.foundry/docs/` knowledge base and ADR repository to grow continuously without eventually hitting hard context window limits or requiring constant manual fragmentation of `core_policies.md`.

## Functional Mechanics
1. **Indexing Phase:** The orchestrator indexes `.foundry/docs/` and `.foundry/archive/docs/adrs/` into a local lightweight search index (e.g., using a local Node.js library like `flexsearch` or `fuse.js`).
2. **Query Generation:** When waking up an agent, the orchestrator uses the assigned node's `title`, `tags`, and markdown content to form a search query.
3. **Retrieval & Injection:** The top-K most relevant document fragments are retrieved and dynamically injected into the compiled prompt.
4. **Core Invariants Preservation:** A minimal, non-negotiable subset of systemic rules (e.g., the No-Ask Policy, Empty PR Policy, Bash Timeout rules) remains statically appended to guarantee safety bounds are never bypassed.

## Acceptance Criteria
- [x] Product Manager: Draft a PRD defining the exact tools, libraries (e.g., `flexsearch`), and integration points for the indexing phase within `.github/scripts/foundry-orchestrator.ts`.
- [ ] Architect: Create an ADR evaluating the performance impact and latency of local indexing vs static file reading for the GitHub Actions environment.
- [ ] Epic Planner: Generate an EPIC to implement the indexing and dynamic retrieval logic within the orchestrator pipeline.
- [ ] prd-423-520-dynamic-rag-context-hydration
