---
id: task-359-441-gen3-trainer-card-parsing-e2e-qa
type: TASK
title: Gen 3 Trainer Card E2E QA
status: CANCELLED
owner_persona: qa
created_at: '2026-08-05'
updated_at: '2026-10-10'
depends_on:
  - task-359-440-gen3-trainer-card-parsing-e2e-impl
jules_session_id: null
pr_number: null
parent: story-400-359-gen3-trainer-card-parsing-e2e
tags:
  - e2e
  - integration
  - gen3
research_references: []
rejection_count: 2
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-359-440-gen3-trainer-card-parsing-e2e-impl
notes: ''
locks: []
confidence_score: 100
---

# Task: Gen 3 Trainer Card E2E QA

## Description
Verify the Playwright E2E tests for the Gen 3 Trainer Card parsing and UI rendering.

## Acceptance Criteria
- [ ] Run the E2E tests and ensure they pass consistently.
- [ ] Verify the tests correctly assert all relevant data points on the Trainer Card UI (e.g., playtime, Hall of Fame debut, link battles, trades).


### QA Rejection
I have marked `task-359-440-gen3-trainer-card-parsing-e2e-impl` as FAILED because the implementation does not test or implement parsing and rendering for `playtime`, `link battles`, or `trades`. These are explicitly required by the acceptance criteria.
