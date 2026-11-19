---
id: story-728-743-implement-crash-recovery-heuristic
type: STORY
title: Implement Crash Recovery Heuristic
status: READY
owner_persona: tech_lead
created_at: '2026-10-26'
updated_at: '2026-10-26'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-726-728-crash-recovery-heuristic
tags:
  - orchestrator
  - crash-recovery
rejection_count: 0
rejection_reason: ''
---

# STORY: Implement Crash Recovery Heuristic

## 1. Context
As part of the Crash Recovery Heuristic EPIC, we need to implement the core logic in `packages/foundry/foundry-orchestrator.ts` to classify session crashes distinctly from QA/domain rejections, and to auto-recover parent nodes.

## 2. Scope
- Update `packages/foundry/foundry-orchestrator.ts` with crash classification logic.
- Implement auto-recovery and reconciliation sweep logic.
- Add unit tests.

## Acceptance Criteria
- [ ] Break down this STORY into TASK nodes.
