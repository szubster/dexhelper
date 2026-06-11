# QA Journal

## Dealing with Cancelled/Replaced Tasks Reawakening
When a cancelled or replaced task node is reawakened (e.g., because its previous implementation dependency finished, triggering the Empty PR flow), the agent must still check off the acceptance criteria to allow the node to gracefully exit the DAG, satisfying ADR 007's completeness requirements. Even if no real work is needed, those checkboxes must be checked for the node to safely transition to COMPLETED.


## 2026-05-21
Rejected `task-072-128-implement-dag-cancellation` because it violated the architectural constraint that `COMPLETED` nodes are read-only (immutable). Its 'Wait and Wake' phase incorrectly transitioned `COMPLETED` nodes back to `PENDING` if their dependencies became incomplete, which breaks the Directed Acyclic Graph orchestrator constraints and causes cascading cancellation bugs.

## 2026-05-22: Wait & Wake State Invariant Violation
During the validation of `task-072-128-implement-dag-cancellation`, I discovered a critical invariant violation in the DAG orchestrator. The Wait and Wake phase (Phase 3.5) was incorrectly transitioning `COMPLETED` nodes to `PENDING` if they had incomplete dependencies. This violates the core orchestrator principle that `COMPLETED` nodes are immutable, and caused those nodes to be erroneously swept up by downstream cascade cancellation logic.

**Lesson**: When checking nodes for suspension based on incomplete dependencies, the orchestrator MUST strictly ignore nodes that are already in terminal states (`COMPLETED` or `CANCELLED`). Terminal state immutability is essential to prevent infinite loops and incorrect cascading status updates.

## Missing Integration Failures
When an implementation task only creates standalone UI components but fails to integrate or render them anywhere in the main application (making them inaccessible to the user), the task MUST be rejected. The purpose of implementation isn't just to write code that passes isolated unit tests; it is to deliver accessible features.
- **2026-05-24**: Rejected task-075-132-implement-heartbeat-verifying-logic. The implementation successfully added VERIFYING nodes to the zombie detection list but failed to update the logic that fails nodes missing a jules_session_id. The check `if (!isHuman && (!sessionId || sessionId === 'null') && node.frontmatter.status === 'ACTIVE')` was not updated to include VERIFYING status.

## 2026-05-23: Missing Architectural Integration (ADR 013 & ADR 017)
Rejected `task-085-142-impl-extract-rejection-count`. The implementation successfully extracted the `rejection_count` field from the YAML frontmatter but failed to architect the UI layer as specified by the ADRs. ADR 013 (Kanban Board State Management) and ADR 017 (Permanent Failure Dashboard) both require the core DAG data state to be lifted out of the isolated `DagDashboard.tsx` component and into a shared React Context (or global store) so that multiple views (Graph View, Board View, Permanent Failures) can consume the same single source of truth without redundant fetching or state coupling. The coder ignored this architectural requirement and left the state tightly coupled to `DagDashboard`.

**Lesson**: When a task's specifications explicitly reference Architecture Decision Records (ADRs) that mandate a specific pattern (like "shared context" or "single source of truth"), QA must enforce that the structural pattern is implemented, not just the surface-level data extraction.

## 2026-06-08: Rejection Validation - Missing React Context Layer
Rejected `task-085-142-impl-extract-rejection-count`. While the parsing logic extracted `rejection_count` correctly and models were updated, the required React Context layer to expose this data to connected UI views (as specified in ADR 013 and ADR 017) was completely missing. The state remained tightly coupled within `DagDashboard.tsx` instead of being lifted into a shared context. This violates the architectural decision requiring a single source of truth accessible by multiple dashboard views.

## 2026-06-09: Rejection Validation - Still Missing React Context Layer
Rejected `task-085-142-impl-extract-rejection-count` again. The previous rejection correctly identified that the React Context layer was completely missing to expose `rejection_count` to connected UI views, but the implementer did not fix it and instead falsely claimed it was implemented. State is still tightly coupled in `DagDashboard.tsx`. This violates ADR 013 and ADR 017's requirement for a single source of truth accessible by multiple dashboard views.

## 2026-06-11: Validate File Existence First
Rejected `task-095-157-feebas-seed-impl` for missing the implementation of `extractFeebasSeed`. The file `src/engine/gen3/feebas.ts` did not exist.
**Lesson**: Always use grounded file discovery (e.g., `ls` or `grep`) to confirm the files exist before attempting to validate logical correctness. If a required file is completely missing, immediately fail the target task to short-circuit the review loop and prevent wasted QA effort.
