---
id: task-638-722-extract-constants-to-core-v7
type: TASK
title: Extract Constants to Core Package V7
status: READY
owner_persona: coder
created_at: '2026-10-25'
updated_at: '2026-10-25'
depends_on:
  - research-638-721-investigate-constants-extraction-v6-failure
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

# Extract Constants to Core Package V7

## Description
Extract the game constants into the `@dexhelper/core` package following the findings of the latest research task.

## Acceptance Criteria
- [ ] Implement the extraction strategy formulated in `research-638-721-investigate-constants-extraction-v6-failure`.
- [ ] Ensure all constant imports point to `@dexhelper/core`.
