---
id: research-095-175-gen3-berry-implicit-data
type: RESEARCH
title: Investigate Gen 3 Berry Patch Implicit Data and Offsets
status: PENDING
owner_persona: researcher
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-055-095-gen3-berry-data-parsing
tags:
  - research
  - gen3
  - berries
  - offsets
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Gen 3 Berry Patch Implicit Data and Offsets

## Overview
The previous implementation task `task-095-157-gen3-berry-dataview-parsing` failed permanently due to incorrect offset calculations and attempting to extract missing implicit data such as "Time Planted" and "Last Watered Time". This research node is responsible for finding the correct relative offset calculations and fully investigating the absence of implicit data to prevent future failures.

## Research Objectives
1. **Verify Logical Offsets**: Gen 3 Berry Trees are stored at logical offset `0x169C` in Section 1 of `SaveBlock1`. Investigate and document the correct relative offset calculation (e.g., using the Section 0 payload size of `0x0F80`).
2. **Investigate Implicit Data**: Research and definitively document why implicit data such as "Map ID", "Time Planted", and "Last Watered Time" are not explicitly stored in the Gen 3 save format and cannot be extracted from the `BerryTree` struct.
3. **Draft Updated Spec**: Produce an updated data extraction specification that removes impossible constraints and relies solely on the explicit data available in the 8-byte `BerryTree` structure (e.g., Berry ID, growth stage).

## Deliverables
- A documented explanation of the correct relative offset calculation for Berry Trees in `SaveBlock1` Section 1.
- A technical breakdown of why implicit data is missing and how the engine should handle this limitation.
- An updated extraction specification to be used by the retry implementation task.
