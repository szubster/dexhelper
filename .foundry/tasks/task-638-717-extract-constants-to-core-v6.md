---
id: task-638-717-extract-constants-to-core-v6
type: TASK
title: Extract Constants to Core Package V6
status: CANCELLED
owner_persona: coder
created_at: '2026-10-23'
updated_at: '2026-10-25'
depends_on:
  - research-638-716-investigate-constants-extraction-v5-failure
jules_session_id: null
parent: story-526-638-extract-constants
tags:
  - architecture
  - monorepo
  - pnpm
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
locks: []
---

# Extract Constants to Core Package V6

## Description
Extract the game constants into the `@dexhelper/core` package following the findings of the latest research task.

## Acceptance Criteria
- [ ] Implement the extraction strategy formulated in `research-638-716-investigate-constants-extraction-v5-failure`.
- [ ] Ensure all constant imports point to `@dexhelper/core`.
