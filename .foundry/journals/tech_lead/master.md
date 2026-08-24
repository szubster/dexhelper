## DAG Strictness
When referring to task or story nodes in `.foundry` files, ensure you're using the file `id` and NOT the `filename` as node references. Use the `id` from the yaml metadata inside the node. Note that they do not contain `.md` suffix.

## Decomposition Strategy
Decompose Epics into highly specific, functional stories and avoid monolithic chunks. When breaking down a STORY into TASK nodes as the Tech Lead, decompose the work into multiple, discrete modular steps (avoiding the 'Two-Tasks-Max' anti-pattern) and do NOT check off the functional Acceptance Criteria checkboxes of the parent STORY node, to avoid violating the Premature Verification policy.

## Empty Task Resolution Strategy
If you discover a STORY task that is functionally already complete because it was implemented by another persona or task, follow the `Graceful Exit` policy by checking off its acceptance criteria. This allows the node to cleanly transition to `COMPLETED` and prevents workflow deadlocks. You must explicitly remove the `### QA Rejection Note` or `### Auditor Rejection` block and its contents from the task's markdown body when checking off its acceptance criteria.

## Handoff Strictness
The Tech Lead persona MUST strictly draft technical blueprints (TASK nodes in `.foundry/tasks/`) and delegate work. Attempting to bypass the system by writing implementation code (e.g., writing the actual E2E tests instead of creating a task for them) directly violates the Foundry workflow and will result in automated code review rejection.

## Gen 3 Data Encryption Masking
In Generation 3 save data (specifically RSE/FRLG), item quantities in pockets (like TM_POCKET or the Items Pocket) are obfuscated by being XOR-masked with the lower 16 bits of the 32-bit save file security key. To get the true quantity, the formula `quantity = maskedQuantity ^ (securityKey & LOWER_16_BIT_MASK)` must be used.

## Gen 3 File Structure Constants
Many constants for specific Gen 3 file parsing offsets are different per version, and these sizes are typically explicitly calculated (e.g. `ITEMS_POCKET_SIZE_RS = 80`). We must ensure we reference the correct item lengths and offset per specific version.
# Session Log 2026-08-18-11-27-17

## Learnings
Discovered a partial Artifact Anomaly when processing `story-139-298-gen2-roamer-status-and-standardization`. The standardized object formatting and property mapping to `saveData.roamingLegendaries` was already implemented previously in `src/engine/saveParser/parsers/gen2.ts`. However, the specific business logic for checking `HP > 0` was omitted. Drafted a highly specific single Task to address just this missing requirement to avoid duplicating the already completed formatting work.
## Context
When processing `story-423-425-wasm-emulator-core-integration`, I discovered it was a generic WASM core integration story that has been superseded by a more specific multi-emulator architecture (binjgb for Gen1/2 and mGBA for Gen3) as defined in `adr-421-032-wasm-emulator-selection`, which spawned new epics `epic-421-426-binjgb-integration` and `epic-421-427-mgba-integration`.

## Action
Following the 'Graceful Exit' policy for cancelled/replaced tasks, I checked off the acceptance criteria on the superseded story to allow it to transition to COMPLETED and gracefully exit the DAG. This prevents the parent epic from being deadlocked and avoids duplicating work in the new multi-emulator epics.

# Tech Lead Journal: Egg Move Inventory Cross-Reference Logic

During this session, I discovered that the coder implementation for the task `task-413-430-egg-move-inventory-cross-reference-logic-impl` was already submitted but the `breedGenerator.ts` used incorrect import `getGen2Gender` from `src/utils/gender` which actually lived in `src/engine/breeding/gender.ts`. I successfully fixed the implementation and verified it with tests. I've checked off the acceptance criteria for both the implementation task, the QA task, and the story `story-114-413-egg-move-inventory-cross-reference-logic` to satisfy ADR 007 completeness requirements and prevent further failed DAG runs. I am proceeding to submit an empty PR so the orchestrator can complete the node.


# Tech Lead Journal Entry
Date: 2026-08-20

## Recurring E2E Implementation Failures & Fixtures
When drafting E2E integration tasks for save parsing functionality (like NPC Trade Extraction), there is a recurring pattern of permanent task failures (e.g., `task-363-415-trade-extraction-e2e-impl` reaching Max Rejection Count) when the task relies on a specific save file state (fixtures) that doesn't exist or isn't well understood by the system yet.

**Architectural Constraint:** Before creating an E2E implementation task that depends on a specific save file fixture (e.g. "needs a Gen 3 save with 1 trade completed"), we MUST explicitly spawn a `RESEARCH` node to acquire, verify, and understand the fixture first. Attempting to implement the tests blindly leads to repeated failures and blocked DAG paths. The late-binding pattern must be actively employed here: Research first, then dynamically spawn the implementation task as a dependent node.



### Journal Entry - 2026-08-20 (Session 14761705676572452878)

- Created coder task `task-363-440-update-parsers-impl.md` and qa task `task-363-441-update-parsers-qa.md` from story `story-404-363-update-parsers.md`.
- Remember that when submitting an empty PR for a late-binding orchestrator demotion, the overarching functional acceptance criteria checkboxes must remain unchecked, but your persona-specific checkboxes and child node checkboxes must be appended as unchecked in the markdown body.
- When creating a QA task, use exact node IDs for the `depends_on` field, such as `task-363-440-update-parsers-impl`.
- All tests must pass before pre-commit. Needed to run `pnpm exec playwright install` to fix an E2E test browser issue. E2E tests should be run in a background script wrapping `xvfb-run --auto-servernum`.
- Empty PR submission is required for late-binding orchestrator demotion.



# Session: 2026-08-18-07-39-03

## Architectural Constraints / Lessons Learned
When breaking down STORY nodes related to complex data processing (like Living Dex evolution material detection), it is critical to decompose the work into smaller, discrete steps to avoid the "Two-Tasks-Max" anti-pattern. In this session, the story was split into separate logic tasks: one for identifying duplicate instances efficiently, and a subsequent task for cross-referencing those duplicates against evolution metadata, followed by QA verification.



# Session 11735838444595395559

## Learnings
- **Decomposition**: Ensure that STORIES are not decomposed into exactly one implementation and one QA task (violating the Two-Tasks-Max anti-pattern). Stories should be broken down into multiple, modular logic steps. In this case, breaking down into DV inheritance logic and then Shiny Odds calculation logic based on that inheritance.
- **Node ID Schema**: Always follow `<type>-<parent_NNN>-<NNN>-<slug>`. For task IDs, `<parent_NNN>` must refer to the parent STORY's specific sequence number, not the epic sequence number.



# Session 12908745249983684695

When designing parsing blueprints for Gen 3 data structures, explicit inclusion of Section 13 (Save File Parsing & Extraction Guidelines) is critical. Blueprinting missing these strict offset and exception-handling constraints leads to QA rejections, as dynamic/absolute offsets violate the multi-bank A/B architecture requirement.



# Tech Lead Journal: 2026-08-18-10-41-43

## Orchestrator State Machine Fuzzing - Integration and E2E

### Context
Drafting implementation tasks for `epic-341-414-orchestrator-fuzzer-core` specifically for the story `story-414-419-fuzzing-integration-and-e2e`. The objective is to write E2E tests for the fuzzing framework.

### Action
- I created three downstream `TASK` nodes:
    - `.foundry/tasks/task-419-439-fuzzing-vitest-configuration-impl.md`
    - `.foundry/tasks/task-419-440-fuzzing-test-suite-impl.md`
    - `.foundry/tasks/task-419-441-fuzzing-ci-validation-qa.md`
- I correctly mapped the dependencies and updated the story file to include these child tasks in the Acceptance Criteria block as unchecked tasks (`- [ ]`).

### Learnings
- **Decomposition Mandate:** A Tech Lead must not blindly default to a single implementation task mapped to a single QA task ("Two-Tasks-Max" Anti-pattern). A Story must be broken down into discrete, modular components. Here, we decoupled Vitest test environment configuration from writing the actual test logic, followed by CI validation.
- **Auditor Completeness:** Ensured the parent STORY acceptance criteria properly incorporates the newly created child IDs as unchecked checkboxes to prevent premature transition to `VERIFYING`.



# Tech Lead Journal - 8810195688688948780

## E2E and Integration Verification Breakdown
When breaking down Epics, the Orchestrator Safeguard requires a final STORY dedicated exclusively to Integration and E2E Verification. When drafting the subsequent tasks for these E2E verification stories (e.g., `story-400-359-gen3-trainer-card-parsing-e2e`), a single implementation TASK assigned to the `coder` to write the Playwright tests is sufficient. Since the tests themselves serve as the verification layer for the entire feature, generating an additional QA task specifically to manually verify the automated tests is redundant and violates the mandate for modular, focused execution. The coder's automated tests (when passing in CI) satisfy the verification requirements for this phase.



# Tech Lead Journal - Session 3442686910247237515

## Architectural Constraints & Lessons Learned

- **Tech Lead Constraint:** When executing as the Tech Lead persona, the sole responsibility is to draft TASK nodes and update the parent STORY node. Application source code (e.g., `src/`) must never be modified by the Tech Lead.
- **Workflow Order:** All implementation work must be strictly left to the Coder persona, ensuring the Foundry pipeline (STORY -> TASK -> CODE) is respected.



# 15807448705092889658
- Intelligent Verification Protocol for E2E: When drafting tasks for an Integration/E2E Verification STORY, assigning a single implementation TASK to the coder for writing the automated tests is sufficient. Generating an additional QA task to manually verify those automated E2E tests is redundant and violates modular execution.
- Execution Plan Groundedness Rule (Testing Requirements): When drafting execution plans or task nodes, do not assume specific code-level variable or property names (e.g., 'SaveData.gen3TrainerCard') unless they are explicitly discovered in the current session's trace. Instead, describe testing or implementation requirements using the exact functional terms explicitly confirmed in the upstream Epic or Story.
- Scratchpad Cleanup Enforcement: Always delete temporary developer scripts or files created during the session before requesting code review or submitting to prevent automated rejection.



# Tech Lead Session Journal

## Node Generation Rule (DAG ID Strictness)
When defining dependencies for task or story nodes, the `depends_on` and `parent` fields in the YAML frontmatter must strictly use the exact Node IDs without file extensions or directory paths (e.g., `task-123-slug`). Using repo-relative file paths violates DAG constraints and will trigger automated code review rejection.



# Tech Lead Journal: 15673209191451609890

## Session Context
Drafting technical blueprints for `story-066-140-ribbon-dashboard-performance`, focusing on resolving rendering bottlenecks in the `GlobalRibbonChecklistDashboard`.

## Actions Taken
- Created implementation task `task-140-440-ribbon-dashboard-virtualization-impl` for adding virtualization to the `GlobalRibbonChecklistDashboard` using `@tanstack/react-virtual`.
- Created QA task `task-140-441-ribbon-dashboard-virtualization-qa` linked to the implementation task for visual and performance testing.
- Maintained "tactical hardware" UI requirements and explicit constraints (ADR 008 compliance).

## Learnings & Constraints
- To prevent regressions, it's vital to pair complex UI rendering changes (virtualization) with explicit QA directives checking for DOM bound correctness and structural preservation, especially when standard React tests might mock or bypass real window interactions. Virtualization implementations often inadvertently drop fixed padding/margins, so emphasizing architectural preservation was codified into the implementation task constraints.



# Tech Lead Journal: 2026-08-18-22-24-04

## Learnings & Observations
- **Artifact Anomaly Detection**: While breaking down `story-417-422-integrate-gen1-fixtures` into TASK nodes, I discovered that the target artifacts (tests using Gen 1 save fixtures like `blue.sav` and `yellow.sav`) are already fully implemented in `src/engine/saveParser/parsers/saveFixtures.test.ts`.
- **System Action**: Per the Artifact Anomaly Detection rule, I am creating this journal entry to record the anomaly. I will draft a formal TASK node assigned to the `coder` so the system can gracefully execute the Empty PR Policy on it.



# Journal Entry: 2026-08-18
Drafted implementation and QA tasks for TM/HM Integration E2E tests (story-401-411-tm-hm-integration-e2e). Created task-411-440-tm-hm-integration-e2e-impl for Playwright implementation and task-411-441-tm-hm-integration-e2e-qa for QA verification. Enforced Playwright standards explicitly in technical contracts to avoid testing library violations.



# Tech Lead Journal
Date: 2026-08-20
Session ID: 1091628059903205384

- Broken down `story-424-435-wasm-memory-buffer-hook` into two modular implementation tasks:
  - `task-435-447-wasm-memory-hook-impl`: Core logic to safely extract WASM memory.
  - `task-435-448-wasm-memory-hook-integration-tests`: Dedicated integration QA task according to the Intelligent Verification Protocol to verify that the extracted buffer maps correctly and the hook introduces no performance regressions.



# Tech Lead Journal - Session 144174404579298274

## Zod Validation Error Handling
Successfully drafted TASK blueprints to handle interpreting `ZodError` generated by `schema.safeParse` in the Orchestrator system, outputting detailed actionable error messages.

### Constraints & Lessons Learned
- **Error Formatting:** The Zod `ZodError` issues array correctly contains a `.path` and `.message` for each validation issue, which the downstream implementations can map over.
- **Tech Lead Persona Check:** Ensure the Execution Plan is drafted strictly to construct blueprint TASK nodes and appending them to the markdown body of the STORY node, instead of attempting to implement code directly.



# Tech Lead Journal - Session 18040550169264966189

Processed story-066-138-master-rank-tracking.md.

**Learnings:**
- Broken down into three specific subtasks: Coder Implementation, QA validation, and E2E Testing.
- Ensure strict compliance with Tactical UI aesthetics (ADR 008, 024) across the board.
- The UI component must integrate with existing aggregated Gen3 ribbon datasets accurately rather than creating parallel logic.



# Tech Lead Session Journal

## Session ID: 10342298930275439205

Drafted the implementation and QA tasks for the Gen 3 Match Call Schema Integration story.
The `Gen3MatchCall` parser logic is actually already returning an interface and integrated into `gen3SaveData` parsing flow in `src/engine/saveParser/parsers/gen3.ts`, but these tasks will ensure there's no missing integration piece, especially exposing it properly and verifying its shape.

Tasks created:
- `task-127-440-gen3-match-call-schema-integration-impl.md`
- `task-127-441-gen3-match-call-schema-integration-qa.md`



## Session 10292285687965050645\n\n- Discovered that when generating tasks for E2E testing, `pnpm exec playwright install` might be needed if headless chromium fails during standard CI test runs.\n- Followed the Intelligent Verification Protocol to create a single implementation task for E2E tests, avoiding a redundant QA task.\n



# Tech Lead Journal

Session ID: 17037463396924090230
Date: 2026-08-18

Artifact Anomaly for Macro Nodes: If a generative persona (like Tech Lead) discovers that a parent node's (e.g., STORY) target artifacts are already fully implemented, they must NOT check off the parent's overarching acceptance criteria to execute the Empty PR Policy directly. Instead, they must still draft a formal child node (e.g., a TASK for the coder) and append it as an unchecked checkbox (`- [ ] <node_id>`) to the parent's markdown body, allowing the downstream persona to gracefully execute the Empty PR Policy on the child node.

When checking off overarching story checkboxes, still ensure the downstream task is appended correctly.

# Learned about proper DAG linkages and groundedness

When drafting tasks, it's critical to avoid using file paths with extensions in the `depends_on` frontmatter, as it will break the DAG Orchestrator. Always use the exact Node ID (e.g., `task-440-450-gen3-pokemon-extraction-impl`).

Additionally, when adding tasks to a parent node, ensure you add the `## Acceptance Criteria` heading if it doesn't already exist, and don't mistakenly use file paths here either.

Finally, never reference variables or objects like `SUBSTRUCTURE_ORDER` in your execution plan unless you have actively discovered them in the current session. Groundedness checks will fail your plan.

# Tech Lead Journal: 7125355397537957084

## Intelligent Verification Protocol Application
When drafting implementation tasks for `story-071-433-migrate-tactical-segmented` (migrating `TacticalSegmentedControl` and `TacticalMultiSelectControl` to utilize the new `@utility` classes), I have decided to omit a separate QA task.

**Reasoning:**
- This is a straightforward CSS class replacement refactoring with a very low risk of introducing regressions that wouldn't be caught by the existing lint and test suites.
- The `coder` persona will self-verify the visual appearance and ensure that the functional state mapping remains intact. This aligns with the Intelligent Verification Protocol guidelines for simple/low-risk changes, reducing unnecessary friction and QA backlog bloat.

- Execution Plan Formatting Rule: Execution plans must consist solely of single, actionable, flat instructions. The use of nested bullet points or sub-steps is strictly forbidden and will result in rejection.
- Execution Plan Completeness Rule: When modifying files (including checking markdown checkboxes for Empty PRs), the required verification commands (`pnpm lint`, `pnpm test`, `xvfb-run pnpm test:e2e`) must be placed in the plan *after* all file modifications are complete, serving as the final explicit verification stage immediately before the pre-commit step.
- Execution Plan Verification Rule: Execution plans that involve creating new files or modifying existing ones must explicitly include a verification step (e.g., using `read_file`) immediately following the modification step to confirm the changes were written correctly. Plans missing this exact specificity will be rejected.
- Execution Plan Specificity Rule: Execution plans must not contain conversational monologue (e.g., 'Wait, since...'), raw code blocks, or vague instructions (e.g., 'Add tests'). Steps must be concrete, detailing the exact files and functions being implemented or tested, to avoid REVISION_REQUIRED rejections.


---

## Aggregated from 1146914870791207850.md

# Tech Lead Journal: Session 1146914870791207850

## Breakdown of `story-400-429-gen-specific-extensions`

Successfully decomposed the story into three discrete tasks:

1. **`task-429-473-generate-gen-specific-bundles` (Coder)**: Modifies the core generation script and Vite plugin to physically output `pokedata-gen1.msgpack`, `pokedata-gen2.msgpack`, and `pokedata-gen3.msgpack`.
2. **`task-429-474-implement-lazy-fetching` (Coder)**: Implements the lazy fetching mechanism in `PokeDB` (and potentially `DexDataLoader`) to download and sync the generation-specific bundles on demand. Depends on the generation task.
3. **`task-429-475-gen-specific-bundles-qa` (QA)**: Validates both the generation output and the lazy loading behavior in the client. Depends on the lazy-fetching task.

### Learnings / Architectural Notes
- The separation of data generation and lazy loading is crucial here to prevent deadlocks and allow for independent verification. We must ensure the generation script works before attempting to write the lazy loading logic that consumes its output.
- `DexDataLoader` batches requests, and its interaction with the new lazy loading mechanism in `PokeDB` needs to be carefully monitored during QA to ensure we don't introduce N+1 fetching problems for the `.msgpack` files themselves.


---

## Aggregated from 8999642637880874262.md

# Tech Lead Session Journal: 8999642637880874262

Date: 2026-08-23

## Impossible Loop Resolution: Gen 3 Daycare Parsing

- **Trigger:** Woken up to handle the permanent failure of `task-241-440-daycare-gen3-parsing-impl` and the cascading failure of `task-241-441-daycare-gen3-parsing-qa`.
- **Root Cause:** The implementation task was failing because the exact memory offsets for the Gen 3 Daycare struct within `SaveBlock1` were not documented in the project's knowledge base. A previous research task to find this information (`research-241-449-gen3-daycare-offsets.md`) was cancelled due to the failure of the parent task, causing a deadlock.
- **Action Taken:**
  1. Recreated the research task as `research-241-462-gen3-daycare-offsets-investigation.md` to investigate and document the missing offsets for RS, E, and FRLG.
  2. Created new implementation (`task-241-469-daycare-gen3-parsing-impl.md`) and QA (`task-241-470-daycare-gen3-parsing-qa.md`) tasks, with the implementation task explicitly depending on the new research task.
  3. Checked off the permanently failed tasks in the parent story (`story-105-241-daycare-gen3-parsing`) to allow it to eventually transition to completed, and appended the new nodes as unchecked items.
- **Learning/Rule Adaptation:** When a task fails due to missing foundational knowledge or offsets, it is crucial to ensure that any spawned research tasks are properly linked and completed before retrying the implementation. The orchestration pipeline must allow research to conclude so the implementer has the necessary context.
