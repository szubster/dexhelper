---
id: task-638-713-extract-constants-to-core-v5
type: TASK
title: Extract Constants to Core Package V5
status: CANCELLED
owner_persona: coder
created_at: '2026-10-21T17:50:37.000Z'
updated_at: '2026-10-23'
depends_on:
  - research-638-712-investigate-constants-extraction-v4-failure
jules_session_id: null
pr_number: null
parent: story-526-638-extract-constants
tags:
  - architecture
  - monorepo
  - pnpm
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  research-638-712-investigate-constants-extraction-v4-failure
notes: ''
locks: []
---

# Extract Constants to Core Package V5

## Description
Extract the game constants into the `@dexhelper/core` package to isolate domain logic and prepare for the pnpm workspace migration. This task must implement the revised strategy formulated in `research-638-712-investigate-constants-extraction-v4-failure`.

## Acceptance Criteria
- [ ] Implement the revised deduplication/extraction strategy formulated in `research-638-712-investigate-constants-extraction-v4-failure`.
- [ ] Move constants files to `packages/core/src/...` according to the new strategy.
- [ ] Ensure `@dexhelper/core` correctly exports these constants in its `index.ts`.
- [ ] Ensure strict zero DOM, React, or browser-specific dependencies in the extracted files.
- [ ] Update all import references in the main `src/` directory to point to `@dexhelper/core`.
