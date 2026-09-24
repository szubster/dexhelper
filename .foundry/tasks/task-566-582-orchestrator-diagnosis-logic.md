---
id: task-566-582-orchestrator-diagnosis-logic
type: TASK
title: Implement Orchestrator Logic for BLOCKED Diagnosis
status: ACTIVE
owner_persona: coder
created_at: '2026-09-15T23:11:43Z'
updated_at: '2026-09-24'
depends_on:
  - task-566-581-blocked-diagnosis-types
jules_session_id: '15888991116832313246'
pr_number: null
parent: story-552-566-orchestrator-diagnosis-artifact
tags:
  - foundry
  - orchestrator
  - dag
  - core
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Orchestrator Logic for BLOCKED Diagnosis

## Description
Modify the Foundry DAG Orchestrator (`.github/scripts/foundry-orchestrator.ts`) to detect `BLOCKED` states. When a blocked state (like circular dependency or unresolvable path) is found, use the helpers from task 581 to generate and write the "BLOCKED Diagnosis" artifact to disk.

## Acceptance Criteria
- [ ] Modify `.github/scripts/foundry-orchestrator.ts` to generate the artifact on BLOCKED.
- [ ] Ensure artifact is written to the correct location.
