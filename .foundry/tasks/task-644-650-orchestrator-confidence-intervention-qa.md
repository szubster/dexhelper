---
id: task-644-650-orchestrator-confidence-intervention-qa
type: TASK
title: 'QA: Verify Orchestrator Confidence Intervention Logic'
status: ACTIVE
owner_persona: qa
created_at: '2026-10-02'
updated_at: '2026-10-06'
depends_on:
  - task-644-649-orchestrator-confidence-intervention-impl
jules_session_id: '7789545095272291046'
pr_number: null
parent: story-570-644-orchestrator-confidence-intervention-impl
tags:
  - orchestrator
  - foundry
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA: Verify Orchestrator Confidence Intervention Logic

## Objective
Verify the logic in `.github/scripts/foundry-orchestrator.ts` correctly overrides the transition and spawns a QA/Auditor task when a node transitions with a `confidence_score < 70`.

## Acceptance Criteria
- [ ] Implement the objective as described.
