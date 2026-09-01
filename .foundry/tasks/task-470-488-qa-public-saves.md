---
id: task-470-488-qa-public-saves
type: TASK
title: QA Verification of Sourced Save Files
status: PENDING
owner_persona: qa
created_at: '2026-08-24'
updated_at: '2026-08-31'
depends_on:
  - task-470-487-catalog-integrate-saves
jules_session_id: '11825684621245897714'
pr_number: null
parent: story-428-470-identify-public-saves
tags:
  - testing
  - fixtures
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# QA Verification of Sourced Save Files

## Context
We need to ensure that the newly sourced public save files load correctly within our application's save parsing engine and accurately reflect the diverse scenarios required for our tests.

## Requirements
1. Verify that each new save file in `tests/fixtures/` can be successfully parsed by the application.
2. Confirm that the data represented in the game (e.g., party Pokémon, Pokédex completion, event flags) matches the documented descriptions from the integration step.

## Acceptance Criteria
- [ ] All new `.sav` files load without parsing errors.
- [ ] The save states are confirmed to be diverse and match their documented descriptions.

### QA Failure Note
Verification failed on `crystal-bxtj-0.sav` due to unsupported Japanese Crystal offsets. Triggering transient rejection on `task-470-487-catalog-integrate-saves`.
