---
id: task-475-536-verify-core-tests
type: TASK
title: Verify Core Test Suite and E2E Tests
status: READY
owner_persona: coder
created_at: '2026-09-05'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-334-475-prompt-rules-integration-e2e
tags:
  - testing
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Verify Core Test Suite and E2E Tests

## Context & Objectives
This task fulfills the requirement of `story-334-475-prompt-rules-integration-e2e` to ensure that recent changes to persona prompts (`tech_lead.md`, `coder.md`, `qa.md`) and `core_policies.md` do not break any core tests or E2E tests in the main application.

## Requirements
- Execute the linting and core unit tests (`pnpm lint`, `pnpm test`) in the project root.
- Execute the Playwright E2E test suite (`xvfb-run -a pnpm test:e2e`) in the project root.
- If any test fails, investigate and fix the underlying prompt rules or code before marking this task as complete.

## Acceptance Criteria
- [ ] `pnpm lint` and `pnpm test` successfully execute and pass.
- [ ] `xvfb-run -a pnpm test:e2e` successfully executes and passes.
