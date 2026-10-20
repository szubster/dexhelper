---
id: idea-540-foundry-prompt-fragment-cache
type: IDEA
title: Prompt Fragment Pre-Compilation & In-Memory Caching for Orchestrator Pipeline
status: PENDING
owner_persona: product_manager
created_at: '2026-10-20'
updated_at: '2026-10-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - promptCompilation
  - performance
  - caching
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Idea: Prompt Fragment Pre-Compilation & In-Memory Caching for Orchestrator Pipeline

## Problem
In the Foundry Orchestrator (`packages/foundry/foundry-orchestrator.ts`), persona prompts are compiled dynamically at dispatch time by reading base persona markdown files (`.github/agents/<persona>.md`), specific context layer files (`.github/agents/specific/*.md`), and appending core system policies (`.foundry/docs/knowledge_base/agents/core_policies.md`). Every dispatch cycle re-reads these files from disk and re-evaluates fragment sorting and concatenation in `packages/foundry/fragments.ts`. As the DAG graph grows and high-throughput dispatch loops run continuously, repeated file I/O and fragment composition create unnecessary latency and file system overhead during persona dispatch.

## Proposed Solution
Implement an in-memory caching and pre-compilation strategy for compiled prompt fragments in `packages/foundry/fragments.ts`:
1. Introduce an LRU / content-hash memoized prompt compilation cache (`PromptCache`) that stores compiled system prompts keyed by target persona, layer tags, and core policy file modification timestamps (mtime).
2. Add file watcher or invalidation logic so that modified prompt markdown files or core policy updates automatically bust the cache.
3. Expose a pre-compilation helper in `packages/foundry/fragments.ts` to warm the prompt cache during orchestrator initialization.

## Value
Reduces dispatch overhead and disk I/O latency during multi-agent orchestration cycles, speeds up scheduled agent runs, and optimizes prompt compilation performance across all persona invocations.

## Acceptance Criteria
- [ ] PRD generated detailing the Prompt Fragment Caching specification (`prd-540-708-foundry-prompt-fragment-cache`).
- [ ] `PromptCache` and mtime-based cache invalidation implemented in `packages/foundry/fragments.ts`.
- [ ] Unit test suite added covering cache hit/miss behavior and invalidation upon prompt file changes.
