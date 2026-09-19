---
id: task-536-564-playwright-style-guide-mock-utils
type: TASK
title: Document Mock Utilities
status: READY
owner_persona: coder
created_at: '2026-09-07'
updated_at: '2026-09-19'
depends_on:
  - task-536-563-playwright-style-guide-ismobile
jules_session_id: null
pr_number: null
parent: story-531-536-write-playwright-style-guide
tags:
  - testing
  - documentation
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
locks: []
---

# TASK: Document Mock Utilities

## Summary
Add a section to the Playwright Testing Style Guide covering the usage of new mock utilities.

## Description
As part of the new Playwright Testing Style Guide (`.foundry/docs/knowledge_base/testing/playwright_style_guide.md`), we need a section that documents the usage of new mock utilities.

## Acceptance Criteria
- [x] Update `.foundry/docs/knowledge_base/testing/playwright_style_guide.md` with a section on mock utilities.
- [x] Provide clear code examples.

### QA Rejection
The code example for Mock Utilities uses an absolute path (`await page.goto('/dashboard');`). According to core policies and past memory, Playwright tests must always use relative paths (`await page.goto('./dashboard');`) for navigation to avoid test failures caused by Vite base URL configurations (e.g., `/dexhelper/`). Please update the documentation to reflect this constraint.
