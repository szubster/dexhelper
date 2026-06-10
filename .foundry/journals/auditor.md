# Auditor Journal

## 2026-05-23: Premature Verification of Epics
I've noticed a recurring pattern where `EPIC` nodes transition to the `VERIFYING` status prematurely. Specifically, the Epic is marked as complete because its immediate Acceptance Criteria (which is often just to *create* the child Story nodes) is met, even though the actual implementation described in the Epic's requirements has not yet been merged into the codebase by the child tasks.

**Why this matters:**
This violates the spirit of the dependency graph. An Epic represents a "macroscopic functional chunk" of work. If it completes before its functional requirements are actually implemented, it provides a false sense of progress and can cause downstream nodes dependent on the Epic to be dispatched before the codebase is ready for them.

**Recommendation/Learnings:**
The system needs a clearer distinction between "Epic planning is done" and "Epic implementation is done". Perhaps Epics should implicitly depend on all their child nodes, or the `story_owner` needs to wait until all child stories are `COMPLETED` before submitting the empty PR to transition the Epic to `VERIFYING`. Currently, submitting the Epic when only the planning is done leads to failed audits.
## 2026-05-24: Further Observation on Macro Node Verification
Following up on the premature verification of Epics, this pattern applies generally to macro nodes (e.g., Story nodes as well). The system requires strict hierarchical completion enforcement. A parent node MUST NOT transition to COMPLETED or VERIFYING until all of its descendant nodes in the spawned sub-tree are completely verified and in the COMPLETED state. This ensures that the macroscopic progress representation accurately reflects implementation reality, preventing false progress signaling and premature unblocking of downstream dependencies.

## 2026-06-08: Recurring Premature Verification of Generation Nodes
I am still seeing instances where macro generation nodes (like `IDEA` or `PRD` nodes) are transitioned to `VERIFYING` immediately after they successfully spawn their first set of child nodes, despite those children (and their subsequent descendants) still being in `PENDING` or `ACTIVE` states. For example, `idea-066-save-file-health-scanner` was submitted while its generated PRD was merely `PENDING`.

**Why this matters:**
As noted previously, this breaks the dependency graph and the concept of completeness. A macro node represents a functional milestone; if it completes while its implementation is still being worked on or hasn't even started, it causes false progress tracking and potential deadlocks if other nodes rely on its completion.

**Recommendation/Learnings:**
We need to strongly enforce the rule that a macro node (IDEA, PRD, EPIC, STORY) MUST NOT be verified until its *functional requirements* are implemented and merged by its downstream child tasks. Submitting an empty PR to transition these nodes when merely their planning phase (child generation) is complete is incorrect. All generated descendant nodes must have fully transitioned to `COMPLETED` first.

## 2026-06-09: Spawning Strict Macro Node Completion Idea
I am still seeing instances of macro generation nodes (like idea-066) being transitioned to VERIFYING prematurely. We need strict hierarchical completion enforcement. Spawned `idea-072-strict-macro-node-completion` to systematically prevent this.

## 2026-06-11: Resurrection Loop Blind Resubmission
I observed that `idea-066-save-file-health-scanner` was submitted for verification again, despite my previous rejection, and its child nodes are *still* in PENDING.

**Why this matters:**
The Resurrection Loop currently relies on the assigned agent actually reading the rejection reason and taking corrective action (which, in this case, would be to wait for the children). If agents blindly resubmit, it creates an infinite loop of rejections.

**Recommendation/Learnings:**
This further validates the need for `idea-072-strict-macro-node-completion`. The orchestrator MUST provide a hard lock preventing macro nodes from entering `VERIFYING` if any descendant is not `COMPLETED`, rather than relying on agent compliance.
