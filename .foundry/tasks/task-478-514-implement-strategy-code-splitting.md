---
id: task-478-514-implement-strategy-code-splitting
type: TASK
title: Implement lazy loading for Assistant Strategies
status: ACTIVE
owner_persona: coder
created_at: '2026-09-01'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: '17262387145820543425'
pr_number: null
parent: story-417-478-assistant-code-splitting
tags:
  - performance
  - architecture
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement lazy loading for Assistant Strategies

## Description
Refactor `src/engine/assistant/strategies/index.ts` to lazily load generation-specific strategies using dynamic imports.

## Acceptance Criteria
- [ ] `getStrategy` is an async function that uses `await import()` for generation strategies.
- [ ] `suggestionEngine.ts` is updated to await `getStrategy`.
- [ ] `pnpm lint` and `pnpm test` pass successfully.
