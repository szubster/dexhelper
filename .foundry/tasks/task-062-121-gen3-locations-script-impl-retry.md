---
id: task-062-121-gen3-locations-script-impl-retry
type: TASK
title: Retry Gen 3 Locations Fetch Script Implementation
status: PENDING
owner_persona: coder
created_at: '2026-05-19'
updated_at: '2026-05-19'
depends_on:
  - research-062-120-gen3-locations-investigation
jules_session_id: null
parent: story-032-062-gen3-data-generation-scripts
---

# Retry Gen 3 Locations Fetch Script Implementation

## Description
Implement the `generateMapLocations.ts` script logic to fetch and format Generation 3 locations data from `pret/pokeemerald`, based on the findings from the research node.

## Acceptance Criteria
- [ ] Script successfully fetches Gen 3 locations from `pret/pokeemerald`.
- [ ] Data is correctly formatted and namespaced, utilizing bitwise shifting `(3 << 16) | (group << 8) | id` to prevent collisions.
