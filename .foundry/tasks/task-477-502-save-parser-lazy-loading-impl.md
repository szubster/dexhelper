---
id: task-477-502-save-parser-lazy-loading-impl
type: TASK
title: Implement lazy loading for generation-specific save parsers
status: ACTIVE
owner_persona: coder
created_at: '2026-08-29'
updated_at: '2026-08-31'
depends_on: []
jules_session_id: '8334147141131137844'
pr_number: null
parent: story-417-477-save-parser-code-splitting
tags:
  - performance
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement lazy loading for generation-specific save parsers

## Context
As per ADR 029 and the engine code splitting epic, we want to split the save parser logic by generation. The `src/engine/saveParser/index.ts` file currently likely imports all generation parsers statically, inflating the initial bundle size. We need to implement dynamic imports for generation-specific parsing logic.

## Acceptance Criteria
- [x] Refactor `parseSaveFile` in `src/engine/saveParser/index.ts` to use dynamic imports (`await import(...)`) for `parseGen1`, `parseGen2`, and `parseGen3`.
- [x] Ensure the generation detection logic remains intact and fast.
- [x] Verify that TypeScript types are correctly inferred and preserved across dynamic imports.
