---
id: task-570-590-cva-tactical-aesthetic-e2e-coder
type: TASK
title: Write E2E tests for CVA tactical aesthetic variants
status: CANCELLED
owner_persona: coder
created_at: '2026-09-18T17:03:41Z'
updated_at: '2026-09-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-566-570-cva-theme-variables-e2e-verification
tags:
  - e2e
  - testing
  - styling
research_references: []
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
locks: []
priority: 60
---

# Task: Write E2E tests for CVA tactical aesthetic variants

## Context
As part of the CVA and theme setup verification, we need to ensure that the tactical aesthetic (ADR 008) is maintained across components with different CVA variants.

## Objective
Update or write Playwright E2E tests to validate that components like TacticalButton and TacticalBadge maintain their tactical aesthetic (sharp edges, dashed borders, monospaced fonts) under different CVA variants.

## Acceptance Criteria
- [ ] Write/update E2E tests for TacticalButton and TacticalBadge variants in `tests/e2e/tactical-utilities.spec.ts` or a new file.
- [ ] Tests must ensure that the tactical aesthetic described in ADR 008 is correctly applied for each variant.
- [ ] Tests must pass successfully.
