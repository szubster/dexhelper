---
id: adr-560-571-evaluate-state-machine-libraries
type: ADR
title: Evaluate State Machine Libraries for Node Lifecycle Transitions
status: PENDING
owner_persona: architect
created_at: '2026-09-18'
updated_at: '2026-09-18'
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: story-540-560-evaluate-state-and-graph-libraries
priority: 50
tags:
  - foundry
  - architecture
  - state-machine
research_references: []
rejection_count: 0
rejection_reason: ""
notes: "Evaluation of state machine libraries for handling Node lifecycle transitions."
---

# Evaluate State Machine Libraries for Node Lifecycle Transitions

## Context
The Foundry orchestrator manages the lifecycle of nodes (e.g., DRAFT, PENDING, READY, ACTIVE, VERIFYING, COMPLETED, FAILED, CANCELLED). As the rules for transitions between these states become more complex (e.g., handling transient rejections, impossible loops, zombie node recovery, and dependency graph updates), there is a need to evaluate if adopting a formal state machine library (such as XState) would improve robustness, maintainability, and predictability compared to the current custom logic in `.github/scripts/foundry-orchestrator.ts` and `foundry-heartbeat.ts`.

## Decision
We evaluated state machine libraries, specifically XState, for potential adoption.

**Findings:**
1.  **Complexity Overhead:** XState introduces a significant learning curve and syntactic overhead. Defining the entire orchestrator lifecycle as an XState machine would require a substantial rewrite of the existing TypeScript logic.
2.  **Stateless Execution:** The Foundry orchestrator currently operates as a set of stateless GitHub Actions scripts that read the DAG from markdown frontmatter, perform state transitions, and write back to the markdown files. State machine libraries typically expect to maintain state in memory during a long-running process. Integrating a state machine library into a stateless script environment would require persisting and rehydrating the state machine instance on every run, which adds complexity without providing the full benefits of a persistent state machine.
3.  **Current System Adequacy:** While the current custom logic is complex, it is functional and tailored specifically to our markdown-based DAG. The issues we face (e.g., deadlocks, false negatives) are often related to specific orchestrator rules (like the Impossible Loop logic) rather than the mechanism of state transition itself. We are addressing these edge cases iteratively (e.g., fixing Phase 3.6 for CANCELLED nodes).

Therefore, we have decided **against** adopting a state machine library like XState at this time.

## Consequences
- We will continue to maintain and improve our custom state transition logic within the existing TypeScript orchestrator scripts (`foundry-orchestrator.ts`, `foundry-heartbeat.ts`).
- We avoid the significant refactoring effort and learning curve associated with introducing a new state machine library.
- We must remain vigilant in writing robust unit tests and fuzz tests to catch edge cases in our custom logic, as we do not have the built-in guarantees of a formal state machine library.
