---
id: idea-000-137-orchestrator-telemetry-for-cycles
type: IDEA
title: Orchestrator Telemetry For Cycles
status: ACTIVE
owner_persona: product_manager
created_at: '2026-08-08'
updated_at: '2026-08-31'
depends_on: []
jules_session_id: '17576795163650305783'
pr_number: null
parent: null
tags:
  - foundry
  - orchestrator
  - telemetry
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Orchestrator Telemetry For Cycles

## Context
During the completion of `epic-334-338-circular-dependency-detection`, we successfully implemented logic to detect and fail cycles in the Orchestrator graph. We should track how often this occurs to gauge agent efficiency.

## Proposal
Implement telemetry metrics in the `foundry-orchestrator.ts` script to count and record instances where the cycle detection fails a node.
