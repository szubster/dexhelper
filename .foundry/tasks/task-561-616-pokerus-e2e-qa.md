---
id: task-561-616-pokerus-e2e-qa
type: TASK
title: Pokerus UI Badges E2E - QA Verification
status: PENDING
owner_persona: qa
created_at: '2026-09-23'
updated_at: '2026-09-23'
depends_on:
  - task-561-615-pokerus-e2e-uninfected-cured
jules_session_id: null
pr_number: null
parent: story-412-561-pokerus-ui-e2e
tags:
  - ui
  - pokerus
  - e2e
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Pokerus UI Badges E2E - QA Verification

## Description
Perform QA verification for the complete Pokerus UI Badges E2E test suite implemented in `tests/e2e/pokerus.spec.ts`.

## Acceptance Criteria
- [ ] Run the E2E test suite locally using `xvfb-run -a pnpm test:e2e tests/e2e/pokerus.spec.ts` and ensure all tests pass.
- [ ] Verify that tests for all three Pokerus statuses (Uninfected, Infected, Cured) accurately assert the expected tactical styling constraints (ADR 008/024).
- [ ] Verify that no visual regressions or invalid locator logic have been introduced into the existing badge tests.
