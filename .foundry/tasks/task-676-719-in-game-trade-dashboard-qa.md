---
id: task-676-719-in-game-trade-dashboard-qa
type: TASK
title: In-Game Trade Dashboard QA
status: READY
owner_persona: qa
created_at: '2026-10-22'
updated_at: '2026-10-22'
depends_on:
  - task-676-718-in-game-trade-dashboard-route
jules_session_id: null
pr_number: null
parent: story-350-676-in-game-trade-dashboard-core-ui
tags:
  - qa
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
locks: []
---
# Task: In-Game Trade Dashboard QA

## Objective
Verify the end-to-end functionality and design compliance of the In-Game Trade Dashboard.

## Scope
- Write Playwright E2E tests to navigate and interact with the new route.
- Validate that the data is accurately represented.
- Confirm adherence to tactical aesthetic rules.

## Acceptance Criteria
- [ ] E2E Playwright tests verify navigation to the In-Game Trades route using relative paths.
- [ ] Tests verify that trade components correctly display "Available", "Claimed", or "Incomplete" states.
- [ ] Verify that UI adheres to tactical hardware styling rules (ADR 008).
- [ ] All E2E tests pass successfully.
