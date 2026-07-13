---
id: story-127-269-epic-e2e-safeguard
type: STORY
title: Enforce E2E Safeguards on Epics
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-04'
updated_at: '2026-07-13'
depends_on: []
jules_session_id: '2207604268882061429'
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
- [ ] task-269-263-implement-e2e-safeguard
- [ ] task-269-264-implement-e2e-safeguard-qa

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
