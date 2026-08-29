---
id: task-351-495-nuzlocke-death-tracking-e2e-impl-retry
type: TASK
title: Nuzlocke Death Tracking E2E Tests Implementation Retry
status: PENDING
owner_persona: coder
created_at: '2026-08-22'
updated_at: '2026-08-22'
depends_on:
  - research-351-494-investigate-nuzlocke-death-ui-locators
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
# Task: Nuzlocke Death Tracking E2E Tests Implementation Retry

## Objective
Implement End-to-End tests using Playwright to verify the automated death tracking logic and Graveyard Box functionality, utilizing findings from the research node.

## Contract / Acceptance Criteria
- [ ] Implement E2E tests covering the detection of party Pokémon at 0 HP.
- [ ] Implement E2E tests verifying Graveyard box designation and UI settings.
- [ ] Implement E2E tests verifying Pokémon in the Graveyard box are correctly identified as dead, including actual UI validation of the isDead state (opacity and grayscale visual effects).
- [ ] Ensure all E2E tests run successfully via pnpm test:e2e.