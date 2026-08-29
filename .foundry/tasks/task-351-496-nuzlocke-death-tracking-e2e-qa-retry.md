---
id: task-351-496-nuzlocke-death-tracking-e2e-qa-retry
type: TASK
title: Nuzlocke Death Tracking E2E Tests Verification Retry
status: PENDING
owner_persona: qa
created_at: '2026-08-22'
updated_at: '2026-08-22'
depends_on:
  - task-351-495-nuzlocke-death-tracking-e2e-impl-retry
jules_session_id: '2026-08-22-12-00-00'
pr_number: null
parent: story-131-351-nuzlocke-death-tracking-e2e
tags:
  - e2e
  - nuzlocke
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Task: Nuzlocke Death Tracking E2E Tests Verification Retry

## Objective
Verify the Playwright End-to-End tests for the automated death tracking logic and Graveyard Box functionality.

## Contract / Acceptance Criteria
- [ ] Verify that E2E tests adequately cover the detection of party Pokémon at 0 HP, including UI state.
- [ ] Verify that E2E tests adequately cover the Graveyard box designation and UI settings.
- [ ] Verify that E2E tests adequately cover identifying Pokémon in the Graveyard box as dead, with actual visual checks (opacity/grayscale).
- [ ] Ensure all tests pass reliably using pnpm test:e2e.