---
id: task-716-740-exact-egg-tracker-logic-impl
type: TASK
title: Exact Egg Tracker Logic Implementation
status: READY
owner_persona: coder
created_at: '2026-10-21'
updated_at: '2026-10-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-107-716-exact-egg-tracker-component
priority: 50
confidence_score: null
tags:
  - gen2
  - gen3
  - breeding
research_references: []
rejection_count: 0
system_failure_count: 0
rejection_reason: ""
notes: ""
---

# Task: Exact Egg Tracker Logic Implementation

## Context
We are implementing the Exact Egg Tracker to calculate and display the exact numerical step count remaining until an Egg hatches, based on the friendship/egg cycles byte and generation-specific cycle length.

## Objective
Implement the logic to extract and calculate the remaining egg cycles.

## Scope
- Create functions/hooks to extract the remaining egg cycles and generation-specific cycle lengths from the current save file state for Eggs in the party or PC.
- Implement the calculation for exact numerical step count remaining based on these values.
- Adhere to the Save File Parsing & Extraction Guidelines in `schema.md` (Section 13) if adding/modifying extraction logic:
  - Use module-level constants.
  - Do not use magic numbers.
  - Use relative offsets for Gen 3.
  - Catch `RangeError` with the message "The save file is corrupted or incomplete."

## Acceptance Criteria
- [ ] Implement egg cycle extraction and step calculation logic.
- [ ] Add unit tests for the calculation logic across different generations.
