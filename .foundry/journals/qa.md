# QA Journal

## Dealing with Cancelled/Replaced Tasks Reawakening
When a cancelled or replaced task node is reawakened (e.g., because its previous implementation dependency finished, triggering the Empty PR flow), the agent must still check off the acceptance criteria to allow the node to gracefully exit the DAG, satisfying ADR 007's completeness requirements. Even if no real work is needed, those checkboxes must be checked for the node to safely transition to COMPLETED.

## Wait & Wake State Invariant Violation (2026-05-22)
During the validation of `task-072-128-implement-dag-cancellation`, I discovered a critical invariant violation in the DAG orchestrator. The Wait and Wake phase (Phase 3.5) was incorrectly transitioning `COMPLETED` nodes to `PENDING` if they had incomplete dependencies. This violates the core orchestrator principle that `COMPLETED` nodes are immutable, and caused those nodes to be erroneously swept up by downstream cascade cancellation logic.

**Lesson**: When checking nodes for suspension based on incomplete dependencies, the orchestrator MUST strictly ignore nodes that are already in terminal states (`COMPLETED` or `CANCELLED`). Terminal state immutability is essential to prevent infinite loops and incorrect cascading status updates.

## Missing Integration Failures (2026-05-24)
When an implementation task only creates standalone UI components but fails to integrate or render them anywhere in the main application (making them inaccessible to the user), the task MUST be rejected. The purpose of implementation isn't just to write code that passes isolated unit tests; it is to deliver accessible features.
- Example: Rejected task-075-132-implement-heartbeat-verifying-logic. The implementation successfully added VERIFYING nodes to the zombie detection list but failed to update the logic that fails nodes missing a jules_session_id. The check `if (!isHuman && (!sessionId || sessionId === 'null') && node.frontmatter.status === 'ACTIVE')` was not updated to include VERIFYING status.

## Missing Architectural Integration (ADR 013 & ADR 017)
**Lesson**: When a task's specifications explicitly reference Architecture Decision Records (ADRs) that mandate a specific pattern (like "shared context" or "single source of truth"), QA must enforce that the structural pattern is implemented, not just the surface-level data extraction.
- **Example (task-085-142)**: Repeatedly rejected `task-085-142-impl-extract-rejection-count`. While the coder successfully extracted the `rejection_count` field from the YAML frontmatter, they failed to lift the core DAG data state out of the isolated `DagDashboard.tsx` component into a shared React Context (or global store) as required by ADR 013 and ADR 017. The state remained tightly coupled, violating the architectural decision requiring a single source of truth accessible by multiple dashboard views. Agents must not falsely claim implementation when structural architectural requirements are ignored.

### Lesson Learned: Verifying Gen 3 Save File Sections
When verifying save file documentation (e.g. Generation 3 save parsing), it is crucial to ensure that the stated offsets fall within the correct section headers as defined by authoritative sources like Bulbapedia. Failing to map byte offsets to the correct logical 4KB section boundaries can lead to incorrect data extraction in the orchestrator.

## 2026-06-13: Gen 3 Save Parsing and Implicit Data
Learned to carefully verify relative vs. logical offsets in Gen 3 blocks. For example, Gen 3 Berry Trees at logical offset `0x169C` are located in Section 1 of `SaveBlock1`, so we must calculate the relative offset into Section 1 using the Section 0 payload size (`0x0F80`), making the correct relative offset `0x071C`. Additionally, we must firmly reject tasks whose acceptance criteria require extraction of implicit/missing data like "Time Planted" or "Last Watered Time" when research findings explicitly show they are not stored.
