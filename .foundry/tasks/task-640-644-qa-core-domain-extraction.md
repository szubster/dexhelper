---
id: task-640-644-qa-core-domain-extraction
type: TASK
title: QA Verification for Core Domain Extraction
status: READY
owner_persona: qa
created_at: '2026-10-01'
updated_at: '2026-10-01'
depends_on:
  - task-640-643-update-app-imports
jules_session_id: null
pr_number: null
parent: story-526-640-extract-domain-logic
tags:
  - architecture
  - monorepo
  - pnpm
rejection_count: 0
rejection_reason: ''
research_references: []
notes: ''
locks: []
---

# QA Verification for Core Domain Extraction

## Context
Verify that the core domain logic has been successfully extracted into `@dexhelper/core` without breaking functionality and adhering to the strict architectural constraints (no DOM/React in core).

## Acceptance Criteria
- [ ] Verify `pnpm lint:deps` passes.
- [ ] Verify unit tests pass for the core logic in its new location.
- [ ] Verify the application still builds and runs correctly.
- [ ] Verify no DOM/React imports exist in `packages/core`.
