---
id: task-638-718-qa-extract-constants-to-core-v6
type: TASK
title: Verify Constants Extraction to Core Package V6
status: CANCELLED
owner_persona: qa
created_at: '2026-10-23'
updated_at: '2026-10-25'
depends_on:
  - task-638-717-extract-constants-to-core-v6
jules_session_id: null
parent: story-526-638-extract-constants
tags:
  - architecture
  - monorepo
  - pnpm
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-638-717-extract-constants-to-core-v6
locks: []
---

# Verify Constants Extraction to Core Package V6

## Description
Validate the correctness of the constants extraction.

## Acceptance Criteria
- [ ] Verify that constants are exported properly and imported correctly in the `src` directory without causing react/dom dependency pollution.
- [ ] Ensure tests pass (`pnpm lint && pnpm test`).
