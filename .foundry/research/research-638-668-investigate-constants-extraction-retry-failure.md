---
id: research-638-668-investigate-constants-extraction-retry-failure
type: RESEARCH
title: Investigate Constants Extraction V2 Failure
status: READY
owner_persona: researcher
created_at: '2026-10-08'
updated_at: '2026-10-08'
depends_on: []
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

# Investigate Constants Extraction V2 Failure

## Description
This node investigates the permanent failure of `task-638-666-extract-constants-to-core-retry`. The previous retry was supposed to implement the namespaced export strategy proposed in `research-638-665-investigate-constants-extraction`, but still permanently failed (Max Rejection Count reached).

## Acceptance Criteria
- [x] Investigate the root cause of the failure of `task-638-666-extract-constants-to-core-retry` by checking git history, orchestrator logs, or recent commits.
- [x] Determine why the previously proposed strategy (namespaced exports) failed during implementation.
- [x] Propose a revised, concrete strategy for successfully extracting these constants to the `core` package without causing duplicate export or linting errors.
- [x] Document findings in the researcher persona journal.

## Research Report

### Root Cause
When investigating the permanent failure (`Max rejection count reached`) of `task-638-666-extract-constants-to-core-retry`, the git history showed its prior rejection reasons were `[ACKNOWLEDGED] Session terminated with state: COMPLETED`. This means the task was a false permanent failure due to repeated system-level agent session crashes (likely submitting empty PRs without checking off completion boxes), rather than a flaw in the actual namespaced exports strategy.

Because the orchestrator's logic increments the `rejection_count` for these system-level crashes just like it does for standard task rejections, the node eventually hit the `MAX_REJECTION_THRESHOLD` (3) and was auto-cancelled.

### Revised Strategy
The previously proposed namespaced exports deduplication strategy was not flawed. It should still be implemented in the replacement node (`task-638-669-extract-constants-to-core-v3`). The strategy is:
1. **Namespacing Exports:** Do not use a flat export structure for `@dexhelper/core`'s entry point. Instead, preserve generation-specific and domain-specific namespaces. The entry point (`packages/core/src/index.ts`) should export them as: `export * as Gen1Constants from './constants/gen1';`, `export * as Gen2Constants from './constants/gen2';`, etc.
2. **Common Deduplication:** Create a `packages/core/src/constants/common.ts` file for constants that share both identifier and value across all files (e.g., `BITS_PER_BYTE`). Export these normally.
3. **Refactor Imports:** Update all imports in the `src/` codebase to use the new namespaces from `@dexhelper/core` (e.g., `Gen1Constants.ITEM_QUANTITY_OFFSET`).