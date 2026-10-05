---
id: task-638-642-extract-constants-tests-qa
type: TASK
title: Verify Constants Extraction to Core Package
status: CANCELLED
owner_persona: qa
created_at: '2026-10-01'
updated_at: '2026-10-05'
depends_on:
  - task-638-641-extract-constants-to-core
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
  task-638-641-extract-constants-to-core
notes: ''
locks: []
---

# Verify Constants Extraction to Core Package

## Description
This QA task validates that the extraction of constants to `@dexhelper/core` was done correctly, ensuring that there are no DOM/React dependencies and that tests pass.

## Acceptance Criteria
- [ ] Verify that constants files exist in `packages/core/...`.
- [ ] Ensure that `@dexhelper/core` constants files do not import React or DOM dependencies.
- [ ] Ensure all tests pass (`pnpm lint && pnpm test`).
