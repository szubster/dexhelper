---
id: task-351-385-nuzlocke-death-tracking-e2e-qa
type: TASK
title: Nuzlocke Death Tracking E2E Tests Verification
status: ACTIVE
owner_persona: qa
created_at: '2026-08-01'
updated_at: '2026-08-20'
depends_on:
  - task-351-384-nuzlocke-death-tracking-e2e-impl
jules_session_id: '16272564245202199728'
pr_number: null
parent: story-131-351-nuzlocke-death-tracking-e2e
tags:
  - e2e
  - nuzlocke
  - verification
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Nuzlocke Death Tracking E2E Tests Verification

## Objective
Verify the Playwright End-to-End tests for the automated death tracking logic and Graveyard Box functionality.

## Contract / Acceptance Criteria
- [ ] Verify that E2E tests adequately cover the detection of party Pokémon at 0 HP.
- [ ] Verify that E2E tests adequately cover the Graveyard box designation and UI settings.
- [ ] Verify that E2E tests adequately cover identifying Pokémon in the Graveyard box as dead.
- [ ] Ensure all tests pass reliably using `pnpm test:e2e` (or `xvfb-run pnpm test:e2e`).

## Instructions & Reminders for QA
- **Transient Failures:** If you experience a transient failure requiring a retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Aborts:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
