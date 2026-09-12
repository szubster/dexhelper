---
id: task-560-568-battle-frontier-dashboard-e2e-coder
type: TASK
title: Implement Battle Frontier Dashboard E2E Tests
status: READY
owner_persona: coder
created_at: '2026-09-12'
updated_at: '2026-09-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-079-560-battle-frontier-dashboard-e2e
tags:
  - e2e
  - gen3
  - endgame
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Battle Frontier Dashboard E2E Tests

## Description
Create Playwright E2E tests to verify the integration of the Battle Frontier Dashboard UI, including facility cards, BP wallet display, and progress visuals.

## Acceptance Criteria
- [ ] Create E2E test file for the Battle Frontier Dashboard.
- [ ] Test that the BP wallet is correctly displayed.
- [ ] Test that all facility cards (Tower, Dome, Palace, Arena, Factory, Pike, Pyramid) render correctly based on save data.
- [ ] Test progress visuals for each facility (e.g., current win streak, next encounter threshold).
- [ ] Utilize `locator.or()` with `.first()` for any conditional element waiting, as mandated by E2E best practices.
- [ ] Utilize the `isMobile` fixture to ensure tests pass on both desktop and mobile viewports.
