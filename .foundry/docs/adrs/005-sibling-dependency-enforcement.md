# ADR 005: Sibling Dependency Recommendations

## Status
Accepted

## Context
In the Foundry architecture, tasks and stories are spawned concurrently when their `depends_on` conditions are met. Sibling nodes (nodes sharing the same parent, such as tasks generated from the same story) often represent a sequence of steps that must be executed in order. Without explicitly defining dependencies between them, the DAG orchestrator will dispatch all sibling nodes prematurely and simultaneously, leading to deadlocks or conflicts.

## Decision
We establish a **Sibling Dependency Recommendation**: when multiple sibling nodes are created with sequential implementation dependencies, their `depends_on` field SHOULD explicitly point to the prerequisite sibling task to prevent DAG deadlocks. This is optional and not strictly enforced by the orchestrator.

## Consequences
- Sibling nodes that are meant to run sequentially should explicitly list prior siblings in their `depends_on` arrays.
- It is the responsibility of the `tech_lead` persona to ensure these relationships are set appropriately when scaffolding tasks.
- The orchestrator will not artificially block or warn against sibling nodes lacking dependencies.
