---
id: task-286-403-filter-swarm-item-calls-qa
type: TASK
title: QA Filter Swarm & Item Calls
status: PENDING
owner_persona: qa
created_at: '2026-08-05'
updated_at: '2026-08-05'
depends_on:
  - task-286-402-filter-swarm-item-calls-impl
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

# Task: QA Filter Swarm & Item Calls

## Objective
Verify the implementation of filtering the list of active callers to isolate NPCs that offer rare items or swarm notifications.

## Context
As part of the Pokegear Alerts Epic, we need a way to filter the active Pokegear callers and surface the high-value NPCs that provide swarms or rare items. The tech lead has determined this requires an explicit QA step due to potential data mapping complexities.

## Acceptance Criteria
- [ ] Verify that the data logic correctly identifies high-value Pokegear callers (swarm and item-giving) based on research offsets.
- [ ] Verify that a filtering layer or flag is correctly implemented in the data structure for high-value calls.
- [ ] Verify test coverage is complete and accurate for the implemented logic.
