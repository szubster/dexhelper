---
id: prd-096-057-macro-node-boundary-enforcement
type: PRD
title: Enforce Macro Node Functional Boundaries
status: PENDING
owner_persona: epic_planner
created_at: '2026-06-30'
updated_at: '2026-07-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-096-macro-node-boundary-enforcement
tags:
  - process
  - orchestrator
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Enforce Macro Node Functional Boundaries

## Context
Currently, audits reveal that EPICs are being verified and marked as `COMPLETED` before their functional requirements are fully implemented. This occurs because the spawned STORY nodes often only scaffold the architecture without integrating it into the application.

## Goals
Ensure that an EPIC cannot be marked `COMPLETED` until its functional requirements are verifiably integrated and tested.

## Proposed Solution
1. **Mandatory E2E/Integration Story**: Enforce a process where every EPIC MUST generate a final STORY dedicated to Integration and E2E Verification. This story will ensure that the scaffolded features are actually wired up and functional.
2. **Review Orchestrator Safeguards**: Analyze `.github/scripts/foundry-orchestrator.ts` and `.github/scripts/foundry-heartbeat.ts` to see if there are programmatic ways to enforce that an EPIC cannot bypass this verification stage. If not, rely on strict template and procedural enforcement.
3. **Template/Documentation Updates**: Update `.foundry/docs/schema.md` or other relevant documentation/templates to explicitly require an Integration/E2E Story for all new Epics.

## Functional Requirements
1. **Process Enforcement**: The `epic_planner` persona MUST create an Integration/Verification story for every EPIC breakdown.
2. **Testing**: The final story of an EPIC must contain specific acceptance criteria requiring E2E test execution and verification.
3. **Orchestrator Rules**: (If applicable) The orchestrator should prevent `VERIFYING`/`COMPLETED` transitions for Epics unless an explicit verification child node exists and completes successfully.

## Acceptance Criteria
- [ ] Investigate Orchestrator changes for boundary enforcement.
- [ ] Define the process changes for Epic Planners.
- [ ] Update necessary documentation and schemas.
- [ ] epic-057-127-orchestrator-safeguard-investigation
- [ ] epic-057-128-epic-planner-process-update
- [ ] epic-057-129-schema-documentation-updates
