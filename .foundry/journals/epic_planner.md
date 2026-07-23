# Epic Planner Journal

## Session 2026-07-08
**Context:** Resuming work on `prd-070-043-roamer-tracking-dashboard`.
**Observation:** The PRD is currently in the ACTIVE state. However, its acceptance criteria checkboxes show that the child epics (`epic-043-139...`, `epic-043-140...`, `epic-043-142...`, `epic-043-143...`) and the `research-043-263-roamer-tracking-remediation` node have already been correctly generated and appended.
**Action:** Since the work is already complete (the child nodes exist), and the orchestrator handles demoting ACTIVE nodes back to PENDING if their child nodes are not yet COMPLETE (and the PRD's own checkboxes correctly remain unchecked to comply with the Late-Binding Orchestrator Demotion Compliance Rule), I am submitting an empty PR to allow the orchestrator to correctly demote the node to PENDING. No file changes are required.

## Session 2026-07-09
**Context:** Processing PRD `prd-071-040-tailwind-v4-utilities-migration`.
**Observation:** The PRD is currently in the READY state. However, its acceptance criteria checkboxes show that the child epics (`epic-071-123...`, `epic-071-124...`, `epic-071-125...`, `epic-071-126...`) have already been correctly generated and appended.
**Action:** Since the work is already complete (the child nodes exist), and the orchestrator handles demoting READY nodes back to PENDING if their child nodes are not yet COMPLETE (and the PRD's own checkboxes correctly remain unchecked to comply with the Late-Binding Orchestrator Demotion Compliance Rule), I am submitting an empty PR to allow the orchestrator to correctly demote the node to PENDING. No file changes are required.

## Session 2026-07-09
**Context:** Processing PRD `prd-071-044-gen3-roamer-tracker`.
**Observation:** The PRD is currently in the READY state. However, its acceptance criteria checkboxes show that the child epics (`epic-044-149-gen3-roamer-core-extraction-v4`, `epic-044-150-gen3-roamer-iv-glitch-v4`, `epic-044-151-gen3-roamer-dashboard-ui-v6`) have already been correctly generated and appended.
**Context:** Processing PRD `prd-071-040-tailwind-v4-utilities-migration`.
**Observation:** The PRD is currently in the READY state. However, its acceptance criteria checkboxes show that the child epics (`epic-071-123...`, `epic-071-124...`, `epic-071-125...`, `epic-071-126...`) have already been correctly generated and appended.
**Action:** Since the work is already complete (the child nodes exist), and the orchestrator handles demoting READY nodes back to PENDING if their child nodes are not yet COMPLETE (and the PRD's own checkboxes correctly remain unchecked to comply with the Late-Binding Orchestrator Demotion Compliance Rule), I am submitting an empty PR to allow the orchestrator to correctly demote the node to PENDING. No file changes are required.

## Session 2026-07-10
**Context:** Processing PRD `prd-071-044-gen3-roamer-tracker`.
**Observation:** The PRD is currently in the READY state. However, its acceptance criteria checkboxes show that the child epics (`epic-044-149-gen3-roamer-core-extraction-v4`, `epic-044-150-gen3-roamer-iv-glitch-v4`, `epic-044-151-gen3-roamer-dashboard-ui-v6`) have already been correctly generated and appended.
**Action:** Since the work is already complete (the child nodes exist), and the orchestrator handles demoting READY nodes back to PENDING if their child nodes are not yet COMPLETE (and the PRD's own checkboxes correctly remain unchecked to comply with the Late-Binding Orchestrator Demotion Compliance Rule), I am submitting an empty PR to allow the orchestrator to correctly demote the node to PENDING. No file changes are required.
## Tailwind v4 @utility Consolidation Epic Creation
I have generated the necessary child epic nodes (`epic-071-123-define-tailwind-v4-utilities-v2`, `epic-071-124-migrate-core-tactical-components-v2`, `epic-071-125-migrate-complex-app-components-v2`, `epic-071-126-tailwind-designer-persona-v2`) and appended them as unchecked boxes to the PRD `prd-071-040-tailwind-v4-utilities-migration`. As per the Late-Binding Orchestrator Demotion Compliance Rule, I will submit an empty PR directly via the `submit` tool, which will allow the Orchestrator to calculate the dependencies and demote the PRD node from READY to PENDING until the generated Epics are COMPLETED. I am intentionally not checking off the child epic checkboxes on the parent PRD to respect this lifecycle.

## Session 2026-07-10 (Later)
**Context:** Processing PRD `prd-070-043-roamer-tracking-dashboard`.
**Observation:** The PRD is currently in the ACTIVE state. However, its acceptance criteria checkboxes show that the child epics (`epic-043-139-gen2-roamer-data-extraction`, `epic-043-140-gen2-roamer-map-translation`, `epic-043-142-gen2-roamer-radar-widget`, `epic-043-143-gen2-roamer-map-integration`) and the `research-043-263-roamer-tracking-remediation` node have already been correctly generated and appended.
**Action:** Since the work is already complete (the child nodes exist), and the orchestrator handles demoting ACTIVE nodes back to PENDING if their child nodes are not yet COMPLETE (and the PRD's own checkboxes correctly remain unchecked to comply with the Late-Binding Orchestrator Demotion Compliance Rule), I am submitting an empty PR to allow the orchestrator to correctly demote the node to PENDING. No file changes are required.

## Session 2026-07-10
**Context:** Processing PRD prd-070-043-roamer-tracking-dashboard.
**Observation:** The PRD scoping explicitly includes Gen 3, but only Gen 2 Epics were generated. Created 4 missing Gen 3 Epics (epic-043-152 to 155).
**Action:** Submitted PR with new epics and updated PRD checkboxes.

## Session 2026-07-11
**Context:** Processing PRD `prd-086-108-fix-orchestrator-phase-3-6`.
**Observation:** The PRD requires a fix to extend Phase 3.6 of the `foundry-orchestrator.ts` logic to correctly handle nodes transitioning to `CANCELLED` status.
**Action:** Generated the child Epic node `epic-108-303-extend-phase-3-6-cancelled-nodes` and appended it to the parent PRD's acceptance criteria as an unchecked task. Since all the required Epic generation is complete, but the generated child node must be completed before the PRD is finished, I will submit an empty PR directly to passthrough validation. This allows the Orchestrator to correctly calculate the DAG dependencies and demote the READY PRD node to PENDING state to enforce the strict macro node completion lifecycle. No other file changes are required for this PR.

## Session 2026-07-12
**Context:** Processing PRD `prd-105-110-tm-hm-inventory-planner`.
**Observation:** The PRD requires a breakdown into EPIC nodes for Data Parsing, Compatibility Logic, and UI.
**Action:** Generated the child Epic nodes `epic-110-306-tm-hm-save-parsing`, `epic-110-307-tm-hm-compatibility-logic`, and `epic-110-308-tm-hm-user-interface` and appended them to the parent PRD's acceptance criteria as unchecked tasks. Since all the required Epic generation is complete, but the generated child nodes must be completed before the PRD is finished, I will submit an empty PR directly to passthrough validation. This allows the Orchestrator to correctly calculate the DAG dependencies and demote the READY PRD node to PENDING state to enforce the strict macro node completion lifecycle.
## Missed Trainer Radar PRD Breakdown
Successfully broke down the "Missed Trainer Radar" PRD (`prd-104-109-missed-trainer-radar`) into three granular epics:
- Gen 1 & 2 Data Extraction (`epic-109-306-missed-trainer-data-extraction-gen1-gen2`)
- Gen 3 Data Extraction (`epic-109-307-missed-trainer-data-extraction-gen3`)
- UI Dashboard (`epic-109-308-missed-trainer-radar-ui`)

**Key Architectural Insights Applied:**
- Included constraints for bitwise extraction and cured boundaries (ADR 026) for the flag parsing.
- Included constraints for explicit relative offsets and constants (ADR 028) for the extraction layer.
- Enforced the `DataView` API (ADR 010) specifically for the Gen 3 extraction layer.
- Linked the UI epic to the "Smart Route Radar" architecture (ADR 018) for visualizing the missing encounters dynamically on the map.

**Important Reminders:**
- Temporary processing files (like `batch_*` logs from bash commands) must be manually deleted before committing to avoid polluting the workspace.
- The `depends_on` array in the YAML frontmatter MUST use the bare node ID (e.g., `epic-109-306-missed-trainer-data-extraction-gen1-gen2`), not the relative file path.
\n## Session 2026-07-17: Missed Dependency Linkage in Epic Generation
**Lesson:** When breaking down a PRD into Epic nodes, ensure that inter-Epic dependencies are correctly mapped in the `depends_on` frontmatter property of the dependent Epics. For example, a UI dashboard Epic should depend on its underlying Data Parsing Epic being completed first.

## 2026-07-16: Replacement of FAILED and CANCELLED Epics
When spawning new epics to replace previously FAILED or CANCELLED epics, it is important to include explicit research into the rejection reason provided in the failed node's frontmatter. In this case, `epic-036-053-shared-dag-utilities.md` was FAILED due to `[ACKNOWLEDGED] Merged with unfulfilled acceptance criteria: Missing E2E/integration story`. The replacement epic, `epic-036-329-shared-dag-utilities.md`, was created with a specific scope item and acceptance criteria added for the missing E2E integration story. Old nodes were removed and references in the parent PRD were replaced with the new ones.
## 2026-07-16: PRD Breakdown
* **Action**: Created epic-115-331-remove-orphaned-qa-task-rule-from-docs to remove manual orphaned task cancellation rules from documentation, and updated parent PRD prd-115-115-remove-obsolete-orphaned-node-manual-cancellation.

## 2026-07-17: Fame Checker PRD Breakdown
Successfully broke down `prd-115-115-gen3-fame-checker-assistant` into three distinct epics to handle the full lifecycle from research to UI:
1. `epic-115-331-gen3-fame-checker-research`: A research node specifically assigned to find the exact event flags in FireRed/LeafGreen.
2. `epic-115-332-gen3-fame-checker-save-parsing`: The implementation phase for integrating those discovered offsets.
3. `epic-115-333-gen3-fame-checker-dashboard-ui`: Building out the final dashboard for players.
I ensured the correct DAG order by using `depends_on` between them and appended them to the PRD's Acceptance Criteria.

## Pokerus Strain UI PRD Updates
Encountered permanently cancelled epic-112-322. Spawning research node research-112-334 and replacement epic-112-335. Demoted parent PRD-107-112 to PENDING by appending new nodes as unchecked criteria and unchecking the pending epic-112-323.
## 2026-07-19: Centralize Prompt Rules Epic Generation
Broke down PRD `prd-118-117-centralize-prompt-reminders` into two separate Epics:
1. `epic-117-334-centralize-prompt-rules` to handle the prompt updates and documentation.
2. `epic-117-335-migrate-task-reminders` to handle the cleanup script for existing nodes.
Updated the PRD by appending the Epics to the Acceptance Criteria. Corrected a minor flaw where `epic-117-335` depended on a file path instead of a Node ID, adhering to the DAG dependency constraint that `depends_on` within macro nodes must use Node IDs.
## 2026-07-19: Gen 3 PC Box Wallpaper Customizer
- Transformed `prd-116-049-gen3-pc-box-wallpaper-customizer` into 3 actionable Epics:
  - `epic-116-335-gen3-wallpaper-phrase-generation-engine.md`: For the phrase generation math logic based on `trainerId`.
  - `epic-116-336-gen3-wallpaper-app-state-tracking.md`: For tracking the checklist app state per save file, since the unlock flag is not extracted from the save block itself.
  - `epic-116-337-gen3-wallpaper-dashboard-ui.md`: For the checklist interface interacting with the generator and state store.
- Re-enforced that assumptions about save file flags should not dictate extracting tasks without concrete evidence, opting instead for pure app-state tracking for the checklist.
## [2026-07-18] PRD to Epic Breakdown for Zod Schema Validation
Broke down PRD prd-116-117-zod-schema-validation-orchestrator into two Epics: epic-117-334-define-zod-schema (to define the schema) and epic-117-335-integrate-zod-orchestrator (to integrate it into the orchestrator).

## 2026-07-19: Trick House Save Parsing Epic Replacement
**Context:** The `epic-054-111-trick-house-save-parsing` node failed because it merged with unfulfilled acceptance criteria, specifically missing an E2E/integration story.
**Action:** Cancelled the failed Epic and generated a replacement, `epic-054-338-trick-house-save-parsing`, which explicitly includes the missing E2E integration story requirement in its scope and acceptance criteria. Updated the parent PRD to check off the failed Epic and appended the new replacement Epic as an unchecked task using its Node ID. Updated the dependency in `epic-054-112-trick-house-ui` to point to the new replacement Epic.
\nDemoted PRD 107 to PENDING by unchecking the 'Break down into Epics' acceptance criteria because its child epics are still pending or failed, adhering to the Late-Binding Orchestrator Demotion Rule.

## 2026-07-21
- Transformed PRD for conflictless journals into an Epic. Ensures we transition from monolithic markdown files to conflict-less storage per session.

## Session 2026-07-23: Replacement of Epic missing E2E story
**Context:** Processing PRD `prd-086-108-fix-orchestrator-phase-3-6`.
**Observation:** The child Epic `epic-108-303-extend-phase-3-6-cancelled-nodes` was failed with the acknowledged missing criteria of an E2E/integration story.
**Action:** Created a replacement Epic `epic-108-339-extend-phase-3-6-cancelled-nodes` that explicitly includes the missing E2E integration story requirement in its scope and acceptance criteria. Updated the parent PRD to check off the failed Epic and appended the new replacement Epic as an unchecked task using its Node ID. Submitted a PR to allow the orchestrator to correctly demote the node to PENDING.
