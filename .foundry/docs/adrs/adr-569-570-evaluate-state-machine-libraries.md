---
id: adr-569-570-evaluate-state-machine-libraries
type: ADR
title: 'Evaluate State Machine Libraries for Node Lifecycle'
status: DRAFT
owner_persona: architect
created_at: '2026-09-09'
updated_at: '2026-09-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-560-569-evaluate-state-machine-libraries
tags:
  - foundry
  - architecture
  - state-machine
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Evaluate State Machine Libraries for Node Lifecycle

## Status
Proposed

## Context
The Foundry orchestrator manages the lifecycle of Nodes (`ACTIVE`, `PENDING`, `COMPLETED`, `FAILED`, `CANCELLED`, `VERIFYING`, `READY`, `BLOCKED`). Currently, state transitions are handled implicitly across `foundry-orchestrator.ts` and `foundry-heartbeat.ts`. As the lifecycle becomes more complex (e.g., adding `VERIFYING` state for Auditor persona, late-binding auto-remediation), the implicit state transitions become harder to reason about, test, and maintain.

We need to evaluate State Machine libraries, specifically XState, to determine if they can simplify and enforce the Node lifecycle transitions in the Foundry orchestrator.

## Options Evaluated

### 1. XState
XState is a robust, well-maintained library for creating, interpreting, and executing finite state machines and statecharts.

- **Pros:**
  - Excellent visualization tools (XState Stately).
  - Strong TypeScript support for state definitions, events, and contexts.
  - Supports complex statecharts including hierarchical states, parallel states, and history states (though our current DAG states are mostly flat, this offers future-proofing).
  - Enforces explicit transitions, preventing illegal state changes.
- **Cons:**
  - Can be overly complex for simple state machines.
  - Adds a dependency to the project.
  - Requires a learning curve to understand XState concepts (actors, machines, context, guards).

### 2. Custom Lightweight State Machine
A custom-built state machine specifically tailored to our existing Node lifecycle.

- **Pros:**
  - Zero external dependencies.
  - Precisely tailored to our needs, avoiding unnecessary complexity.
  - Simple to implement using standard TypeScript enums and transition maps.
- **Cons:**
  - Requires maintaining our own state machine logic.
  - Lacks built-in visualization tools.
  - Might not handle future complex state requirements as elegantly as XState.

## Decision
*(To be decided by the Architect)*
We will draft this ADR to propose evaluating these options. XState appears to be the strongest candidate if the complexity of our state transitions warrants a dedicated library, especially considering the `VERIFYING` state and late-binding logic. However, a custom lightweight state machine might suffice if we want to minimize dependencies.

## Consequences
Adopting XState would require refactoring `foundry-orchestrator.ts` and `foundry-heartbeat.ts` to utilize the XState machine for all status updates. This provides strict enforcement but requires a non-trivial refactor.
