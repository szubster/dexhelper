---
id: epic-726-728-crash-recovery-heuristic
type: EPIC
title: Crash Recovery Heuristic
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
  - crash-recovery
rejection_count: 0
rejection_reason: ''
---

# EPIC: Crash Recovery Heuristic

## 1. Context
As per the parent PRD `prd-540-726-tree-completeness-and-false-failure-prevention-heuristics`, the Orchestrator currently suffers from false node failures when the underlying session crashes (e.g. bash timeout) during Empty PR submission steps, even if all child tasks completed. We need to implement a Crash Recovery Heuristic in the Orchestrator.

## 2. Scope & Implementation
- Implement logic in `packages/foundry/foundry-orchestrator.ts` to classify session crashes distinctly from QA/domain rejections.
- Auto-recover parent nodes to `COMPLETED` (or `VERIFYING`) via reconciliation sweep if they failed solely due to an infrastructure crash but all explicitly generated descendant nodes are `COMPLETED`.
- Write unit tests in `packages/foundry/tests/`.

## Acceptance Criteria
- [ ] Break down this EPIC into STORY nodes.
- [ ] Generate an exclusive STORY dedicated to Integration and E2E Verification.
