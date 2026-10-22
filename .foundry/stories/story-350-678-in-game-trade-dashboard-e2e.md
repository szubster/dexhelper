---
id: story-350-678-in-game-trade-dashboard-e2e
type: STORY
title: In-Game Trade Dashboard Integration E2E Verification
status: PENDING
owner_persona: tech_lead
created_at: '2026-10-17'
updated_at: '2026-10-22'
depends_on:
  - story-350-677-in-game-trade-collection-cross-reference
jules_session_id: null
pr_number: null
parent: epic-056-350-in-game-trade-dashboard-ui-v2
tags:
  - testing
  - e2e
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# Story: In-Game Trade Dashboard Integration E2E Verification

## Objective
Verify the end-to-end functionality of the In-Game Trade Dashboard, including UI rendering, status tagging, and collection cross-referencing.

## Scope
- Write Playwright E2E tests for the Trade Dashboard.
- Verify that trades are listed correctly for a given game version.
- Verify visual status tags are displayed based on mock save state.
- Verify collection cross-referencing correctly highlights available trades when the player has the required Pokémon.

## Acceptance Criteria
- [ ] E2E tests are implemented using Playwright.
- [ ] Tests verify the listing of trades and correct visual tagging for completion status.
- [ ] Tests verify the collection cross-referencing highlighting functionality.
- [ ] Tech Lead: Break down this Story into executable Tasks (including a QA task if necessary).
