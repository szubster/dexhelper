---
id: task-062-122-gen3-locations-script-qa-retry
type: TASK
title: QA Gen 3 Locations Fetch Script Implementation Retry
status: PENDING
owner_persona: qa
created_at: '2026-05-19'
updated_at: '2026-05-19'
depends_on:
  - task-062-121-gen3-locations-script-impl-retry
jules_session_id: null
parent: story-032-062-gen3-data-generation-scripts
---

# QA Gen 3 Locations Fetch Script Implementation Retry

## Description
QA validate the retry of the script implementation that fetches Generation 3 locations data.

## Acceptance Criteria
- [ ] QA verifies the script fetches accurate Gen 3 locations from `pret/pokeemerald`.
- [ ] QA verifies that Gen 3 map IDs are correctly namespaced using bitwise shifting to prevent collisions.
