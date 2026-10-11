---
id: story-552-566-orchestrator-diagnosis-artifact
type: STORY
title: Update Orchestrator for BLOCKED Diagnosis Artifact
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-12'
updated_at: '2026-10-10'
depends_on: []
jules_session_id: '4004578864996614375'
pr_number: null
parent: epic-521-552-automated-graph-healing
tags:
  - foundry
  - orchestrator
  - dag
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: Update Orchestrator for BLOCKED Diagnosis Artifact

## Description
Modify the Foundry DAG Orchestrator to detect `BLOCKED` node states caused by circular dependencies or unresolvable node paths. When a `BLOCKED` state is detected, the orchestrator must automatically output a "BLOCKED Diagnosis" artifact detailing the failed node paths and cycles, serving as the input for the graph healing sub-routine.

## Acceptance Criteria
- [x] Break down this Story into Tasks.
- [x] task-566-581-blocked-diagnosis-types
- [x] task-566-582-orchestrator-diagnosis-logic
- [x] task-566-583-orchestrator-diagnosis-tests
- [x] task-566-584-qa-blocked-diagnosis
- [x] research-566-668-investigate-orchestrator-diagnosis-failure
- [x] task-566-669-orchestrator-diagnosis-logic-retry
- [x] task-566-670-orchestrator-diagnosis-tests-retry
- [x] task-566-671-qa-blocked-diagnosis-retry
- [ ] research-566-676-investigate-orchestrator-diagnosis-failure-v2
- [ ] task-566-677-orchestrator-diagnosis-logic-retry-v2
- [ ] task-566-678-orchestrator-diagnosis-tests-retry-v2
- [ ] task-566-679-qa-blocked-diagnosis-retry-v2
