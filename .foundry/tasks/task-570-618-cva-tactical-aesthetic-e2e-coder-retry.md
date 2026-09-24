---
id: task-570-618-cva-tactical-aesthetic-e2e-coder-retry
type: TASK
title: Write E2E tests for CVA tactical aesthetic variants (Retry)
status: PENDING
owner_persona: coder
created_at: '2026-09-22T00:00:00Z'
updated_at: '2026-09-24'
depends_on:
  - research-570-617-investigate-cva-tactical-aesthetic-e2e-failure
jules_session_id: null
pr_number: null
parent: story-566-570-cva-theme-variables-e2e-verification
tags:
  - e2e
  - testing
  - styling
research_references: []
rejection_reason: ''
locks: []
priority: 60
---

# Task: Write E2E tests for CVA tactical aesthetic variants (Retry)

## Context
As part of the CVA and theme setup verification, we need to ensure that the tactical aesthetic (ADR 008) is maintained across components with different CVA variants. A previous attempt (task-570-590-cva-tactical-aesthetic-e2e-coder) failed permanently. We are retrying this implementation pending the investigation results from `research-570-617`.

## Objective
Update or write Playwright E2E tests to validate that components like TacticalButton and TacticalBadge maintain their tactical aesthetic (sharp edges, dashed borders, monospaced fonts) under different CVA variants, correctly applying findings from the investigation.

## Acceptance Criteria
- [ ] Read the findings in `research-570-617-investigate-cva-tactical-aesthetic-e2e-failure` to understand why the previous tests failed.
- [ ] Write/update E2E tests for TacticalButton and TacticalBadge variants in `tests/e2e/tactical-utilities.spec.ts` (or a new file).
- [ ] Tests must ensure that the tactical aesthetic described in ADR 008 is correctly applied for each variant.
- [ ] Tests must pass successfully locally and in CI.
