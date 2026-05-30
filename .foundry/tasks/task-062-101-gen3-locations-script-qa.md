---
id: task-062-101-gen3-locations-script-qa
type: TASK
title: QA Gen 3 Locations Fetch Script
status: CANCELLED
owner_persona: qa
created_at: '2026-05-17'
updated_at: '2026-05-23'
depends_on:
jules_session_id: '4357736207550241874'
parent: story-032-062-gen3-data-generation-scripts
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-062-100-gen3-locations-script-impl
---

**[CANCELLED]** This QA task is cancelled because its associated implementation task hit its Max Rejection Count and permanently failed. It is replaced by `.foundry/archive/.foundry/archive/tasks/task-062-113-gen3-locations-script-retry-qa.md`.

# QA Gen 3 Locations Fetch Script

## Description
QA validate the script that fetches Generation 3 locations data.

## Acceptance Criteria
- [ ] QA verifies the script fetches accurate Gen 3 locations.

## QA Notes
- Validation failed: Missing Gen 3 location fetching logic from pret/pokeemerald in scripts/generateMapLocations.ts
- [CANCELLED] The associated implementation task has hit its Max Rejection Count. This QA task is cancelled and replaced by a retry task after the research node completes.
- [CANCELLED] Since the implementation task failed permanently and was replaced, this QA task is officially cancelled.
