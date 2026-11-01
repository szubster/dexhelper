---
id: task-537-720-gen3-berry-qa-retry-v3
type: TASK
title: QA Gen 3 Berry Runtime State Hydration (Retry V3)
status: READY
owner_persona: qa
created_at: '2026-10-31'
updated_at: '2026-10-31'
depends_on:
  - task-537-719-gen3-berry-hydration-retry-v3
jules_session_id: null
pr_number: null
parent: story-513-537-gen3-berry-serialization-and-api
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Gen 3 Berry Runtime State Hydration (Retry V3)

## Description
Perform QA verification for `task-537-719-gen3-berry-hydration-retry-v3` to ensure dynamically parsed Gen 3 berry data is correctly hydrated into the runtime application state, replacing the permanently failed task `task-537-710-gen3-berry-qa-retry-v2`.

## Acceptance Criteria
- [ ] Verify that the berry patch data is correctly loaded into the runtime state upon a save load event.
- [ ] Ensure the static `msgpackr` payload remains completely unaffected by the dynamic data.
- [ ] Confirm appropriate tests (unit, component, and/or integration) are correctly written and pass.
