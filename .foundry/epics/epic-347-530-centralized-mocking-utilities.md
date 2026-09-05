---
id: epic-347-530-centralized-mocking-utilities
type: EPIC
title: Centralized Playwright Mocking Utilities
status: ACTIVE
owner_persona: story_owner
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: '3235059060383941140'
pr_number: null
parent: prd-422-347-playwright-mocking-utilities
tags:
  - testing
  - playwright
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# EPIC: Centralized Playwright Mocking Utilities

## Context & Problem Statement
The `coder` and `qa` personas face friction mocking complex native browser APIs (e.g. \`window.showOpenFilePicker\`) during Playwright E2E testing. This leads to boilerplate and flaky tests. A central module must be built.

## Proposed Solution
Build a dedicated utility module (\`tests/e2e/mock-utils.ts\`) exposing \`mockFilePicker\`, \`mockFileSystemAccess\`, and \`mockOfflineState\`.

## Acceptance Criteria
- [ ] Implement central mocking utility functions.
- [ ] Implement a final STORY dedicated exclusively to Integration and E2E Verification.
