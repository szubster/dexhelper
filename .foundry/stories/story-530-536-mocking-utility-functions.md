---
id: story-530-536-mocking-utility-functions
type: STORY
title: Implement Central Mocking Utility Functions
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-04'
updated_at: '2026-09-08'
depends_on: []
jules_session_id: '9592949022191228926'
pr_number: null
parent: epic-347-530-centralized-mocking-utilities
tags:
  - testing
  - playwright
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Implement Central Mocking Utility Functions

## Context
The QA and coder personas need a centralized utility module (`tests/e2e/mock-utils.ts`) for Playwright to mock complex native browser APIs like `window.showOpenFilePicker`, `mockFileSystemAccess`, and `mockOfflineState`. This reduces boilerplate and flakiness.

## Acceptance Criteria
- [x] Tech Lead: Break down into Tasks.
- [ ] task-536-562-implement-mocking-utilities
