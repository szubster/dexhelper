---
id: story-531-533-orchestrator-trigger-logic-updates
type: STORY
title: Orchestrator Curator Trigger Logic Updates
status: READY
owner_persona: tech_lead
created_at: '2026-09-04'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: null
parent: epic-518-531-orchestrator-curator-loop
tags:
  - orchestrator
  - curator
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Orchestrator Curator Trigger Logic Updates

## Summary
Implement logic in `.github/scripts/foundry-orchestrator.ts` to trigger the `curator` persona when appropriate node states are met.

## Requirements
- Identify the exact condition that warrants triggering the `curator` persona (e.g., when a feature is considered fully "implemented" but before final archival/verification).
- Update the DAG processing rules to recognize this state and enqueue `curator` execution.
- Implement tests ensuring the trigger logic accurately fires under the specified conditions.
