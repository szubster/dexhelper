# ADR 005: Sibling Dependency Enforcement

## Status
Accepted

## Context
In the Foundry architecture, tasks and stories are spawned concurrently when their `depends_on` conditions are met. Sibling nodes (nodes sharing the same parent, such as tasks generated from the same story) often represent a sequence of steps that must be executed in order. Without explicitly defining dependencies between them, the DAG orchestrator will dispatch all sibling nodes prematurely and simultaneously, leading to deadlocks or conflicts.

## Decision
We enforce a **Sibling Dependency Rule**: when multiple sibling nodes are created with sequential implementation dependencies, their `depends_on` field MUST explicitly point to the prerequisite sibling task to prevent DAG deadlocks.

## Consequences
- Sibling nodes that are meant to run sequentially must explicitly list prior siblings in their `depends_on` arrays.
- The `foundry-orchestrator.ts` has been updated to emit a warning when sibling nodes define no dependencies, helping to catch this pattern before dispatch.
- Downstream personas must be careful to define these relationships when scaffolding tasks from a parent story or epic.
