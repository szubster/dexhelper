---
id: prd-422-347-playwright-mocking-utilities
type: PRD
title: Formalize Playwright Mocking Utilities and Testing Style Guide
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-09-02'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: '6756589480971249112'
pr_number: null
parent: idea-422-formalize-playwright-mocking-utilities
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Formalize Playwright Mocking Utilities and Testing Style Guide

## Context
Analysis of the `coder` and `qa` journals has revealed recurring friction points when implementing Playwright E2E tests, particularly around mocking native browser APIs like `window.showOpenFilePicker`. Reliance on direct injection or brittle evaluation logic often leads to flaky tests or requires excessive boilerplate.
Simultaneously, `qa` nodes are catching repeated violations of testing standards, such as failure to properly mock responses or incorrect assertions on state.

## Requirements
1. **Centralized E2E Mocking Utilities**: Create a dedicated utility module (e.g., `tests/e2e/mock-utils.ts`) that exposes standardized functions for mocking complex browser interactions, such as `mockFilePicker`, `mockFileSystemAccess`, and `mockOfflineState`.
2. **Testing Style Guide**: Create a `.foundry/docs/knowledge_base/testing/playwright_style_guide.md` that explicitly outlines the correct patterns for using `locator.or()`, handling `isMobile` fixture contexts, and utilizing the new mock utilities.

## Benefits
- Drastically reduces the time required to scaffold and write robust E2E tests for complex browser APIs.
- Prevents flakiness caused by inconsistent mock implementations.
- Reduces the cognitive load on the `coder` persona, leading to fewer test-related rejections by `qa`.

## Acceptance Criteria
- [x] Create an Epic to track the implementation of these mocking utilities and style guide.
- [ ] epic-347-530-centralized-mocking-utilities
- [ ] epic-347-531-testing-style-guide
