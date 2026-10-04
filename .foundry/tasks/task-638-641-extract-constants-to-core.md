---
id: task-638-641-extract-constants-to-core
type: TASK
title: Extract Constants to Core Package
status: ACTIVE
owner_persona: coder
created_at: '2026-10-01'
updated_at: '2026-10-02'
depends_on: []
jules_session_id: '6979250225269423666'
pr_number: null
parent: story-526-638-extract-constants
tags:
  - architecture
  - monorepo
  - pnpm
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Extract Constants to Core Package

## Description
This task involves moving the game constants (`src/utils/constants.ts`, `src/engine/**/constants.ts`, etc.) into the `@dexhelper/core` package to isolate domain logic and prepare for the pnpm workspace migration, in line with Phase 3 of PRD 157-519.

## Acceptance Criteria
- [ ] Move constants files to `packages/core/src/...` while maintaining directory structure logic.
- [ ] Ensure `@dexhelper/core` exports these constants.
- [ ] Ensure strict zero DOM, React, or browser-specific dependencies.

## Implementation Details
- This task may require setting up `packages/core/package.json` if it doesn't exist, though this might be part of an earlier epic/story. Wait, looking at Phase 1 vs Phase 3, we should ensure the files are moved into the correct workspace.
