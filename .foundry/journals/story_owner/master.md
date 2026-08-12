## Entry from 10642899106052443585.md

## Session 10642899106052443585
- Under the Late-Binding Orchestrator Demotion Compliance Rule, when processing a READY parent node (like an EPIC) with pending child tasks, we must generally submit an Empty PR without checking off the child tasks if they are incomplete.
- However, if ALL descendant nodes (e.g. STORIES) are actually COMPLETED (e.g., they have transitioned to VERIFYING/COMPLETED in the system but the parent node's markdown checkbox is still unchecked), we MUST check off the parent's Acceptance Criteria checkboxes before submitting the PR. This satisfies ADR 007 and allows the macro node to transition to COMPLETED and gracefully exit the DAG.
- Checking off a child node prematurely when it is not actually completed violates the Premature Verification policy and the MACRO NODE COMPLETION EXCEPTION.

## Entry from 12203003015986713856.md

# Session 12203003015986713856

Learnings:
- When appending child references to a parent node, append them as unchecked tasks (e.g., `- [ ] <node_id>`) using the exact Node ID without file extensions.
- When setting `depends_on` or `parent` fields in node frontmatter, strictly use exact Node IDs without file extensions.
- All macro nodes (e.g., EPIC) must generate a final STORY dedicated exclusively to Integration and E2E Verification.
- Do not modify the YAML frontmatter of an active task node; only update the markdown checkboxes.

## Entry from 12591213007050017544.md

## Session 12591213007050017544

**What:** Created an E2E story for epic-115-331-remove-orphaned-qa-task-rule-from-docs.

**Why:** Enforcing the orchestrator safeguard constraint that requires every EPIC to spawn a final STORY dedicated exclusively to Integration and E2E Verification.

**Pattern:** Late-binding E2E story generation after the initial story completes.

## Entry from 15700522367460075049.md

# 15700522367460075049

Enforced the Orchestrator E2E Safeguard by generating a final STORY node dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).

## Entry from 15966663207683891967.md

Initialized story-070-358-orchestrator-strict-completion-e2e for e2e validation of strict verification requirements.

## Entry from 17094807873661096187.md

# Session 17094807873661096187

When defining acceptance criteria that refer to documentation (e.g., Section 14 of .foundry/docs/schema.md vs Section 13 for Save File Parsing Guidelines), verify the actual content of the documentation before propagating potentially incorrect section numbers to stories to prevent downstream confusion.

## Entry from 2026-08-06-11-32-38.md

## 2026-08-06-11-32-38

**What:**
Generated an E2E verification STORY node for the "PC Box Sorting Algorithms" EPIC, ensuring compliance with the Orchestrator Safeguard.

**Why:**
The Orchestrator Safeguard policy states that every EPIC node must have at least one child STORY node dedicated to Integration and E2E Verification before it can transition to COMPLETED. Since `epic-106-136-pc-box-sorting-algorithms` had its existing acceptance criteria fully implemented, it required this final E2E verification step to be appended as an acceptance criterion before submission.

**Pattern:**
Late-binding pattern was correctly utilized. An existing parent EPIC had a new child STORY dynamically drafted. We updated the parent's markdown body with the unchecked `[ ]` child node ID without altering its YAML frontmatter.

## Entry from 2026-08-08-15-33-28.md

# Session 2026-08-08-15-33-28

## Learnings
When breaking down Gen 3 save data parsing epics, it is crucial to separate the extraction of boolean event flags from inventory/bag parsing. Although both serve to detect events, they interact with entirely different memory blocks (flag arrays vs. structured item structs) and require different DataView parsing strategies. Grouping them into a single monolithic story leads to bloated implementation tasks. Furthermore, strictly enforce sibling dependencies (e.g., making the E2E story depend on the individual extraction stories) rather than leaving them parallel, to prevent DAG race conditions and ensure the E2E verification is only unblocked once both extraction logic stories are fully completed.

## Entry from 3965440180567252160.md

# Session 3965440180567252160

Submitted an empty PR for `epic-055-113-egg-move-pathfinding-engine` because its child task `story-113-348-egg-move-pathfinding-e2e` is technically COMPLETED but has not been archived yet by the TPM (still located in `.foundry/stories/`). According to the Late-Binding Orchestrator Demotion Compliance Rule, when assigned a READY parent node that already has pending/active child tasks drafted from a previous iteration, the agent must submit an empty PR *without* checking off its overarching acceptance criteria. This allows the orchestrator to correctly demote the parent to PENDING while it waits for its children.

## Entry from 4061683249242859916.md

# Session 4061683249242859916

Epic Planner process changes have been implemented to enforce the inclusion of an E2E verification story for every EPIC. This ensures proper integration and verification of all generated epics.

## Entry from 5799943991093245774.md

# Journal Entry - 2026-08-08

Based on the failure of `epic-120-338-implement-conflictless-journals` (investigated in `research-335-400`), it is a critical project-specific constraint that every EPIC must spawn at least one child STORY node explicitly dedicated to Integration and E2E Verification. This STORY must be tagged with `e2e` or `integration`. Failing to generate this verification story will cause the orchestrator to repeatedly reject the epic when it attempts to transition to COMPLETED.

## From YYYY-MM-DD-HH-MM-SS.md

## Issue
I was woken up because the Epic `epic-057-347-bash-timeout-wrapper-retry` had missing checkboxes in its markdown body for its child nodes, even though the underlying stories (`story-347-354-bash-timeout-wrapper-impl` and `story-347-355-bash-timeout-wrapper-e2e`) were already marked as `COMPLETED`. This prevented the node from properly transitioning to the `VERIFYING` state.

## Action Taken

## Learnings & Takeaways
This reinforces the critical rule from ADR 007 regarding the Parent-Linked DAG execution model:
* **The Empty PR Checkbox Policy**: Even when all downstream work is physically finished by implementation personas, the parent generative node (like this Epic) cannot automatically close itself. A generative persona MUST wake up and check off the exact string references to its children in its markdown body to formally signal to the orchestrator that the dependency chain is complete.
* **YAML Immutability for Completions**: The only valid way to progress a successful node to `VERIFYING` is by updating its markdown checkboxes and submitting an empty PR. Manually editing the `status` field to `VERIFYING` or `COMPLETED` is strictly prohibited.
* This pattern of having a generative persona (Story Owner) wake up to resolve its own completed children via an empty PR is standard operating procedure for the Foundry graph.
## Epic 045-070
# Session Log

epic-120-338-implement-conflictless-journals is fully implemented since all its acceptance criteria and child stories are marked as completed.
Started session for epic-336-349-multi-save-infrastructure. Remembered to append child nodes as unchecked tasks to the markdown body using exact Node IDs, and to use exact Node IDs for depends_on arrays.
