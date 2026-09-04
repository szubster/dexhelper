---
id: prd-152-517-deterministic-dag-tree-archival
type: PRD
title: Deterministic DAG Tree Archival in Orchestrator
status: READY
owner_persona: epic_planner
created_at: '2026-09-02'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-152-deterministic-dag-tree-archival
tags:
  - foundry
  - infrastructure
  - orchestrator
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Deterministic DAG Tree Archival in Orchestrator

## Objective
Implement deterministic, whole-tree DAG archival directly into the DAG orchestrator (`.github/scripts/foundry-orchestrator.ts`). This ensures that entire trees (from root to leaf nodes) are consistently moved to `.foundry/archive/` only when every single node in the tree has reached a terminal state (`COMPLETED` or `CANCELLED`).

## Context
Currently, archival relies on non-deterministic LLM agent execution (e.g., TPM persona), which can result in inconsistent behavior and premature archival of individual completed nodes while related family nodes remain active. This breaks contextual links for agents working on active nodes and litters the active directory.

## Requirements

### 1. Whole-Tree Completeness Verification
- The orchestrator MUST evaluate node completeness at the "tree" level.
- A tree is considered terminal if and only if EVERY node in the tree's entire parent chain and descendant hierarchy is in a terminal state (`COMPLETED` or `CANCELLED`).
- If even a single node in a family tree is non-terminal (e.g., `ACTIVE`, `PENDING`, `READY`, `VERIFYING`), no nodes from that tree may be archived.

### 2. Archival Operation
- When a tree is identified as completely terminal, the orchestrator MUST systematically move all files belonging to that tree from `.foundry/*` to `.foundry/archive/*` (preserving their type-specific subdirectories, e.g., `.foundry/archive/ideas/`, `.foundry/archive/tasks/`).
- This operation must be 100% deterministic, automated, and executed as part of the regular orchestrator execution (e.g., heartbeat or dispatch cycle).

### 3. Markdown Link Resolution (Deterministic Updates)
- Before or during archival, the orchestrator MUST scan all active nodes (`.foundry/**/*.md` excluding journals/docs).
- If an active node contains an inline markdown link to a node that is being archived, the orchestrator MUST automatically update that link to point to the new location. Links must use the strict Node ID schema without file extensions (e.g. `[title](prd-152-517-deterministic-dag-tree-archival)`). If legacy path-based links are found during scanning, they must be upgraded to the ID-only format.
- This ensures active context is never broken by dead links.
