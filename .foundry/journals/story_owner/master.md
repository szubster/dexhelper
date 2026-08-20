- However, if ALL descendant nodes (e.g. STORIES) are actually COMPLETED (e.g., they have transitioned to VERIFYING/COMPLETED in the system but the parent node's markdown checkbox is still unchecked), we MUST check off the parent's Acceptance Criteria checkboxes before submitting the PR. This satisfies ADR 007 and allows the macro node to transition to COMPLETED and gracefully exit the DAG.
- Checking off a child node prematurely when it is not actually completed violates the Premature Verification policy and the MACRO NODE COMPLETION EXCEPTION.

Learnings:
- When appending child references to a parent node, append them as unchecked tasks (e.g., `- [ ] <node_id>`) using the exact Node ID without file extensions.
- When setting `depends_on` or `parent` fields in node frontmatter, strictly use exact Node IDs without file extensions.
- All macro nodes (e.g., EPIC) must generate a final STORY dedicated exclusively to Integration and E2E Verification.
- Do not modify the YAML frontmatter of an active task node; only update the markdown checkboxes.

**What:** Created an E2E story for epic-115-331-remove-orphaned-qa-task-rule-from-docs.

**Why:** Enforcing the orchestrator safeguard constraint that requires every EPIC to spawn a final STORY dedicated exclusively to Integration and E2E Verification.

**Pattern:** Late-binding E2E story generation after the initial story completes.

Enforced the Orchestrator E2E Safeguard by generating a final STORY node dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).

Initialized story-070-358-orchestrator-strict-completion-e2e for e2e validation of strict verification requirements.

When defining acceptance criteria that refer to documentation (e.g., Section 14 of .foundry/docs/schema.md vs Section 13 for Save File Parsing Guidelines), verify the actual content of the documentation before propagating potentially incorrect section numbers to stories to prevent downstream confusion.

**What:**
Generated an E2E verification STORY node for the "PC Box Sorting Algorithms" EPIC, ensuring compliance with the Orchestrator Safeguard.

**Why:**
The Orchestrator Safeguard policy states that every EPIC node must have at least one child STORY node dedicated to Integration and E2E Verification before it can transition to COMPLETED. Since `epic-106-136-pc-box-sorting-algorithms` had its existing acceptance criteria fully implemented, it required this final E2E verification step to be appended as an acceptance criterion before submission.

**Pattern:**
Late-binding pattern was correctly utilized. An existing parent EPIC had a new child STORY dynamically drafted. We updated the parent's markdown body with the unchecked `[ ]` child node ID without altering its YAML frontmatter.

## Learnings
When breaking down Gen 3 save data parsing epics, it is crucial to separate the extraction of boolean event flags from inventory/bag parsing. Although both serve to detect events, they interact with entirely different memory blocks (flag arrays vs. structured item structs) and require different DataView parsing strategies. Grouping them into a single monolithic story leads to bloated implementation tasks. Furthermore, strictly enforce sibling dependencies (e.g., making the E2E story depend on the individual extraction stories) rather than leaving them parallel, to prevent DAG race conditions and ensure the E2E verification is only unblocked once both extraction logic stories are fully completed.

Epic Planner process changes have been implemented to enforce the inclusion of an E2E verification story for every EPIC. This ensures proper integration and verification of all generated epics.

Based on the failure of `epic-120-338-implement-conflictless-journals` (investigated in `research-335-400`), it is a critical project-specific constraint that every EPIC must spawn at least one child STORY node explicitly dedicated to Integration and E2E Verification. This STORY must be tagged with `e2e` or `integration`. Failing to generate this verification story will cause the orchestrator to repeatedly reject the epic when it attempts to transition to COMPLETED.

## Issue
I was woken up because the Epic `epic-057-347-bash-timeout-wrapper-retry` had missing checkboxes in its markdown body for its child nodes, even though the underlying stories (`story-347-354-bash-timeout-wrapper-impl` and `story-347-355-bash-timeout-wrapper-e2e`) were already marked as `COMPLETED`. This prevented the node from properly transitioning to the `VERIFYING` state.

## Learnings & Takeaways
This reinforces the critical rule from ADR 007 regarding the Parent-Linked DAG execution model:
* **The Empty PR Checkbox Policy**: Even when all downstream work is physically finished by implementation personas, the parent generative node (like this Epic) cannot automatically close itself. A generative persona MUST wake up and check off the exact string references to its children in its markdown body to formally signal to the orchestrator that the dependency chain is complete.
* **YAML Immutability for Completions**: The only valid way to progress a successful node to `VERIFYING` is by updating its markdown checkboxes and submitting an empty PR. Manually editing the `status` field to `VERIFYING` or `COMPLETED` is strictly prohibited.
* This pattern of having a generative persona (Story Owner) wake up to resolve its own completed children via an empty PR is standard operating procedure for the Foundry graph.

epic-120-338-implement-conflictless-journals is fully implemented since all its acceptance criteria and child stories are marked as completed.
Started session for epic-336-349-multi-save-infrastructure. Remembered to append child nodes as unchecked tasks to the markdown body using exact Node IDs, and to use exact Node IDs for depends_on arrays.

In session 11236954308959706417 I created the STORIES to break down Epic 340-411. Found a critical bug where E2E story dependencies were mistakenly defined using repo-relative file paths instead of strict IDs, breaking orchestrator validation. Fixed it and verified test suites.

When encountering a parent macro node that has pending child nodes located in active directories (like `.foundry/stories/`), even if their internal YAML status is `COMPLETED`, they are treated as pending by the Orchestrator. Therefore, their checkboxes must NOT be checked in the parent node's markdown body.

## Context
Breaking down epic `epic-117-335-integrate-zod-orchestrator` into story nodes as a story_owner.

## Actions taken
- Broke down the EPIC into three stories (335-412, 335-413, 335-414).
- Complied with the "E2E Requirement" by including `story-335-414-zod-orchestrator-e2e.md` (tagged with e2e and integration).
- Correctly checked off the parent's markdown `Break down into Stories` acceptance criteria.
- Set `owner_persona: tech_lead` for the newly created STORY nodes as they are downstream from `story_owner`.
- Verified system state and ran E2E testing to verify correctness.

Broke down the `epic-341-415-orchestrator-fuzzer-simulation` into three distinct stories to tackle DAG generation, state simulation, and E2E integration:
- `story-415-415-fuzzer-dag-generation`
- `story-415-416-fuzzer-state-simulation`
- `story-415-417-fuzzer-simulation-e2e`

Notes for Future:
- When appending generated child nodes to a parent's markdown body, strictly use the exact Node ID without file extensions.
- Ensuring there's a dedicated E2E verification story for complex features like fuzzing is critical for ensuring orchestration components operate as a cohesive unit.

**Date:** $(date +%Y-%m-%d)

## Context
When dynamically creating downstream child nodes (e.g., STORY nodes from an EPIC), I need to register them with the parent node by appending them as markdown checkboxes.

## Challenge
In the past, I used multi-line cat commands wrapped in a bash script to rewrite the entire parent file. This technique incorrectly re-evaluated bash variables (\$(date +%Y-%m-%d)) in the YAML frontmatter, corrupting the parent's updated_at field and failing schema validation (a strict policy violation since frontmatter cannot be modified).

## Solution and Process Change
Moving forward, when generating child nodes and updating the parent's markdown body via bash scripts, I MUST NOT overwrite the entire parent file using a cat block.

Instead, I MUST strictly use appending (>>) to add the new task list items and targeted stream editors (e.g., sed -i) to update the parent's checkboxes. This guarantees the YAML frontmatter is completely untouched, avoiding Automated Code Review rejections and schema failures.

Decomposed epic-340-411-schema-resource-locking into story-411-418-schema-resource-locking and story-411-419-schema-resource-locking-e2e.

---

## Constraints Encountered
- **DAG ID Strictness**: We must use exact Node IDs without file extensions when defining `depends_on`.
- **E2E Safeguard**: Epics require a final E2E verification Story, even for documentation-focused Epics, to comply with Orchestrator Safeguard.
- **Empty PR Policy (Demotion)**: Since we generated pending children for the Epic, we must explicitly *not* check off the Epic's acceptance criteria. The Orchestrator requires these to be unchecked to demote the Epic back to PENDING. Submitting with unchecked boxes triggers the demotion correctly.

## Strategy Adjustment
In future planning for schema updates, ensure we always explicitly generate E2E validation stories.

- Created story nodes for extracting Gen 3 AI data: active team, location, opponent data, and e2e verification. Appended unchecked tasks to the parent epic-340-411-gen3-ai-data-extraction.

# Anomaly Detection: Pre-existing Save Files
The target artifacts (save files such as `red.sav`, `blue-evolve.sav`, `silver.sav`, `crystal-evolve.sav`, and `emerald.sav`) for Epic `epic-343-417-test-fixtures-sourcing` were found to already exist in `tests/fixtures/` prior to the session.

When writing STORY nodes dynamically, always list the existing files in the directory and sort them to find the correct next sequence number (e.g., `ls -1 .foundry/stories/ | sort -n -t '-' -k 3`). Do not rely on pre-populated sequence numbers in the parent EPIC's Acceptance Criteria, as they might be hallucinated or cause collisions with existing nodes. Additionally, always ensure that every EPIC generates a final STORY dedicated exclusively to Integration and E2E Verification to satisfy the Orchestrator Safeguard.

## Learnings
- **ADR 025 Enforcement:** When breaking down epics, it is critical to cross-reference architectural decisions (ADRs). In this session, an epic required extracting the internal RTC from a Gen 3 save file. However, ADR 025 explicitly mandates an "RTC-Independent Fallback Strategy" utilizing system time and UI overrides. The RTC extraction requirement was therefore bypassed and documented via a RESEARCH node to maintain architectural compliance.
- **Late Binding Pattern:** Utilized the late-binding pattern to dynamically generate a RESEARCH node to investigate the RTC conflict and subsequently generated the correct implementation stories for parsing the Shoal items and the mandated E2E verification story.

## 2026-08-16: E2E Requirement for Epics
Learned that Epics must always have a final STORY dedicated exclusively to Integration and E2E Verification to avoid rejection from the orchestrator.

Date: 2026-08-17
Persona: Story Owner
Task: `epic-337-400-data-splitting`

Successfully broke down Epic "Data Splitting by Game Generation" (`epic-337-400-data-splitting`) into three stories:
- `story-400-428-extract-core-data`: Extract core shared data into a separate MsgPack bundle.
- `story-400-429-gen-specific-extensions`: Generate the gen-specific bundles (`pokedata-gen{N}.msgpack`) and implement lazy fetching.
- `story-400-430-data-splitting-integration-e2e`: Integration and E2E verification to ensure the application works correctly with the split data bundles.

The target Epic was updated with the generated child nodes and we submitted an Empty PR as per the empty PR policy, without checking off the epic's own overarching acceptance criteria (to allow the orchestrator to correctly demote it to PENDING).

Enforced the Orchestrator Safeguard (E2E/Integration Requirement) for EPIC nodes by adding an E2E STORY to `epic-071-123-define-tailwind-v4-utilities-v2.md`, as it was missing a dedicated E2E verification story to satisfy hierarchical completion.
