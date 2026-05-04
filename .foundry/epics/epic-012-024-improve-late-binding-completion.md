---
id: epic-012-024-improve-late-binding-completion
type: EPIC
title: 'Epic: Improve Late Binding Parent Completion'
status: "COMPLETED"
owner_persona: story_owner
created_at: '2026-05-04'
updated_at: "2026-05-04"
depends_on: []
jules_session_id: null
pr_number: null
parent: .foundry/prds/prd-013-012-improve-late-binding-completion.md
tags:
  - orchestrator
  - late-binding
  - bug
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Improve Late Binding Parent Completion

## Objective
Enhance the Foundry orchestrator (`.github/scripts/foundry-orchestrator.ts`) to properly handle the completion and waking up of late-binding parent nodes whose dynamically spawned children have been completed.

## Requirements
1. The orchestrator must detect when a parent node is in a "wait & wake" state (e.g., `PENDING` due to late binding) and all its dynamically spawned children are completed.
2. Differentiate between a node waiting for dependencies to complete to run again versus a node that is actually finished.
3. If no unchecked tasks (`- [ ]`) remain in the markdown body of the parent, transition its status to `COMPLETED`.
4. If unchecked tasks (`- [ ]`) remain in the markdown body, push it to eligible to wake up to `READY` state so it can be dispatched again to spawn new work.
5. Provide unit tests to verify the new functionality in `.github/scripts/foundry-orchestrator.test.ts`.

## Dependencies
- None

## Acceptance Criteria
- [x] Story Owner: Break this Epic down into actionable stories.

- `.foundry/stories/story-024-037-orchestrator-late-binding-completion.md`