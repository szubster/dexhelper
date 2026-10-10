---
id: task-638-670-qa-extract-constants-to-core-v3
type: TASK
title: Verify Constants Extraction to Core Package V3
status: PENDING
owner_persona: qa
created_at: '2026-10-08'
updated_at: '2026-10-08'
depends_on:
  - task-638-669-extract-constants-to-core-v3
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

# Verify Constants Extraction to Core Package V3

## Description
Validate that the extraction of constants to `@dexhelper/core` was done correctly, following the V3 strategy. Ensure there are no DOM/React dependencies, duplicate exports are resolved, and all references in `src/` are updated correctly.

## Acceptance Criteria
- [ ] Verify that constants files exist in `packages/core/...` and follow the V3 strategy structure.
- [ ] Ensure that `@dexhelper/core` constants files do not import React or DOM dependencies.
- [ ] Ensure all tests pass (`pnpm lint && pnpm test`).