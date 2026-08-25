---
id: task-360-489-gen3-roamer-e2e-impl-v2
type: TASK
title: Impl Gen 3 Roamer E2E Tests (v2)
status: READY
owner_persona: coder
created_at: '2026-08-25'
updated_at: '2026-08-25'
depends_on:
  - research-360-471-investigate-gen3-roamer-e2e-failure
jules_session_id: null
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

# Impl Gen 3 Roamer E2E Tests (v2)

## Objective
Write Playwright E2E tests for the Roamer Dossier rendering across different Gen 3 game versions, utilizing the findings from the research investigation.

## Description
Based on the solutions identified in the research node, implement reliable E2E tests for the Gen 3 Roamer Dossier. Ensure the tests correctly assert UI rendering with mocked save data across Ruby/Sapphire, Emerald, and FireRed/LeafGreen.

## Acceptance Criteria
- [ ] Create Playwright E2E tests for the Gen 3 Roamer Dossier based on research findings.
- [ ] Verify that stats (Species, Level, HP, IVs, PV, etc.) render properly based on the mocked save data.
- [ ] Ensure tests cover the different game versions (R/S, Emerald, FR/LG).
