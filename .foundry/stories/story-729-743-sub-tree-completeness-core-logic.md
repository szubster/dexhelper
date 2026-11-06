---
id: story-729-743-sub-tree-completeness-core-logic
type: STORY
title: Sub-Tree Completeness Validator - Core Logic
status: READY
owner_persona: tech_lead
created_at: '2026-10-26'
updated_at: '2026-10-26'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-726-729-sub-tree-completeness-validator
tags:
  - orchestrator
  - tree-validation
rejection_count: 0
rejection_reason: ''
---

# STORY: Sub-Tree Completeness Validator - Core Logic

## Context
As part of `epic-726-729-sub-tree-completeness-validator`, we need to implement the core logic for the Sub-Tree Completeness Validator within the orchestrator to prevent macro nodes from being verified prematurely before all descendant nodes have transitioned to `COMPLETED`.

## Scope & Implementation
- Implement the DAG-tree validation logic within `packages/foundry/foundry-orchestrator.ts`.
- Ensure nodes transition to `VERIFYING` only if their full descendant sub-tree (derived from `depends_on` or `parent` links) has achieved `COMPLETED` status.
- Write unit tests in `packages/foundry/tests/` to verify this behavior.

## Acceptance Criteria
- [ ] Tech Lead: Break down into tasks for Coder and QA.
