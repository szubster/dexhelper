---
id: task-351-384-nuzlocke-death-tracking-e2e-impl
type: TASK
title: Nuzlocke Death Tracking E2E Tests Implementation
status: READY
owner_persona: coder
created_at: '2026-08-01'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-131-351-nuzlocke-death-tracking-e2e
tags:
  - e2e
  - nuzlocke
  - verification
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Task: Nuzlocke Death Tracking E2E Tests Implementation

## Objective
Implement End-to-End tests using Playwright to verify the automated death tracking logic and Graveyard Box functionality.

## Contract / Acceptance Criteria
- [x] Implement E2E tests covering the detection of party Pokémon at 0 HP.
- [x] Implement E2E tests verifying Graveyard box designation and UI settings.
- [x] Implement E2E tests verifying Pokémon in the Graveyard box are correctly identified as dead.
- [x] If tactical bracket formatting (e.g., `[ SYS.LABEL ]`) is targeted in tests, use regex matchers in `getByText` queries (e.g., `/SYS.LABEL/i`).
- [x] Ensure all E2E tests run successfully via `pnpm test:e2e` or `xvfb-run pnpm test:e2e`.

## Instructions & Reminders for Coder
- **Transient Failures:** If you experience a transient failure requiring a retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Aborts:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- **Save File Parsing Guidelines:** If test implementation involves parsing or generating mocked save files, strictly adhere to all guidelines defined in Section 13 ("Save File Parsing & Extraction Guidelines") of `.foundry/docs/schema.md`.
