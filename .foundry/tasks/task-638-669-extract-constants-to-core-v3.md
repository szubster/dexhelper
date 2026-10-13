---
id: task-638-669-extract-constants-to-core-v3
type: TASK
title: Extract Constants to Core Package V3
status: PENDING
owner_persona: coder
created_at: '2026-10-08'
updated_at: '2026-10-08'
depends_on:
  - research-638-668-investigate-constants-extraction-retry-failure
jules_session_id: null
pr_number: null
parent: story-526-638-extract-constants
tags:
  - architecture
  - monorepo
  - pnpm
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Extract Constants to Core Package V3

## Description
Extract the game constants (`src/utils/constants.ts`, `src/engine/**/constants.ts`, etc.) into the `@dexhelper/core` package to isolate domain logic and prepare for the pnpm workspace migration. This task must implement the revised strategy formulated in `research-638-668-investigate-constants-extraction-retry-failure`.

## Acceptance Criteria
- [ ] Implement the revised deduplication/extraction strategy formulated in `research-638-668-investigate-constants-extraction-retry-failure`.
- [ ] Move constants files to `packages/core/src/...` according to the new strategy.
- [ ] Ensure `@dexhelper/core` correctly exports these constants in its `index.ts`.
- [ ] Ensure strict zero DOM, React, or browser-specific dependencies in the extracted files.
- [ ] Update all import references in the main `src/` directory to point to `@dexhelper/core`.