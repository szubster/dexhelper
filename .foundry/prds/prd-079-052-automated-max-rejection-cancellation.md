---
id: prd-079-052-automated-max-rejection-cancellation
type: PRD
title: Automated Max Rejection Cancellation
status: READY
owner_persona: epic_planner
created_at: '2026-06-16'
updated_at: '2026-06-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-079-automated-max-rejection-cancellation
tags:
  - foundry
  - orchestrator
  - resilience
research_references: []
notes: ''
rejection_reason: ''
---

# Automated Max Rejection Cancellation PRD

## Context
When reviewing the DAG state, the Agile Coach observed several `TASK` and `PRD` nodes that reached the `MAX_REJECTION_THRESHOLD` (e.g., `rejection_count: 3` or `4`). The nodes remained in `FAILED` status indefinitely instead of transitioning to `CANCELLED`. While the Resurrection Loop ignores them, leaving them in `FAILED` status means upstream parent nodes are not reliably awakened via the "Impossible Loop" logic, and dependent sibling tasks are orphaned.

## Requirements
Refactor the Foundry Orchestrator (`foundry-orchestrator.ts`) to automatically transition a node's status to `CANCELLED` when its `rejection_count` meets or exceeds `MAX_REJECTION_THRESHOLD`.

1. When a node is evaluated and `status === 'FAILED'`, if `rejection_count >= MAX_REJECTION_THRESHOLD`, change its status to `CANCELLED`.
2. Ensure this triggers the proper parent awakening logic in Phase 3.6 of `foundry-orchestrator.ts`. The condition `node.frontmatter.status === 'FAILED'` must be expanded to include `CANCELLED` nodes with a rejection reason.

## Acceptance Criteria
- [x] Break down into Epics.
- [ ] .foundry/epics/epic-052-096-automated-max-rejection-cancellation.md
