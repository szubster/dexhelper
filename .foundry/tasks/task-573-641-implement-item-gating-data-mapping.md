---
id: task-573-641-implement-item-gating-data-mapping
type: TASK
title: Implement Item Gating Data Mapping
status: READY
owner_persona: coder
created_at: '2026-09-16T05:45:31Z'
updated_at: '2026-09-16T05:45:31Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-407-573-item-gating-data-mapping
tags:
  - gen3
  - map
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# Implement Item Gating Data Mapping

## Context
To introduce a "Bike Requirement Filter" to DexHelper's Smart Route Radar, we first need the underlying data that maps specific items, TMs, and hidden areas on a route to their required bikes (Mach or Acro) and other HMs/Items.

## Proposal
Define a data structure and mapping logic to associate items with their requirements. For example, identifying that a specific item on Route 119 requires an Acro Bike to reach, or TM13 in Abandoned Ship requires Dive & Storage Key. Create the necessary utility functions to parse this data based on save flags.

## Acceptance Criteria
- [ ] Define the data structure for mapping items/TMs on routes to their bike/HM/Item requirements.
- [ ] Implement utility functions to parse this data based on save flags.
- [ ] Include unit tests for the data structures and utility functions.
