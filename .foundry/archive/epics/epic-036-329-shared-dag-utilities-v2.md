---
id: epic-036-329-shared-dag-utilities-v2
type: EPIC
title: Shared DAG Utilities Module V2
status: CANCELLED
owner_persona: story_owner
created_at: '2026-07-16'
updated_at: '2026-07-17'
depends_on:
  - research-036-325-investigate-dag-utils-failure
jules_session_id: null
parent: prd-067-036-extract-dag-utils
tags:
  - refactor
  - foundry
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: Cancelled due to cascading cancellation from parent
notes: Replacement for permanently failed epic-036-053-shared-dag-utilities.
---

# Extract Shared DAG Utilities V2

## 1. Introduction
This epic extracts pure functions from `.github/scripts/foundry-orchestrator.ts` and `.github/scripts/foundry-heartbeat.ts` into a shared module `.github/scripts/dag-utils.ts` to reduce duplicate DAG management logic. It replaces a previously failed attempt and explicitly depends on the research node that investigates the prior failure.

## 2. Scope
- Apply findings from `research-036-325-investigate-dag-utils-failure`.
- Create `.github/scripts/dag-utils.ts`.
- Extract utility functions like `todayISO` and `logToJournal`.
- Extract pure functions:
  - `buildReverseDependencyGraph(nodes, resolveNodePath)`
  - `getOrphanedNodes(startNodePath, reverseGraph)`
- Create unit tests for complex logic within `dag-utils.ts`.
- Update the DAG orchestration tests to use the new module.

## Next Steps
- [ ] Story Owner: Write Story to create the `dag-utils.ts` module applying research findings.
- [ ] Story Owner: Write Story to create unit tests for `dag-utils.ts`.
- [ ] Story Owner: Write Story to update DAG orchestration tests.

## Acceptance Criteria
- [ ] `dag-utils.ts` is created and contains the extracted pure functions and utilities.
- [ ] New unit tests are written for `dag-utils.ts`.
- [ ] Existing tests still pass.
