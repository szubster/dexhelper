---
id: task-475-529-parsing-refactor-e2e-tests-impl
type: TASK
title: Implement E2E Tests for Parsing Refactor Data Flow
status: PENDING
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-09-03'
depends_on:
  - task-475-528-parsing-refactor-e2e-mock-data
jules_session_id: null
locks: []
pr_number: null
parent: story-071-475-refactor-parsing-e2e
tags:
  - data
  - dashboard
  - e2e
  - integration
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement E2E Tests for Parsing Refactor Data Flow

## Overview
Implement Playwright E2E tests that verify the entire data flow from the parsed mock `.foundry` markdown nodes down to the `DagContext` and ensure the `rejection_count` is accurately supplied to the Permanent Failure Dashboard.

## Acceptance Criteria
- [ ] Implement E2E tests verifying correct extraction of `rejection_count` from fixtures
- [ ] Implement E2E tests verifying `rejection_count` is correctly passed to the `DagContext`
- [ ] Ensure tests run successfully in headless mode
