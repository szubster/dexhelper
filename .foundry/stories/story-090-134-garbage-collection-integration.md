---
id: story-090-134-garbage-collection-integration
type: STORY
title: Garbage Collection Integration and Execution
status: FAILED
owner_persona: tech_lead
created_at: '2026-06-14'
updated_at: '2026-07-16'
depends_on:
  - story-090-133-remediation-state-transition-logic
jules_session_id: '7874514425420059775'
pr_number: null
parent: epic-050-090-zombie-node-remediation-and-gc
tags:
  - foundry
  - orchestrator
  - maintenance
research_references: []
rejection_count: 0
rejection_reason: >-
  Zombie node detected: Session 7874514425420059775 is TERMINATED without
  resolving the node
notes: ''
---

# Garbage Collection Integration and Execution

## Objective
Determine the integration approach for the GC process and implement it using the detection and remediation logic.

## Context
With the zombie node detection engine and state transition logic implemented, the final step is to integrate these pieces. We need to decide whether the GC process runs synchronously within the main orchestrator (`.github/scripts/foundry-orchestrator.ts`) or as an independent scheduled script, and then execute that integration. This will ensure that remediated nodes (`FAILED` state) are correctly processed by the existing resurrection loop.

## Acceptance Criteria
- [x] Create task breakdown.

### Next Steps
- [ ] task-134-264-gc-integration-impl
- [ ] task-134-265-gc-integration-qa
- [x] Break down into Tasks.
