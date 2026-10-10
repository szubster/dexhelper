---
id: story-570-645-orchestrator-confidence-intervention-e2e
type: STORY
title: Confidence Metrics Intervention E2E Verification
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-10-01T15:03:21Z'
updated_at: '2026-10-08'
depends_on:
  - story-570-644-orchestrator-confidence-intervention-impl
jules_session_id: '14951755953361136737'
pr_number: null
parent: epic-565-570-agent-confidence-metrics-orchestrator
tags:
  - orchestrator
  - e2e
  - verification
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 60
---

# Confidence Metrics Intervention E2E Verification

## Context
E2E Verification for orchestrator interventions on low confidence metrics.

## Requirements
- Write integration tests or E2E verifications for the Foundry orchestrator script (.github/scripts/foundry-orchestrator.test.ts).
- Verify that a node with confidence_score < 70 does not bypass the review and correctly spawns a QA/Auditor task.

## Acceptance Criteria
- [x] Break down into Tasks
- [ ] task-645-673-orchestrator-confidence-intervention-e2e-impl
