---
id: task-650-696-dynamic-import-assistant-strategies-tests
type: TASK
title: Dynamic Import Assistant Strategies - Tests Update
status: ACTIVE
owner_persona: coder
created_at: '2026-10-17T02:22:00.000Z'
updated_at: '2026-10-22'
depends_on:
  - task-650-694-dynamic-import-assistant-strategies-impl
jules_session_id: '13478961333447106826'
pr_number: null
parent: story-401-650-dynamic-import-assistant-strategies
tags:
  - performance
  - architecture
  - testing
rejection_count: 0
rejection_reason: ''
locks: []
---

# Dynamic Import Assistant Strategies - Tests Update

## Description
Update the test suite to handle the asynchronous nature of the dynamically imported Assistant Strategies.

## Acceptance Criteria
- [x]  Ensure the tests properly support the dynamic import of strategies and wait for promises to resolve where necessary.
- [x]  Update `generateSuggestions.test.ts`, `suggestionEngine.test.ts` and any other affected tests to correctly await `getStrategy()`.
- [x]  Ensure all unit tests pass with the new async import architecture.
