---
id: task-442-466-gen2-roamer-e2e-fixture-impl
type: TASK
title: Gen 2 Roamer E2E Fixtures Generation
status: ACTIVE
owner_persona: coder
created_at: '2026-08-22'
updated_at: '2026-08-22'
depends_on: []
jules_session_id: '12274649145441894129'
pr_number: null
parent: story-139-442-gen2-roamer-extraction-e2e
tags:
  - e2e
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Gen 2 Roamer E2E Fixtures Generation

## Objective
Generate or prepare the test fixture save files required to verify Gen 2 roamer extraction logic.

## Description
Provide the necessary Gen 2 (Gold/Silver/Crystal) save file fixtures containing both active roaming Pokémon (Raikou, Entei, Suicune) and inactive/caught roamers with different map coordinates and levels. Ensure these fixtures are properly loaded and referenced for E2E Playwright tests.

## Acceptance Criteria
- [x] Gen 2 save fixtures with roamer data are added to the E2E test data.
- [x] Fixture loading mechanism is prepared for the E2E tests.
