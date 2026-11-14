---
id: task-479-741-gen2-unown-dex-e2e-coder-v3
type: TASK
title: Implement Gen 2 Unown Dex Data Extraction E2E Tests (Retry v3)
status: READY
owner_persona: coder
created_at: '2026-11-04'
updated_at: '2026-11-04'
depends_on:
  - research-479-740-investigate-unown-e2e-failure
jules_session_id: null
parent: story-338-479-gen2-unown-dex-e2e
tags:
  - e2e
  - gen2
  - unown
rejection_count: 0
rejection_reason: ''
locks: []
---

# Implement Gen 2 Unown Dex Data Extraction E2E Tests

## Context
This task requires implementing Playwright E2E tests to verify the Gen 2 Unown Dex data extraction. It should test that Unown forms and Ruins of Alph puzzle flags are parsed and displayed correctly in the application for Gen 2 save files. This is a retry of the permanently failed `task-479-700-gen2-unown-dex-e2e-coder` and `task-479-676-gen2-unown-dex-e2e-tests`.

## Acceptance Criteria
- [ ] Implement Playwright tests verifying Unown forms are correctly extracted.
- [ ] Implement Playwright tests verifying Ruins of Alph puzzle flags are correctly extracted and displayed.
