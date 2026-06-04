---
id: epic-036-054-unify-state-transitions
type: EPIC
title: Unify DAG Node State Transitions
status: PENDING
owner_persona: story_owner
created_at: '2026-05-31'
updated_at: '2026-05-31'
depends_on:
  - epic-036-053-shared-dag-utilities
jules_session_id: null
parent: prd-067-036-extract-dag-utils
tags:
  - refactor
  - foundry
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: Spawned from prd-067-036-extract-dag-utils.
---

# Unify DAG Node State Transitions

## 1. Introduction
This epic extracts state transition functions into the new shared module `.github/scripts/dag-utils.ts` and updates both the orchestrator and heartbeat scripts to uniformly apply these functions.

## 2. Scope
- Move node state transition functions to `.github/scripts/dag-utils.ts`:
  - `transitionNodeToFailed(node, repoRoot, rejectionReason, dryRun)`
  - `transitionNodeToCompleted(node, repoRoot, prNumber, dryRun, hasChildrenCheck)`
  - `transitionNodeToReady(node, repoRoot, reason, dryRun)`
- Refactor `.github/scripts/foundry-orchestrator.ts` and `.github/scripts/foundry-heartbeat.ts` to replace local status mutations with the unified `dag-utils.ts` functions.
- Ensure the state transitions apply ADR 006 and handle metadata consistently.

## Next Steps
- [ ] Story Owner: Write Story to extract and use transition functions.

## Acceptance Criteria
- [ ] State transition functions are centralized in `dag-utils.ts`.
- [ ] Both orchestrator and heartbeat scripts use the centralized functions.
- [ ] All DAG orchestration tests pass.
