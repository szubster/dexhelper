---
id: task-353-393-lift-rejection-constant-e2e-impl
type: TASK
title: Implement E2E Test for Permanent Failure Dashboard
status: ACTIVE
owner_persona: coder
created_at: '2026-08-03'
updated_at: '2026-08-05'
depends_on:
  - story-343-352-lift-rejection-constant-impl
jules_session_id: '10139717366112844072'
pr_number: null
parent: story-343-353-lift-rejection-constant-e2e
tags:
  - e2e
  - testing
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Implement E2E Test for Permanent Failure Dashboard

## Objective
Write an E2E test to verify that the DAG Dashboard still correctly displays permanent failures after lifting the rejection count constant.

## Requirements
1. E2E test verifying permanent failure nodes on the dashboard.

## Acceptance Criteria
- [ ] Create a Playwright test file at `tests/e2e/dashboard/permanent_failures.spec.ts`.
- [ ] Implement a test that opens the dashboard, toggles the "Permanent failures only" filter, and asserts that permanent failures are correctly highlighted.
- [ ] The test must verify that the UI correctly identifies nodes with a `rejection_count` of at least `MAX_REJECTION_THRESHOLD` as permanent failures.
