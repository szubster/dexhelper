---
id: task-638-666-extract-constants-to-core-retry
type: TASK
title: Extract Constants to Core Package Retry
status: PENDING
owner_persona: coder
created_at: '2026-10-05'
updated_at: '2026-10-05'
depends_on:
  - research-638-665-investigate-constants-extraction
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

# Extract Constants to Core Package Retry

## Description
This is a retry of the constants extraction task. Move the game constants (`src/utils/constants.ts`, `src/engine/**/constants.ts`, etc.) into the `@dexhelper/core` package to isolate domain logic and prepare for the pnpm workspace migration. This must wait for the findings of the corresponding research node to handle deduplication correctly.

## Acceptance Criteria
- [ ] Implement the deduplication strategy formulated in `research-638-665-investigate-constants-extraction`.
- [ ] Move constants files to `packages/core/src/...` while maintaining directory structure logic.
- [ ] Ensure `@dexhelper/core` exports these constants in its `index.ts`.
- [ ] Ensure strict zero DOM, React, or browser-specific dependencies in the extracted files.
- [ ] Update all import references in the main `src/` directory to point to `@dexhelper/core`.
