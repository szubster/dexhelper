---
id: task-536-562-playwright-style-guide-locator-or
type: TASK
title: "Document locator.or() Strict Mode"
status: PENDING
owner_persona: coder
created_at: '2026-09-07'
updated_at: '2026-09-07'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-531-536-write-playwright-style-guide
tags:
  - testing
  - documentation
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# TASK: Document locator.or() Strict Mode

## Summary
Add a section to the Playwright Testing Style Guide covering the proper usage of `locator.or()` in strict mode.

## Description
Repeated violations of testing standards are caught by `qa` nodes regarding `locator.or()`. As part of the new Playwright Testing Style Guide (`.foundry/docs/knowledge_base/testing/playwright_style_guide.md`), we need a section that explicitly documents how to use `locator.or()` properly. According to core policies: "To satisfy strict mode, append `.first()` both before and after the `.or()` (e.g. `expect(page.locator('.a').first().or(page.locator('.b').first()).first())`)."

## Acceptance Criteria
- [ ] Create or update `.foundry/docs/knowledge_base/testing/playwright_style_guide.md` with a section on `locator.or()` strict mode.
- [ ] Provide clear code examples matching the policy.
