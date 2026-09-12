---
id: task-536-563-playwright-style-guide-ismobile
type: TASK
title: "Document isMobile Context Handling"
status: PENDING
owner_persona: coder
created_at: '2026-09-07'
updated_at: '2026-09-07'
depends_on:
  - task-536-562-playwright-style-guide-locator-or
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

# TASK: Document isMobile Context Handling

## Summary
Add a section to the Playwright Testing Style Guide covering the `isMobile` context handling.

## Description
Repeated violations of testing standards are caught by `qa` nodes regarding `isMobile` context. As part of the new Playwright Testing Style Guide (`.foundry/docs/knowledge_base/testing/playwright_style_guide.md`), we need a section documenting `isMobile`. According to core policies: "When writing or maintaining E2E tests for navigation elements, always consider that layout and labeling may change based on screen size. The `isMobile` fixture in Playwright should be used to conditionally adjust locators."

## Acceptance Criteria
- [ ] Update `.foundry/docs/knowledge_base/testing/playwright_style_guide.md` with a section on the `isMobile` fixture.
- [ ] Provide clear code examples.
