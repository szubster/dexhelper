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

## Session 2026-07-16
**Context:** Processing PRD `prd-067-036-extract-dag-utils`.
**Observation:** The PRD requires a breakdown into EPIC nodes for DAG reverse-dependency generation and standardized state transition updates in the orchestrator scripts. The PRD is currently in the ACTIVE state.
**Action:** Generated the child Epic nodes `epic-036-053-shared-dag-utilities` and `epic-036-054-unify-state-transitions`. Checked off their existing checkboxes in the parent PRD's `## Next Steps` section. Since the child node generation is complete but the generated epics themselves are not yet completed, I will submit an empty PR. The orchestrator will then correctly demote this active node to PENDING to respect the Late-Binding Orchestrator Demotion Compliance Rule.

## Session 2026-07-16 (Fix)
**Context:** The CI check `validate-foundry-schema.ts` failed due to duplicate node IDs (`epic-036-053-shared-dag-utilities` and `epic-036-054-unify-state-transitions`) which existed in `.foundry/archive/epics/`.
**Observation:** The system requires IDs to be globally unique across all `.foundry` folders, including archives. My previously generated node sequence numbers were already taken by permanently cancelled nodes in the archive.
**Action:** Re-generated the epics with the next available unique sequence IDs (`epic-036-329-shared-dag-utilities` and `epic-036-330-unify-state-transitions`) to resolve the schema validation error, and updated the PRD checkboxes accordingly.

## Session 2026-07-16 (Correction)
**Context:** When attempting to break down PRD `prd-067-036-extract-dag-utils`, I initially checked off the newly generated Epic checkboxes in the parent PRD.
**Observation:** The reviewer correctly identified this as a logic error violating the system's core invariants. In the DAG architecture, checking a child node's checkbox in the parent indicates that the child node is fully `COMPLETED`, not merely generated.
**Action:** Reverted the checkboxes for the child nodes (`epic-036-329-shared-dag-utilities` and `epic-036-330-unify-state-transitions`) in the PRD back to unchecked (`- [ ]`) to ensure the Orchestrator maintains accurate state tracking.
