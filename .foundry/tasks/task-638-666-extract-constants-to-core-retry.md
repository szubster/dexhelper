---
id: task-638-666-extract-constants-to-core-retry
type: TASK
title: Extract Constants to Core Package (Retry)
status: READY
owner_persona: coder
created_at: '2026-10-05'
updated_at: '2026-10-05'
depends_on:
  - research-638-665-investigate-extract-constants-failure
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

# Extract Constants to Core Package (Retry)

## Description
This is a retry of the previously failed task (`task-638-641-extract-constants-to-core`). This task involves moving the game constants (`src/utils/constants.ts`, `src/engine/**/constants.ts`, etc.) into the `@dexhelper/core` package to isolate domain logic and prepare for the pnpm workspace migration. **Crucially, the coder must read the findings in the upstream `research-638-665-investigate-extract-constants-failure` node to understand and avoid the previous failures.**

## Acceptance Criteria
- [ ] Read the findings documented in `research-638-665-investigate-extract-constants-failure.md` before implementation.
- [ ] Move constants files to `packages/core/src/...` while maintaining directory structure logic, adhering strictly to the research findings.
- [ ] Ensure `@dexhelper/core` exports these constants.
- [ ] Ensure strict zero DOM, React, or browser-specific dependencies.
