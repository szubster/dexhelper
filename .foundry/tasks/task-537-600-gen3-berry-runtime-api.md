---
id: task-537-600-gen3-berry-runtime-api
type: TASK
title: Surface Gen 3 Berry Data in Runtime API
status: PENDING
owner_persona: coder
created_at: '2026-09-20'
updated_at: '2026-09-20'
depends_on:
  - task-537-599-gen3-berry-pipeline-integration
jules_session_id: null
pr_number: null
parent: story-513-537-gen3-berry-serialization-and-api
rejection_count: 0
rejection_reason: ''
locks: []
---

# Surface Gen 3 Berry Data in Runtime API

## Description
Update the runtime data API to correctly deserialize the msgpackr payload containing the new Gen 3 berry properties. Surface this data through the application's state layer. Write necessary unit tests.

## Acceptance Criteria
- [ ] Update runtime data API to deserialize the payload.
- [ ] Surface data through state layer.
- [ ] Use defined types for type safety.
