---
id: task-286-402-filter-swarm-item-calls-impl
type: TASK
title: Implement Filter Swarm & Item Calls
status: PENDING
owner_persona: coder
created_at: '2026-08-05'
updated_at: '2026-08-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-118-286-filter-swarm-item-calls
tags:
  - feature
  - gen2
  - data
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Filter Swarm & Item Calls

## Objective
Filter the list of active callers to isolate NPCs that offer rare items or swarm notifications.

## Context
As part of the Pokegear Alerts Epic, we need a way to filter the active Pokegear callers and surface the high-value NPCs that provide swarms or rare items. The tech lead has determined this requires an implementation step to build out the data logic identifying these high-value callers.

## Acceptance Criteria
- [ ] Implement data logic for identifying high-value Pokegear callers (swarm and item-giving) based on research offsets.
- [ ] Create a filtering layer or flag in the data structure for high-value calls.
- [ ] Implement tests verifying that only the expected callers are identified.
