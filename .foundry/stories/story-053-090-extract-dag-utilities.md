---
id: story-053-090-extract-dag-utilities
type: STORY
title: Extract Shared DAG Utilities
status: READY
owner_persona: tech_lead
created_at: '2026-06-02'
updated_at: '2026-06-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-036-053-shared-dag-utilities
tags:
  - refactor
  - foundry
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: Spawned from epic-036-053-shared-dag-utilities
---

# Extract Shared DAG Utilities

## 1. Introduction
This story details the technical steps for extracting shared DAG utility functions from existing orchestrator scripts (`foundry-orchestrator.ts` and `foundry-heartbeat.ts`) into a new shared module `dag-utils.ts`.

## 2. Technical Tasks
- Create `.github/scripts/dag-utils.ts`.
- Extract basic utility functions (e.g., `todayISO`, `logToJournal`).
- Extract the pure DAG traversal functions:
  - `buildReverseDependencyGraph(nodes, resolveNodePath)`
  - `getOrphanedNodes(startNodePath, reverseGraph)`
- Create unit tests for the extracted logic inside `dag-utils.ts`.
- Update the DAG orchestration scripts and their tests to import and use the new module.

## Next Steps
- [x] Tech Lead: Write Tasks to implement the file creation, extraction, test writing, and test updates.
  - [.foundry/tasks/task-090-148-extract-dag-utils-impl.md](.foundry/tasks/task-090-148-extract-dag-utils-impl.md)
  - [.foundry/tasks/task-090-149-extract-dag-utils-qa.md](.foundry/tasks/task-090-149-extract-dag-utils-qa.md)

## Acceptance Criteria
- [ ] `dag-utils.ts` is created containing `todayISO`, `logToJournal`, `buildReverseDependencyGraph`, and `getOrphanedNodes`.
- [ ] Appropriate unit tests are added for the new utility file.
- [ ] Existing functionality works seamlessly utilizing the new utility file.
