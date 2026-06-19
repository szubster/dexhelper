---
id: story-072-110-gen3-roamer-route-radar-ui
type: STORY
title: Gen 3 Roamer Route Radar UI Integration
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-10'
updated_at: '2026-06-10'
depends_on:
  - story-072-109-gen3-roamer-location-mapping
jules_session_id: null
pr_number: null
parent: epic-044-072-gen3-roamer-location-radar
tags:
  - gen3
  - roamer
  - map
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer Route Radar UI Integration

## Objective
Integrate the resolved Gen 3 roamer location with the Route Radar UI.

## Description
Pass the resolved roamer location to the Route Radar UI component. The UI should highlight or place an indicator on the map denoting the roamer's current location, adhering to our tactical hardware aesthetic.

## Acceptance Criteria
- [ ] Supply the mapped Gen 3 roamer location to the Route Radar component.
- [ ] Update the UI to visually display the roamer's current location on the map.
- [ ] Tech Lead: Break down this Story into execution Tasks (implementation & QA).

### Auditor Rejection
**CANCELLED:** This story is cancelled because its prerequisite (`story-072-108`) was cancelled. As per ADR 108-027, extracting Gen 3 roamer locations statically from save files is mathematically impossible.
