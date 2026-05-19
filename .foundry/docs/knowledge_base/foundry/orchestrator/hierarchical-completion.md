# Foundry Hierarchical Completion (Orchestrator V2.1)

To prevent premature unblocking of downstream nodes in the Foundry DAG, we have implemented **Hierarchical Completion**.

## The Invariant
A node `B` that depends on node `A` will ONLY be promoted to `READY` if:
1. `A.status == "COMPLETED"`
2. **AND** All child nodes of `A` (nodes where `parent: A`) are also `COMPLETED`.

## Implementation Details
The `foundry-orchestrator.ts` script now builds a `parentToChildren` map during its resolution phase. It checks this map for every dependency listed in a node's `depends_on` field.

- **Exceptions**: If a node `C` is a child of `A`, it is NOT blocked by this hierarchical rule (otherwise it could never start). Children only care about the explicit status of their dependencies and their parent's existence.
- **Benefits**: This allows "Stories" to be marked `COMPLETED` by agents during the planning phase without erroneously unblocking the *next* Story before the current Story's tasks are actually implemented.

## Verification
This logic is covered by unit tests in `foundry-orchestrator.test.ts`.
