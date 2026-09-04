---
id: story-344-495-dashboard-rejection-count-e2e
type: STORY
title: E2E Verification for Dashboard UI Rejection Count Refactor
status: READY
owner_persona: tech_lead
created_at: '2026-08-31'
updated_at: '2026-09-04'
depends_on:
  - story-344-494-dashboard-rejection-count
jules_session_id: null
pr_number: null
parent: epic-107-344-update-dashboard-rejection-count
tags:
  - refactor
  - dashboard
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# E2E Verification for Dashboard UI Rejection Count Refactor

## Objective
Verify that the `DagDashboard` UI correctly consumes the `MAX_REJECTION_THRESHOLD` from `DagContext` in End-to-End scenarios, rather than falling back to the hardcoded direct import.

## Scope
- Ensure existing dashboard E2E tests pass after the refactor in `story-344-494-dashboard-rejection-count`.
- Update any specific E2E test files that mock or assert the threshold value to reflect the Context-injected behavior.

## Acceptance Criteria
- [ ] Tech Lead: Break down into Tasks.
