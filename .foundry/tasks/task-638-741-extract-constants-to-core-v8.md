---
id: task-638-741-extract-constants-to-core-v8
type: TASK
title: Extract Constants to Core Package V8
status: PENDING
owner_persona: coder
created_at: '2026-11-04'
updated_at: '2026-11-08'
depends_on:
  - research-638-740-investigate-constants-extraction-v7-failure
jules_session_id: null
parent: story-526-638-extract-constants
tags:
  - architecture
  - monorepo
  - pnpm
rejection_count: 0
rejection_reason: ''
locks: []
---

# Extract Constants to Core Package V8

## Description
Extract the game constants into the `@dexhelper/core` package following the findings of the latest research task.

## Acceptance Criteria
- [ ] Implement the extraction strategy formulated in `research-638-740-investigate-constants-extraction-v7-failure`.
- [ ] Ensure all constant imports point to `@dexhelper/core`.
