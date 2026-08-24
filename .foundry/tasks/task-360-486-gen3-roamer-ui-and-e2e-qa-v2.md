---
id: task-360-486-gen3-roamer-ui-and-e2e-qa-v2
type: TASK
title: QA Gen 3 Roamer UI and E2E Tests V2
status: READY
owner_persona: qa
parent: story-397-360-gen3-roamer-integration-e2e
depends_on:
  - task-360-485-gen3-roamer-e2e-impl-v2
  - task-360-418-gen3-roamer-ui-impl
---

# QA Gen 3 Roamer UI and E2E Tests V2

## Objective
Verify the correctness of the Gen 3 Roamer Dossier UI implementation and the new Playwright E2E tests.

## Acceptance Criteria
- [ ] Verify the Roamer Dossier React component correctly displays the roamer's internal stats (Species, Level, HP, Status, IVs, PV).
- [ ] Ensure the component adheres strictly to ADR 008 (tactical hardware aesthetic).
- [ ] Verify the Playwright E2E tests pass and adequately cover different Gen 3 game versions (Ruby/Sapphire, Emerald, FireRed/LeafGreen) using mocked data.
- [ ] Verify the Roamer IV Glitch Warning Module functions as expected and is tested.