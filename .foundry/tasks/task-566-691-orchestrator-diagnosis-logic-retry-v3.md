---
id: task-566-691-orchestrator-diagnosis-logic-retry-v3
type: TASK
title: Implement Orchestrator Logic for BLOCKED Diagnosis (Retry v3)
status: READY
owner_persona: coder
created_at: '2026-10-16T20:42:07.420Z'
updated_at: '2026-10-31'
depends_on:
  - research-566-690-investigate-orchestrator-diagnosis-failure-v3
jules_session_id: null
pr_number: null
parent: story-552-566-orchestrator-diagnosis-artifact
tags:
  - foundry
  - orchestrator
  - dag
  - core
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Orchestrator Logic for BLOCKED Diagnosis (Retry v3)

## Description
Based on the findings from research node 690, implement the logic in the Foundry DAG Orchestrator (`.github/scripts/foundry-orchestrator.ts`) to detect `BLOCKED` states. When a blocked state (like circular dependency or unresolvable path) is found, use the helpers from task 581 to generate and write the "BLOCKED Diagnosis" artifact to disk.

## Acceptance Criteria
- [ ] Modify `.github/scripts/foundry-orchestrator.ts` to generate the artifact on BLOCKED based on research findings.
- [ ] Ensure artifact is written to the correct location.
