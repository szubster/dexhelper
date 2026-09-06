---
id: prd-137-346-orchestrator-telemetry-for-cycles
type: PRD
title: Orchestrator Telemetry For Cycles
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-08-31'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: '10755803973718176622'
pr_number: null
parent: idea-000-137-orchestrator-telemetry-for-cycles
tags:
  - foundry
  - orchestrator
  - telemetry
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Orchestrator Telemetry For Cycles

## Context
During the completion of epic-334-338-circular-dependency-detection, logic was implemented in the Orchestrator graph to detect and fail cycles. Telemetry metrics are needed to track how often this occurs in order to gauge agent efficiency.

## Requirements
1. Implement telemetry tracking for cycle detection failures in `.github/scripts/foundry-orchestrator.ts`.
2. Ensure the telemetry tracking does not interfere with or degrade the primary function of the orchestrator.
3. Record instances where the cycle detection fails a node so it can be effectively measured.

## Acceptance Criteria
- [ ] epic-346-530-orchestrator-telemetry-metrics
