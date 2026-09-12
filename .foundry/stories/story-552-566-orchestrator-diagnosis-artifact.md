---
id: story-552-566-orchestrator-diagnosis-artifact
type: STORY
title: Update Orchestrator for BLOCKED Diagnosis Artifact
status: READY
owner_persona: tech_lead
created_at: '2026-09-12'
updated_at: '2026-09-12'
depends_on: []
jules_session_id: null
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
- [ ] Break down this Story into Tasks.
