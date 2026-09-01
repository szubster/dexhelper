---
id: task-477-503-save-parser-lazy-loading-qa
type: TASK
title: QA lazy loading for generation-specific save parsers
status: ACTIVE
owner_persona: qa
created_at: '2026-08-29'
updated_at: '2026-09-01'
depends_on:
  - task-477-502-save-parser-lazy-loading-impl
jules_session_id: '14621244353027254962'
pr_number: null
parent: story-417-477-save-parser-code-splitting
tags:
  - performance
  - architecture
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA lazy loading for generation-specific save parsers

## Context
The generation-specific logic in the save parser engine (`src/engine/saveParser/index.ts`) has been refactored to use dynamic imports for improved performance (ADR 029). We need to verify that this implementation works correctly without regressions.

## Acceptance Criteria
- [x] Verify that Gen 1, Gen 2, and Gen 3 save files still parse correctly.
- [x] Confirm that `parseSaveFile` properly resolves dynamic imports (`await import(...)`) dynamically during runtime.
- [x] Ensure that structural fallback detection (when checksums are broken) still functions and correctly dispatches to the lazily loaded parsers.
