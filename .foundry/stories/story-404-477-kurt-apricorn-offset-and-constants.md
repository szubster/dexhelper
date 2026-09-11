---
id: story-404-477-kurt-apricorn-offset-and-constants
type: STORY
title: Kurt Apricorn Offset and Constants
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-26'
updated_at: '2026-09-08'
depends_on: []
jules_session_id: '2973207527081692762'
pr_number: null
parent: epic-338-404-kurt-apricorn-data-engine
tags:
  - gen2
  - items
rejection_count: 2
rejection_reason: ''
notes: ''
locks: []
---
# Kurt Apricorn Offset and Constants

## Context
As part of epic-338-404-kurt-apricorn-data-engine, we need to determine and define the memory offsets, bit locations, and constants for Kurt's active Apricorn crafting state.

## Objectives
- Research and define the memory offsets for Kurt's Apricorn crafting state.
- Define module-level constants for all memory offsets, lengths, array bounds, and magic numbers (e.g., Poké Ball IDs mapped to Apricorns).
- Ensure no magic numbers are used inline, satisfying Section 13 guidelines.

## Acceptance Criteria
- [x] tech_lead: Break this STORY down into actionable TASK nodes.
- [x] research-404-495-kurt-apricorn-offsets
- [ ] research-477-564-investigate-apricorn-offsets-failure
- [ ] task-477-565-define-apricorn-constants
- [ ] task-477-566-test-apricorn-constants
