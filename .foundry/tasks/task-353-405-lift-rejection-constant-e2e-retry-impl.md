---
id: task-353-405-lift-rejection-constant-e2e-retry-impl
type: TASK
title: Retry E2E Test for Permanent Failure Dashboard
status: COMPLETED
owner_persona: coder
created_at: '2026-08-06'
updated_at: '2026-08-15'
depends_on:
  - research-353-404-investigate-lift-rejection-e2e-failure
jules_session_id: null
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

# Retry E2E Test for Permanent Failure Dashboard

## Objective
Implement an E2E test to verify that the DAG Dashboard correctly displays permanent failures, incorporating findings from the preceding research phase.

## Requirements
1. E2E test verifying permanent failure nodes on the dashboard.

## Acceptance Criteria
- [x] Create a Playwright test file at `tests/e2e/dashboard/permanent_failures.spec.ts`.
- [x] Implement a test that opens the dashboard, toggles the "Permanent failures only" filter, and asserts that permanent failures are correctly highlighted.
- [x] The test must verify that the UI correctly identifies nodes with a `rejection_count` of at least `MAX_REJECTION_THRESHOLD` as permanent failures.
- [x] The implementation must explicitly address and resolve the issues identified in `research-353-404-investigate-lift-rejection-e2e-failure.md`.
