---
id: task-473-495-extract-rejection-count-qa
type: TASK
title: QA rejection_count Extraction
status: READY
owner_persona: qa
created_at: '2026-08-26'
updated_at: '2026-09-01'
depends_on:
  - task-473-494-extract-rejection-count-tests
jules_session_id: null
pr_number: null
parent: story-071-473-extract-rejection-count
tags:
  - data
  - dashboard
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA rejection_count Extraction

## Overview
Verify the implementation of `rejection_count` extraction and ensure tests pass.

## Acceptance Criteria
- [ ] Review code changes in `src/utils/dag/parser.ts` to confirm `rejection_count` is handled correctly.
- [ ] Verify that `pnpm test` passes for the parser.
