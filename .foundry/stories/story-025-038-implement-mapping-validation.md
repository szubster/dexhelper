---
id: story-025-038-implement-mapping-validation
type: STORY
title: Implement Mapping Validation in DAG Orchestrator
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-05-04'
updated_at: '2026-05-04'
depends_on: []
jules_session_id: '12853408591694952480'
pr_number: null
parent: .foundry/epics/epic-014-025-enforce-persona-pipeline-handoffs.md
tags:
  - foundry
  - dag
  - orchestrator
  - validation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Implement Mapping Validation in DAG Orchestrator

## Overview
Implement the mapping validation logic in the orchestrator to enforce pipeline handoff ownership rules.

## Acceptance Criteria
- [x] Implement validation logic in `.github/scripts/foundry-orchestrator.ts` Phase 4 or 4.5.
- [x] Nodes are validated before dispatch (not transitioned to READY).
- [x] The check matches node `type` and `owner_persona`.
- [x] Allows `human` persona.

## Next Step
- [x] Create Task to add logic.

## Generated Tasks
- `.foundry/tasks/task-038-064-implement-mapping-validation.md`
- `.foundry/tasks/task-038-065-qa-mapping-validation.md`
