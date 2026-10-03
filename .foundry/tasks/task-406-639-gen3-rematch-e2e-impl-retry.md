---
id: task-406-639-gen3-rematch-e2e-impl-retry
type: TASK
title: Retry Gen 3 NPC Rematch Status E2E Tests
status: COMPLETED
owner_persona: coder
created_at: '2026-09-22'
updated_at: '2026-10-03'
depends_on:
  - research-406-638-investigate-gen3-rematch-e2e-failure
jules_session_id: null
pr_number: null
parent: story-397-406-gen3-npc-rematch-status
tags:
  - task
  - gen3
  - rematch
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# TASK: Retry Gen 3 NPC Rematch Status E2E Tests

## Context
Following the investigation into the previous E2E test failure (`research-406-638-investigate-gen3-rematch-e2e-failure`), we need to implement the Playwright E2E tests for the Gen 3 NPC rematch status feature, incorporating the lessons learned.

## Objectives
- Apply the findings from the research node to fix the underlying issues.
- Implement Playwright E2E tests that verify the proper rendering of the daily rematch status.
- Ensure the tests interact with the DOM correctly to validate user-facing data.

## Acceptance Criteria
- [x] Read the research findings.
- [x] Implement Playwright E2E tests for the NPC rematch status feature in `tests/e2e/`.
- [x] Ensure all tests pass.
