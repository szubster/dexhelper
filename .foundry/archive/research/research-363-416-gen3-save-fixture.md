---
id: research-363-416-gen3-save-fixture
type: RESEARCH
title: Acquire Gen 3 Save Fixture for E2E Tests
status: COMPLETED
owner_persona: researcher
created_at: '2026-08-11'
updated_at: '2026-08-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-363-415-trade-extraction-e2e-impl
tags:
  - testing
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Acquire Gen 3 Save Fixture for E2E Tests

## Objective
Acquire or create a Gen 3 (RSE or FRLG) save file fixture and add it to `tests/fixtures/` to enable end-to-end testing of Gen 3 specific features, such as NPC Trade Flag extraction.

## Context
The current E2E test for Gen 3 NPC Trades (`tests/e2e/dashboard/gen3_npc_trades.spec.ts`) cannot be properly implemented or verified because there are no Gen 3 save files in the `tests/fixtures/` directory. Attempting to test Gen 3 specific UI using a Gen 2 save file only verifies that the UI correctly hides itself, rather than verifying actual extraction and rendering logic.

## Acceptance Criteria
- [x] A valid Gen 3 save file (e.g., `emerald.sav` or `firered.sav`) is acquired or generated.
- [x] The save file is added to `tests/fixtures/`.
- [x] The save file has at least one in-game NPC trade completed to allow for proper E2E assertions.
