---
id: task-573-642-qa-item-gating-data-mapping
type: TASK
title: QA Item Gating Data Mapping
status: PENDING
owner_persona: qa
created_at: '2026-09-16T05:45:31Z'
updated_at: '2026-09-16T05:45:31Z'
depends_on:
  - task-573-641-implement-item-gating-data-mapping
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
# QA Item Gating Data Mapping

## Context
A Coder task was created to define a data structure and utility functions to associate items, TMs, and hidden areas on a route with their required bikes (Mach or Acro) and other HMs/Items.

## Proposal
Review the data structure and utility functions implemented by the Coder. Ensure that the logic correctly maps items to their requirements and correctly parses save flags.

## Acceptance Criteria
- [ ] Review the data structure and mapping logic for correctness.
- [ ] Review and run the unit tests provided by the Coder.
- [ ] Verify that edge cases and constraints (e.g., both bikes required, no bikes required) are handled properly.
