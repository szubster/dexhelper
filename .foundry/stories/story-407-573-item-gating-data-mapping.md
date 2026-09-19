---
id: story-407-573-item-gating-data-mapping
type: STORY
title: Item Gating Data Mapping
status: READY
owner_persona: tech_lead
created_at: '2026-09-16T05:45:31Z'
updated_at: '2026-09-16T05:45:31Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-339-407-gen3-bike-item-gating-integration
tags:
  - gen3
  - map
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Item Gating Data Mapping

## Context
To introduce a "Bike Requirement Filter" to DexHelper's Smart Route Radar, we first need the underlying data that maps specific items, TMs, and hidden areas on a route to their required bikes (Mach or Acro) and other HMs/Items.

## Proposal
Define a data structure and mapping logic to associate items with their requirements. For example, identifying that a specific item on Route 119 requires an Acro Bike to reach, or TM13 in Abandoned Ship requires Dive & Storage Key. Create the necessary utility functions to parse this data based on save flags.

## Acceptance Criteria
- [ ] tech_lead: Break down this Story into Tasks for Coder and QA.
