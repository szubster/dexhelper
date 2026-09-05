---
id: idea-152-deterministic-dag-tree-archival
type: IDEA
title: Deterministic DAG Tree Archival in Orchestrator
status: PENDING
owner_persona: product_manager
created_at: '2026-08-15T20:00:00.000Z'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - infrastructure
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Deterministic DAG Tree Archival in Orchestrator

## Problem
Currently, DAG node archival is handled by persona instructions (e.g., TPM agent) or manual sweeps, which can lead to non-deterministic archiving behavior or premature archival of individual completed nodes while their broader DAG tree/family is still active. Non-deterministic archival relies on LLM agent execution, which can be inconsistent or delayed.

## Solution
Move tree-level archival logic into the DAG orchestrator (or a deterministic automated script step) so that node archival is 100% deterministic and automated:
1. **Tree Completeness Verification:** The orchestrator evaluates whole DAG trees from root nodes to all leaf descendants.
2. **Whole-Tree Terminal State Trigger:** A tree is archived if and only if EVERY node in the tree (from root down to all leaves) is in a terminal state (`COMPLETED` or `CANCELLED`).
3. **Context Preservation:** If any node in a tree's parent chain or descendant hierarchy is in a non-terminal state, no nodes in that tree are moved to `.foundry/archive/`, ensuring full knowledge context remains available to active agents.
4. **Link Updating:** The orchestrator deterministically updates inline markdown link references across active files when moving nodes to `.foundry/archive/`.

## Why this matters
Automating DAG tree archival in the orchestrator guarantees strict adherence to the whole-tree terminal state rule, removes reliance on agent prompts for filesystem moves, prevents context loss, and keeps the active `.foundry/` directory clean.

## Acceptance Criteria
- [ ] prd-152-517-deterministic-dag-tree-archival
