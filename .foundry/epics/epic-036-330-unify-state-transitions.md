---
id: epic-036-330-unify-state-transitions
type: EPIC
title: Unify Node State Transitions
status: PENDING
owner_persona: story_owner
created_at: '2026-07-16'
updated_at: '2026-07-16'
depends_on:
  - epic-036-329-shared-dag-utilities
jules_session_id: null
pr_number: null
parent: prd-067-036-extract-dag-utils
tags:
  - refactor
  - foundry
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Unify Node State Transitions

## 1. Goal
Refactor existing `.github/scripts/` (specifically `foundry-orchestrator.ts` and `foundry-heartbeat.ts`) to use unified node state transition functions defined in the new `dag-utils.ts` module, ensuring consistent metadata handling and adherence to ADRs.

## 2. Scope
*   Implement `transitionNodeToFailed` in `dag-utils.ts`.
*   Implement `transitionNodeToCompleted` in `dag-utils.ts`.
*   Implement `transitionNodeToReady` in `dag-utils.ts`.
*   Refactor `foundry-orchestrator.ts` and `foundry-heartbeat.ts` to use these shared functions.
*   Ensure all DAG orchestration tests in `.github/scripts/` pass without modification to their external behavior expectations.

## 3. Dependencies
Depends on the creation of the shared utilities module.

## 4. Acceptance Criteria
- [ ] Story Owner: Break down into Stories.
