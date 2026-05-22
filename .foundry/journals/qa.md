# QA Journal

## Dealing with Cancelled/Replaced Tasks Reawakening
When a cancelled or replaced task node is reawakened (e.g., because its previous implementation dependency finished, triggering the Empty PR flow), the agent must still check off the acceptance criteria to allow the node to gracefully exit the DAG, satisfying ADR 007's completeness requirements. Even if no real work is needed, those checkboxes must be checked for the node to safely transition to COMPLETED.


## 2026-05-21
Rejected `task-072-128-implement-dag-cancellation` because it violated the architectural constraint that `COMPLETED` nodes are read-only (immutable). Its 'Wait and Wake' phase incorrectly transitioned `COMPLETED` nodes back to `PENDING` if their dependencies became incomplete, which breaks the Directed Acyclic Graph orchestrator constraints and causes cascading cancellation bugs.

## 2026-05-22: Wait & Wake State Invariant Violation
During the validation of `task-072-128-implement-dag-cancellation`, I discovered a critical invariant violation in the DAG orchestrator. The Wait and Wake phase (Phase 3.5) was incorrectly transitioning `COMPLETED` nodes to `PENDING` if they had incomplete dependencies. This violates the core orchestrator principle that `COMPLETED` nodes are immutable, and caused those nodes to be erroneously swept up by downstream cascade cancellation logic.

**Lesson**: When checking nodes for suspension based on incomplete dependencies, the orchestrator MUST strictly ignore nodes that are already in terminal states (`COMPLETED` or `CANCELLED`). Terminal state immutability is essential to prevent infinite loops and incorrect cascading status updates.
