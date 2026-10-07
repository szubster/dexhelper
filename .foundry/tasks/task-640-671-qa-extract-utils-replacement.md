---
id: task-640-671-qa-extract-utils-replacement
type: TASK
title: QA Verification for Utils Extraction (Replacement)
status: PENDING
owner_persona: qa
created_at: '2026-10-07'
updated_at: '2026-10-07'
depends_on:
  - task-640-670-update-app-imports-utils-replacement
jules_session_id: null
pr_number: null
parent: story-526-640-extract-domain-logic
tags:
  - architecture
  - monorepo
  - pnpm
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Verification for Utils Extraction (Replacement)

## Context
Verify that the `src/utils` logic has been successfully extracted into `@dexhelper/core` without breaking functionality and adhering to the strict architectural constraints (no DOM/React in core). This replaces the cancelled task `task-640-661-qa-extract-utils`.

## Acceptance Criteria
- [ ] Verify `pnpm lint:deps` passes.
- [ ] Verify unit tests pass for the core logic in its new location.
- [ ] Verify the application still builds and runs correctly.
- [ ] Verify no DOM/React imports exist in `packages/core`.
