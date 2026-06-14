---
id: research-095-183-gen3-berry-missing-offsets
type: RESEARCH
title: Investigate Gen 3 Berry Patch Implicit Data
status: READY
owner_persona: researcher
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-055-095-gen3-berry-data-parsing
tags:
  - feature
  - gen3
  - berries
  - engine
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Investigate Gen 3 Berry Patch Implicit Data

## Overview
Investigate the actual availability of data points for Gen 3 berry patches, specifically addressing findings from QA that "Time Planted" and "Last Watered Time" are not explicitly stored in the save file structure. Determine the appropriate way to handle Map IDs (since they are implicit based on the array index) and confirm exactly which fields *can* be extracted via DataView parsing.

## Objectives
- Confirm the exact structure of the Gen 3 `BerryTree` struct.
- Verify whether "Time Planted" and "Last Watered Time" exist in any form, or if they are purely calculated on the fly by the game using `lastBerryTreeUpdate`.
- Document how to map the 128 `BerryTree` array indices to their corresponding Map IDs.
- Provide a clear specification of the extractable fields for the implementation task.

## Acceptance Criteria
- [ ] Determine the extractable fields for Gen 3 berry patches.
- [ ] Document findings regarding implicit Map IDs, Time Planted, and Last Watered Time.
