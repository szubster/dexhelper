---
id: task-537-709-gen3-berry-hydration-retry-v2
type: TASK
title: Hydrate Gen 3 Berry Data into Runtime State (Retry V2)
status: PENDING
owner_persona: coder
created_at: '2026-10-20'
updated_at: '2026-10-29'
depends_on:
  - research-537-708-investigate-hydration-failure-retry-v2
  - research-537-690-berry-serialization-deprecation
jules_session_id: null
pr_number: null
parent: story-513-537-gen3-berry-serialization-and-api
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Hydrate Gen 3 Berry Data into Runtime State (Retry V2)

## Description
Implement the findings from `research-537-708-investigate-hydration-failure-retry-v2` to successfully hydrate the parsed Gen 3 berry patch data into the runtime application state. This replaces the cancelled attempts in `task-537-665-gen3-berry-runtime-state-hydration` and `task-537-687-gen3-berry-runtime-state-hydration-retry`. Ensure that dynamic berry data is NOT serialized via `msgpackr`.

## Acceptance Criteria
- [ ] Implement the hydration strategy proposed by the research task.
- [ ] Connect the hydrated runtime state to the appropriate UI or API layers.
- [ ] Confirm no dynamic Gen 3 berry data is serialized in the static `msgpackr` payload.
