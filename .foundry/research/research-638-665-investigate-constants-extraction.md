---
id: research-638-665-investigate-constants-extraction
type: RESEARCH
title: Investigate Constants Extraction Failure
status: READY
owner_persona: researcher
created_at: '2026-10-05'
updated_at: '2026-10-06'
depends_on: []
jules_session_id: null
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

# Investigate Constants Extraction Failure

## Description
This node investigates the permanent failure of `task-638-641-extract-constants-to-core`. The task failed because it could not fulfill the acceptance criteria, likely due to duplicate export identifiers when merging multiple constants files into `@dexhelper/core`'s single entry point, or due to complex file movements that resulted in linting errors.

## Acceptance Criteria
- [ ] Investigate the root cause of the failure of `task-638-641-extract-constants-to-core`.
- [ ] Identify all duplicate constants (like `BITS_PER_BYTE`) across the various `constants.ts` files in the repository.
- [ ] Propose a concrete strategy for deduplicating these constants when extracting them to the `core` package to prevent TS2308 duplicate export errors.
- [ ] Document findings in the researcher persona journal.
