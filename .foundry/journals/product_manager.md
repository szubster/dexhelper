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

## 2026-06-15: Strict Pipeline Compliance and Handoff

*   **Lesson:** When transforming an `IDEA` node into a `PRD` node, the Product Manager must rigorously adhere to the pipeline's expected sequence for the `owner_persona` field. Despite the "not yourself" rule seeming ambiguous when creating consecutive nodes (e.g., if a PM creates an Epic directly), the core pipeline dictate `IDEA (PM) -> PRD (PM) -> ADR (Architect) -> EPIC (Planner) -> STORY -> TASK` must be respected. Specifically, when generating a PRD, the `owner_persona` should be set to `epic_planner` to facilitate the correct downstream handoff. Assigning it back to `product_manager` breaks the handoff chain by failing to transfer ownership correctly.
*   **Actionable Rule:** Always assign `owner_persona: epic_planner` to newly spawned PRD artifacts, regardless of whether the PM persona expects to participate again later.

## 2026-06-16: Parent Node Awakening and Generated Nodes
When transforming an `IDEA` to a `PRD`, and there are existing acceptance criteria on the `IDEA` that cannot be fulfilled before all generated child nodes are complete, the `IDEA` node MUST NOT have all its acceptance criteria checked off. Check off only what is fulfilled, and always append the newly generated nodes as unchecked checkboxes (`- [ ] <filepath>`) in the markdown body. Checking all acceptance criteria prematurely causes the empty PR submission to be verified before children complete, violating the strict pipeline graph.

## Idea 066 Cancellation: Questionable ROI (2026-07-01)
**Observation:**
Idea 066 proposed a custom Biome/ESLint rule to enforce `gray-matter` for parsing frontmatter in `.github/scripts/`. Upon evaluation, it was determined that the technical cost and maintenance burden of implementing and supporting this highly specific rule for a minor edge case outweighs the benefits.
**Action:**
Cancelled `idea-066-enforce-gray-matter-linter` directly as the return on investment (ROI) is too low compared to relying on standard PR reviews. This aligns with the constraint to decline low-ROI ideas early in the pipeline to avoid wasting engineering cycles.

## 2026-07-02: Strict Macro Node Completion Enforcement and Wait States
**Observation:**
During the resurrection loop for `idea-066-save-file-health-scanner` (Attempt 5), the IDEA node repeatedly failed verification because it was submitted via Empty PR while its generated downstream PRD and Epic nodes were still `PENDING`. This violates the Strict Macro Node Completion rules (IDEA-072).

**Action & Constraint:**
When assigned to a macro node (like an IDEA) that has spawned children, DO NOT transition it to VERIFYING (by submitting an Empty PR with all boxes checked) until ALL descendant nodes have transitioned to COMPLETED. If the downstream nodes are still PENDING, you MUST keep the macro node in a PENDING state. To do this, uncheck the Acceptance Criteria checkbox corresponding to the uncompleted downstream dependency and submit the PR. This breaks the premature verification loop and allows the system to wait for downstream implementation.

## 2026-07-16 - Anomaly Found

When generating the PRD for `idea-117-split-bundles-and-data`, I noticed that the research and ADR references (`research-117-325-bundle-splitting-analysis` and `adr-117-029-bundle-splitting-strategy`) already existed and were marked as completed in the IDEA node's acceptance criteria.

## 2026-07-18

**Anomaly Detected**:
During the session to transform `idea-067-extract-dag-utils` into a PRD, it was discovered that the target artifact `prd-067-036-extract-dag-utils` already unexpectedly existed prior to the session. The Agile Coach should review this to determine why a target artifact was present before the IDEA was formally processed into a PRD in the current session.
- Transformed IDEA-118 to PRD-118-117 by centralizing Coder and QA Task Prompt Reminders

## 2026-07-19
- Processed IDEA `idea-119-gen2-unown-dex-tracker` and generated `prd-119-118-gen2-unown-dex-tracker` directly linking Unown catches with event flags for Ruins of Alph puzzles to clarify missing Unown forms. Appended PRD node to idea node as Acceptance Criteria. Assigned PRD to epic_planner.
### Observation: Invalid Node Sequence Numbers
I noticed that `idea-118-orchestrator-circular-dependency-detection.md` contained an invalid child node ID (`prd-118-051...`) in its acceptance criteria, which was completely out of sequence for the current state of the repository. When generating new nodes, it's crucial to properly discover the max sequence number across the repository instead of hallucinating or assuming a sequence number, to preserve the sequential integrity of the node identifiers.
## 2026-07-20: PRD Formalization Protocol
When converting an IDEA to a PRD, it is crucial to ensure that the PRD fully formalizes the proposed solution, rather than just copying a stripped-down summary. Specifically, if the IDEA outlines a distinct architectural or rendering approach (e.g., using a 2D canvas or layered SVG for rendering a procedurally generated visual pattern), these technical details MUST be explicitly carried over into the PRD's description to ensure downstream personas (Epic Planner, Architect, Tech Lead) have the correct context.

## 2026-07-20 - Anomaly Found
When handling idea-117-split-bundles-and-data, I found that the target PRD artifact prd-117-116-split-bundles-and-data already existed with status COMPLETED. The PRD was successfully generated beforehand.
- 2026-07-20: Formalized idea-120 into prd-120-335 to transition from monolithic agent journals to session-unique markdown files, eliminating persistent GitHub merge conflicts.

## 2026-07-22 - Idea Transformation to PRD Anomaly
When beginning the session to transform `idea-117-split-bundles-and-data` into a PRD, I discovered that the target artifact `prd-117-116-split-bundles-and-data` already existed and its acceptance criteria was checked on the idea node. This is an anomaly that the Agile Coach should review. Submitting an empty PR to allow the DAG to progress since the target artifact exists.

## Anomaly: Target Artifact Already Exists
During the session to process `idea-117-split-bundles-and-data`, it was discovered that the target artifact `prd-117-116-split-bundles-and-data` already existed and was checked off prior to this session. This anomaly should be reviewed by the Agile Coach. Submitting an empty PR to demote the parent node to PENDING.
