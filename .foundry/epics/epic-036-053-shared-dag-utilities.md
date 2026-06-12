---
id: epic-036-053-shared-dag-utilities
type: EPIC
title: Shared DAG Utilities Module
status: PENDING
owner_persona: story_owner
created_at: '2026-05-31'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: null
parent: prd-067-036-extract-dag-utils
tags:
  - refactor
  - foundry
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: Spawned from prd-067-036-extract-dag-utils.
---

# Extract Shared DAG Utilities

## 1. Introduction
This epic extracts pure functions from `.github/scripts/foundry-orchestrator.ts` and `.github/scripts/foundry-heartbeat.ts` into a shared module `.github/scripts/dag-utils.ts` to reduce duplicate DAG management logic.

## 2. Scope
- Create `.github/scripts/dag-utils.ts`.
- Extract utility functions like `todayISO` and `logToJournal`.
- Extract pure functions:
  - `buildReverseDependencyGraph(nodes, resolveNodePath)`
  - `getOrphanedNodes(startNodePath, reverseGraph)`
- Create unit tests for complex logic within `dag-utils.ts`.
- Update the DAG orchestration tests to use the new module.

## Next Steps
- [x] Story Owner: Write Story to create the `dag-utils.ts` module with pure functions and basic utilities.
  - Spawned: `.foundry/archive/stories/story-053-090-extract-dag-utilities.md`


- [ ] Story Owner: Write Story to create unit tests for `dag-utils.ts`.
  - Spawned: `.foundry/stories/story-053-106-dag-utils-unit-tests.md`
- [ ] Story Owner: Write Story to update DAG orchestration tests.
  - Spawned: `.foundry/stories/story-053-107-update-dag-orchestration-tests.md`

## Acceptance Criteria
- [ ] `dag-utils.ts` is created and contains the extracted pure functions and utilities.
- [ ] New unit tests are written for `dag-utils.ts`.
- [ ] Existing tests still pass.
