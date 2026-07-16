---
id: epic-036-329-shared-dag-utilities
type: EPIC
title: Shared DAG Utilities
status: PENDING
owner_persona: story_owner
created_at: "2026-07-16"
updated_at: "2026-07-16"
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
rejection_reason: ""
notes: ""
---

# Shared DAG Utilities

## Description
This epic focuses on encapsulating DAG reverse-dependency generation and standardizing the traversal of orphaned nodes. It involves creating `dag-utils.ts` and extracting `buildReverseDependencyGraph`, `getOrphanedNodes`, and simple utility functions (`todayISO`, `logToJournal`).

## Acceptance Criteria
- [ ] Create `dag-utils.ts`.
- [ ] Extract `buildReverseDependencyGraph` from the orchestrator and heartbeat scripts.
- [ ] Extract `getOrphanedNodes` from the orchestrator and heartbeat scripts.
- [ ] Extract utility functions like `todayISO` and `logToJournal`.
- [ ] Write unit tests for extracted complex logic.
- [ ] Ensure all DAG orchestration tests continue to pass.
