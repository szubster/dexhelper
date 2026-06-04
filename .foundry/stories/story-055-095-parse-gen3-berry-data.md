---
id: story-055-095-parse-gen3-berry-data
type: STORY
title: Parse Gen 3 Berry Patch Data Using DataView
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-03'
updated_at: '2026-06-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-037-055-gen3-berry-tracker-data-extraction
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

# Story: Parse Gen 3 Berry Patch Data Using DataView

## Overview
This Story covers the implementation of the parsing logic to extract Berry patch data from Generation 3 save files. It strictly follows ADR 010 to use the `DataView` API to guarantee bounds checking.

## Details
* Identify memory blocks in Gen 3 (Ruby, Sapphire, Emerald, FireRed, LeafGreen) saves corresponding to the berry trees.
* Create a `DataView` wrapper for reading the memory offsets.
* Read the berry ID, growth stage (planted, sprouted, taller, flowering, ripe), time planted, and time last watered.
* Ensure all out-of-bounds reads throw `RangeError` which is caught and propagated as a save validation error.

## Acceptance Criteria
- [ ] Implement berry data parsing logic for Gen 3 saves using `DataView`.
- [ ] Add explicit test cases for `RangeError` bounds checking on malformed offsets.
- [ ] Return structured berry patch data (map ID, berry type, growth stage, timestamps).