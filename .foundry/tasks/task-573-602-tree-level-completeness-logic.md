---
id: task-573-602-tree-level-completeness-logic
type: TASK
title: Implement Tree Level Completeness Verification
status: ACTIVE
owner_persona: coder
created_at: '2026-09-20T19:00:00Z'
updated_at: '2026-09-25'
depends_on: []
jules_session_id: '11365892075984344241'
pr_number: null
parent: story-550-573-tree-level-completeness-logic
tags:
  - foundry
  - infrastructure
  - orchestrator
rejection_count: 0
rejection_reason: ''
locks: []
---

# Implement Tree Level Completeness Verification

## Objective
Implement tree-level completeness verification in `.github/scripts/sweep-active-nodes.ts` to block archival if any node in the tree is non-terminal.

## Context & Blueprints
Currently, `sweep-active-nodes.ts` evaluates nodes individually for archival (if `status === 'COMPLETED'` or `'CANCELLED'`). We need to evaluate the entire parent/descendant chain (undirected tree).

1. Parse all node frontmatters across all `.md` files in `.foundry` (excluding `archive`).
2. Build an undirected graph where an edge exists if a node references another via `parent`.
3. Find connected components (trees) within this graph.
4. A component is completely terminal if and only if EVERY node in the component has `status === 'COMPLETED'` or `status === 'CANCELLED'`.
5. Move nodes to the `archive` directory ONLY if their connected component is completely terminal.

## Acceptance Criteria
- [ ] Parse all nodes and build a parent-child undirected graph in `sweep-active-nodes.ts`.
- [ ] Implement connected component traversal to evaluate tree-level completeness.
- [ ] Block archival of any nodes in a component if at least one node is non-terminal (`ACTIVE`, `READY`, etc.).
- [ ] Update `sweep-active-nodes.test.ts` with tests for:
  - A parent is COMPLETED but a child is ACTIVE (both should be blocked).
  - Both parent and child are COMPLETED (both should be archived).
