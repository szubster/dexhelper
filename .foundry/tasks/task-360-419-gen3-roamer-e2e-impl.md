---
id: task-360-419-gen3-roamer-e2e-impl
type: TASK
title: Impl Gen 3 Roamer E2E Tests
status: ACTIVE
owner_persona: coder
created_at: '2026-08-11'
updated_at: '2026-08-20'
depends_on:
  - task-360-418-gen3-roamer-ui-impl
jules_session_id: '6168729656672134615'
pr_number: null
parent: story-397-360-gen3-roamer-integration-e2e
tags:
  - gen3
  - roamer
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Impl Gen 3 Roamer E2E Tests

## Objective
Write Playwright E2E tests for the Roamer Dossier rendering across different Gen 3 game versions.

## Description
Since binary `.sav` fixtures for Gen 3 are currently unavailable, we will use programmatic DataView mocks or indexedDB injection via `initializeWithSave` to load mock roamer data, then assert the UI renders correctly. Tests should cover Ruby/Sapphire, Emerald, and FireRed/LeafGreen.

## Acceptance Criteria
- [ ] Create Playwright E2E tests for the Gen 3 Roamer Dossier.
- [ ] Verify the Active Status indicator renders properly.
- [ ] Verify that stats (Species, Level, HP, IVs, PV, etc.) render properly based on the mocked save data.
- [ ] Ensure tests cover the different game versions (R/S, Emerald, FR/LG).
- [ ] Add tests to verify the Roamer IV Glitch Warning Module appears when triggered.
