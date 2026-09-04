---
id: epic-347-531-testing-style-guide
type: EPIC
title: "Playwright Testing Style Guide"
status: READY
owner_persona: story_owner
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-422-347-playwright-mocking-utilities
tags:
  - testing
  - documentation
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# EPIC: Playwright Testing Style Guide

## Context & Problem Statement
Repeated violations of testing standards are caught by `qa` nodes, and `locator.or()` and `isMobile` are used inconsistently.

## Proposed Solution
Create a style guide in `.foundry/docs/knowledge_base/testing/playwright_style_guide.md` covering `locator.or()` strict mode, `isMobile` context handling, and usage of the new mock utilities.

## Acceptance Criteria
- [x] Write the Playwright testing style guide.
- [x] Implement a final STORY dedicated exclusively to Integration and E2E Verification.
- [ ] story-531-536-write-playwright-style-guide
- [ ] story-531-537-testing-style-guide-e2e
