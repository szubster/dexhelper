---
id: story-127-347-orchestrator-safeguard-e2e
type: STORY
title: E2E Integration for Orchestrator Safeguards
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-29'
updated_at: '2026-07-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-057-127-orchestrator-safeguard-investigation
tags:
  - process
  - orchestrator
  - e2e
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: E2E Integration for Orchestrator Safeguards

## Context
As part of enforcing macro node functional boundaries, we need to ensure that an EPIC cannot be marked `COMPLETED` until its functional requirements are verifiably integrated and tested. The orchestrator now requires an E2E story.

## Goal
Implement E2E testing for the new orchestrator safeguard to verify that an EPIC node cannot be promoted to VERIFYING or COMPLETED unless it contains at least one child STORY that explicitly represents integration or E2E testing.

## Acceptance Criteria
- [x] Implement E2E tests for the orchestrator safeguard.
- [x] [task-347-360-e2e-safeguard-orchestrator-impl](.foundry/archive/task-347-360-e2e-safeguard-orchestrator-impl.md)
- [x] [task-347-361-e2e-safeguard-orchestrator-qa](.foundry/archive/tasks/task-347-361-e2e-safeguard-orchestrator-qa.md)
