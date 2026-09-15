---
id: idea-524-orchestrator-concurrency-throttling
type: IDEA
title: Foundry Orchestrator Concurrency Throttling
status: PENDING
owner_persona: product_manager
created_at: '2026-09-15T04:02:36Z'
updated_at: '2026-09-15T04:02:36Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - orchestrator
  - scheduling
  - infrastructure
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
locks: []
---

# Idea: Foundry Orchestrator Concurrency Throttling

## Context & Problem Statement
Currently, the Foundry DAG orchestrator (`.github/scripts/foundry-orchestrator.ts`) processes all nodes in the `READY` state without any built-in bounds on concurrency. When a generative persona (like an `epic_planner` or `tech_lead`) decomposes a large node and spawns dozens of child tasks (e.g., 20 `TASK` nodes for a massive UI refactor), the orchestrator will transition all of them to `ACTIVE` simultaneously.

This unbounded dispatch triggers a massive spike in GitHub Actions workflows and LLM API requests. This leads to two critical failures:
1. **Runner Starvation**: The GitHub Actions matrix gets flooded, hitting concurrency limits and blocking other crucial CI/CD tasks (like linting or E2E tests).
2. **API Rate Limiting**: Sending dozens of complex context windows to the LLM API simultaneously often results in 429 Too Many Requests errors, causing agents to crash mid-execution.

## Proposed Strategy
Introduce a **Concurrency Throttling Mechanism** directly into the orchestrator's dispatch loop.

1. **Global Concurrency Limit**: Add a configuration setting (e.g., `MAX_CONCURRENT_AGENTS = 5`) in the orchestrator script or via environment variables.
2. **State-Aware Dispatch**: Modify the orchestrator logic so that before dispatching `READY` nodes, it counts the current number of nodes in the `ACTIVE` state across the entire DAG.
3. **Throttled Queuing**: If the number of `ACTIVE` nodes is equal to or greater than the concurrency limit, the orchestrator skips dispatching new nodes and leaves them in the `READY` state. As `ACTIVE` nodes complete and transition to `VERIFYING` or `COMPLETED`, slots open up in the queue, allowing the next batch of `READY` nodes to be dispatched.

## Acceptance Criteria
- [x] Product Manager: Draft this IDEA node to propose the concurrency throttling mechanism.
- [ ] Product Manager: Create a PRD mapping out the requirements for modifying the orchestrator dispatch logic and defining the configuration parameters.
