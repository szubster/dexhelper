# Auditor Journal

## 2026-05-23: Premature Verification of Epics
I've noticed a recurring pattern where `EPIC` nodes transition to the `VERIFYING` status prematurely. Specifically, the Epic is marked as complete because its immediate Acceptance Criteria (which is often just to *create* the child Story nodes) is met, even though the actual implementation described in the Epic's requirements has not yet been merged into the codebase by the child tasks.

**Why this matters:**
This violates the spirit of the dependency graph. An Epic represents a "macroscopic functional chunk" of work. If it completes before its functional requirements are actually implemented, it provides a false sense of progress and can cause downstream nodes dependent on the Epic to be dispatched before the codebase is ready for them.

**Recommendation/Learnings:**
The system needs a clearer distinction between "Epic planning is done" and "Epic implementation is done". Perhaps Epics should implicitly depend on all their child nodes, or the `story_owner` needs to wait until all child stories are `COMPLETED` before submitting the empty PR to transition the Epic to `VERIFYING`. Currently, submitting the Epic when only the planning is done leads to failed audits.
## 2026-05-24: Invalid Architect Checkbox embedded in PRD
I audited the `idea-064-smart-route-radar` node and observed its generated downstream node `prd-064-035-smart-route-radar`. The PRD improperly includes an Architect checklist item (`- [ ] Architect: Convert this PRD into an ADR...`) within its markdown body.

**Why this matters:**
This violates the strict single-owner and pipeline boundary rules. `PRD` nodes are owned by the `epic_planner`. If an architectural design (ADR) or architect-specific logic is required during the PRD phase, the `product_manager` must spawn a separate `TASK` node for the `architect` rather than inappropriately adding architect tasks as checkboxes within a `PRD`. By burying it as a checkbox in the PRD, the Architect persona is never explicitly dispatched by the orchestrator to perform this work. Implementation Epics must explicitly include the newly spawned ADR TASK's ID in their `depends_on` array so implementation cannot begin until the ADR is completed.

**Recommendation/Learnings:**
The system must reject ideas that generate PRDs containing out-of-scope personas. We must enforce strict separation where ADR requirements spawn distinct `TASK` nodes assigned to the `architect` persona, and implementation Epics depend on that TASK node.
