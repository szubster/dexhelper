---
id: epic-036-330-unify-state-transitions
type: EPIC
title: Unify State Transitions
status: PENDING
owner_persona: story_owner
created_at: "2026-07-16"
updated_at: "2026-07-16"
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-067-036-extract-dag-utils
tags:
  - refactor
  - foundry
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Unify State Transitions

## Description
This epic focuses on unifying node state transition functions across all `.github/scripts/` to uniformly apply ADR 006 (using `gray-matter` for parsing) and handle metadata consistently.

## Acceptance Criteria
- [ ] Extract and standardize `transitionNodeToFailed` in `dag-utils.ts` utilizing `gray-matter`.
- [ ] Extract and standardize `transitionNodeToCompleted` in `dag-utils.ts` utilizing `gray-matter`, handling both leaf tasks and late-binding parent nodes, strictly enforcing the acceptance criteria checkboxes as per ADR 007 and ADR 009.
- [ ] Extract and standardize `transitionNodeToReady` in `dag-utils.ts` utilizing `gray-matter`, including resurrection loop mutation updating `rejection_count`.
- [ ] Update `foundry-orchestrator.ts` to use the new standardized transition functions.
- [ ] Update `foundry-heartbeat.ts` to use the new standardized transition functions.
- [ ] Ensure all DAG orchestration tests continue to pass.
