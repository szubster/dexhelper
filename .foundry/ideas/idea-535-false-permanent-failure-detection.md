---
id: idea-535-false-permanent-failure-detection
type: IDEA
title: False Permanent Failure Detection & Distinction in Orchestrator
status: PENDING
owner_persona: product_manager
created_at: '2026-10-04T05:32:46Z'
updated_at: '2026-10-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 80
---

# Idea: False Permanent Failure Detection & Distinction in Orchestrator

## Problem
When tasks hit the maximum rejection count (`MAX_REJECTION_THRESHOLD = 3`), the Orchestrator auto-cancels them with the generic status message `Max rejection count reached`.
However, analysis of session transcripts and commit logs shows that many of these rejections are caused by system-level agent session crashes (`[ACKNOWLEDGED] Session terminated with state: NOT_FOUND`) rather than actual domain/QA rejections.
This causes false permanent failures, obscuring the true root cause and unnecessarily cancelling tasks that were otherwise sound.

## Proposed Solution
Enhance the Orchestrator (Phase 3.0 rejection processing) and telemetry scripts to:
1. Distinguish between system/infrastructure session crashes (`NOT_FOUND`, `INTERNAL_ERROR`) and human/agent QA domain rejections.
2. Maintain a separate infrastructure failure counter or bypass `rejection_count` increments for `NOT_FOUND` session terminations.
3. Provide explicit rejection reasons when auto-cancelling nodes so that parent nodes and researchers can immediately identify infrastructure issues versus implementation bugs.

## Value
Reduces false-positive task cancellations, prevents unnecessary DAG deadlocks, and improves pipeline throughput across The Foundry.

## Acceptance Criteria
- [ ] prd-535-586-false-permanent-failure-detection
