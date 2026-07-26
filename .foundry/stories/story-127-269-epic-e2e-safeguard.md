---
id: story-127-269-epic-e2e-safeguard
type: STORY
title: Enforce E2E Safeguards on Epics
status: PENDING
owner_persona: tech_lead
created_at: '2026-07-04'
updated_at: '2026-07-26'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-057-127-orchestrator-safeguard-investigation
tags:
  - process
  - orchestrator
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Enforce E2E Safeguards on Epics

## Context
As part of enforcing macro node functional boundaries, we need to ensure that an EPIC cannot be marked `COMPLETED` until its functional requirements are verifiably integrated and tested.

## Goal
Implement logic in `.github/scripts/foundry-orchestrator.ts` (or `foundry-heartbeat.ts`) to ensure that an EPIC node cannot be promoted to VERIFYING or COMPLETED unless it contains at least one child STORY that explicitly represents integration or E2E testing (e.g., tags contain `e2e` or `integration`).

## Acceptance Criteria
- [ ] Implement E2E enforcement logic in orchestrator scripts.
- [ ] Add unit tests for this new verification rule.
- [x] task-269-269-e2e-safeguard-impl
- [ ] task-269-334-e2e-safeguard-impl
- [x] task-269-270-e2e-safeguard-qa
- [ ] task-269-335-e2e-safeguard-qa
- [ ] task-269-346-e2e-safeguard-impl
- [ ] task-269-347-e2e-safeguard-qa

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
