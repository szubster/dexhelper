---
id: task-640-648-qa-core-domain-extraction-replacement
type: TASK
title: QA Verification for Core Domain Extraction (Replacement)
status: PENDING
owner_persona: qa
created_at: '2026-10-02'
updated_at: '2026-10-02'
depends_on:
  - task-640-647-update-app-imports-replacement
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

# QA Verification for Core Domain Extraction (Replacement)

## Context
Verify that the core domain logic has been successfully extracted into `@dexhelper/core` without breaking functionality and adhering to the strict architectural constraints (no DOM/React in core). This replaces task-640-644-qa-core-domain-extraction.

## Acceptance Criteria
- [ ] Verify `pnpm lint:deps` passes.
- [ ] Verify unit tests pass for the core logic in its new location.
- [ ] Verify the application still builds and runs correctly.
- [ ] Verify no DOM/React imports exist in `packages/core`.
