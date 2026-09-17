---
id: story-564-580-heartbeat-violation-detection-e2e
type: STORY
title: E2E Verification of Heartbeat Violation Detection
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-17T05:23:52Z'
updated_at: '2026-09-17T05:23:52Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-563-564-implement-heartbeat-violation-detection
tags:
  - e2e
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# STORY: E2E Verification of Heartbeat Violation Detection

## Objective
Verify that the Orchestrator heartbeat script correctly detects when a Jules session enters the `AWAITING_USER_FEEDBACK` state and appropriately transitions the corresponding task to `FAILED` with the correct rejection reason, enforcing the Autonomous No-Ask Policy.

## Context
The heartbeat script has been updated to parse Jules session API responses for the `AWAITING_USER_FEEDBACK` state. We need comprehensive E2E tests for the orchestrator to prevent regressions.

## Acceptance Criteria
- [ ] Implement orchestrator tests for heartbeat detection of `AWAITING_USER_FEEDBACK`.
