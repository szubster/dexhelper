---
id: task-566-741-orchestrator-diagnosis-logic-retry-v4
type: TASK
title: Implement Orchestrator Logic for BLOCKED Diagnosis (Retry v4)
status: PENDING
owner_persona: coder
created_at: '2026-11-05'
updated_at: '2026-11-05'
depends_on:
  - research-566-740-investigate-orchestrator-diagnosis-failure-v4
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

# Task: Implement Orchestrator Logic for BLOCKED Diagnosis (Retry v4)

## Description
Based on the findings from research node 740, implement the logic in the Foundry DAG Orchestrator (`packages/foundry/foundry-orchestrator.ts`) to detect `BLOCKED` states. When a blocked state (like circular dependency or unresolvable path) is found, use the helpers from task 581 to generate and write the "BLOCKED Diagnosis" artifact to disk.

## Acceptance Criteria
- [ ] Modify `packages/foundry/foundry-orchestrator.ts` to generate the artifact on BLOCKED states based on research findings.
- [ ] Ensure the artifact is written to the correct location.
