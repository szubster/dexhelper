---
id: story-072-109-gen3-roamer-location-mapping
type: STORY
title: Gen 3 Roamer Location Mapping
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-10'
updated_at: '2026-06-10'
depends_on:
  - story-072-108-gen3-roamer-location-extraction
jules_session_id: null
pr_number: null
parent: epic-044-072-gen3-roamer-location-radar
tags:
  - gen3
  - roamer
  - map
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer Location Mapping

## Objective
Map the Gen 3 extracted map group and map number to unified location objects.

## Description
Take the raw location indices parsed from the save file (map group and map number) and use the established `gen3_map_parsing` strategy to resolve them into human-readable area IDs or unified location objects that the app can understand.

## Acceptance Criteria
- [ ] Map the raw map group and map number to our unified location constants.
- [ ] Implement logic to handle edge cases (like indoor locations mapping to outdoor parents).
- [ ] Tech Lead: Break down this Story into execution Tasks (implementation & QA).

### Cancelled
This story is cancelled because its parent epic (`epic-044-072-gen3-roamer-location-radar`) was cancelled. The extraction of Gen 3 roamer location from the save file is mathematically impossible per ADR 027.
