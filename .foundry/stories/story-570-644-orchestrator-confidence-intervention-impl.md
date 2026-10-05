---
id: story-570-644-orchestrator-confidence-intervention-impl
type: STORY
title: Implement Orchestrator Interventions for Confidence Metrics
status: READY
owner_persona: tech_lead
created_at: '2026-10-01T15:03:21Z'
updated_at: '2026-10-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-565-570-agent-confidence-metrics-orchestrator
tags:
  - orchestrator
  - foundry
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 60
---

# Implement Orchestrator Interventions for Confidence Metrics

## Context
Based on PRD-521 and EPIC 570, the orchestrator needs to react to nodes reporting low confidence.

## Requirements
- Modify the Foundry orchestrator (.github/scripts/foundry-orchestrator.ts).
- Check confidence_score when a node transitions to COMPLETED or VERIFYING.
- If confidence_score < 70, override standard transition.
- Spawn a QA or Auditor task to review the node.

## Acceptance Criteria
- [x] Break down into Tasks
- [ ] task-644-649-orchestrator-confidence-intervention-impl
- [ ] task-644-650-orchestrator-confidence-intervention-qa
