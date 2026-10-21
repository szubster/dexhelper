---
id: task-638-691-extract-constants-to-core-v4
type: TASK
title: Extract Constants to Core Package V4
status: FAILED
owner_persona: coder
created_at: '2026-10-16T06:41:10.364Z'
updated_at: '2026-10-21'
depends_on:
  - research-638-690-investigate-constants-extraction-v3-failure
jules_session_id: null
pr_number: null
parent: story-526-638-extract-constants
tags:
  - architecture
  - monorepo
  - pnpm
rejection_count: 2
rejection_reason: 'Session terminated with state: FAILED'
notes: ''
locks: []
---

# Extract Constants to Core Package V4

## Description
Extract the game constants into the `@dexhelper/core` package to isolate domain logic and prepare for the pnpm workspace migration. This task must implement the revised strategy formulated in `research-638-690-investigate-constants-extraction-v3-failure`.

## Acceptance Criteria
- [ ] Implement the revised deduplication/extraction strategy formulated in `research-638-690-investigate-constants-extraction-v3-failure`.
- [ ] Move constants files to `packages/core/src/...` according to the new strategy.
- [ ] Ensure `@dexhelper/core` correctly exports these constants in its `index.ts`.
- [ ] Ensure strict zero DOM, React, or browser-specific dependencies in the extracted files.
- [ ] Update all import references in the main `src/` directory to point to `@dexhelper/core`.
