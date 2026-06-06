---
id: task-069-118-detect-violations-impl
type: TASK
title: Detect multiple encounters per location
status: COMPLETED
owner_persona: coder
created_at: '2026-05-18'
updated_at: '2026-05-20'
depends_on:
  - task-069-116-aggregate-encounters-impl
jules_session_id: null
pr_number: null
parent: story-034-069-automated-route-tracking
tags:
  - feature
  - nuzlocke
  - verification
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Detect multiple encounters per location

## Description
Implement the logic to identify Nuzlocke violations when multiple Pokémon share the same `met_location`.

## Acceptance Criteria
- [x] Logic detects if more than one Pokémon is caught at the same `met_location`.
- [x] Flags violations accordingly.
- [x] Includes tests to verify correct violation detection.
