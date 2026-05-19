# Foundry Order & Architect Integration

## Context
There is an identified issue where roles leak across nodes (e.g., PM performing technical architecture) and DAG deadlocks occur because IDEA nodes were being treated as composite instead of atomic.

## Proposed Resolution
1. **The Order**: IDEA (PM) -> PRD (PM) -> ADR (Architect) -> EPIC (Planner) -> STORY -> TASK.
2. **Atomic Handoff**: Each step produces a specific artifact (node). When that artifact's PR is merged, the system (Heartbeat) marks the preceding node as `COMPLETED`.
3. **Architect Persona**: Formally integrates the Architect as the 'Gatekeeper' between Requirements (PRD) and Implementation (EPIC).

## Impact
- Prevents composite node deadlocks.
- Prevents technical brainstorming from leaking into non-technical roles.
- Establishes a clear, repeatable handoff protocol for future agents.