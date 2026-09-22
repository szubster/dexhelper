---
id: story-531-536-write-playwright-style-guide
type: STORY
title: Write Playwright Testing Style Guide
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-09-04'
updated_at: '2026-09-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-347-531-testing-style-guide
tags:
  - testing
  - documentation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# STORY: Write Playwright Testing Style Guide

## Summary
Write a comprehensive Playwright Testing Style Guide to enforce testing standards across the repository.

## Description
Repeated violations of testing standards are caught by `qa` nodes, and `locator.or()` and `isMobile` are used inconsistently. This story requires creating a style guide in `.foundry/docs/knowledge_base/testing/playwright_style_guide.md` covering `locator.or()` strict mode, `isMobile` context handling, and usage of the new mock utilities.

## Acceptance Criteria
- [x] Tech Lead: Break down into Tasks.
- [x] task-536-562-playwright-style-guide-locator-or
- [x] task-536-563-playwright-style-guide-ismobile
- [x] task-536-564-playwright-style-guide-mock-utils
- [x] task-536-565-playwright-style-guide-qa
