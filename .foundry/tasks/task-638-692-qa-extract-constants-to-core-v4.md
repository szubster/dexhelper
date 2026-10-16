---
id: task-638-692-qa-extract-constants-to-core-v4
type: TASK
title: Verify Constants Extraction to Core Package V4
status: READY
owner_persona: qa
created_at: '2026-10-16T06:41:10.372Z'
updated_at: '2026-10-16'
depends_on:
  - task-638-691-extract-constants-to-core-v4
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

# Verify Constants Extraction to Core Package V4

## Description
Validate that the extraction of constants to `@dexhelper/core` was done correctly, following the V4 strategy. Ensure there are no DOM/React dependencies, duplicate exports are resolved, and all references in `src/` are updated correctly.

## Acceptance Criteria
- [ ] Verify that constants files exist in `packages/core/...` and follow the V4 strategy structure.
- [ ] Ensure that `@dexhelper/core` constants files do not import React or DOM dependencies.
- [ ] Ensure all tests pass (`pnpm lint && pnpm test`).
