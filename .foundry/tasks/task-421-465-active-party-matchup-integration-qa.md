---
id: task-421-465-active-party-matchup-integration-qa
type: TASK
title: Verify Active Party Integration into MatchupContext
status: PENDING
owner_persona: qa
created_at: '2026-08-21'
updated_at: '2026-08-22'
depends_on:
  - task-421-462-gen1-active-party-matchup-integration-impl
  - task-421-463-gen2-active-party-matchup-integration-impl
  - task-421-464-gen3-active-party-matchup-integration-impl
jules_session_id: null
pr_number: null
parent: story-411-421-active-party-extraction
tags:
  - qa
  - integration
  - e2e
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Verify Active Party Integration into MatchupContext

## Objective
Verify that Gen 1, Gen 2, and Gen 3 active party data is successfully and correctly integrated into the `MatchupContext`.

## Requirements
- Review code for Gen 1, Gen 2, and Gen 3 integrations to ensure they map the active party data correctly into the shared state.
- Write E2E tests using Playwright validating that uploading respective Gen 1, Gen 2, and Gen 3 saves populates the `MatchupContext`.
- Ensure tests verify edge cases (e.g., uploading a new save overwrites previous context state).
- Adhere to testing constraints, avoiding `@testing-library` usage, and utilizing standard project fixtures (like `initializeWithSave`).

## Acceptance Criteria
- [ ] Code review passes for all integration layers.
- [ ] E2E tests successfully validate integration for all three generations.
