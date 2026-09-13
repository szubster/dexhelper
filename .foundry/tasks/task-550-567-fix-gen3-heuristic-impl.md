---
id: task-550-567-fix-gen3-heuristic-impl
type: TASK
title: Fix isGen3Save heuristic in detection.ts
status: READY
owner_persona: coder
created_at: '2026-09-09'
updated_at: '2026-09-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-536-550-remove-mock-and-fix-heuristic
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Fix isGen3Save heuristic in detection.ts

## Context
The `isGen3Save` heuristic in `src/engine/saveParser/utils/detection.ts` currently has some flaws and throws errors (like `RangeError`). It is being mocked out in `src/engine/saveParser/index.test.ts` which bypasses the real heuristic. This task aims to fix the heuristic implementation so it correctly identifies Gen 3 saves without throwing unhandled errors.

## Requirements
- Update `isGen3Save` in `src/engine/saveParser/utils/detection.ts`.
- Fix the `RangeError` and make sure the function correctly identifies Gen 3 saves based on the structural signatures (e.g. A/B flash bank system with multiple checksums per sector, 14 sectors per slot, 0x1000 byte sector size, magic signature 0x08012025 at offset 0x0FF8).
- Ensure the function returns false instead of throwing if the buffer is incomplete or not a valid Gen 3 save.

## Acceptance Criteria
- [x] Fix `isGen3Save` in `src/engine/saveParser/utils/detection.ts` to correctly identify Gen 3 saves and handle RangeError gracefully.
