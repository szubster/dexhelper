# Product Manager Journal

## Macro-Level Node Completion Timing
**Observation:**
Currently, macroscopic Foundry nodes (such as Epics and Stories) transition to the `VERIFYING` (and subsequently `COMPLETED`) status prematurely once their immediate Acceptance Criteria (usually just creating child nodes) are met, even though the actual implementation tasks have not been merged into the codebase.

**Architectural Constraint:**
This violates the spirit of the dependency graph. An Epic represents a "macroscopic functional chunk" of work. If it completes before its functional requirements are implemented, it provides a false sense of progress and can cause downstream nodes dependent on the Epic to be dispatched before the codebase is ready for them. The orchestrator must be updated to enforce strict hierarchical completion timing, preventing parent nodes from completing until all of their spawned descendant nodes are fully completed. This ensures that "Epic implementation is done" is semantically accurate across the DAG.

## Evaluating Custom Toolchain ROI
**Observation:**
An idea was generated to enforce `gray-matter` usage in scripts via a custom Biome/Oxlint rule. However, evaluating the implementation cost and maintenance overhead against the frequency of the issue (occasional regex regressions) revealed a low Return on Investment (ROI).

**Architectural Constraint:**
When proposing system improvements or guardrails (like custom linters), we must strictly evaluate the ROI. Creating and maintaining highly specific custom rules for minor edge-cases often outweighs the benefits compared to relying on standard PR reviews. If the technical cost and maintenance burden are disproportionately high for the problem being solved, the idea should be declined/cancelled early in the pipeline to avoid wasting engineering cycles.
## Anomaly: Target Artifact Exists Prior to Session (2026-05-28)
**Observation:**
During the session for node `idea-064-smart-route-radar`, it was discovered that the target artifact `prd-064-035-smart-route-radar.md` and all its child nodes already existed in the `.foundry` directory prior to execution. Additionally, the acceptance criteria in the parent IDEA node were already checked off.

**Impact:**
This implies that either a previous session successfully generated the node but failed to correctly transition the IDEA node's status, or there was a desync in the orchestrator. This behavior should be reviewed by the Agile Coach to prevent redundant work or silent failures in node progression.

## Idea 066 Anomaly: Target PRD Already Exists
On 2026-06-03, while transitioning idea-066-save-file-health-scanner to PRD, the target artifact (.foundry/prds/prd-066-036-save-file-health-scanner.md) was found to already exist prior to this session. Documenting this for the Agile Coach as required by node generation rules.

## Missing Checkboxes for Child Nodes (2026-06-07)
**Observation:**
During the conversion of `idea-066-save-file-health-scanner` to a PRD, the PR was rejected twice. The cause was that the generated child PRD was added as a plain text reference (`- Created PRD: ...`) instead of an unchecked task checkbox (`- [ ] ...`).

**Architectural Constraint:**
In the Foundry architecture, parent generation nodes (like `IDEA` and `PRD`) MUST include references to their generated child nodes as unchecked task checkboxes (`- [ ] <file_path>`) directly in their markdown body. This is a critical signal to the Orchestrator. If the checkbox is omitted or immediately checked, the Orchestrator assumes the parent node has met all its acceptance criteria and prematurely transitions it to `VERIFYING` before the descendant nodes are actually completed. This violates the dependency graph constraints and triggers a rejection.

## 2026-06-11: Bash Output Truncation Awareness
When discovering a large number of files or searching for the highest sequence number in a directory with many files (like `.foundry/prds/`), standard bash outputs might be truncated if combined with other output-heavy commands (like `cat`) in the same execution block. This can lead to ungrounded assumptions (e.g., guessing the next sequence number). It is essential to run critical discovery commands (like `ls -1 | sort | tail`) in isolation or pipe them safely to ensure complete data retrieval before acting.
## Anomaly: Duplicate PRD Node Exists (2026-06-11)
**Observation:**
During the generation of `prd-074-046-dag-context-architecture` for `idea-074-refactor-dag-dashboard-context`, it was discovered that an identical PRD (`prd-073-045-refactor-dag-dashboard-context`) already existed, apparently spawned from `idea-073-refactor-dag-dashboard-context`.

**Impact:**
This duplicate node creation could lead to redundant work being dispatched and confusion within the DAG graph. The Agile Coach should review the system to see why `idea-073` and `idea-074` were created as duplicate entries, and potentially introduce checks to prevent duplicate IDEA generation before they reach the PRD transformation step.

## 2026-06-12: Child Node Generation Protocol
When generating a child node from a parent, ensure the new child node is added as an *unchecked* checklist item (`- [ ]`) in the parent node's markdown body. Do not immediately check this box off or use plain text. The parent node's acceptance criteria (e.g. `- [x] Break down into Tasks`) can be checked off. This approach strictly conforms to the `COMPLETED` DAG contract and prevents the parent node from moving into the `VERIFYING` state before all its dynamically spawned children have been completed.

## 2026-06-15: Impossible Loop Cascade

*   **Observation:** It is critical to ensure that dynamically triggered cancellations (such as nodes reaching their `MAX_REJECTION_THRESHOLD`) hook into the proper cascade logics (like Phase 3.1 and Phase 3.6 of the orchestrator) to prevent orphaned siblings and gracefully awake downstream dependencies or parent nodes.
*   **Action:** Automated the transition of `FAILED` nodes with max rejections into `CANCELLED` during the Orchestrator DAG resolution loop.
