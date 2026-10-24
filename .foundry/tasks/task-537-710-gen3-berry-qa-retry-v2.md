---
id: task-537-710-gen3-berry-qa-retry-v2
type: TASK
title: QA Gen 3 Berry Runtime State Hydration (Retry V2)
status: READY
owner_persona: qa
created_at: '2026-10-20'
updated_at: '2026-10-20'
depends_on:
  - task-537-709-gen3-berry-hydration-retry-v2
jules_session_id: null
pr_number: null
parent: story-513-537-gen3-berry-serialization-and-api
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Gen 3 Berry Runtime State Hydration (Retry V2)

## Description
Perform QA verification for `task-537-709-gen3-berry-hydration-retry-v2` to ensure dynamically parsed Gen 3 berry data is correctly hydrated into the runtime application state, replacing the permanently failed task `task-537-666-gen3-berry-runtime-state-qa` and its retry `task-537-688-gen3-berry-runtime-state-qa-retry`.

## Acceptance Criteria
- [ ] Verify that the berry patch data is correctly loaded into the runtime state upon a save load event.
- [ ] Ensure the static `msgpackr` payload remains completely unaffected by the dynamic data.
- [ ] Confirm appropriate tests (unit, component, and/or integration) are correctly written and pass.
