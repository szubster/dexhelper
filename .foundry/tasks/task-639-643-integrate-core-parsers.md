---
id: task-639-643-integrate-core-parsers
type: TASK
title: Integrate core package parsers into the main application
status: CANCELLED
owner_persona: coder
created_at: '2026-10-01'
updated_at: '2026-10-03'
depends_on:
  - task-639-642-extract-generation-parsers
jules_session_id: null
pr_number: null
parent: story-526-639-extract-parsers
tags:
  - architecture
  - monorepo
  - pnpm
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-639-641-extract-base-save-parsers
notes: ''
locks: []
priority: 50
confidence_score: null
---

# Integrate core package parsers into the main application

Refactor the main application in `src/` to import and consume the save file parsers from `@dexhelper/core` instead of the local `src/engine/saveParser` directory. Clean up the old directory.

## Acceptance Criteria
- [ ] Complete implementation
