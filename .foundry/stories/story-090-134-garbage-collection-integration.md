---
id: story-090-134-garbage-collection-integration
type: STORY
title: Garbage Collection Integration and Execution
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on:
  - story-090-133-remediation-state-transition-logic
jules_session_id: null
pr_number: null
parent: epic-050-090-zombie-node-remediation-and-gc
tags:
  - foundry
  - orchestrator
  - maintenance
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Garbage Collection Integration and Execution

## Objective
Determine the integration approach for the GC process and implement it using the detection and remediation logic.

## Context
With the zombie node detection engine and state transition logic implemented, the final step is to integrate these pieces. We need to decide whether the GC process runs synchronously within the main orchestrator (`.github/scripts/foundry-orchestrator.ts`) or as an independent scheduled script, and then execute that integration. This will ensure that remediated nodes (`FAILED` state) are correctly processed by the existing resurrection loop.

## Acceptance Criteria
- [ ] Create task breakdown.

### Next Steps
- [ ] Break down into Tasks.
