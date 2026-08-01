---
id: task-333-376-sorting-strategies-regional-dex-qa
type: TASK
title: QA Regional Dex Sorting Strategy
status: ACTIVE
owner_persona: qa
created_at: '2026-07-31'
updated_at: '2026-08-01'
depends_on:
  - task-333-375-sorting-strategies-regional-dex-impl
jules_session_id: '9297002747926214163'
pr_number: null
parent: story-136-333-sorting-standard-strategies-retry
tags:
  - feature
  - sorting
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Regional Dex Sorting Strategy

## Context
QA verification for the regional dex sorting strategy implemented in `task-333-375-sorting-strategies-regional-dex-impl`.

## Acceptance Criteria
- [x] Verify `DexNumberSorter` correctly sorts using the regional dex when configured with `variant: 'regional'`.
- [x] Verify `pnpm test` passes for sorting unit tests.
- [x] Verify `pnpm lint` passes.
