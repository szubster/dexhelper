---
id: epic-036-053-shared-dag-utilities
type: EPIC
title: Shared DAG Utilities Module
status: PENDING
owner_persona: story_owner
created_at: '2026-07-16'
updated_at: '2026-07-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-067-036-extract-dag-utils
tags:
  - refactor
  - foundry
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Shared DAG Utilities Module

## 1. Goal
Create a shared utilities module (`.github/scripts/dag-utils.ts`) to encapsulate DAG reverse-dependency generation and standardize the traversal of orphaned nodes. This eliminates duplication between the orchestrator and heartbeat scripts.

## 2. Scope
*   Create `.github/scripts/dag-utils.ts`.
*   Implement `buildReverseDependencyGraph`.
*   Implement `getOrphanedNodes`.
*   Extract pure utility functions (e.g., `todayISO`, `logToJournal`) to this module.

## 3. Dependencies
None.

## 4. Acceptance Criteria
- [ ] Story Owner: Break down into Stories.
