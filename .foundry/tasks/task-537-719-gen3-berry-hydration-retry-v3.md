---
id: task-537-719-gen3-berry-hydration-retry-v3
type: TASK
title: Hydrate Gen 3 Berry Data into Runtime State (Retry V3)
status: READY
owner_persona: coder
created_at: '2026-10-31'
updated_at: '2026-10-31'
depends_on:
  - research-537-721-investigate-hydration-failure-retry-v3
jules_session_id: null
pr_number: null
parent: story-513-537-gen3-berry-serialization-and-api
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Hydrate Gen 3 Berry Data into Runtime State (Retry V3)

## Description
Implement the findings from `research-537-721-investigate-hydration-failure-retry-v3` to successfully hydrate the parsed Gen 3 berry patch data into the runtime application state. This replaces the cancelled attempts in `task-537-709-gen3-berry-hydration-retry-v2`. Ensure that dynamic berry data is NOT serialized via `msgpackr`.

## Acceptance Criteria
- [ ] Implement the hydration strategy proposed by the research task.
- [ ] Connect the hydrated runtime state to the appropriate UI or API layers.
- [ ] Confirm no dynamic Gen 3 berry data is serialized in the static `msgpackr` payload.
