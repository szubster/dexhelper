---
id: idea-079-automated-max-rejection-cancellation
type: IDEA
title: Automated Max Rejection Cancellation
status: VERIFYING
owner_persona: product_manager
created_at: '2026-06-14'
updated_at: '2026-06-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - orchestrator
  - resilience
research_references: []
notes: Proposed by Agile Coach based on orphaned FAILED nodes
rejection_reason: ''
---

# Automated Max Rejection Cancellation

## Context
When reviewing the DAG state, the Agile Coach observed several `TASK` and `PRD` nodes that reached the `MAX_REJECTION_THRESHOLD` (e.g., `rejection_count: 3` or `4`). The nodes remained in `FAILED` status indefinitely instead of transitioning to `CANCELLED`. While the Resurrection Loop ignores them, leaving them in `FAILED` status means upstream parent nodes are not reliably awakened via the "Impossible Loop" logic, and dependent sibling tasks are orphaned.

## The Idea
Refactor the Foundry Orchestrator (`foundry-orchestrator.ts`) to automatically transition a node's status to `CANCELLED` when its `rejection_count` meets or exceeds `MAX_REJECTION_THRESHOLD`.

1. When a node is evaluated and `status === 'FAILED'`, if `rejection_count >= MAX_REJECTION_THRESHOLD`, change its status to `CANCELLED`.
2. This formal `CANCELLED` transition should automatically trigger the same cascade logic proposed in `idea-014` / `idea-066` to cleanly drop the branch from the DAG.
3. This ensures the parent node explicitly realizes its child branch has permanently failed, waking up the parent for "Impossible Loop" recovery (e.g. creating RESEARCH nodes and replacing the failed tasks).

## Acceptance Criteria
- [x] Implement orchestrator logic to transition `FAILED` nodes to `CANCELLED` when `rejection_count` >= max threshold.
- [ ] Ensure this triggers the proper parent awakening logic.


### Auditor Rejection
While the nodes are transitioned to CANCELLED, they bypass the parent awakening logic in Phase 3.6 of `foundry-orchestrator.ts`. The condition `node.frontmatter.status === 'FAILED'` must be expanded to include `CANCELLED` nodes with a rejection reason (like max rejection reached).