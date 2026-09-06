---
id: task-475-528-parsing-refactor-e2e-mock-data
type: TASK
title: Create Mock Data for Parsing Refactor E2E Tests
status: READY
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-09-06'
depends_on: []
jules_session_id: null
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
locks: []
---

# Create Mock Data for Parsing Refactor E2E Tests

## Overview
Create mock `.foundry` markdown nodes with various `rejection_count` frontmatter values to be used as fixtures in the E2E verification of the parsing refactor.

## Acceptance Criteria
- [x] Create mock task nodes with `rejection_count: 0`, `rejection_count: 1`, and `rejection_count: >1`
- [x] Ensure the mock data is accessible to the Playwright E2E tests
