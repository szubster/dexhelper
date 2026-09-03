---
id: task-490-507-pal-park-hm-validator-qa
type: TASK
title: QA Gen 3 HM Move Validation Logic
status: READY
owner_persona: qa
created_at: '2026-08-29'
updated_at: '2026-09-02'
depends_on:
  - task-490-506-pal-park-hm-validator-impl
jules_session_id: null
pr_number: null
parent: story-420-490-pal-park-hm-validation
tags:
  - qa
  - gen3
  - pal-park
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Task: QA Gen 3 HM Move Validation Logic

## Context
Verify the implementation of the `hasGen3HMMoves` validator for Pal Park migration.

## Verification Requirements
- Verify that the `GEN3_HM_MOVES` constant correctly contains the move IDs for exactly the 8 Gen 3 HM moves (Cut, Fly, Surf, Strength, Flash, Rock Smash, Waterfall, Dive).
- Ensure no Gen 4+ HMs (e.g., Defog, Rock Climb) are accidentally included.
- Run the unit tests and verify they provide adequate coverage (positive, negative, empty lists).
- Ensure the code follows project standards (no any types, correct module location, exported constants).

## Acceptance Criteria
- [x] Code properly exports the HM moves constant and validation function.
- [x] Unit tests cover all branches and edge cases.
- [x] Linting and type-checking pass cleanly.
