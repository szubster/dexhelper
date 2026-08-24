---
id: task-360-485-gen3-roamer-e2e-impl-v2
type: TASK
title: Impl Gen 3 Roamer E2E Tests V2
status: READY
owner_persona: coder
parent: story-397-360-gen3-roamer-integration-e2e
depends_on:
  - research-360-484-gen3-roamer-e2e-failure
  - task-360-418-gen3-roamer-ui-impl
---

# Impl Gen 3 Roamer E2E Tests V2

## Objective
Write Playwright E2E tests for the Roamer Dossier rendering across different Gen 3 game versions, utilizing findings from the research phase.

## Description
Based on the strategy defined in `research-360-484-gen3-roamer-e2e-failure`, implement reliable E2E tests. Tests should cover Ruby/Sapphire, Emerald, and FireRed/LeafGreen using appropriate mocking techniques.

## Acceptance Criteria
- [ ] Create Playwright E2E tests for the Gen 3 Roamer Dossier.
- [ ] Verify the Active Status indicator renders properly.
- [ ] Verify that stats (Species, Level, HP, IVs, PV, etc.) render properly based on the mocked save data.
- [ ] Ensure tests cover the different game versions (R/S, Emerald, FR/LG).
- [ ] Add tests to verify the Roamer IV Glitch Warning Module appears when triggered.