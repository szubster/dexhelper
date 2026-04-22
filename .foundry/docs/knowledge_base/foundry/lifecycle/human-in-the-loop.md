# Memory: Human-in-the-Loop Lifecycle

## Context
The Foundry was originally designed for fully autonomous Jules sessions. IDEA-004 introduced formal support for human contributors and repository owners to intervene, work on unblocked nodes, and bypass standard agent dispatch.

## Key Decisions
- **`human` Persona**: A new valid `owner_persona` that bypasses the Jules session dispatcher and heartbeat failure loops.
- **"Pick Up" Workflow**: `READY` tasks with `owner_persona: human` can be unblocked and assigned/claimed by humans.
- **Closed PR Recovery**: If a linked PR is closed without being merged, the node transitions back to `READY` instead of `FAILED`, allowing it to be reclaimed.
- **Manual Completion**: Humans can manually set `status: COMPLETED` in frontmatter for direct-to-main work, bypassing the requirement for a merged PR signal.

## Architectural Implications
- Orchestrator must support `ACTIVE` nodes without a `jules_session_id` if the owner is `human`.
- Validation (`qa` nodes) is still required after human implementation nodes to maintain system-wide standards.
