---
id: task-640-743-qa-extract-utils-retry-v4
type: TASK
title: QA Verification for Utils Extraction (Retry v4)
status: CANCELLED
owner_persona: qa
created_at: '2026-11-03'
updated_at: '2026-11-10'
depends_on:
  - task-640-742-update-app-imports-utils-retry-v4
jules_session_id: null
pr_number: null
parent: story-526-640-extract-domain-logic
tags:
  - architecture
  - monorepo
  - pnpm
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  research-640-740-investigate-extract-utils-timeout-v5
notes: ''
locks: []
---

# QA Verification for Utils Extraction (Retry v4)

## Context
Verify that the src/utils logic has been successfully extracted into @dexhelper/core without breaking functionality and adhering to the strict architectural constraints (no DOM/React in core).

## Acceptance Criteria
- [ ] Verify pnpm lint:deps passes.
- [ ] Verify unit tests pass for the core logic in its new location.
- [ ] Verify the application still builds and runs correctly.
- [ ] Verify no DOM/React imports exist in packages/core.
