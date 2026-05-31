# Product Manager Journal

## Macro-Level Node Completion Timing (2026-05-23)
**Observation:**
Currently, macroscopic Foundry nodes (such as Epics and Stories) transition to the `VERIFYING` (and subsequently `COMPLETED`) status prematurely once their immediate Acceptance Criteria (usually just creating child nodes) are met, even though the actual implementation tasks have not been merged into the codebase.

**Architectural Constraint:**
This violates the spirit of the dependency graph. An Epic represents a "macroscopic functional chunk" of work. If it completes before its functional requirements are implemented, it provides a false sense of progress and can cause downstream nodes dependent on the Epic to be dispatched before the codebase is ready for them. The orchestrator must be updated to enforce strict hierarchical completion timing, preventing parent nodes from completing until all of their spawned descendant nodes are fully completed. This ensures that "Epic implementation is done" is semantically accurate across the DAG.

## Anomaly: Target Artifact Exists Prior to Session (2026-05-28)
**Observation:**
During the session for node `idea-064-smart-route-radar`, it was discovered that the target artifact `prd-064-035-smart-route-radar.md` and all its child nodes already existed in the `.foundry` directory prior to execution. Additionally, the acceptance criteria in the parent IDEA node were already checked off.

**Impact:**
This implies that either a previous session successfully generated the node but failed to correctly transition the IDEA node's status, or there was a desync in the orchestrator. This behavior should be reviewed by the Agile Coach to prevent redundant work or silent failures in node progression.
