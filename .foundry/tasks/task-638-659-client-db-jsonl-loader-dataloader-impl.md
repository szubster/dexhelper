---
id: task-638-659-client-db-jsonl-loader-dataloader-impl
type: TASK
title: Integrate DataLoader for Items and Moves
status: READY
owner_persona: coder
created_at: '2026-10-03'
updated_at: '2026-10-07'
depends_on:
  - task-638-658-client-db-jsonl-loader-db-impl
jules_session_id: null
pr_number: null
parent: story-088-638-client-db-jsonl-loader
tags:
  - db
  - performance
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Integrate DataLoader for Items and Moves

## Context
Bulk database methods have been created for items and moves. We now need to integrate them into the global DataLoader to batch requests across components.

## Acceptance Criteria
- [ ] Integrate \`DataLoader\` instances for \`items\` and \`moves\` in \`src/db/DexDataLoader.ts\` to batch requests and prevent N+1 IDB query bottlenecks.
- [ ] Ensure the loaders call \`pokeDB.getItemsBulk\` and \`pokeDB.getMovesBulk\` respectively.
