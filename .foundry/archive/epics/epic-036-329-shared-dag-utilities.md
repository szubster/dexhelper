---
id: epic-036-329-shared-dag-utilities
type: EPIC
title: Shared DAG Utilities Module
status: CANCELLED
owner_persona: story_owner
created_at: '2026-07-16'
updated_at: '2026-07-17'
depends_on: []
jules_session_id: null
parent: prd-067-036-extract-dag-utils
tags:
  - refactor
  - foundry
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: Cancelled due to cascading cancellation from parent
notes: >-
  Spawned from prd-067-036-extract-dag-utils. Replaces failed
  epic-036-053-shared-dag-utilities.
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
- Provide End-to-End/Integration stories to fully satisfy previously failed acceptance criteria.

## Next Steps
- [ ] .foundry/stories/story-329-331-extract-dag-utilities.md
- [ ] .foundry/stories/story-329-332-dag-utils-unit-tests.md
- [ ] .foundry/stories/story-329-333-update-dag-orchestration-tests.md
- [ ] .foundry/stories/story-329-334-e2e-integration-test.md

## Acceptance Criteria
- [ ] `dag-utils.ts` is created and contains the extracted pure functions and utilities.
- [ ] New unit tests are written for `dag-utils.ts`.
- [ ] Existing tests still pass.
- [ ] E2E integration test confirms behavior is unaffected across orchestrator functions.
