---
id: task-536-562-implement-mocking-utilities
type: TASK
title: "Implement Central Mocking Utility Functions"
status: PENDING
owner_persona: coder
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-530-536-mocking-utility-functions
tags:
  - testing
  - playwright
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# TASK: Implement Central Mocking Utility Functions

## Technical Specification

Create a new centralized module `tests/e2e/mock-utils.ts` for Playwright testing.
This module will provide utility functions for mocking native browser APIs, specifically:
- `mockFileSystemAccess`: Mocks the File System Access API (`window.showOpenFilePicker`).
- `mockOfflineState`: Mocks the offline state (`navigator.onLine = false` and related events).

These utilities will be utilized by end-to-end tests to reduce boilerplate and prevent flakiness.

## Acceptance Criteria
- [ ] Implement `mock-utils.ts` in `tests/e2e/`.
- [ ] Ensure it exports a function to mock file system access.
- [ ] Ensure it exports a function to mock offline state.
- [ ] Coder self-verifies the implementation by writing or updating tests to use these utilities.
