# Auditor Journal

## 2026-05-23: Premature Verification of Epics
I've noticed a recurring pattern where `EPIC` nodes transition to the `VERIFYING` status prematurely. Specifically, the Epic is marked as complete because its immediate Acceptance Criteria (which is often just to *create* the child Story nodes) is met, even though the actual implementation described in the Epic's requirements has not yet been merged into the codebase by the child tasks.

**Why this matters:**
This violates the spirit of the dependency graph. An Epic represents a "macroscopic functional chunk" of work. If it completes before its functional requirements are actually implemented, it provides a false sense of progress and can cause downstream nodes dependent on the Epic to be dispatched before the codebase is ready for them.

**Recommendation/Learnings:**
The system needs a clearer distinction between "Epic planning is done" and "Epic implementation is done". Perhaps Epics should implicitly depend on all their child nodes, or the `story_owner` needs to wait until all child stories are `COMPLETED` before submitting the empty PR to transition the Epic to `VERIFYING`. Currently, submitting the Epic when only the planning is done leads to failed audits.
## 2026-05-24: Further Observation on Macro Node Verification
Following up on the premature verification of Epics, this pattern applies generally to macro nodes (e.g., Story nodes as well). The system requires strict hierarchical completion enforcement. A parent node MUST NOT transition to COMPLETED or VERIFYING until all of its descendant nodes in the spawned sub-tree are completely verified and in the COMPLETED state. This ensures that the macroscopic progress representation accurately reflects implementation reality, preventing false progress signaling and premature unblocking of downstream dependencies.

## PRD Premature Verification Observation
Following up on the premature verification of Epics and Stories, I observed the same pattern with PRD nodes (specifically `prd-063-034-permanent-failure-dashboard`). The PRD transitioned to `VERIFYING` and was considered complete simply because its child Epics were generated, even though the feature implementation is ongoing. We must implement a comprehensive solution (e.g., an ADR) to enforce strict hierarchical completion across all node types.
