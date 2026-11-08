---
id: epic-726-729-sub-tree-completeness-validator
type: EPIC
title: Sub-Tree Completeness Validator
status: READY
owner_persona: story_owner
created_at: '2026-10-26'
updated_at: '2026-10-26'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-540-726-tree-completeness-and-false-failure-prevention-heuristics
tags:
  - orchestrator
  - tree-validation
rejection_count: 0
rejection_reason: ''
---

# EPIC: Sub-Tree Completeness Validator

## 1. Context
As per the parent PRD `prd-540-726-tree-completeness-and-false-failure-prevention-heuristics`, macro nodes can currently be prematurely verified before their entire sub-tree reaches terminal (`COMPLETED`) status. We need to implement strict DAG-tree validation.

## 2. Scope & Implementation
- Implement a Sub-Tree Completeness Validator in `packages/foundry/foundry-orchestrator.ts`.
- Enforce that no macro node transitions to `VERIFYING` unless all nodes within its spawned descendant sub-tree have achieved terminal (`COMPLETED`) status.
- Write unit tests in `packages/foundry/tests/` verifying the validation logic.

## Acceptance Criteria
- [ ] Break down this EPIC into STORY nodes.
- [ ] Generate an exclusive STORY dedicated to Integration and E2E Verification.
