---
id: research-108-187-gen3-roamer-location-offsets
type: RESEARCH
title: Investigate Gen 3 Roamer Location Save Offsets
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-15'
updated_at: '2026-06-18'
depends_on: []
jules_session_id: '9240626839193653308'
pr_number: null
parent: task-108-161-gen3-roamer-location-impl
tags:
  - gen3
  - roamer
  - save-offsets
  - research
research_references:
  - research-071-138-gen3-roamer-offsets
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Roamer Location Save Offsets

## Objective
Discover the exact memory offsets for the roamer's map group and map number for Gen 3 save files.

## Context
During the implementation of `task-108-161-gen3-roamer-location-impl`, it was discovered that the previous research (`research-071-138-gen3-roamer-offsets`) identified that the roamer's current map group and map number are not stored within the primary 20-byte struct, but kept in separate variables loaded into EWRAM (`sRoamerLocation`). However, the exact byte offsets or structure for extracting these values via DataView were not provided.

## Acceptance Criteria
- [ ] Determine the exact memory offset and structure for the roamer's map group and map number for Gen 3 saves.
