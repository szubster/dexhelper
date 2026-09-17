---
id: epic-565-570-agent-confidence-metrics-orchestrator
type: EPIC
title: Implement Orchestrator Interventions for Confidence Metrics
status: PENDING
owner_persona: story_owner
created_at: '2026-09-17T01:15:33Z'
updated_at: '2026-09-17T01:15:33Z'
depends_on:
  - epic-565-569-agent-confidence-metrics-schema
jules_session_id: null
pr_number: null
parent: prd-521-565-agent-confidence-metrics-dashboard
priority: 60
tags:
  - orchestrator
  - foundry
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Orchestrator Interventions for Confidence Metrics

## Context
Based on PRD-521, the orchestrator needs to react to nodes reporting low confidence.

## Requirements
- Modify the Foundry orchestrator (`.github/scripts/foundry-orchestrator.ts`).
- When a node is transitioning to `COMPLETED` (or `VERIFYING`), check its `confidence_score`.
- If `confidence_score < 70`, override the standard transition.
- Spawn a `QA` or `Auditor` task to review the node instead of allowing it to blindly complete.

## Acceptance Criteria
- [ ] Generate an exclusive STORY dedicated to Integration and E2E Verification.
