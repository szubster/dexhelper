---
id: story-024-037-orchestrator-late-binding-completion
type: STORY
title: 'Story: Handle Late-Binding Parent Completion'
status: ACTIVE
owner_persona: coder
created_at: '2026-05-04'
updated_at: '2026-05-04'
depends_on: []
jules_session_id: '5064556441935438928'
pr_number: null
parent: .foundry/epics/epic-012-024-improve-late-binding-completion.md
tags:
  - orchestrator
  - late-binding
  - bug
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Story: Handle Late-Binding Parent Completion

## Objective
Update `.github/scripts/foundry-orchestrator.ts` to properly manage the waking up of late-binding parent nodes whose dynamically spawned children have been completed. Ensure parents transition to `COMPLETED` if no tasks remain, or push them to eligible to wake up to `READY` state if unchecked tasks (`- [ ]`) remain. Add unit tests.

## Requirements
1. Differentiate between a node waiting for dependencies to complete to run again vs a node that is actually finished.
2. If no unchecked tasks remain in the body, transition to `COMPLETED`.
3. If unchecked tasks remain, push to eligible to wake up to `READY` state.
4. Provide unit tests in `.github/scripts/foundry-orchestrator.test.ts`.

## Dependencies
- None

## Acceptance Criteria
- [x] Coder: Implement the orchestrator fix and add tests.
