---
id: story-072-109-gen3-roamer-location-mapping
type: STORY
title: Gen 3 Roamer Location Mapping
status: CANCELLED
owner_persona: tech_lead
created_at: '2026-06-10'
updated_at: '2026-06-20'
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
rejection_reason: Cancelled due to cascading cancellation from parent
notes: ''
---

# Gen 3 Roamer Location Mapping

**CANCELLED:** The parent Epic was cancelled because Gen 3 roamer locations cannot be extracted statically from save files (as they live in EWRAM, per ADR-108-027).

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
### Auditor Rejection
**CANCELLED:** This story is cancelled because the parent epic's objective (extracting Gen 3 roamer locations from static save files) is mathematically impossible, as the data is stored exclusively in EWRAM and never serialized (per `adr-108-027-gen3-roamer-location-impossible`).
### Architect Rejection
This story has been permanently CANCELLED because its parent objective is impossible. Gen 3 roamer locations are not serialized in the save file.
### CANCELLED
This story is cancelled because its parent epic `epic-044-072-gen3-roamer-location-radar` is permanently cancelled due to technical impossibility.
### Auditor Rejection
**CANCELLED:** This story is cancelled because its prerequisite (`story-072-108`) was cancelled. As per ADR 108-027, extracting Gen 3 roamer locations statically from save files is mathematically impossible.
