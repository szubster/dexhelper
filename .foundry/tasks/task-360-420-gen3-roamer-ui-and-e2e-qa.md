---
id: task-360-420-gen3-roamer-ui-and-e2e-qa
type: TASK
title: QA Gen 3 Roamer UI and E2E Tests
status: CANCELLED
owner_persona: qa
created_at: '2026-08-11'
updated_at: '2026-08-24'
depends_on:
  - task-360-418-gen3-roamer-ui-impl
  - task-360-419-gen3-roamer-e2e-impl
jules_session_id: null
pr_number: null
parent: story-397-360-gen3-roamer-integration-e2e
tags:
  - gen3
  - roamer
  - qa
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-360-419-gen3-roamer-e2e-impl
notes: ''
---

# QA Gen 3 Roamer UI and E2E Tests

## Objective
Verify the correctness of the Gen 3 Roamer Dossier UI implementation and the corresponding Playwright E2E tests.

## Acceptance Criteria
- [ ] Verify the Roamer Dossier React component correctly displays the roamer's internal stats (Species, Level, HP, Status, IVs, PV).
- [ ] Ensure the component adheres strictly to ADR 008 (tactical hardware aesthetic).
- [ ] Verify the Playwright E2E tests pass and adequately cover different Gen 3 game versions (Ruby/Sapphire, Emerald, FireRed/LeafGreen) using mocked data.
- [ ] Verify the Roamer IV Glitch Warning Module functions as expected and is tested.
