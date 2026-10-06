---
id: epic-566-579-e2e-core-component-models
type: EPIC
title: E2E Core Component Object Models
status: COMPLETED
owner_persona: story_owner
created_at: '2026-09-20'
updated_at: '2026-10-06'
depends_on:
  - epic-566-578-e2e-fixtures-setup
jules_session_id: null
pr_number: null
parent: prd-525-582-e2e-page-component-object-models
tags:
  - testing
  - e2e
  - playwright
  - ai-optimization
  - DX
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 60
---

# Epic: E2E Core Component Object Models

## Objective
Define lightweight class-based Component Object Models (COMs) for recurring UI elements to encapsulate interaction logic.

## Scope
- Implement models in `tests/e2e/models/` for core components (e.g., `SettingsModalModel`, `PokedexGridModel`).
- Mandate the use of semantic locators (`getByRole`, `getByTestId`).
- Encapsulate common assertions and wait conditions within model methods.

## Acceptance Criteria
- [x] Core UI component models are implemented using semantic locators.
- [x] Interaction and assertion logic is encapsulated within the models.
- [x] Story Owner: Generate a final STORY dedicated exclusively to Integration and E2E Verification.
- [x] story-579-637-settings-modal-model
- [x] story-579-638-pokedex-grid-model
- [x] story-579-639-e2e-core-components-integration
